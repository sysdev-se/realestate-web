import type { AuthStore } from './auth'

type Method = 'GET' | 'POST' | 'DELETE'

// realestate-api client. Components use it as this.$api.
class ApiClient {
    constructor(private readonly baseURL: string, private readonly auth: AuthStore) {
    }

    listListings(query: ListingQuery): Promise<PagedModel<Listing>> {
        return $fetch<PagedModel<Listing>>('/api/v1/consumer/listings', {
            baseURL: this.baseURL,
            query: {
                title: query.title || undefined,
                sort: query.sort,
                page: query.page - 1,
                size: LISTING_PAGE_SIZE,
            },
        })
    }

    getListing(id: string): Promise<Listing> {
        return $fetch<Listing>(`/api/v1/consumer/listings/${encodeURIComponent(id)}`, { baseURL: this.baseURL })
    }

    uploadImage(file: File): Promise<ImageResponse> {
        const body = new FormData()
        body.append('file', file)
        return this.admin<ImageResponse>('POST', '/api/v1/admin/images', body)
    }

    createListing(listing: CreateListingRequest): Promise<Listing> {
        return this.admin<Listing>('POST', '/api/v1/admin/listings', listing)
    }

    deleteListing(id: string): Promise<void> {
        return this.admin<void>('DELETE', `/api/v1/admin/listings/${encodeURIComponent(id)}`)
    }

    // Sends the access token; on 401 refreshes it once and retries. If the refresh fails the
    // user is signed out and the 401 is thrown.
    private async admin<T>(method: Method, path: string, body?: FormData | object, retry = true): Promise<T> {
        try {
            return await $fetch<T>(path, {
                baseURL: this.baseURL,
                method,
                body,
                headers: { Authorization: `Bearer ${this.auth.accessToken}` },
            })
        }
        catch (error) {
            if (retry && apiErrorStatus(error) === 401 && await this.auth.refresh()) {
                return this.admin<T>(method, path, body, false)
            }
            throw error
        }
    }
}

export default defineNuxtPlugin({
    name: 'api',
    dependsOn: ['auth'],
    // Typed explicitly: inferring it would go through nuxtApp.$auth, whose type includes this plugin.
    setup(nuxtApp): { provide: { api: ApiClient } } {
        const auth = nuxtApp.$auth as AuthStore
        return { provide: { api: new ApiClient(useRuntimeConfig().public.apiBase, auth) } }
    },
})
