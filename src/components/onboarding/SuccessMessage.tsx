import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { type MouseEvent } from 'react'

interface SuccessMessageProps {
	requestCode: string
	name: string
	onReset: () => void
}

export default function SuccessMessage({ requestCode, name, onReset }: SuccessMessageProps) {
	const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onReset()
	}

	return (
		<div className="animate-fade-in rounded-lg border-2 border-emerald-500/30 bg-white p-8 shadow-lg">
			<div className="flex flex-col items-center text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
					<CheckCircleIcon className="h-10 w-10 text-emerald-500" />
				</div>

				<h2 className="mb-2 text-2xl font-bold text-slate-700">
					¡Solicitud Enviada Exitosamente!
				</h2>

				<p className="mb-6 text-gray-600">
					Gracias <span className="font-semibold">{name}</span>, hemos recibido tu
					solicitud de apertura de cuenta.
				</p>

				<div className="mb-6 w-full rounded-lg border border-cyan-500/25 bg-cyan-50/10 p-6">
					<p className="text-sm font-medium text-secondary">Código de Seguimiento</p>
					<p className="mt-2 text-2xl font-bold text-slate-700">{requestCode}</p>
				</div>

				<p className="mb-6 text-sm text-gray-600">
					Guarda este código para hacer seguimiento a tu solicitud. Te contactaremos al
					correo proporcionado en las próximas 24 horas.
				</p>

				<button
					onClick={handleReset}
					className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:outline-none"
				>
					Nueva Solicitud
				</button>
			</div>
		</div>
	)
}
