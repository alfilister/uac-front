import { parseCurrency } from './currency'


export interface FormErrors {
	initialAmount?: string
	monthlyContribution?: string
	months?: string
}

export const VALIDATION_LIMITS = {
	INITIAL_AMOUNT: {
		MIN: 10000,
		MAX: 30000000,
	},
	MONTHLY_CONTRIBUTION: {
		MIN: 10000,
		MAX: 5000000,
	},
	MONTHS: {
		MIN: 5,
		MAX: 120,
	},
} as const

export const ERROR_MESSAGES = {
	initialAmount: {
		required: 'El monto inicial es requerido',
		belowMin: 'El monto inicial debe ser al menos $10,000 COP',
		aboveMax: 'El monto inicial no puede ser superior a $30,000,000 COP',
	},
	monthlyContribution: {
		required: 'El aporte mensual es requerido',
		belowMin: 'El aporte mensual debe ser al menos $10,000 COP',
		aboveMax: 'El aporte mensual no puede ser superior a $5,000,000 COP',
	},
	months: {
		required: 'El número de meses es requerido',
		belowMin: 'El plazo debe ser de al menos 5 meses',
		aboveMax: 'El plazo no puede ser superior a 120 meses (10 años)',
	},
} as const

export const validateInitialAmount = (
	value: string | undefined,
	currentAmount: string,
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
	const valueToValidate = value !== undefined ? value : currentAmount
	const initialAmountNum = parseCurrency(valueToValidate)

	if (valueToValidate === '') {
		setErrors((prev) => ({
			...prev,
			initialAmount: ERROR_MESSAGES.initialAmount.required,
		}))
	} else if (initialAmountNum < VALIDATION_LIMITS.INITIAL_AMOUNT.MIN) {
		setErrors((prev) => ({
			...prev,
			initialAmount: ERROR_MESSAGES.initialAmount.belowMin,
		}))
	} else if (initialAmountNum > VALIDATION_LIMITS.INITIAL_AMOUNT.MAX) {
		setErrors((prev) => ({
			...prev,
			initialAmount: ERROR_MESSAGES.initialAmount.aboveMax,
		}))
	} else {
		setErrors((prev) => {
			const newErrors = { ...prev }
			delete newErrors.initialAmount
			return newErrors
		})
	}
}

export const validateMonthlyContribution = (
	value: string | undefined,
	currentContribution: string,
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
	const valueToValidate = value !== undefined ? value : currentContribution
	const monthlyContributionNum = parseCurrency(valueToValidate)

	if (valueToValidate === '') {
		setErrors((prev) => ({
			...prev,
			monthlyContribution: ERROR_MESSAGES.monthlyContribution.required,
		}))
	} else if (monthlyContributionNum < VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MIN) {
		setErrors((prev) => ({
			...prev,
			monthlyContribution: ERROR_MESSAGES.monthlyContribution.belowMin,
		}))
	} else if (monthlyContributionNum > VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MAX) {
		setErrors((prev) => ({
			...prev,
			monthlyContribution: ERROR_MESSAGES.monthlyContribution.aboveMax,
		}))
	} else {
		setErrors((prev) => {
			const newErrors = { ...prev }
			delete newErrors.monthlyContribution
			return newErrors
		})
	}
}

export const validateMonths = (
	value: string | undefined,
	currentMonths: string,
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
	const valueToValidate = value !== undefined ? value : currentMonths
	const monthsNum = Number(valueToValidate)

	if (valueToValidate === '') {
		setErrors((prev) => ({
			...prev,
			months: ERROR_MESSAGES.months.required,
		}))
	} else if (monthsNum < VALIDATION_LIMITS.MONTHS.MIN) {
		setErrors((prev) => ({
			...prev,
			months: ERROR_MESSAGES.months.belowMin,
		}))
	} else if (monthsNum > VALIDATION_LIMITS.MONTHS.MAX) {
		setErrors((prev) => ({
			...prev,
			months: ERROR_MESSAGES.months.aboveMax,
		}))
	} else {
		setErrors((prev) => {
			const newErrors = { ...prev }
			delete newErrors.months
			return newErrors
		})
	}
}

export const isFormValid = (
	initialAmount: string,
	monthlyContribution: string,
	months: string
): boolean => {
	const initialAmountNum = parseCurrency(initialAmount)
	const monthlyContributionNum = parseCurrency(monthlyContribution)
	const monthsNum = Number(months)

	return (
		initialAmount !== '' &&
		initialAmountNum >= VALIDATION_LIMITS.INITIAL_AMOUNT.MIN &&
		initialAmountNum <= VALIDATION_LIMITS.INITIAL_AMOUNT.MAX &&
		monthlyContribution !== '' &&
		monthlyContributionNum >= VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MIN &&
		monthlyContributionNum <= VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MAX &&
		months !== '' &&
		monthsNum >= VALIDATION_LIMITS.MONTHS.MIN &&
		monthsNum <= VALIDATION_LIMITS.MONTHS.MAX
	)
}
