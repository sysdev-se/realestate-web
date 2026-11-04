import type { LocationQuery, LocationQueryRaw } from 'vue-router'

export const LISTING_PAGE_SIZE = 12

export const LISTING_SORTS: { label: string, value: ListingSort }[] = [
    { label: 'Title', value: 'title,asc' },
    { label: 'Price: low to high', value: 'price,asc' },
    { label: 'Price: high to low', value: 'price,desc' },
]

export function parseListingQuery(query: LocationQuery): ListingQuery {
    const sort = LISTING_SORTS.find((option) => option.value === query.sort)?.value ?? 'title,asc'
    const page = Number.parseInt(String(query.page ?? '1'), 10)
    return {
        title: typeof query.title === 'string' ? query.title : '',
        sort,
        page: Number.isInteger(page) && page > 0 ? page : 1,
    }
}

// Defaults are left out, so /listings stays /listings.
export function toRouteQuery(query: ListingQuery): LocationQueryRaw {
    return {
        title: query.title || undefined,
        sort: query.sort === 'title,asc' ? undefined : query.sort,
        page: query.page === 1 ? undefined : String(query.page),
    }
}
