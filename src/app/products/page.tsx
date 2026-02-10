'use client'

import { useState } from 'react'
import TableAccounts from '@/components/products/TableAccounts'
import Filters from '@/components/products/Filters'
import StatsCards from '@/components/products/StatsCards'

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState('')
	const [accountType, setAccountType] = useState('all')

	return (
		<div
			className="min-h-screen"
			style={{
				background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
			}}
		>
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<h1
						className="text-3xl font-bold sm:text-4xl"
						style={{ color: 'var(--mainBg)' }}
					>
						Cuentas de Ahorro
					</h1>
					<p className="mt-2 text-sm text-gray-600 sm:text-base">
						Administra y visualiza todas las cuentas de ahorro con filtrado y
						ordenamiento en tiempo real
					</p>
				</div>

				{/* Stats Cards */}
				<StatsCards />

				{/* Filters */}
				<Filters onSearchChange={setSearchTerm} onTypeChange={setAccountType} />

				{/* Table */}
				<TableAccounts searchTerm={searchTerm} accountTypeFilter={accountType} />

				{/* Footer Info */}
				<div
					className="mt-6 rounded-lg p-4 border"
					style={{
						backgroundColor: 'rgba(67, 199, 210, 0.08)',
						borderColor: 'rgba(67, 199, 210, 0.25)',
					}}
				>
					<div className="flex items-start">
						<svg
							className="mt-0.5 h-5 w-5 shrink-0"
							style={{ color: 'var(--secondary)' }}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div className="ml-3">
							<p className="text-sm" style={{ color: 'var(--mainBg)' }}>
								<strong className="font-semibold">Consejos:</strong> Haz clic en los
								encabezados de columna para ordenar. Usa la barra de búsqueda para
								filtrar por nombre de cuenta. Selecciona un tipo de cuenta para filtrar
								por tipo. Todos los filtros funcionan juntos en tiempo real. Consulta
								los requisitos para ver la edad mínima, depósito y otras condiciones
								para cada cuenta.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
