'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import SuccessMessage from '@/components/onboarding/SuccessMessage'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

export default function OnboardingPage() {
	const [formData, setFormData] = useState({
		name: '',
		document: '',
		email: '',
		recaptchaToken: '',
	})
	const [dirty, setDirty] = useState({
		name: false,
		document: false,
		email: false,
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

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'name':
				if (!value.trim()) return 'El nombre es obligatorio'
				if (value.trim().length < 5) return 'El nombre debe tener al menos 5 caracteres'
				return undefined
			case 'document':
				if (!value.trim()) return 'El documento es obligatorio'
				if (!/^\d+$/.test(value.trim())) return 'El documento debe contener solo números'
				if (value.trim().length < 6) return 'El documento debe tener al menos 6 dígitos'
				return undefined
			case 'email':
				if (!value.trim()) return 'El correo es obligatorio'
				if (!validateEmail(value)) return 'Ingrese un correo válido'
				return undefined
			default:
				return undefined
		}
	}

	const isFormValid = useMemo(() => {
		const nameValid = formData.name.trim().length >= 5 && !errors.name
		const documentValid =
			formData.document.trim().length >= 6 &&
			/^\d+$/.test(formData.document.trim()) &&
			!errors.document
		const emailValid =
			formData.email.trim() !== '' && validateEmail(formData.email) && !errors.email
		const recaptchaValid = formData.recaptchaToken === 'OK'
		return nameValid && documentValid && emailValid && recaptchaValid
	}, [formData, errors])

	const handleFieldChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))

		if (value.trim() !== '') {
			setDirty((prev) => ({ ...prev, [field]: true }))
		}

		if (dirty[field as keyof typeof dirty] || value.trim() !== '') {
			const error = validateField(field, value)
			setErrors((prev) => ({ ...prev, [field]: error }))
		}
	}

	const generateUUID = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0
			const v = c === 'x' ? r : (r & 0x3) | 0x8
			return v.toString(16)
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const newErrors: typeof errors = {}
		Object.keys(formData).forEach((key) => {
			if (key !== 'recaptchaToken') {
				const error = validateField(key, formData[key as keyof typeof formData])
				if (error) {
					newErrors[key as keyof typeof newErrors] = error
				}
			}
		})

		if (formData.recaptchaToken !== 'OK') {
			newErrors.recaptcha = 'Por favor completa el recaptcha correctamente'
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			setDirty({
				name: true,
				document: true,
				email: true,
			})
			setIsSubmitting(false)
			return
		}

		setTimeout(() => {
			const requestCode = generateUUID()
			setSuccessData({
				requestCode,
				name: formData.name,
			})
			setIsSubmitting(false)
		}, 2000)
	}

	const handleReset = () => {
		setFormData({
			name: '',
			document: '',
			email: '',
			recaptchaToken: '',
		})
		setErrors({})
		setDirty({
			name: false,
			document: false,
			email: false,
		})
		setSuccessData(null)
	}

	const handleRecaptchaVerify = () => {
		const isVerified = Math.random() > 0.3
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
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
			<Navbar />
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-main-bg text-3xl font-bold sm:text-4xl">
						Solicitud de Apertura de Cuenta
					</h1>
					<p className="mt-2 text-sm text-gray-600 sm:text-base">
						Completa el formulario para registrar tu intención de apertura de cuenta de
						ahorro
					</p>
					<p className="mt-1 text-xs text-gray-500">
						<span className="text-red-500">*</span> Campos obligatorios
					</p>
				</div>

				{!successData ? (
					<OnboardingForm
						formData={formData}
						errors={errors}
						dirty={dirty}
						isSubmitting={isSubmitting}
						isFormValid={isFormValid}
						onFieldChange={handleFieldChange}
						onSubmit={handleSubmit}
						onReset={handleReset}
						onRecaptchaVerify={handleRecaptchaVerify}
					/>
				) : (
					<SuccessMessage
						requestCode={successData.requestCode}
						name={successData.name}
						onReset={handleReset}
					/>
				)}
			</div>
		</div>
	)
}
