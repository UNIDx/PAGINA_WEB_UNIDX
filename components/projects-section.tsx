"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CheckCircle, Clock, Lightbulb, Calendar, FileText, X, ZoomIn } from "lucide-react"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"

const statusConfig: Record<string, any> = {
  Realizado: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle,
  },
  "En proceso": {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Clock,
  },
  Planificación: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Calendar,
  },
  Idea: {
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: Lightbulb,
  },
}

export function ProjectsSection() {
  const [autoplay, setAutoplay] = useState<ReturnType<typeof Autoplay> | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setAutoplay(
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    )
  }, [])

  const projects = [
    {
      id: 1,
      title: "Glaciares Artificiales en el Glaciar Allin Capac: Solución Innovadora para la Crisis del Agua",
      description:
        "El proyecto busca implementar glaciares artificiales en el glaciar Allin Capac, una técnica desarrollada en la India que consiste en la formación de enormes estructuras de hielo llamadas «estupas». Estas estructuras almacenan agua congelada durante los meses fríos y la liberan de manera controlada en las estaciones más cálidas, asegurando el suministro hídrico en comunidades altoandinas afectadas por el retroceso glaciar.",
      status: "En proceso",
      category: "Investigación",
      image: "/images/projects/project01.jpg",
      progress: 40,
      documentation: "/documents/projects/project01.pdf",
    },
    {
      id: 2,
      title: "Plan Piloto: Árboles Líquidos en el Distrito de Breña, Lima, Perú",
      description:
        "Este plan piloto, desarrollado en colaboración con la Universidad Interamericana para el Desarrollo, la Municipalidad Distrital de Breña y la Asociación de Círculos y Semilleros de Investigación, busca aplicar una innovadora solución biotecnológica basada en microalgas. Los árboles líquidos son fotobiorreactores urbanos que absorben CO₂ y generan oxígeno de manera más eficiente que los árboles convencionales. A través de su instalación y monitoreo, el proyecto pretende evaluar su impacto en la calidad del aire y su viabilidad como modelo replicable en otras ciudades con problemas ambientales similares.",
      status: "En proceso",
      category: "Investigación",
      image: "/images/projects/project02.jpg",
      progress: 60,
      documentation: "/documents/projects/project02.pdf",
    },
  ]

  // Función para abrir documentación
  const openDetails = (documentationPath: string) => {
    window.open(documentationPath, '_blank')
  }

  // Función para abrir imagen en vista ampliada
  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  // Función para cerrar modal de imagen
  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Proyectos</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Conoce los proyectos que estamos desarrollando para mejorar la educación y la atención en ciencias de la
            salud.
          </p>
        </div>

        <div className="relative">
          <Carousel
            plugins={autoplay ? [autoplay] : []}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => {
                const StatusIcon = statusConfig[project.status].icon
                return (
                  <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      <div className="relative group">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                          onClick={() => openImageModal(project.image)}
                        />
                        
                        {/* Overlay de hover para indicar que es clickeable */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100"
                             onClick={() => openImageModal(project.image)}>
                          <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
                            <ZoomIn className="w-6 h-6 text-gray-800" />
                          </div>
                        </div>

                        <div className="absolute top-3 left-3">
                          <Badge className={`${statusConfig[project.status].color} border`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {project.status}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            {project.category}
                          </span>
                        </div>
                        {project.progress && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <div className="flex justify-between text-xs text-white mb-1">
                              <span>Progreso</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                              <div
                                className="bg-white h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">{project.title}</h3>
                        <p className="text-slate-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                        <div className="flex justify-center">
                          <Button
                            onClick={() => openDetails(project.documentation)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Modal de imagen ampliada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
               onClick={closeImageModal}>
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
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
                alt="Imagen del proyecto"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
