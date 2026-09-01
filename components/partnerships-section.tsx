"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Globe, Building2, Award, Calendar, ArrowRight, Handshake, X, ZoomIn } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

const partnerships = [
	{
		id: "escuela-posgrado-eupg",
		name: "Escuela de Posgrado EUPG",
		type: "Convenio Académico",
		category: "Educación",
		description:
			"Convenio de colaboración para el desarrollo de programas de posgrado en salud pública y medicina preventiva.",
		established: "2022",
		image: "/images/convenios/convenio01.jpg",
		icon: Award,
		color: "from-green-500 to-emerald-600",
		detailsUrl: "https://www.facebook.com/photo/?fbid=2094694690739166&set=a.199370123604975", // Nueva propiedad
	},
	{
		id: "evento-redcolsi",
		name: "Circulos y semilleros de investigación (RedColsi)",
		type: "Convenio Académico",
		category: "Educación",
		image: "/images/convenios/convenio02.png",
		icon: Award,
		color: "from-green-500 to-emerald-600",
		detailsUrl: "https://web.redcolsi.org/", // Nueva propiedad
	},
]

export function PartnershipsSection() {
	const [isProposalOpen, setIsProposalOpen] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null) // Nuevo estado para imagen
	const [formData, setFormData] = useState({
		organizationName: "",
		contactName: "",
		email: "",
		phone: "",
		partnershipType: "",
		description: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	// Función para abrir imagen en modal
	const openImageModal = (imageSrc: string) => {
		setSelectedImage(imageSrc)
	}

	// Función para cerrar modal de imagen
	const closeImageModal = () => {
		setSelectedImage(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000))

			toast({
				title: "Propuesta enviada exitosamente",
				description: "Nos pondremos en contacto contigo en un plazo de 5 días hábiles.",
				duration: 5000,
			})

			setIsProposalOpen(false)
			setFormData({
				organizationName: "",
				contactName: "",
				email: "",
				phone: "",
				partnershipType: "",
				description: "",
			})
		} catch (error) {
			toast({
				title: "Error al enviar la propuesta",
				description: "Por favor, inténtalo nuevamente.",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	// Nueva función para manejar el click en "Ver detalles"
	const handleViewDetails = (partnership: any) => {
		if (partnership.detailsUrl) {
			// Si la URL es externa (contiene http), abrir en nueva pestaña
			if (partnership.detailsUrl.startsWith('http')) {
				window.open(partnership.detailsUrl, '_blank')
			} else {
				// Si es un documento local, también abrir en nueva pestaña
				window.open(partnership.detailsUrl, '_blank')
			}
		}
	}

	return (
		<section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
			<div className="max-w-6xl mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-10">
					<motion.div
						initial={{ y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4"
					>
						<Handshake className="h-3 w-3 mr-2" />
						Alianzas Estratégicas
					</motion.div>
					<motion.h2
						initial={{ y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-3xl font-bold text-gray-900 mb-3"
					>
						Nuestros Convenios
					</motion.h2>
					<motion.p
						initial={{ y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-gray-600 max-w-2xl mx-auto"
					>
						Alianzas estratégicas que fortalecen la formación académica y la investigación
					</motion.p>
				</div>

				{/* Partnerships Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{partnerships.map((partnership, index) => (
						<motion.div
							key={partnership.id}
							initial={{ y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="group"
						>
							<Card className="h-full hover:shadow-lg transition-all duration-300 border-0 overflow-hidden bg-white/80 backdrop-blur-sm hover:-translate-y-1">
								{/* Image */}
								<div className="relative h-32 overflow-hidden group/image">
									<img
										src={partnership.image || "/placeholder.svg"}
										alt={partnership.name}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
										onClick={() => openImageModal(partnership.image)}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

									{/* Overlay de hover para indicar que es clickeable */}
									<div
										className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 cursor-pointer flex items-center justify-center opacity-0 group-hover/image:opacity-100"
										onClick={() => openImageModal(partnership.image)}
									>
										<div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
											<ZoomIn className="w-4 h-4 text-gray-800" />
										</div>
									</div>

									{/* Type Badge */}
									<div className="absolute top-2 left-2">
										<Badge className="bg-white/90 text-gray-700 text-xs border-0">
											{partnership.type}
										</Badge>
									</div>

									{/* Year */}
									<div className="absolute top-2 right-2">
										<div className="bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium flex items-center">
											<Calendar className="h-3 w-3 mr-1" />
											{partnership.established}
										</div>
									</div>

									{/* Icon */}
									<div className="absolute bottom-2 left-2">
										<div
											className={`flex items-center justify-center w-8 h-8 bg-gradient-to-r ${partnership.color} rounded-full shadow-md`}
										>
											<partnership.icon className="h-4 w-4 text-white" />
										</div>
									</div>
								</div>

								<CardContent className="p-4">
									<div className="mb-3">
										<h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
											{partnership.name}
										</h3>
										<Badge variant="outline" className="text-xs">
											{partnership.category}
										</Badge>
									</div>

									<p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-2">
										{partnership.description}
									</p>

									{/* Botón modificado para abrir enlace */}
									<Button
										variant="outline"
										size="sm"
										className="w-full text-xs hover:bg-gray-50 bg-transparent h-8"
										onClick={() => handleViewDetails(partnership)}
									>
										Ver detalles
										<ArrowRight className="h-3 w-3 ml-1" />
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Compact Call to Action */}
				<motion.div
					initial={{ y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20"
				>
					<h3 className="text-lg font-bold text-gray-900 mb-2">¿Interesado en una Alianza?</h3>
					<p className="text-gray-600 mb-4 text-sm">
						Estamos abiertos a nuevas colaboraciones que fortalezcan la formación académica.
					</p>
					<Button
						onClick={() => setIsProposalOpen(true)}
						className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 text-sm"
					>
						Proponer Convenio
					</Button>
				</motion.div>

				{/* Modal de imagen ampliada */}
				{selectedImage && (
					<div
						className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
						onClick={closeImageModal}
					>
						<div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
							{/* Botón de cerrar */}
							<button
								onClick={closeImageModal}
								className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
							>
								<X className="w-6 h-6" />
							</button>

							{/* Imagen ampliada */}
							<img
								src={selectedImage}
								alt="Convenio ampliado"
								className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					</div>
				)}

				{/* Proposal Dialog */}
				<Dialog open={isProposalOpen} onOpenChange={setIsProposalOpen}>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle className="text-xl flex items-center">
								<Handshake className="w-5 h-5 mr-2 text-blue-600" />
								Propuesta de Convenio
							</DialogTitle>
						</DialogHeader>

						<form onSubmit={handleSubmit} className="space-y-4 mt-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">Organización *</label>
									<Input
										value={formData.organizationName}
										onChange={(e) =>
											handleInputChange("organizationName", e.target.value)
										}
										placeholder="Nombre de la organización"
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Contacto *</label>
									<Input
										value={formData.contactName}
										onChange={(e) => handleInputChange("contactName", e.target.value)}
										placeholder="Nombre del representante"
										required
									/>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">Email *</label>
									<Input
										type="email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										placeholder="contacto@ejemplo.com"
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Teléfono *</label>
									<Input
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										placeholder="+51 999 999 999"
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Tipo de Convenio *</label>
								<Select
									value={formData.partnershipType}
									onValueChange={(value) => handleInputChange("partnershipType", value)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona el tipo de convenio" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="practicas">Convenio de Prácticas</SelectItem>
										<SelectItem value="investigacion">
											Investigación Colaborativa
										</SelectItem>
										<SelectItem value="intercambio">Intercambio Académico</SelectItem>
										<SelectItem value="capacitacion">Capacitación y Desarrollo</SelectItem>
										<SelectItem value="otro">Otro</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Descripción *</label>
								<Textarea
									value={formData.description}
									onChange={(e) => handleInputChange("description", e.target.value)}
									placeholder="Describe brevemente el convenio propuesto..."
									rows={4}
									required
								/>
							</div>

							<div className="flex justify-end space-x-3 pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsProposalOpen(false)}
									disabled={isSubmitting}
								>
									Cancelar
								</Button>
								<Button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 text-white"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
											Enviando...
										</>
									) : (
										<>
											<Send className="w-4 h-4 mr-2" />
											Enviar Propuesta
										</>
									)}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	)
}
