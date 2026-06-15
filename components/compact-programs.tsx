"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
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
  const [admissionDialogOpen, setAdmissionDialogOpen] = useState(false)
  const router = useRouter()

  const currentProgram = programs[currentIndex]

  return (
    <section className="relative flex flex-col overflow-hidden bg-gray-900">
      {/* Background Animated Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentProgram.image || "/placeholder.svg"}
            alt={currentProgram.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentProgram.color} opacity-85`} />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Content */}
      <div className="relative z-10 flex-grow flex flex-col py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 w-full flex-grow flex flex-col">
          
          {/* Header & Tabs */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
              Nuestras Carreras de <span className="text-yellow-400">Pregrado</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              {programs.map((program, index) => {
                const Icon = program.icon
                const isActive = currentIndex === index
                return (
                  <button
                    key={program.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 w-full sm:w-[260px] border ${
                      isActive
                        ? "bg-white text-blue-900 border-white shadow-2xl scale-105"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-white"}`} />
                    <span>{program.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex items-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center w-full">
                {/* Main Content Info */}
                <div className="text-white">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full mr-3 shadow-lg">
                      <currentProgram.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 py-1 px-3 text-xs shadow-lg">
                      Acreditado por {currentProgram.accreditation}
                    </Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-2 drop-shadow-md">{currentProgram.title}</h3>
                  <h4 className="text-base text-white/90 mb-3 font-medium drop-shadow">{currentProgram.subtitle}</h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-3 leading-relaxed max-w-2xl">{currentProgram.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 shadow-lg">
                      <div className="text-base sm:text-lg font-bold mb-0.5">{currentProgram.stats.experience}</div>
                      <div className="text-white/80 text-xs">de experiencia</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 shadow-lg">
                      <div className="text-base sm:text-lg font-bold mb-0.5">{currentProgram.stats.graduates}</div>
                      <div className="text-white/80 text-xs">egresados</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10 shadow-lg">
                      <div className="text-base sm:text-lg font-bold mb-0.5">{currentProgram.stats.employment}</div>
                      <div className="text-white/80 text-xs">empleabilidad</div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                      <Clock className="h-3 w-3 mr-1.5" />
                      <span className="text-xs font-medium">{currentProgram.duration}</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                      <Users className="h-3 w-3 mr-1.5" />
                      <span className="text-xs font-medium">{currentProgram.students} estudiantes</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                      <TrendingUp className="h-3 w-3 mr-1.5" />
                      <span className="text-xs font-medium">{currentProgram.employability} empleabilidad</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-xs font-bold h-9 px-4 shadow-xl"
                      onClick={() => router.push(`/carreras/${currentProgram.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Más Información
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300 bg-transparent text-xs font-bold h-9 px-4 shadow-xl"
                      onClick={() => setAdmissionDialogOpen(true)}
                    >
                      Proceso de Admisión
                    </Button>
                  </div>
                </div>

                {/* Features Sidebar */}
                <div className="hidden lg:block h-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl h-full flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-3">Características Destacadas</h3>
                    <ul className="space-y-4">
                      {currentProgram.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-white/95 text-base font-medium group">
                          <div className="mt-1.5 w-2.5 h-2.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.8)] group-hover:scale-125 transition-transform duration-300" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

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
