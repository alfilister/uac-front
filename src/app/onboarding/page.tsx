'use client'

import { useState } from 'react'
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function OnboardingPage() {
	const [formData, setFormData] = useState({
		name: '',
		document: '',
		email: '',
		recaptchaToken: '',
	})
	const [errors, setErrors] = useState<{
		name?: string
		document?: string
		email?: string
		recaptcha?: string
	}>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [successData, setSuccessData] = useState<{
		requestCode: string
		name: string
	} | null>(null)

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const validateForm = () => {
		const newErrors: typeof errors = {}

		if (!formData.name.trim()) {
			newErrors.name = 'El nombre es obligatorio'
		} else if (formData.name.trim().length < 3) {
			newErrors.name = 'El nombre debe tener al menos 3 caracteres'
		}

		if (!formData.document.trim()) {
			newErrors.document = 'El documento es obligatorio'
		} else if (!/^\d+$/.test(formData.document.trim())) {
			newErrors.document = 'El documento debe contener solo números'
		} else if (formData.document.trim().length < 5) {
			newErrors.document = 'El documento debe tener al menos 5 dígitos'
		}

		if (!formData.email.trim()) {
			newErrors.email = 'El correo es obligatorio'
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Ingrese un correo válido'
		}

		if (formData.recaptchaToken !== 'OK') {
			newErrors.recaptcha = 'Por favor completa el recaptcha correctamente'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const generateUUID = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			(c) => {
				const r = (Math.random() * 16) | 0
				const v = c === 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
			}
		)
	}

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simular delay de red
		setTimeout(() => {
			if (validateForm()) {
				const requestCode = generateUUID()
				setSuccessData({
					requestCode,
					name: formData.name,
				})
			}
			setIsSubmitting(false)
		}, 1000)
	}

	const handleReset = () => {
		setFormData({
			name: '',
			document: '',
			email: '',
			recaptchaToken: '',
		})
		setErrors({})
		setSuccessData(null)
	}

	const handleRecaptchaVerify = () => {
		// Simular verificación de recaptcha
		// En producción, esto sería integrado con Google reCAPTCHA
		const isVerified = Math.random() > 0.3 // 70% de éxito para demo
		setFormData((prev) => ({
			...prev,
			recaptchaToken: isVerified ? 'OK' : '',
		}))

		if (isVerified) {
			setErrors((prev) => ({ ...prev, recaptcha: undefined }))
		} else {
			setErrors((prev) => ({
				...prev,
				recaptcha: 'Verificación fallida. Intenta nuevamente.',
			}))
		}
	}

	return (
		<div
			className="min-h-screen"
			style={{
				background:
					'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
			}}
		>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1
						className="text-3xl font-bold sm:text-4xl"
						style={{ color: 'var(--mainBg)' }}
					>
						Solicitud de Apertura de Cuenta
					</h1>
					<p className="mt-2 text-sm text-gray-600 sm:text-base">
						Completa el formulario para registrar tu intención de apertura de
						cuenta de ahorro
					</p>
				</div>

				{!successData ? (
					<>
						<div
							className="mb-8 rounded-lg p-6 border"
							style={{
								backgroundColor: 'white',
								borderColor: 'rgba(67, 199, 210, 0.2)',
								boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
							}}
						>
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Nombre */}
								<div>
									<label
										htmlFor="name"
										className="mb-2 block text-sm font-medium"
										style={{ color: 'var(--mainBg)' }}
									>
										Nombre Completo
									</label>
									<input
										type="text"
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										placeholder="Juan Pérez"
										className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
											errors.name
												? 'border-red-300 focus:border-red-500'
												: 'border-gray-300 focus:border-cyan-400'
										}`}
									/>
									{errors.name && (
										<p className="mt-2 text-sm text-red-600">{errors.name}</p>
									)}
								</div>

								{/* Documento */}
								<div>
									<label
										htmlFor="document"
										className="mb-2 block text-sm font-medium"
										style={{ color: 'var(--mainBg)' }}
									>
										Número de Documento
									</label>
									<input
										type="text"
										id="document"
										value={formData.document}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, '')
											setFormData({ ...formData, document: value })
										}}
										placeholder="123456789"
										className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
											errors.document
												? 'border-red-300 focus:border-red-500'
												: 'border-gray-300 focus:border-cyan-400'
										}`}
									/>
									{errors.document && (
										<p className="mt-2 text-sm text-red-600">
											{errors.document}
										</p>
									)}
								</div>

								{/* Correo Electrónico */}
								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-sm font-medium"
										style={{ color: 'var(--mainBg)' }}
									>
										Correo Electrónico
									</label>
									<input
										type="email"
										id="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										placeholder="juan@ejemplo.com"
										className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
											errors.email
												? 'border-red-300 focus:border-red-500'
												: 'border-gray-300 focus:border-cyan-400'
										}`}
									/>
									{errors.email && (
										<p className="mt-2 text-sm text-red-600">{errors.email}</p>
									)}
								</div>

								{/* Recaptcha Simulado */}
								<div>
									<label className="mb-2 block text-sm font-medium">
										Verificación de Seguridad
									</label>
									<div
										className={`rounded-lg border-2 p-4 transition-all ${
											formData.recaptchaToken === 'OK'
												? 'border-emerald-400 bg-emerald-50/30'
												: errors.recaptcha
													? 'border-red-300 bg-red-50/30'
													: 'border-gray-300 bg-white'
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div
													className="flex h-10 w-10 items-center justify-center rounded-full"
													style={{
														backgroundColor:
															formData.recaptchaToken === 'OK'
																? 'rgba(16, 185, 129, 0.1)'
																: 'rgba(67, 199, 210, 0.1)',
													}}
												>
													{formData.recaptchaToken === 'OK' ? (
														<CheckCircleIcon className="h-6 w-6 text-emerald-500" />
													) : (
														<ExclamationCircleIcon className="h-6 w-6 text-cyan-500" />
													)}
												</div>
												<div>
													<p className="text-sm font-medium text-slate-700">
														{formData.recaptchaToken === 'OK'
															? 'Verificación completada'
															: 'reCAPTCHA (Simulado)'}
													</p>
													<p className="text-xs text-gray-500">
														{formData.recaptchaToken === 'OK'
															? '¡No eres un robot!'
															: 'Haz clic para verificar'}
													</p>
												</div>
											</div>
											{formData.recaptchaToken !== 'OK' && (
												<button
													type="button"
													onClick={handleRecaptchaVerify}
													disabled={isSubmitting}
													className="rounded-lg border-2 border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-500 transition-all hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													Verificar
												</button>
											)}
										</div>
										<input
											type="hidden"
											name="recaptchaToken"
											value={formData.recaptchaToken}
										/>
									</div>
									{errors.recaptcha && (
										<p className="mt-2 text-sm text-red-600">
											{errors.recaptcha}
										</p>
									)}
								</div>

								{/* Botones de Acción */}
								<div className="flex gap-4">
									<button
										type="submit"
										disabled={isSubmitting}
										className="flex-1 rounded-lg px-6 py-3 font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
										style={{
											backgroundColor: 'rgba(6, 182, 212, 1)',
										}}
									>
										{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
									</button>
									<button
										type="button"
										onClick={handleReset}
										disabled={isSubmitting}
										className="rounded-lg border-2 px-6 py-3 font-semibold transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
										style={{
											borderColor: 'rgba(6, 182, 212, 1)',
											color: 'rgba(6, 182, 212, 1)',
										}}
									>
										Limpiar
									</button>
								</div>
							</form>
						</div>

						{/* Mensaje Informativo */}
						<div
							className="rounded-lg p-4 border"
							style={{
								backgroundColor: 'rgba(67, 199, 210, 0.08)',
								borderColor: 'rgba(67, 199, 210, 0.25)',
							}}
						>
							<div className="flex items-start">
								<ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
								<div className="ml-3">
									<p className="text-sm" style={{ color: 'var(--mainBg)' }}>
										<strong className="font-semibold">Información:</strong>{' '}
										Tus datos serán procesados y recibirás un código de seguimiento.
										Un asesor se pondrá en contacto contigo en las próximas 24
										horas para continuar con el proceso de apertura. El reCAPTCHA es
										simulado para fines de demostración.
									</p>
								</div>
							</div>
						</div>
					</>
				) : (
					/* Mensaje de Éxito */
					<div
						className="animate-fade-in rounded-lg p-8 border"
						style={{
							backgroundColor: 'white',
							borderColor: 'rgba(16, 185, 129, 0.3)',
							boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
						}}
					>
						<div className="flex flex-col items-center text-center">
							<div
								className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
								style={{
									backgroundColor: 'rgba(16, 185, 129, 0.1)',
								}}
							>
								<CheckCircleIcon className="h-10 w-10 text-emerald-500" />
							</div>

							<h2 className="mb-2 text-2xl font-bold text-slate-700">
								¡Solicitud Enviada Exitosamente!
							</h2>

							<p className="mb-6 text-gray-600">
								Gracias <span className="font-semibold">{successData.name}</span>,
								hemos recibido tu solicitud de apertura de cuenta.
							</p>

							<div
								className="mb-6 w-full rounded-lg border border-cyan-500/25 bg-cyan-50/10 p-6"
							>
								<p className="text-sm font-medium text-cyan-500">
									Código de Seguimiento
								</p>
								<p className="mt-2 text-2xl font-bold text-slate-700">
									{successData.requestCode}
								</p>
							</div>

							<p className="mb-6 text-sm text-gray-600">
								Guarda este código para hacer seguimiento a tu solicitud. Te
								contactaremos al correo proporcionado en las próximas 24 horas.
							</p>

							<button
								onClick={handleReset}
								className="rounded-lg px-6 py-3 font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
								style={{
									backgroundColor: 'rgba(6, 182, 212, 1)',
								}}
							>
								Nueva Solicitud
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
