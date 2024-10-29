
export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'USD'
}).format(amount)

export const toBoolean = (str: string) => str.toLowerCase() === 'true'