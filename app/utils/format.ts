// VND is the only currency; it has no smaller unit.
const priceFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
})

const areaFormat = new Intl.NumberFormat('en', { maximumFractionDigits: 1 })

// Rent is per month.
export function formatPrice(listing: Pick<Listing, 'price' | 'type'>): string {
    const price = priceFormat.format(listing.price)
    return listing.type === 'RENT' ? `${price}/mo` : price
}

export function formatListingType(type: ListingType): string {
    return type === 'RENT' ? 'For rent' : 'For sale'
}

// "3 beds · 2 baths · 120 m²", leaving out what's unknown.
export function formatFacts(listing: Pick<Listing, 'bedrooms' | 'bathrooms' | 'areaSqm'>): string {
    const facts: string[] = []
    if (listing.bedrooms !== null) {
        facts.push(`${listing.bedrooms} ${listing.bedrooms === 1 ? 'bed' : 'beds'}`)
    }
    if (listing.bathrooms !== null) {
        facts.push(`${listing.bathrooms} ${listing.bathrooms === 1 ? 'bath' : 'baths'}`)
    }
    if (listing.areaSqm !== null) {
        facts.push(`${areaFormat.format(listing.areaSqm)} m²`)
    }
    return facts.join(' · ')
}
