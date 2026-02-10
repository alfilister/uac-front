export const formatCurrency = (value: string): string => {
	const numericValue = value.replace(/\D/g, '')

	if (numericValue === '') return ''

	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(Number(numericValue))
}

export const parseCurrency = (formattedValue: string): number => {
	return Number(formattedValue.replace(/\D/g, ''))
}
