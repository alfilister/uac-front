export enum AccountType {
	REGULAR = 'Cuenta de Ahorro Regular',
	PREMIUM = 'Cuenta de Ahorro Premium',
	YOUTH = 'Cuenta Joven',
	BUSINESS = 'Cuenta de Ahorro Empresarial',
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
	[AccountType.REGULAR]: 'Regular',
	[AccountType.PREMIUM]: 'Premium',
	[AccountType.YOUTH]: 'Joven',
	[AccountType.BUSINESS]: 'Empresarial',
}

export const ACCOUNT_TYPE_OPTIONS = [
	{ value: 'all', label: 'Todos' },
	{ value: AccountType.REGULAR, label: AccountType.REGULAR },
	{ value: AccountType.PREMIUM, label: AccountType.PREMIUM },
	{ value: AccountType.YOUTH, label: AccountType.YOUTH },
	{ value: AccountType.BUSINESS, label: AccountType.BUSINESS },
] as const
