import {
	UserGroupIcon,
	CurrencyDollarIcon,
	TagIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/outline'
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

interface StatCard {
	id: string
	title: string
	value: string
	icon: React.ComponentType<{ className?: string }>
	color: 'principal' | 'secondary' | 'mainBg'
}

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)
}

const accounts = accountsData as Account[]
const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

const statsCardsData: StatCard[] = [
	{
		id: 'total-accounts',
		title: 'Cuentas Totales',
		value: accounts.length.toString(),
		icon: UserGroupIcon,
		color: 'principal',
	},
	{
		id: 'total-balance',
		title: 'Balance Total',
		value: formatCurrency(totalBalance),
		icon: CurrencyDollarIcon,
		color: 'secondary',
	},
	{
		id: 'account-types',
		title: 'Tipos de Cuenta',
		value: new Set(accounts.map((acc) => acc.accountType)).size.toString(),
		icon: TagIcon,
		color: 'mainBg',
	},
	{
		id: 'active-accounts',
		title: 'Cuentas Activas',
		value: '100%',
		icon: CheckCircleIcon,
		color: 'secondary',
	},
]

const colorConfig = {
	principal: {
		border: 'var(--principal)',
		bg: 'var(--principal)',
	},
	secondary: {
		border: 'var(--secondary)',
		bg: 'var(--secondary)',
	},
	mainBg: {
		border: 'var(--mainBg)',
		bg: 'var(--mainBg)',
	},
}

export default function StatsCards() {
	return (
		<div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{statsCardsData.map((stat) => {
				const Icon = stat.icon
				const colors = colorConfig[stat.color]

				return (
					<div
						key={stat.id}
						className="rounded-lg border-l-4 bg-white p-6 shadow-md"
						style={{ borderColor: colors.border }}
					>
						<div className="flex items-center justify-between">
							<div>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--mainBg)' }}
								>
									{stat.title}
								</p>
								<p className="mt-1 text-2xl font-bold text-gray-900">
									{stat.value}
								</p>
							</div>
							<div
								className="rounded-full p-3"
								style={{ backgroundColor: colors.bg, opacity: 0.35 }}
							>
								<span style={{ color: colors.bg }}>
									<Icon className="h-6 w-6 text-white" aria-hidden="true" />
								</span>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
