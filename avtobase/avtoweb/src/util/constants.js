// Mirrors the `fuel_types` table in the database.
export const FUEL_TYPES = [
    { id: 1, type: 'Petrol' },
    { id: 2, type: 'Diesel' },
    { id: 3, type: 'Electric' },
];

export function fuelTypeName(id) {
    const match = FUEL_TYPES.find((fuel) => fuel.id === Number(id));
    return match ? match.type : 'Unknown';
}

// Sort options are referenced by id from both the sort widget and the list.
export const SORT_OPTIONS = {
    PRICE_ASC: 'price-asc',
    PRICE_DESC: 'price-desc',
    BRAND_ASC: 'brand-asc',
    BRAND_DESC: 'brand-desc',
    YEAR_DESC: 'year-desc',
    YEAR_ASC: 'year-asc',
};

const priceFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
});

export function formatPrice(value) {
    const number = Number(value);
    return Number.isFinite(number) ? priceFormatter.format(number) : '-';
}
