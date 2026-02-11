'use client'

import { BanknotesIcon, DocumentTextIcon, CalculatorIcon } from '@heroicons/react/24/outline'
import Card from './Card'

const navigationOptions = [
	{
		href: '/onboarding',
		title: 'Onboarding',
		description:
			'Comienza tu viaje con nosotros. Completa el proceso de registro y configura tu perfil de usuario.',
		icon: DocumentTextIcon,
		iconBgClass: 'bg-principal/10',
		iconTextClass: 'text-principal',
		borderClass: 'border-principal/25',
	},
	{
		href: '/products',
		title: 'Cuentas de Ahorro',
		description:
			'Administra y visualiza todas las cuentas de ahorro con filtrado y ordenamiento en tiempo real.',
		icon: BanknotesIcon,
		iconBgClass: 'bg-secondary/10',
		iconTextClass: 'text-secondary',
		borderClass: 'border-secondary/25',
	},
	{
		href: '/simulator',
		title: 'Simulador',
		description:
			'Calcula y simula tus inversiones. Proyecta tus rendimientos con herramientas avanzadas.',
		icon: CalculatorIcon,
		iconBgClass: 'bg-principal/10',
		iconTextClass: 'text-principal',
		borderClass: 'border-principal/25',
	},
]

export default function NavigationCards() {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{navigationOptions.map((option) => (
				<Card
					key={option.href}
					href={option.href}
					title={option.title}
					description={option.description}
					icon={option.icon}
					iconBgClass={option.iconBgClass}
					iconTextClass={option.iconTextClass}
					borderClass={option.borderClass}
				/>
			))}
		</div>
	)
}
