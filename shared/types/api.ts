// Shapes of realestate-api's JSON (see realestate-api README).

export interface Listing {
    id: string
    title: string
    description: string | null
    price: number
    // The first of imgUrls, null without images.
    primaryImgUrl: string | null
    imgUrls: string[]
}

export interface PagedModel<T> {
    content: T[]
    page: {
        size: number
        number: number
        totalElements: number
        totalPages: number
    }
}

export interface CreateListingRequest {
    title: string
    description: string | null
    price: number
    imgUrls: string[]
}

export interface TokenResponse {
    accessToken: string
    refreshToken: string
}

export interface AccessTokenResponse {
    accessToken: string
}

export interface ImageResponse {
    url: string
}

export type ListingSort = 'title,asc' | 'price,asc' | 'price,desc'

// What /listings shows; kept in the URL query. page is 1-based (the api's is 0-based).
export interface ListingQuery {
    title: string
    sort: ListingSort
    page: number
}
