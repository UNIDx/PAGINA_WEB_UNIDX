"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, Eye, Star, X, ExternalLink } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const books = [
	{
		id: 1,
		title: "Modelo Educativo Exponencial",
		author: "Atilio Rodolfo Buendia Giribaldi",
		year: "2023",
		doi: "https://doi.org/10.47422/fepol.22",
		issn: "2955-8549",
		category: "Educación Universitaria",
		image: "/images/books/book1.jpg",
		color: "from-blue-500 to-blue-700",
		editorial: "FEPOL",
		description:
			"La Universidad Interamericana para el Desarrollo SAC (UNID) surge mediante la Resolución N°199-2010-CONAFU del Consejo Nacional para la autorización del funcionamiento de las universidades que otorga la autorización provisional de funcionamiento con fecha 08 de abril del año 2010.",
		url: "https://editorialfondo.com/index.php/ProfessionalsOnLine/catalog/book/22",
	},
	{
		id: 2,
		title: "Las rutas hacia un mundo en evolución constante",
		author: "Atilio Rodolfo Buendia Giribaldi",
		year: "2025",
		doi: "https://doi.org/10.47422/fepol.29",
		issn: "2955-8549",
		category: "Responsabilidad Social Universitaria",
		image: "/images/books/book2.jpg",
		color: "from-blue-500 to-blue-700",
		editorial: "FEPOL",
		description:
			"El estudio del crecimiento poblacional es fundamental en demografía, ecología y otras disciplinas. Este fenómeno se refiere al cambio en el número de individuos en una población durante un período determinado, y puede ser influenciado por diversos factores como la natalidad, mortalidad, inmigración y emigración (Sposob, 2024).",
		url: "https://editorialfondo.com/index.php/ProfessionalsOnLine/catalog/book/22",
	},
	{
		id: 3,
		title: "Estudio de mercado en profesiones de enfermería, Farmacia y Bioquimica: Identificación de necesidades en un entorno de crecimiento exponencial",
		author: "Atilio Rodolfo Buendia Giribaldi",
		year: "2024",
		doi: "https://doi.org/10.47422/fepol.27",
		issn: "2955-8549",
		category: "Educación Universitaria",
		image: "/images/books/book3.png",
		color: "from-blue-500 to-blue-700",
		editorial: "FEPOL",
		description:
			"El libro proporciona un análisis exhaustivo de las estrategias y metodologías necesarias para llevar a cabo un estudio de mercado efectivo en el ámbito de la enfermería y la farmacia y bioquímica.",
		url: "https://editorialfondo.com/index.php/ProfessionalsOnLine/catalog/book/27",
	},
]

const stats = [
	{
		icon: BookOpen,
		number: "24",
		label: "Libros Publicados",
		color: "text-blue-600",
	},
	{
		icon: Download,
		number: "8,500+",
		label: "Descargas Totales",
		color: "text-green-600",
	},
	{
		icon: Eye,
		number: "25,000+",
		label: "Visualizaciones",
		color: "text-purple-600",
	},
	{
		icon: Star,
		number: "4.8",
		label: "Calificación Promedio",
		color: "text-orange-600",
	},
]

