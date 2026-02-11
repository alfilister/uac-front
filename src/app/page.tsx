import NavigationCards from '@/components/home/NavigationCards'

export default function Home() {
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-12 text-center sm:mb-16">
					<h1 className="text-main-bg text-4xl font-bold sm:text-5xl lg:text-6xl">
						!Bienvenidos!
					</h1>
					<p className="mt-4 text-lg text-gray-600 sm:text-xl">
						A la posibilidad de gestionar sus finanzas personales con herramientas
						profesionales
					</p>
				</div>

				<div className="mb-10 rounded-lg border p-6 sm:mb-12">
					<div className="border-secondary/25 bg-secondary/10 rounded-lg border p-5">
						<p className="text-main-bg text-center text-sm sm:text-base">
							<strong className="font-semibold">Explora nuestras opciones:</strong>{' '}
							Selecciona una tarjeta para comenzar. Nuestra plataforma te ofrece
							herramientas completas para la gestión de cuentas, simulación de
							inversiones y más.
						</p>
					</div>
				</div>

				<NavigationCards />
			</div>
		</div>
	)
}
