import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
	return (
		<nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex justify-center">
					<Link href="/" className="group">
						<div className="flex items-center gap-3 transition-transform duration-200 group-hover:scale-105">
							<Image
								src="/favicon.ico"
								alt="UAC Logo"
								width={40}
								height={40}
								className="h-10 w-10"
								priority
							/>
							<span className="text-main-bg group-hover:text-secondary text-xl font-bold transition-colors">
								Volver
							</span>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	)
}
