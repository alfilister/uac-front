'use client'

import { useMemo, useState } from 'react'
import { AccountType } from '@/types/account'
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

	const getAccountTypeStyles = (accountType: AccountType | string) => {
		switch (accountType) {
			case AccountType.REGULAR:
				return 'bg-principal/10 text-principal'
			case AccountType.YOUTH:
				return 'bg-cyan-500/10 text-cyan-600'
			case AccountType.BUSINESS:
				return 'bg-emerald-500/10 text-emerald-600'
			case AccountType.PREMIUM:
				return 'bg-blue-500/10 text-blue-600'
			default:
				return 'bg-gray-500/10 text-gray-600'
		}
	}

	const SortIcon = ({ direction }: { direction: 'asc' | 'desc' | null }) => {
		if (direction === null) return <span className="ml-2 text-gray-400">⇅</span>
		return direction === 'asc' ? (
			<span className="text-principal ml-2">↑</span>
		) : (
			<span className="text-principal ml-2">↓</span>
		)
	}

	return (
		<div className="border-main-bg overflow-x-auto rounded-lg border shadow-lg">
			<table className="min-w-full divide-y bg-white">
				<thead className="from-main-bg bg-linear-to-r to-[#3d4e6a]">
					<tr>
						{[
							{ key: 'accountName', label: 'Nombre de Cuenta', sortable: true },
							{ key: 'accountType', label: 'Tipo de Cuenta', sortable: false },
							{ key: 'balance', label: 'Balance', sortable: true },
							{ key: 'interestRate', label: 'Tasa de Interés', sortable: true },
							{ key: 'minDeposit', label: 'Requisitos', sortable: false },
						].map((column) => (
							<th
								key={column.key}
								scope="col"
								className={`${
									column.sortable
										? 'cursor-pointer hover:bg-black/10'
										: 'cursor-default'
								} px-6 py-4 text-left text-xs font-bold tracking-wider text-white uppercase transition-colors duration-200`}
								onClick={
									column.sortable
										? () => handleSort(column.key as keyof Account)
										: undefined
								}
							>
								<div className="flex items-center">
									{column.label}
									{column.sortable && (
										<SortIcon
											direction={
												sortColumn === column.key ? sortDirection : null
											}
										/>
									)}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y">
					{sortedAccounts.length === 0 ? (
						<tr>
							<td colSpan={5} className="text-main-bg px-6 py-12 text-center text-sm">
								<svg
									className="text-principal/50 mx-auto h-12 w-12"
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
								className={`hover:bg-secondary/10 transition-colors duration-150 ${
									index % 2 !== 0 ? 'bg-main-bg/5' : ''
								}`}
							>
								<td className="text-main-bg px-6 py-4 text-sm font-semibold">
									{account.accountName}
								</td>
								<td className="px-6 py-4 text-sm">
									<span
										className={`inline-flex rounded-full px-3 py-1 text-center text-xs font-semibold ${getAccountTypeStyles(
											account.accountType,
										)}`}
									>
										{account.accountType}
									</span>
								</td>
								<td className="text-main-bg px-6 py-4 text-sm font-semibold whitespace-nowrap">
									{formatCurrency(account.balance)}
								</td>
								<td className="text-main-bg px-6 py-4 text-sm whitespace-nowrap">
									{account.interestRate}%
								</td>
								<td className="text-main-bg px-6 py-4 text-xs">
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
