'use client'

import { useState, useEffect } from 'react'

interface FiltersProps {
	onSearchChange: (term: string) => void
	onTypeChange: (type: string) => void
}

const ACCOUNT_TYPES = [
	{ value: 'all', label: 'Todos los Tipos de Cuenta' },
	{ value: 'Cuenta de Ahorro Regular', label: 'Cuenta de Ahorro Regular' },
	{ value: 'Cuenta de Ahorro Premium', label: 'Cuenta de Ahorro Premium' },
	{ value: 'Cuenta Joven', label: 'Cuenta Joven' },
	{
		value: 'Cuenta de Ahorro Empresarial',
		label: 'Cuenta de Ahorro Empresarial',
	},
]

export default function Filters({ onSearchChange, onTypeChange }: FiltersProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [accountType, setAccountType] = useState('all')

	// Debounce search term
	useEffect(() => {
		const timer = setTimeout(() => {
			onSearchChange(searchTerm)
		}, 300)

		return () => clearTimeout(timer)
	}, [searchTerm, onSearchChange])

	const handleTypeChange = (value: string) => {
		setAccountType(value)
		onTypeChange(value)
	}

	return (
		<div
			className="mb-6 rounded-lg border p-6 shadow-md"
			style={{ backgroundColor: 'white', borderColor: 'rgba(50, 64, 88, 0.2)' }}
		>
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Search Input */}
				<div className="flex-1">
					<label
						htmlFor="search"
						className="mb-2 block text-sm font-semibold"
						style={{ color: 'var(--mainBg)' }}
					>
						Buscar Cuentas
					</label>
					<div className="relative">
						<input
							type="text"
							id="search"
							placeholder="Buscar por nombre de cuenta..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full rounded-lg border bg-white px-4 py-3 pr-4 pl-11 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[rgba(67,199,210,0.2)] focus:outline-none"
							style={{
								borderColor: 'rgba(50, 64, 88, 0.3)',
							}}
							onFocus={(e) =>
								(e.currentTarget.style.borderColor = 'var(--secondary)')
							}
							onBlur={(e) =>
								(e.currentTarget.style.borderColor = 'rgba(50, 64, 88, 0.3)')
							}
						/>
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<svg
								className="h-5 w-5"
								style={{ color: 'var(--principal)' }}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Account Type Filter */}
				<div className="w-full md:w-80">
					<label
						htmlFor="accountType"
						className="mb-2 block text-sm font-semibold"
						style={{ color: 'var(--mainBg)' }}
					>
						Tipo de Cuenta
					</label>
					<div className="relative">
						<select
							id="accountType"
							value={accountType}
							onChange={(e) => handleTypeChange(e.target.value)}
							className="w-full appearance-none rounded-lg border bg-white px-4 py-3 pr-10 text-gray-900 shadow-sm transition-all duration-200 focus:ring-2 focus:outline-none"
							style={{
								borderColor: 'rgba(50, 64, 88, 0.3)',
							}}
							onFocus={(e) =>
								(e.currentTarget.style.borderColor = 'var(--secondary)')
							}
							onBlur={(e) =>
								(e.currentTarget.style.borderColor = 'rgba(50, 64, 88, 0.3)')
							}
						>
							{ACCOUNT_TYPES.map((type) => (
								<option key={type.value} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<svg
								className="h-5 w-5"
								style={{ color: 'var(--principal)' }}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Active Filters Display */}
			{(searchTerm || accountType !== 'all') && (
				<div
					className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4"
					style={{ borderColor: 'rgba(50, 64, 88, 0.2)' }}
				>
					<span className="text-sm font-medium" style={{ color: 'var(--mainBg)' }}>
						Filtros activos:
					</span>
					{searchTerm && (
						<span
							className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
							style={{
								backgroundColor: 'rgba(235, 134, 25, 0.12)',
								color: 'var(--principal)',
							}}
						>
							Búsqueda: &quot;{searchTerm}&quot;
						</span>
					)}
					{accountType !== 'all' && (
						<span
							className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
							style={{
								backgroundColor: 'rgba(67, 199, 210, 0.12)',
								color: 'var(--secondary)',
							}}
						>
							Tipo: {accountType}
						</span>
					)}
					<button
						onClick={() => {
							setSearchTerm('')
							setAccountType('all')
							onSearchChange('')
							onTypeChange('all')
						}}
						className="ml-2 text-sm font-medium transition-colors duration-200"
						style={{ color: 'var(--principal)' }}
						onMouseEnter={(e) => (e.currentTarget.style.color = '#d97a15')}
						onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--principal)')}
					>
						Limpiar todos
					</button>
				</div>
			)}
		</div>
	)
}
