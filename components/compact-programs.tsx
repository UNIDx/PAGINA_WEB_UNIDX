"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  TrendingUp,
  BookOpen,
  Stethoscope,
  FlaskConical,
  Calendar,
  Bell,
  Phone,
  Mail,
} from "lucide-react"

const programs = [
  {
    id: "enfermeria",
    title: "Enfermería",
    subtitle: "Cuidado Integral de la Salud",
    description:
      "Formamos profesionales de enfermería con sólidos conocimientos científicos, técnicos y humanísticos para brindar cuidado integral de calidad a personas, familias y comunidades.",
    image: "/images/enfermeria/image01.jpg",
    icon: Stethoscope,
    duration: "5 años",
    students: "250+",
    employability: "95%",
    accreditation: "SINEACE",
    color: "from-blue-600 to-indigo-700",
    features: [
      "Prácticas en hospitales de prestigio",
      "Laboratorios de simulación clínica",
      "Convenios internacionales",
      "Especialización en cuidados intensivos",
      "Formación en investigación",
      "Certificaciones internacionales",
    ],
    stats: {
      experience: "25+ años",
      graduates: "2,500+",
      employment: "95%",
    },
  },
  {
    id: "farmacia-bioquimica",
    title: "Farmacia y Bioquímica",
    subtitle: "Ciencia Farmacéutica y Análisis Clínico",
    description:
      "Preparamos profesionales especializados en el desarrollo, producción y dispensación de medicamentos, así como en análisis clínicos y control de calidad farmacéutica.",
    image: "/images/farmacia-y-bioquimica/image01.jpg",
    icon: FlaskConical,
    duration: "5 años",
    students: "200+",
    employability: "92%",
    accreditation: "SINEACE",
    color: "from-[#4dcfd3] to-[#2ab3b7]",
    features: [
      "Laboratorios especializados modernos",
      "Prácticas en industria farmacéutica",
      "Análisis clínicos avanzados",
      "Investigación en fitofármacos",
      "Control de calidad farmacéutica",
      "Farmacia clínica hospitalaria",
    ],
    stats: {
      experience: "20+ años",
      graduates: "1,800+",
      employment: "92%",
    },
  },
]

export function CompactPrograms() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [admissionDialogOpen, setAdmissionDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + programs.length) % programs.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentProgram = programs[currentIndex]

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={currentProgram.image || "/placeholder.svg"}
              alt={currentProgram.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentProgram.color} opacity-80`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center overflow-y-auto sm:overflow-y-visible py-32 sm:py-0">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mr-4">
                      <currentProgram.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Acreditado por {currentProgram.accreditation}
                    </Badge>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold mb-4">{currentProgram.title}</h1>
                  <h2 className="text-xl md:text-2xl text-white/90 mb-6">{currentProgram.subtitle}</h2>
                  <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">{currentProgram.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{currentProgram.stats.experience}</div>
                      <div className="text-white/80 text-sm">de experiencia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{currentProgram.stats.graduates}</div>
                      <div className="text-white/80 text-sm">egresados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{currentProgram.stats.employment}</div>
                      <div className="text-white/80 text-sm">empleabilidad</div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{currentProgram.duration}</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{currentProgram.students} estudiantes</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span className="text-sm">{currentProgram.employability} empleabilidad</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-white/90 "
                      onClick={() => router.push(`/carreras/${currentProgram.id}`)}
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Más Información
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                      onClick={() => setAdmissionDialogOpen(true)}
                    >
                      Proceso de Admisión
                    </Button>
                  </div>
                </motion.div>

                {/* Features Sidebar - Hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hidden lg:block"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Características Destacadas</h3>
                    <ul className="space-y-4">
                      {currentProgram.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="flex items-center text-white/90"
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      {/* Admission Process Dialog */}
      <Dialog open={admissionDialogOpen} onOpenChange={setAdmissionDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center space-x-2 text-xl">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Admisión 2026-II</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 sm:py-6">
            <div className="text-center space-y-6">
              {/* Badge de Inscripciones Abiertas */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-semibold text-lg">Inscripciones Abiertas</span>
              </div>

              {/* Fecha de Examen */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-orange-600 font-medium">Fecha de Examen de Admisión</p>
                    <p className="text-2xl font-bold text-orange-900">01 de agosto</p>
                  </div>
                </div>
                <p className="text-orange-700 text-sm">
                  El examen de admisión se llevará a cabo el 01 de agosto
                </p>
              </div>

              {/* Información Adicional */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">¿Quieres ser notificado?</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Regístrate para recibir información sobre fechas importantes, requisitos y modalidades de
                        ingreso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="font-medium text-green-900 text-sm mb-2">Información y Consultas</p>
                  <div className="space-y-1 text-xs text-green-800">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>+51 945 987 048 / 01 9041269</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>informes@unidx.edu.pe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Inscripción */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    window.open('https://erpeduca.unidx.edu.pe/admision/proceso/InscripcionPostulante/ingresoExterno/inscripcionPostulanteExterno/universidad', '_blank', 'noopener,noreferrer')
                  }}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Inscríbete Ahora
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setAdmissionDialogOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
