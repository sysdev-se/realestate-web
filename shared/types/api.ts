// Shapes of realestate-api's JSON (see realestate-api README).

export type PublishedStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED'

// RENT: the price is per month.
export type ListingType = 'SALE' | 'RENT'

export interface Listing {
    id: string
    // Only PUBLISHED listings are public; scraped ones wait in PENDING for an admin.
    publishedStatus: PublishedStatus
    type: ListingType
    title: string
    description: string | null
    // Whole VND, the system's only currency.
    price: number
    bedrooms: number | null
    bathrooms: number | null
    areaSqm: number | null
    // The scraper (e.g. 'fazwaz') and the listing's page there; null for admin-created listings.
    source: string | null
    sourceUrl: string | null
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
    type: ListingType
    title: string
    description: string | null
    price: number
    bedrooms: number | null
    bathrooms: number | null
    areaSqm: number | null
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
