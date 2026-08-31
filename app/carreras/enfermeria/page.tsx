"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModernNavigation } from "@/components/modern-navigation"
import { ModernFooter } from "@/components/modern-footer"
import {
  GraduationCap,
  Heart,
  Users,
  Clock,
  BookOpen,
  Award,
  Stethoscope,
  Activity,
  Shield,
  Phone,
  Mail,
  MapPin,
  Download,
  FileText,
  Building,
  UserCheck,
  TrendingUp,
  Calendar,
  Bell,
} from "lucide-react"

// Tipos para el curriculum
type SubjectType = "basic" | "professional" | "humanistic" | "research" | "practice" | "specialty"

interface Subject {
  code: string
  name: string
  credits: number
  hours: number
  type: SubjectType
  description: string
  prerequisites: string
  objectives: string[]
}

const curriculumData: Record<string, Subject[]> = {
  1: [
    { code: "ENF101", name: "Informática I", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF102", name: "Inglés I", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF103", name: "Matemática", credits: 4, hours: 5, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF104", name: "Comunicación y Redacción Científica I", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF105", name: "Biología", credits: 4, hours: 5, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF106", name: "Teoría y Fundamentos de Enfermería", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  2: [
    { code: "ENF201", name: "Estadística", credits: 3, hours: 4, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF202", name: "Informática II", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF203", name: "Inglés II", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF204", name: "Comunicación y Redacción Científica II", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF205", name: "Anatomía Humana", credits: 4, hours: 6, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF206", name: "Química Orgánica", credits: 3, hours: 5, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  3: [
    { code: "ENF301", name: "Química Inorgánica", credits: 3, hours: 5, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF302", name: "Microbiología y Parasitología", credits: 4, hours: 6, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF303", name: "Bioquímica", credits: 4, hours: 6, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF304", name: "Fisiología Humana", credits: 4, hours: 6, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF305", name: "Metodología de la Investigación Científica", credits: 3, hours: 4, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF306", name: "Cuidado de la Atención en Enfermería", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  4: [
    { code: "ENF401", name: "Ética, Bioética y Deontología en Enfermería", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF402", name: "Farmacología y Terapéutica I", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF403", name: "Enfermería en Salud del Adulto I", credits: 5, hours: 8, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF404", name: "Fisiopatología", credits: 4, hours: 6, type: "basic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF405", name: "Telemedicina y Enfermería Virtual (E)", credits: 3, hours: 4, type: "specialty", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  5: [
    { code: "ENF501", name: "Educación para la Salud", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF502", name: "Farmacología y Terapéutica II", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF503", name: "Liderazgo y Prospectiva", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF504", name: "Enfermería en Salud del Adulto II", credits: 5, hours: 8, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF505", name: "Enfermería en Salud Pública y Comunitaria", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  6: [
    { code: "ENF601", name: "Enfermería en Salud del Niño y del Adolescente I", credits: 5, hours: 8, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF602", name: "Neonatología", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF603", name: "Enfermería en Salud de la Mujer", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF604", name: "Sociología y Salud", credits: 3, hours: 4, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF605", name: "Epidemiología", credits: 3, hours: 4, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  7: [
    { code: "ENF701", name: "Enfermería en Salud del Niño y del Adolescente II", credits: 5, hours: 8, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF702", name: "Seminario de Tesis", credits: 3, hours: 4, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF703", name: "Enfermería en Salud Mental y Psiquiatría", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF704", name: "Formulación de Proyecto de Emprendimiento", credits: 3, hours: 4, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF705", name: "Compromiso Ambiental", credits: 2, hours: 3, type: "humanistic", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF706", name: "Salud Digital y Aplicaciones Móviles en Enfermería", credits: 3, hours: 4, type: "specialty", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  8: [
    { code: "ENF801", name: "Enfermería del Cuidado del Adulto Mayor", credits: 4, hours: 6, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF802", name: "Trabajo de Investigación", credits: 4, hours: 6, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF803", name: "Gerencia en Servicios de Salud", credits: 3, hours: 4, type: "professional", description: "", prerequisites: "Ninguno", objectives: [] },
    { code: "ENF804", name: "Implementación de Proyecto de Emprendimiento", credits: 3, hours: 4, type: "research", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  9: [
    { code: "ENF901", name: "Prácticas Preprofesionales I", credits: 15, hours: 30, type: "practice", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
  10: [
    { code: "ENF1001", name: "Prácticas Preprofesionales II", credits: 15, hours: 30, type: "practice", description: "", prerequisites: "Ninguno", objectives: [] },
  ],
}

const typeColors: Record<SubjectType, string> = {
  basic: "bg-yellow-100 text-yellow-900 border-yellow-300",
  professional: "bg-cyan-100 text-cyan-900 border-cyan-300",
  humanistic: "bg-pink-100 text-pink-900 border-pink-300",
  research: "bg-purple-100 text-purple-900 border-purple-300",
  practice: "bg-red-100 text-red-900 border-red-300",
  specialty: "bg-green-100 text-green-900 border-green-300",
}

const typeLabels: Record<SubjectType, string> = {
  basic: "Ciencias Básicas",
  professional: "Profesional",
  humanistic: "Humanidades",
  research: "Investigación",
  practice: "Prácticas",
  specialty: "Especialidad",
}

const programStats = [
  {
    icon: Users,
    label: "Estudiantes Activos",
    value: "450+",
    description: "Estudiantes matriculados en el programa",
  },
  {
    icon: GraduationCap,
    label: "Graduados",
    value: "1,200+",
    description: "Profesionales graduados desde 2010",
  },
  {
    icon: Award,
    label: "Tasa de Empleabilidad",
    value: "95%",
    description: "Graduados empleados en 6 meses",
  },
  {
    icon: TrendingUp,
    label: "Satisfacción",
    value: "4.8/5",
    description: "Calificación de empleadores",
  },
]

export default function EnfermeriaPage() {
  const [infoDialogOpen, setInfoDialogOpen] = useState(false)
  const [admissionDialogOpen, setAdmissionDialogOpen] = useState(false)
  const [visitDialogOpen, setVisitDialogOpen] = useState(false)
  
  // Estados para formularios
  const [infoFormData, setInfoFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    informacionInteres: "",
  })
  const [visitFormData, setVisitFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaPreferida: "",
    horarioPreferido: "",
    acompanantes: "",
  })
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(false)
  const [isSubmittingVisit, setIsSubmittingVisit] = useState(false)

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingInfo(true)
    
    try {
      const response = await fetch('/api/carreras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...infoFormData,
          carrera: 'enfermeria'
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert(`¡Solicitud enviada exitosamente! Número de solicitud: ${result.numeroSolicitud}`)
        setInfoDialogOpen(false)
        setInfoFormData({ nombre: "", email: "", telefono: "", informacionInteres: "" })
      } else {
        alert(result.error || 'Error al enviar la solicitud')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión al enviar la solicitud')
    } finally {
      setIsSubmittingInfo(false)
    }
  }

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingVisit(true)
    
    try {
      const response = await fetch('/api/carreras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...visitFormData,
          carrera: 'enfermeria'
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert(`¡Visita agendada exitosamente! Número de solicitud: ${result.numeroSolicitud}`)
        setVisitDialogOpen(false)
        setVisitFormData({ nombre: "", email: "", telefono: "", fechaPreferida: "", horarioPreferido: "", acompanantes: "" })
      } else {
        alert(result.error || 'Error al agendar la visita')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión al agendar la visita')
    } finally {
      setIsSubmittingVisit(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ModernNavigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-700/20" />
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full blur-xl" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                <Stethoscope className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Licenciatura en Enfermería
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
              Formamos profesionales comprometidos con el cuidado integral de la salud humana, combinando ciencia,
              tecnología y humanismo
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>10 Ciclos</span>
              </div>
              {/* <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
                <span>160 Créditos</span>
              </div> */}
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span>Título Profesional</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow border-2 border-blue-100">
                  <CardContent className="pt-6">
                    <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-blue-800 mb-2">{stat.value}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{stat.label}</h3>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-2xl text-blue-800">Misión del Programa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Formar profesionales de enfermería con sólidos conocimientos científicos, técnicos y humanísticos,
                    capaces de brindar cuidado integral de calidad, promover la salud, prevenir enfermedades y
                    contribuir al bienestar de individuos, familias y comunidades.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Nuestro enfoque se centra en la excelencia académica, la práctica basada en evidencia y el
                    desarrollo de competencias profesionales que respondan a las necesidades actuales del sector salud.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-2xl text-blue-800">Visión del Programa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ser reconocidos como un programa líder en la formación de enfermeros profesionales, comprometidos
                    con la excelencia académica, la investigación y la práctica basada en evidencia, contribuyendo al
                    desarrollo del sistema de salud nacional e internacional.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Aspiramos a formar líderes en enfermería que transformen la atención en salud mediante la
                    innovación, la investigación y el compromiso social.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Competencias Profesionales</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Nuestros graduados desarrollan competencias integrales que les permiten destacar en diferentes áreas del
              ejercicio profesional de enfermería
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Activity,
                  title: "Cuidado Directo",
                  description:
                    "Brindar cuidado integral basado en el proceso de enfermería, aplicando conocimientos científicos y técnicas especializadas para la atención de pacientes en diferentes niveles de complejidad.",
                  skills: ["Proceso de Enfermería", "Técnicas Clínicas", "Cuidados Especializados"],
                },
                {
                  icon: Shield,
                  title: "Promoción y Prevención",
                  description:
                    "Desarrollar programas de promoción de salud y prevención de enfermedades, trabajando con individuos, familias y comunidades para mejorar los indicadores de salud.",
                  skills: ["Educación en Salud", "Programas Preventivos", "Salud Comunitaria"],
                },
                {
                  icon: UserCheck,
                  title: "Liderazgo y Gestión",
                  description:
                    "Liderar equipos de salud, gestionar recursos y servicios de enfermería, garantizando la calidad y seguridad en la atención de los pacientes.",
                  skills: ["Liderazgo", "Gestión de Calidad", "Administración"],
                },
              ].map((competency, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 border-blue-50">
                  <CardContent className="pt-6">
                    <competency.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-blue-800">{competency.title}</h3>
                    <p className="text-gray-600 mb-4">{competency.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {competency.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Malla Curricular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan de estudios estructurado en 10 ciclos con enfoque teórico-práctico, diseñado para formar
              profesionales competentes y comprometidos
            </p>
          </motion.div>

          {/* Grilla */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mx-auto" style={{ minWidth: '1000px' }}>
              <thead>
                <tr>
                  {Object.keys(curriculumData).map((sem) => (
                    <th
                      key={sem}
                      className="border border-gray-300 bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-2 text-center"
                    >
                      Ciclo {sem}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(...Object.values(curriculumData).map((s) => s.length)),
                }).map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Object.values(curriculumData).map((subjects, colIdx) => {
                      const subject = subjects[rowIdx]
                      return (
                        <td
                          key={colIdx}
                          className={`border border-gray-300 px-3 py-2 text-sm text-center align-middle ${
                            subject ? 'bg-[#7094d6] text-white border-[#5e82c8]' : 'bg-gray-50'
                          }`}
                        >
                          {subject ? (
                            <span className="font-medium leading-snug block">{subject.name}</span>
                          ) : null}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Field of Work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Campo Laboral</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Amplias oportunidades profesionales en el sector salud con alta demanda laboral y crecimiento profesional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Hospitales y Clínicas",
                description: "Atención directa en servicios de hospitalización, urgencias y consulta externa",
                icon: Building,
              },
              {
                title: "Centros de Salud",
                description: "Atención primaria, programas de promoción y prevención en salud",
                icon: Heart,
              },
              {
                title: "Cuidados Domiciliarios",
                description: "Atención personalizada en el hogar para pacientes con necesidades especiales",
                icon: Users,
              },
              {
                title: "Educación en Enfermería",
                description: "Docencia universitaria y formación de nuevos profesionales",
                icon: GraduationCap,
              },
              {
                title: "Investigación en Salud",
                description: "Desarrollo de proyectos de investigación y evidencia científica",
                icon: BookOpen,
              },
              {
                title: "Salud Ocupacional",
                description: "Prevención de riesgos laborales y promoción de salud en empresas",
                icon: Shield,
              },
              {
                title: "Cuidados Intensivos",
                description: "Atención especializada en unidades de cuidados críticos",
                icon: Activity,
              },
              {
                title: "Emergencias Médicas",
                description: "Atención prehospitalaria y servicios de urgencias médicas",
                icon: Stethoscope,
              },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full border-2 border-blue-50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <field.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{field.title}</h3>
                    <p className="text-sm text-gray-600">{field.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact and Actions */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium">Coordinación Académica</span>
                      <p className="text-sm text-gray-600">+51 945 987 048</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium">Correo Electrónico</span>
                      <p className="text-sm text-gray-600">informes@unidx.edu.pe</p>
                      {/* <p className="text-xs text-gray-500">(temporalmente: rector@unidx.edu.pe)</p> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium">Ubicación</span>
                      <p className="text-sm text-gray-600">
                        Av. Bolivia 626, Lima 15082, Perú
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Horario de Atención:</strong>
                      <br />
                      Lunes a Viernes: 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800">Recursos y Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Malla Curricular
                  </Button>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setInfoDialogOpen(true)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Solicitar Información Detallada
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50 bg-transparent"
                    onClick={() => setAdmissionDialogOpen(true)}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Proceso de Admisión
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50 bg-transparent"
                    onClick={() => setVisitDialogOpen(true)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Agendar Visita al Campus
                  </Button>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 text-center">
                      ¿Tienes preguntas específicas? Contáctanos y te ayudaremos a resolver todas tus dudas sobre el
                      programa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Information Request Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Información Detallada</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="Tu nombre completo"
                value={infoFormData.nombre}
                onChange={(e) => setInfoFormData(prev => ({ ...prev, nombre: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md" 
                placeholder="tu@email.com"
                value={infoFormData.email}
                onChange={(e) => setInfoFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input 
                type="tel" 
                className="w-full p-2 border rounded-md" 
                placeholder="Tu número de teléfono"
                value={infoFormData.telefono}
                onChange={(e) => setInfoFormData(prev => ({ ...prev, telefono: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Información de Interés</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={infoFormData.informacionInteres}
                onChange={(e) => setInfoFormData(prev => ({ ...prev, informacionInteres: e.target.value }))}
              >
                <option value="">Selecciona una opción</option>
                <option value="Plan de estudios completo">Plan de estudios completo</option>
                <option value="Costos y financiamiento">Costos y financiamiento</option>
                <option value="Requisitos de admisión">Requisitos de admisión</option>
                <option value="Prácticas profesionales">Prácticas profesionales</option>
                <option value="Campo laboral">Campo laboral</option>
              </select>
            </div>
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmittingInfo}
            >
              {isSubmittingInfo ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                "Enviar Solicitud"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Admission Process Dialog */}
      <Dialog open={admissionDialogOpen} onOpenChange={setAdmissionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center space-x-2 text-xl">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Admisiones 2025</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="text-center space-y-6">
              {/* Próximamente Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-semibold text-lg">Próximamente</span>
              </div>

              {/* Información Adicional */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">¿Quieres ser notificado?</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Regístrate para recibir información sobre requisitos y modalidades de ingreso.
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
                      <span>+51 945987048</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>informes@unidx.edu.pe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Acción */}
              <div className="pt-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setAdmissionDialogOpen(false)}
                >
                  Entendido
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Campus Visit Dialog */}
      <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Visita al Campus</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleVisitSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="Tu nombre completo"
                value={visitFormData.nombre}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, nombre: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md" 
                placeholder="tu@email.com"
                value={visitFormData.email}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input 
                type="tel" 
                className="w-full p-2 border rounded-md" 
                placeholder="Tu número de teléfono"
                value={visitFormData.telefono}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, telefono: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Preferida</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-md"
                value={visitFormData.fechaPreferida}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, fechaPreferida: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Horario Preferido</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={visitFormData.horarioPreferido}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, horarioPreferido: e.target.value }))}
              >
                <option value="">Selecciona un horario</option>
                <option value="Mañana (8:00 AM - 12:00 PM)">Mañana (8:00 AM - 12:00 PM)</option>
                <option value="Tarde (2:00 PM - 6:00 PM)">Tarde (2:00 PM - 6:00 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número de Acompañantes</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={visitFormData.acompanantes}
                onChange={(e) => setVisitFormData(prev => ({ ...prev, acompanantes: e.target.value }))}
              >
                <option value="">Selecciona cantidad</option>
                <option value="Solo yo">Solo yo</option>
                <option value="1 acompañante">1 acompañante</option>
                <option value="2 acompañantes">2 acompañantes</option>
                <option value="3 o más acompañantes">3 o más acompañantes</option>
              </select>
            </div>
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmittingVisit}
            >
              {isSubmittingVisit ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Agendando...
                </>
              ) : (
                "Agendar Visita"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ModernFooter />
    </div>
  )
}
