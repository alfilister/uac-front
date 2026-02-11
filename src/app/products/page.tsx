'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
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
			<Navbar />
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

				<StatsCards />

				<Filters onSearchChange={setSearchTerm} onTypeChange={setAccountType} />

				<TableAccounts searchTerm={searchTerm} accountTypeFilter={accountType} />

				<div
					className="mt-6 rounded-lg p-4 border"
					style={{
						backgroundColor: 'rgba(67, 199, 210, 0.08)',
						borderColor: 'rgba(67, 199, 210, 0.25)',
					}}
				>
					<div className="flex items-start">
						<ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
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
