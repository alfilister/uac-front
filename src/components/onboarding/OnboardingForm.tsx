'use client'

import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface FormData {
	name: string
	document: string
	email: string
	recaptchaToken: string
}

interface Errors {
	name?: string
	document?: string
	email?: string
	recaptcha?: string
}

interface DirtyState {
	name: boolean
	document: boolean
	email: boolean
}

interface OnboardingFormProps {
	formData: FormData
	errors: Errors
	dirty: DirtyState
	isSubmitting: boolean
	isFormValid: boolean
	onFieldChange: (field: string, value: string) => void
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	onReset: () => void
	onRecaptchaVerify: () => void
}

export default function OnboardingForm({
	formData,
	errors,
	dirty,
	isSubmitting,
	isFormValid,
	onFieldChange,
	onSubmit,
	onReset,
	onRecaptchaVerify,
}: OnboardingFormProps) {
	return (
		<>
			<div className="border-secondary/20 mb-8 rounded-lg border-2 bg-white p-6 shadow-md">
				<form onSubmit={onSubmit} className="text-main-bg space-y-6">
					<div>
						<label
							htmlFor="name"
							className="text-main-bg mb-2 block text-sm font-medium"
						>
							Nombre Completo
							<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							value={formData.name}
							onChange={(e) => onFieldChange('name', e.target.value)}
							placeholder="Juan Pérez"
							className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${errors.name
									? 'border-red-300 focus:border-red-500'
									: 'border-gray-300 focus:border-cyan-400'
								}`}
						/>
						{dirty.name && errors.name && (
							<p className="mt-2 text-sm text-red-600">{errors.name}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="document"
							className="text-main-bg mb-2 block text-sm font-medium"
						>
							Número de Documento
							<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="document"
							value={formData.document}
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, '')
								onFieldChange('document', value)
							}}
							placeholder="123456789"
							className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${errors.document
									? 'border-red-300 focus:border-red-500'
									: 'border-gray-300 focus:border-cyan-400'
								}`}
						/>
						{dirty.document && errors.document && (
							<p className="mt-2 text-sm text-red-600">{errors.document}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="email"
							className="text-main-bg mb-2 block text-sm font-medium"
						>
							Correo Electrónico
							<span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							value={formData.email}
							onChange={(e) => onFieldChange('email', e.target.value)}
							placeholder="juan@ejemplo.com"
							className={`w-full rounded-lg border px-4 py-3 text-lg transition-all duration-200 focus:ring-2 focus:outline-none ${errors.email
									? 'border-red-300 focus:border-red-500'
									: 'border-gray-300 focus:border-cyan-400'
								}`}
						/>
						{dirty.email && errors.email && (
							<p className="mt-2 text-sm text-red-600">{errors.email}</p>
						)}
					</div>

					<div>
						<label className="text-main-bg mb-2 block text-sm font-medium">
							Verificación de Seguridad
							<span className="text-red-500">*</span>
						</label>
						<div
							className={`rounded-lg border-2 p-4 transition-all ${formData.recaptchaToken === 'OK'
									? 'border-emerald-400 bg-emerald-50/30'
									: errors.recaptcha
										? 'border-red-300 bg-red-50/30'
										: 'border-gray-300 bg-white'
								}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full ${formData.recaptchaToken === 'OK'
												? 'bg-emerald-500/10'
												: 'bg-secondary/10'
											}`}
									>
										{formData.recaptchaToken === 'OK' ? (
											<CheckCircleIcon className="h-6 w-6 text-emerald-500" />
										) : (
											<ExclamationCircleIcon className="text-secondary h-6 w-6" />
										)}
									</div>
									<div>
										<p className="text-sm font-medium text-slate-700">
											{formData.recaptchaToken === 'OK'
												? 'Verificación completada'
												: 'reCAPTCHA (Simulado tasa de aceptación de 70%)'}
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
										onClick={onRecaptchaVerify}
										disabled={isSubmitting}
										className="border-secondary text-secondary hover:bg-secondary/10 focus:ring-secondary/50 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
							<p className="mt-2 text-sm text-red-600">{errors.recaptcha}</p>
						)}
					</div>

					<div className="flex gap-4">
						<button
							type="submit"
							disabled={isSubmitting || !isFormValid}
							className="bg-secondary flex-1 cursor-pointer rounded-lg px-6 py-3 font-semibold text-white transition-all hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
						</button>
						<button
							type="button"
							onClick={onReset}
							disabled={isSubmitting}
							className="border-secondary text-secondary cursor-pointer rounded-lg border-2 px-6 py-3 font-semibold transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							Limpiar
						</button>
					</div>
				</form>
			</div>

			<div className="border-secondary/25 bg-secondary/10 rounded-lg border p-4">
				<div className="flex items-start">
					<ExclamationCircleIcon className="text-secondary mt-0.5 h-5 w-5 shrink-0" />
					<div className="ml-3">
						<p className="text-main-bg text-sm">
							<strong className="font-semibold">Información:</strong> Tus datos serán
							procesados y recibirás un código de seguimiento. Un asesor se pondrá en
							contacto contigo en las próximas 24 horas para continuar con el proceso de
							apertura. El reCAPTCHA es simulado para fines de demostración.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
