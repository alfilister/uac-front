'use client'

import { useState, useMemo } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import { formatCurrency, parseCurrency } from '@/utils/currency'
import { calculateInterest } from '@/utils/calculator'
import {
	validateInitialAmount,
	validateMonthlyContribution,
	validateMonths,
	isFormValid,
	FormErrors,
	ERROR_MESSAGES,
	VALIDATION_LIMITS,
} from '@/utils/validation'

export default function SimulatorPage() {
	const [initialAmount, setInitialAmount] = useState('')
	const [monthlyContribution, setMonthlyContribution] = useState('')
	const [months, setMonths] = useState('')
	const [dirty, setDirty] = useState({
		initialAmount: false,
		monthlyContribution: false,
		months: false,
	})
	const [result, setResult] = useState<{
		totalInvested: number
		estimatedInterest: number
		finalAmount: number
	} | null>(null)
	const [errors, setErrors] = useState<FormErrors>({})

	const isFormValidValue = useMemo(() => {
		return (
			isFormValid(initialAmount, monthlyContribution, months) &&
			Object.keys(errors).length === 0
		)
	}, [initialAmount, monthlyContribution, months, errors])

	const handleFieldChange = (
		field: 'initialAmount' | 'monthlyContribution' | 'months',
		value: string,
	) => {
		let formattedValue = value

		if (field === 'initialAmount') {
			formattedValue = formatCurrency(value)
			setInitialAmount(formattedValue)
		} else if (field === 'monthlyContribution') {
			formattedValue = formatCurrency(value)
			setMonthlyContribution(formattedValue)
		} else if (field === 'months') {
			setMonths(value)
		}

		if (value.trim() !== '') {
			setDirty((prev) => ({ ...prev, [field]: true }))
		}

		if (dirty[field] || value.trim() !== '') {
			if (field === 'initialAmount') {
				validateInitialAmount(formattedValue, formattedValue, setErrors)
			} else if (field === 'monthlyContribution') {
				validateMonthlyContribution(formattedValue, formattedValue, setErrors)
			} else if (field === 'months') {
				validateMonths(value, value, setErrors)
			}
		}
	}

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setErrors({})
		setResult(null)

		const initialAmountNum = parseCurrency(initialAmount)
		const monthlyContributionNum = parseCurrency(monthlyContribution)
		const monthsNum = Number(months)
		const newErrors: FormErrors = {}

		if (initialAmount === '') {
			newErrors.initialAmount = ERROR_MESSAGES.initialAmount.required
		} else if (initialAmountNum < VALIDATION_LIMITS.INITIAL_AMOUNT.MIN) {
			newErrors.initialAmount = ERROR_MESSAGES.initialAmount.belowMin
		} else if (initialAmountNum > VALIDATION_LIMITS.INITIAL_AMOUNT.MAX) {
			newErrors.initialAmount = ERROR_MESSAGES.initialAmount.aboveMax
		}

		if (monthlyContribution === '') {
			newErrors.monthlyContribution = ERROR_MESSAGES.monthlyContribution.required
		} else if (monthlyContributionNum < VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MIN) {
			newErrors.monthlyContribution = ERROR_MESSAGES.monthlyContribution.belowMin
		} else if (monthlyContributionNum > VALIDATION_LIMITS.MONTHLY_CONTRIBUTION.MAX) {
			newErrors.monthlyContribution = ERROR_MESSAGES.monthlyContribution.aboveMax
		}

		if (months === '') {
			newErrors.months = ERROR_MESSAGES.months.required
		} else if (monthsNum < VALIDATION_LIMITS.MONTHS.MIN) {
			newErrors.months = ERROR_MESSAGES.months.belowMin
		} else if (monthsNum > VALIDATION_LIMITS.MONTHS.MAX) {
			newErrors.months = ERROR_MESSAGES.months.aboveMax
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			setDirty({
				initialAmount: true,
				monthlyContribution: true,
				months: true,
			})
			return
		}

		const calculationResult = calculateInterest(
			initialAmountNum,
			monthlyContributionNum,
			monthsNum,
		)

		setResult(calculationResult)
	}

	const handleReset = () => {
		setInitialAmount('')
		setMonthlyContribution('')
		setMonths('')
		setResult(null)
		setErrors({})
		setDirty({
			initialAmount: false,
			monthlyContribution: false,
			months: false,
		})
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
			<Navbar />
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-main-bg text-3xl font-bold sm:text-4xl">
						Simulador de Ahorro
					</h1>
					<p className="mt-2 text-sm text-gray-600 sm:text-base">
						Calcula el crecimiento de tus ahorros con nuestra herramienta de simulación
					</p>
					<p className="mt-1 text-xs text-gray-500">
						<span className="text-red-500">*</span> Campos obligatorios
					</p>
				</div>

				<div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
					<form onSubmit={handleSubmit} className="text-main-bg space-y-6">
						<div>
							<label
								htmlFor="initialAmount"
								className="mb-2 block text-sm font-medium text-slate-700"
							>
								Monto Inicial (COP)
								<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="initialAmount"
								value={initialAmount}
								onChange={(e) => handleFieldChange('initialAmount', e.target.value)}
								placeholder="$0"
								className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
									errors.initialAmount
										? 'border-red-300 focus:border-red-500'
										: 'border-gray-300 focus:border-cyan-400'
								}`}
							/>
							{dirty.initialAmount && errors.initialAmount && (
								<p className="mt-2 text-sm text-red-600">{errors.initialAmount}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="monthlyContribution"
								className="mb-2 block text-sm font-medium text-slate-700"
							>
								Aporte Mensual (COP)
								<span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="monthlyContribution"
								value={monthlyContribution}
								onChange={(e) =>
									handleFieldChange('monthlyContribution', e.target.value)
								}
								placeholder="$0"
								className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
									errors.monthlyContribution
										? 'border-red-300 focus:border-red-500'
										: 'border-gray-300 focus:border-cyan-400'
								}`}
							/>
							{dirty.monthlyContribution && errors.monthlyContribution && (
								<p className="mt-2 text-sm text-red-600">
									{errors.monthlyContribution}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="months"
								className="mb-2 block text-sm font-medium text-slate-700"
							>
								Número de Meses
								<span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								id="months"
								value={months}
								onChange={(e) => handleFieldChange('months', e.target.value)}
								placeholder="0"
								min="5"
								className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
									errors.months
										? 'border-red-300 focus:border-red-500'
										: 'border-gray-300 focus:border-cyan-400'
								}`}
							/>
							{dirty.months && errors.months && (
								<p className="mt-2 text-sm text-red-600">{errors.months}</p>
							)}
						</div>

						<div className="flex gap-4">
							<button
								type="submit"
								disabled={!isFormValidValue}
								className="flex-1 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:opacity-50"
							>
								Calcular
							</button>
							<button
								type="button"
								onClick={handleReset}
								className="rounded-lg border-2 border-cyan-500 px-6 py-3 font-semibold text-cyan-500 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
							>
								Limpiar
							</button>
						</div>
					</form>
				</div>

				{result && (
					<div className="animate-fade-in rounded-lg bg-white p-6 shadow-lg">
						<h2 className="mb-6 text-2xl font-bold text-slate-700">
							Resultados de la Simulación
						</h2>

						<div className="grid gap-6 sm:grid-cols-3">
							<div className="rounded-lg border border-cyan-500/25 bg-cyan-50/10 p-4">
								<p className="text-sm font-medium text-cyan-500">Total Invertido</p>
								<p className="mt-2 text-2xl font-bold text-slate-700">
									{new Intl.NumberFormat('es-CO', {
										style: 'currency',
										currency: 'COP',
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(result.totalInvested)}
								</p>
							</div>

							<div className="rounded-lg border border-cyan-500/25 bg-cyan-50/10 p-4">
								<p className="text-sm font-medium text-cyan-500">
									Interés Estimado
								</p>
								<p className="mt-2 text-2xl font-bold text-emerald-500">
									+{' '}
									{new Intl.NumberFormat('es-CO', {
										style: 'currency',
										currency: 'COP',
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(result.estimatedInterest)}
								</p>
							</div>

							<div className="rounded-lg border border-cyan-500 bg-cyan-50/20 p-4">
								<p className="text-sm font-medium text-cyan-500">Monto Final</p>
								<p className="mt-2 text-3xl font-bold text-slate-700">
									{new Intl.NumberFormat('es-CO', {
										style: 'currency',
										currency: 'COP',
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(result.finalAmount)}
								</p>
							</div>
						</div>

						<div className="mt-6 rounded-lg border border-cyan-500/25 bg-cyan-50/10 p-4">
							<div className="flex items-start">
								<ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
								<div className="ml-3">
									<p className="text-sm text-slate-700">
										<strong className="font-semibold">Nota:</strong> El cálculo
										se basa en una tasa de interés mensual estimada del 0.5% (6%
										anual efectivo). Los rendimientos reales pueden variar según
										las condiciones del mercado y el tipo de cuenta
										seleccionada.
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{!result && (
					<div className="bg-secondary/20 mt-6 rounded-lg border border-cyan-500/25 p-4">
						<div className="flex items-start">
							<ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
							<div className="ml-3">
								<p className="text-sm text-slate-700">
									<strong className="font-semibold">Requisitos:</strong> El monto
									inicial debe estar entre $10,000 y $30,000,000 COP. Los aportes
									mensuales deben estar entre $10,000 y $5,000,000 COP. El plazo
									debe estar entre 5 y 120 meses (máximo 10 años). El simulador
									utiliza una tasa de interés mensual del 0.5% para fines de
									demostración.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
