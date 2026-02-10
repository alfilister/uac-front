'use client'

import { useMemo, useState } from 'react'
import accountsData from '@/data/savings-accounts.json'

interface Account {
	id: string
	accountName: string
	accountType: string
	balance: number
	currency: string
	interestRate: number
	minAge: number
	maxAge?: number
	minDeposit: number
	requiresBusinessRegistration?: boolean
	status: string
}

interface TableAccountsProps {
	searchTerm: string
	accountTypeFilter: string
}

export default function TableAccounts({ searchTerm, accountTypeFilter }: TableAccountsProps) {
	const [accounts] = useState<Account[]>(accountsData as Account[])
	const [sortColumn, setSortColumn] = useState<keyof Account>('accountName')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const filteredAccounts = useMemo(() => {
		return accounts.filter((account) => {
			const matchesSearch = account.accountName
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
			const matchesType =
				accountTypeFilter === 'all' || account.accountType === accountTypeFilter
			return matchesSearch && matchesType
		})
	}, [accounts, searchTerm, accountTypeFilter])

	const sortedAccounts = useMemo(() => {
		return [...filteredAccounts].sort((a, b) => {
			const aValue = a[sortColumn]
			const bValue = b[sortColumn]

			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
			}

			const aStr = String(aValue).toLowerCase()
			const bStr = String(bValue).toLowerCase()

			if (sortDirection === 'asc') {
				return aStr.localeCompare(bStr)
			}
			return bStr.localeCompare(aStr)
		})
	}, [filteredAccounts, sortColumn, sortDirection])

	const handleSort = (column: keyof Account) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const getRequirements = (account: Account) => {
		const requirements = []
		if (account.minAge) requirements.push(`Edad: ${account.minAge}+`)
		if (account.maxAge) requirements.push(`Máx: ${account.maxAge}`)
		if (account.minDeposit) requirements.push(`Mín: ${formatCurrency(account.minDeposit)}`)
		if (account.requiresBusinessRegistration) requirements.push('Requiere Negocio')
		return requirements.join(' • ')
	}

	const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | null }) => {
		if (direction === null) return <span className="ml-2 text-gray-400">⇅</span>
		return direction === 'asc' ? (
			<span className="ml-2" style={{ color: 'var(--principal)' }}>
				↑
			</span>
		) : (
			<span className="ml-2" style={{ color: 'var(--principal)' }}>
				↓
			</span>
		)
	}

	return (
		<div
			className="overflow-x-auto rounded-lg shadow-lg"
			style={{ border: '1px solid var(--mainBg)' }}
		>
			<table className="min-w-full divide-y bg-white">
				<thead style={{ background: 'linear-gradient(to right, var(--mainBg), #3d4e6a)' }}>
					<tr>
						{[
							{ key: 'accountName', label: 'Nombre de Cuenta' },
							{ key: 'accountType', label: 'Tipo de Cuenta' },
							{ key: 'balance', label: 'Balance' },
							{ key: 'interestRate', label: 'Tasa de Interés' },
							{ key: 'minDeposit', label: 'Requisitos' },
						].map((column) => (
							<th
								key={column.key}
								scope="col"
								className="cursor-pointer px-6 py-4 text-left text-xs font-bold tracking-wider text-white uppercase transition-colors duration-200 hover:bg-black/10"
								onClick={() => handleSort(column.key as keyof Account)}
							>
								<div className="flex items-center">
									{column.label}
									<SortIcon
										direction={sortColumn === column.key ? sortDirection : null}
									/>
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y">
					{sortedAccounts.length === 0 ? (
						<tr>
							<td
								colSpan={5}
								className="px-6 py-12 text-center text-sm"
								style={{ color: 'var(--mainBg)' }}
							>
								<svg
									className="mx-auto h-12 w-12"
									style={{ color: 'var(--principal)', opacity: 0.5 }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="mt-2 text-lg font-semibold">
									No se encontraron cuentas
								</p>
								<p className="text-sm">
									Intenta ajustar tus criterios de búsqueda o filtro
								</p>
							</td>
						</tr>
					) : (
						sortedAccounts.map((account, index) => (
							<tr
								key={account.id}
								className="transition-colors duration-150 hover:bg-[rgba(67,199,210,0.05)]"
								style={{
									backgroundColor:
										index % 2 !== 0 ? 'rgba(50, 64, 88, 0.03)' : undefined,
								}}
							>
								<td
									className="px-6 py-4 text-sm font-semibold"
									style={{ color: 'var(--mainBg)' }}
								>
									{account.accountName}
								</td>
								<td className="px-6 py-4 text-sm">
									<span
										className="inline-flex rounded-full px-3 py-1 text-center text-xs font-semibold"
										style={{
											backgroundColor: 'rgba(235, 134, 25, 0.12)',
											color: 'var(--principal)',
										}}
									>
										{account.accountType}
									</span>
								</td>
								<td
									className="px-6 py-4 text-sm font-semibold whitespace-nowrap"
									style={{ color: 'var(--mainBg)' }}
								>
									{formatCurrency(account.balance)}
								</td>
								<td
									className="px-6 py-4 text-sm whitespace-nowrap"
									style={{ color: 'var(--mainBg)' }}
								>
									{account.interestRate}%
								</td>
								<td
									className="px-6 py-4 text-xs"
									style={{ color: 'var(--mainBg)' }}
								>
									{getRequirements(account)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}