export function BooksCarousel() {
	const [api, setApi] = useState<any>()
	const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null)

	useEffect(() => {
		if (!api) return

		const interval = setInterval(() => {
			api.scrollNext()
		}, 6000)

		return () => clearInterval(interval)
	}, [api])

	const handleBookClick = (book: typeof books[0]) => {
		setSelectedBook(book)
	}

	const handlePreview = (url: string) => {
		window.open(url, "_blank")
	}

	// Agregar función para manejar el click del botón
	const handleViewAllBooks = () => {
		// Opción 1: URL externa (nueva pestaña)
		window.open(
			"https://fondoeditorial.unidx.edu.pe/",
			"_blank"
		)

		// Opción 2: URL interna (misma pestaña)
		// window.location.href = '/libros'

		// Opción 3: URL externa (misma pestaña)
		// window.location.href = 'https://editorialfondo.com/index.php/ProfessionalsOnLine/catalog'
	}

	return (
		<section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className="max-w-6xl mx-auto px-4 relative z-10">
				{/* Header */}
				<motion.div
					initial={{ y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Nuestros Libros
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
						Explora nuestra colección de libros académicos y publicaciones
						especializadas en ciencias de la salud
					</p>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500"
							>
								<div
									className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4`}
								>
									<stat.icon className={`h-6 w-6 ${stat.color}`} />
								</div>
								<div className="text-2xl font-bold text-gray-900 mb-1">
									{stat.number}
								</div>
								<div className="text-sm text-gray-600">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Books Carousel */}
				<motion.div
					initial={{ y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
				>
					<Carousel
						setApi={setApi}
						className="w-full"
						plugins={[
							Autoplay({
								delay: 6000,
								stopOnInteraction: false,
								stopOnMouseEnter: true,
							}),
						]}
						opts={{
							align: "start",
							loop: true,
						}}
					>
						<CarouselContent className="-ml-2 md:-ml-4">
							{books.map((book, index) => (
								<CarouselItem
									key={book.id}
									className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
								>
									<motion.div
										initial={{ rotateY: -30, z: -100 }}
										whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
										transition={{ duration: 1, delay: index * 0.2 }}
										whileHover={{
											scale: 1.08,
											rotateY: 15,
											rotateX: -5,
											z: 50,
											transition: { duration: 0.6, ease: "easeOut" },
										}}
										className="h-full cursor-pointer"
										onClick={() => handleBookClick(book)}
										style={{
											perspective: "1000px",
											transformStyle: "preserve-3d",
										}}
									>
										{/* 3D Book Container */}
										<div
											className="relative h-full transform-gpu"
											style={{ transformStyle: "preserve-3d" }}
										>
											{/* Book Shadow */}
											<div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/10 rounded-full blur-sm transform translate-z-[-10px]" />

											{/* Main Book */}
											<div className="relative h-full bg-white shadow-2xl rounded-r-lg overflow-hidden transform-gpu hover:shadow-3xl transition-shadow duration-300">
												{/* Book Spine (Left Side) */}
												<div
													className={`absolute left-0 top-0 w-6 h-full bg-gradient-to-b ${book.color} shadow-inner`}
													style={{
														transform: "rotateY(-15deg) translateZ(12px)",
														transformOrigin: "right center",
													}}
												>
													{/* Spine Text */}
													<div className="absolute inset-0 flex items-center justify-center">
														<div
															className="text-white text-xs font-bold writing-mode-vertical transform rotate-180"
															style={{ writingMode: "vertical-rl" }}
														>
															{book.title.substring(0, 20)}...
														</div>
													</div>

													{/* Spine Details */}
													<div className="absolute top-2 left-1 right-1 h-px bg-white/30" />
													<div className="absolute bottom-2 left-1 right-1 h-px bg-white/30" />
												</div>

												{/* Book Cover (Front) */}
												<div className="relative h-full ml-6 transform-gpu">
													<div className="h-96 relative overflow-hidden">
														{/* Cover Image Background */}
														<div className="absolute inset-0">
															<Image
																src={book.image}
																alt={book.title}
																fill
																className="object-cover"
																sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
															/>
															{/* Dark overlay for text readability */}
															<div className="absolute inset-0 bg-black/40" />
														</div>

														{/* Click Indicator */}
														<div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
															<div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
																<BookOpen className="h-6 w-6 text-gray-800" />
															</div>
														</div>

														{/* Content overlay */}
														<div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
															{/* Top Section */}
															<div className="flex justify-between items-start">
																<div className="text-white/90 text-xs font-medium bg-black/20 px-2 py-1 rounded">
																	UNIDX
																</div>
																<Badge
																	variant="secondary"
																	className="bg-black/30 text-white border-white/30 text-xs backdrop-blur-sm"
																>
																	{book.category}
																</Badge>
															</div>

															{/* Title Section */}
															<div className="text-center flex-1 flex flex-col justify-center">
																<div className="mb-4">
																	<div className="w-12 h-12 mx-auto mb-4 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
																		<BookOpen className="h-6 w-6 text-white" />
																	</div>
																</div>

																<h3 className="text-white font-bold text-sm mb-3 leading-tight px-2 drop-shadow-lg">
																	{book.title}
																</h3>

																<div className="w-16 h-0.5 bg-white/70 mx-auto mb-3" />
															</div>

															{/* Bottom Section */}
															<div className="text-center bg-black/20 rounded-lg p-3 backdrop-blur-sm">
																<div className="text-white/80 text-xs">
																	{book.year}
																</div>
																<div className="text-white/80 text-xs">
																	{book.doi}
																</div>
																<div className="text-white/80 text-xs">
																	ISSN: {book.issn}
																</div>
																<div className="text-white/80 text-xs">
																	{book.editorial}
																</div>
															</div>
														</div>

														{/* Cover Shine Effect */}
														<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

														{/* Cover Frame Effect */}
														<div className="absolute top-4 left-6 right-6 h-px bg-white/30" />
														<div className="absolute top-6 left-6 right-8 h-px bg-white/20" />
														<div className="absolute bottom-6 left-6 right-6 h-px bg-white/30" />
														<div className="absolute bottom-4 left-6 right-8 h-px bg-white/20" />
													</div>

													{/* Book Info Panel */}
													<div className="p-4 bg-white border-t">
														<div className="flex items-center justify-between text-xs text-gray-500">
															<span className="flex items-center">
																<BookOpen className="h-3 w-3 mr-1" />
																Disponible
															</span>
															<span className="font-medium">{book.year}</span>
														</div>
													</div>
												</div>

												{/* Book Pages Effect (Right Side) */}
												<div
													className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner"
													style={{
														transform: "rotateY(15deg) translateZ(8px)",
														transformOrigin: "left center",
													}}
												/>

												{/* Multiple Page Layers */}
												<div
													className="absolute right-1 top-3 bottom-3 w-px bg-gray-200"
													style={{
														transform: "rotateY(15deg) translateZ(6px)",
														transformOrigin: "left center",
													}}
												/>
												<div
													className="absolute right-2 top-4 bottom-4 w-px bg-gray-300"
													style={{
														transform: "rotateY(15deg) translateZ(4px)",
														transformOrigin: "left center",
													}}
												/>
											</div>
										</div>
									</motion.div>
								</CarouselItem>
							))}
						</CarouselContent>

						{/* Navigation Arrows */}
						<div className="hidden md:block">
							<CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 border-gray-200 transition-all duration-300" />
							<CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 border-gray-200 transition-all duration-300" />
						</div>
					</Carousel>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="text-center mt-12"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.3 }}
						onClick={handleViewAllBooks}
						className="inline-flex items-center px-8 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						<BookOpen className="h-5 w-5 mr-2" />
						Ver todos los libros
					</motion.button>
				</motion.div>

				{/* Book Modal */}
				<AnimatePresence>
					{selectedBook && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
							onClick={() => setSelectedBook(null)}
						>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Modal Header */}
								<div className="flex items-center justify-between p-6 border-b">
									<h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
										{selectedBook.title}
									</h3>
									<button
										onClick={() => setSelectedBook(null)}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors"
									>
										<X className="h-6 w-6" />
									</button>
								</div>

								{/* Modal Content */}
								<div className="p-6 overflow-y-auto max-h-[70vh]">
									<div className="grid md:grid-cols-2 gap-8">
										{/* Book Cover */}
										<div className="flex justify-center">
											<div className="relative w-64 h-80 shadow-2xl rounded-lg overflow-hidden">
												<Image
													src={selectedBook.image}
													alt={selectedBook.title}
													fill
													className="object-contain"
												/>
											</div>
										</div>

										{/* Book Details */}
										<div className="space-y-6">
											<div>
												<h4 className="text-xl font-semibold mb-2">
													Información del Libro
												</h4>
												<div className="space-y-2 text-gray-600">
													<p>
														<strong>Autor:</strong> {selectedBook.author}
													</p>
													<p>
														<strong>Editorial:</strong> {selectedBook.editorial}
													</p>
													<p>
														<strong>Año:</strong> {selectedBook.year}
													</p>
													<p>
														<strong>DOI:</strong> {selectedBook.doi}
													</p>
													<p>
														<strong>ISSN:</strong> {selectedBook.issn}
													</p>
													<p>
														<strong>Categoría:</strong> {selectedBook.category}
													</p>
												</div>
											</div>

											<div>
												<h4 className="text-xl font-semibold mb-2">
													Descripción
												</h4>
												<p className="text-gray-600 leading-relaxed">
													{selectedBook.description}
												</p>
											</div>

											{/* Action Buttons */}
											<div className="flex flex-col sm:flex-row gap-4">
												<motion.button
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													onClick={() => handlePreview(selectedBook.url)}
													className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
												>
													<Eye className="h-5 w-5 mr-2" />
													Ver más
												</motion.button>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}
