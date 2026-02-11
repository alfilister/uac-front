import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface CardProps {
	href: string
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
	iconBgClass: string
	iconTextClass: string
	borderClass: string
}

export default function Card({
	href,
	title,
	description,
	icon: Icon,
	iconBgClass,
	iconTextClass,
	borderClass,
}: CardProps) {
	return (
		<Link
			href={href}
			className={`group relative overflow-hidden rounded-xl border-2 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderClass}`}
		>
			<div
				className={`mb-4 inline-flex rounded-lg p-3 transition-transform duration-300 group-hover:scale-110 ${iconBgClass}`}
			>
				<Icon className={`h-7 w-7 ${iconTextClass}`} />
			</div>

			<h3 className="text-main-bg group-hover:text-secondary mb-2 text-xl font-bold transition-colors">
				{title}
			</h3>
			<p className="text-sm leading-relaxed text-gray-600">{description}</p>

			<div className="text-secondary mt-4 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2">
				<span>Explorar</span>
				<ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
			</div>

			<div className="absolute inset-0 -z-10 bg-linear-to-br from-transparent via-transparent to-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</Link>
	)
}
