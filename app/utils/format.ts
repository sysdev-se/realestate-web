const priceFormat = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
})

export function formatPrice(price: number): string {
    return priceFormat.format(price)
}
