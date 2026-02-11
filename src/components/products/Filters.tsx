'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { ACCOUNT_TYPE_OPTIONS } from '@/types/account'

interface FiltersProps {
	onSearchChange: (term: string) => void
	onTypeChange: (type: string) => void
}

export default function Filters({ onSearchChange, onTypeChange }: FiltersProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [accountType, setAccountType] = useState('all')

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearchChange(searchTerm)
		}, 500)

		return () => clearTimeout(timer)
	}, [searchTerm, onSearchChange])

	const handleTypeChange = (value: string) => {
		setAccountType(value)
		onTypeChange(value)
	}

	return (
		<div className="border-main-bg/20 mb-6 rounded-lg border bg-white p-6 shadow-md">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex-1">
					<label
						htmlFor="search"
						className="text-main-bg mb-2 block text-sm font-semibold"
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
							className="border-main-bg/30 focus:border-secondary focus:ring-secondary/20 w-full rounded-lg border bg-white px-4 py-3 pr-4 pl-11 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:ring-2 focus:outline-none"
						/>
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
							<MagnifyingGlassIcon className="text-principal h-5 w-5" />
						</div>
					</div>
				</div>

				<div className="w-full md:w-80">
					<label
						htmlFor="accountType"
						className="text-main-bg mb-2 block text-sm font-semibold"
					>
						Tipo de Cuenta
					</label>
					<div className="relative">
						<select
							id="accountType"
							value={accountType}
							onChange={(e) => handleTypeChange(e.target.value)}
							className="border-main-bg/30 focus:border-secondary w-full appearance-none rounded-lg border bg-white px-4 py-3 pr-10 text-gray-900 shadow-sm transition-all duration-200 focus:ring-2 focus:outline-none"
						>
							{ACCOUNT_TYPE_OPTIONS.map((type) => (
								<option key={type.value} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<ChevronDownIcon className="text-principal h-5 w-5" />
						</div>
					</div>
				</div>
			</div>

			{(searchTerm || accountType !== 'all') && (
				<div className="border-main-bg/20 mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
					<span className="text-main-bg text-sm font-medium">Filtros activos:</span>
					{searchTerm && (
						<span className="bg-principal/10 text-principal inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
							Búsqueda: &quot;{searchTerm}&quot;
						</span>
					)}
					{accountType !== 'all' && (
						<span className="bg-secondary/10 text-secondary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
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
						className="text-principal hover:text-principal/80 ml-2 text-sm font-medium transition-colors duration-200"
					>
						Limpiar todos
					</button>
				</div>
			)}
		</div>
	)
}
