"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModernNavigation } from "@/components/modern-navigation"
import { ModernFooter } from "@/components/modern-footer"
import {
  GraduationCap,
  FlaskRoundIcon as Flask,
  Microscope,
  Clock,
  BookOpen,
  Award,
  Pill,
  Atom,
  Beaker,
  Phone,
  Mail,
  MapPin,
  Download,
  FileText,
  Building2,
  Users,
  TrendingUp,
  Target,
  Zap,
  Calendar,
  Bell,
} from "lucide-react"

const curriculumData: Record<string, { code: string; name: string }[]> = {
  1: [
    { code: "FBQ101", name: "Redacción Científica" },
    { code: "FBQ102", name: "Informática I" },
    { code: "FBQ103", name: "Inglés I" },
    { code: "FBQ104", name: "Matemática" },
    { code: "FBQ105", name: "Introducción a la Farmacia" },
    { code: "FBQ106", name: "Biología" },
    { code: "FBQ107", name: "Farmacia y Desarrollo Sostenible" },
  ],
  2: [
    { code: "FBQ201", name: "Química General" },
    { code: "FBQ202", name: "Informática II" },
    { code: "FBQ203", name: "Inglés II" },
    { code: "FBQ204", name: "Fisiología Humana" },
    { code: "FBQ205", name: "Farmacobotánica" },
    { code: "FBQ206", name: "Ética y Responsabilidad Social" },
    { code: "FBQ207", name: "Metodología de la Investigación Científica" },
  ],
  3: [
    { code: "FBQ301", name: "Estadística" },
    { code: "FBQ302", name: "Semiología General y Aplicada" },
    { code: "FBQ303", name: "Química Inorgánica" },
    { code: "FBQ304", name: "Biofísica" },
    { code: "FBQ305", name: "Química Analítica" },
    { code: "FBQ306", name: "Fisiopatología" },
    { code: "FBQ307", name: "Técnicas y Operaciones de Laboratorio" },
  ],
  4: [
    { code: "FBQ401", name: "Química Orgánica I" },
    { code: "FBQ402", name: "Fisicoquímica" },
    { code: "FBQ403", name: "Microbiología General" },
    { code: "FBQ404", name: "Farmacología I" },
    { code: "FBQ405", name: "Preparados Farmacéuticos" },
    { code: "FBQ406", name: "Química Analítica Instrumental" },
    { code: "FBQ407", name: "Legislación y Deontología Farmacéutica" },
  ],
  5: [
    { code: "FBQ501", name: "Farmacognosia" },
    { code: "FBQ502", name: "Biofarmacia" },
    { code: "FBQ503", name: "Química Orgánica II" },
    { code: "FBQ504", name: "Farmacotecnia" },
    { code: "FBQ505", name: "Farmacología II" },
    { code: "FBQ506", name: "Salud Pública y Epidemiología" },
    { code: "FBQ507", name: "Análisis de la Realidad Peruana (E)" },
  ],
  6: [
    { code: "FBQ601", name: "Bioquímica I" },
    { code: "FBQ602", name: "Farmacia Comunitaria" },
    { code: "FBQ603", name: "Microbiología Farmacéutica" },
    { code: "FBQ604", name: "Control de Calidad" },
    { code: "FBQ605", name: "Farmacoquímica" },
    { code: "FBQ606", name: "Emprendimiento Farmacéutico (E)" },
    { code: "FBQ607", name: "Tecnología de Productos Sanitarios y Dispositivos Médicos" },
  ],
  7: [
    { code: "FBQ701", name: "Toxicología y Química Legal" },
    { code: "FBQ702", name: "Bioquímica II" },
    { code: "FBQ703", name: "Farmacoterapéutica" },
    { code: "FBQ704", name: "Seminario de Tesis" },
    { code: "FBQ705", name: "Industria Farmacéutica" },
    { code: "FBQ706", name: "Farmacia Hospitalaria" },
    { code: "FBQ707", name: "Gestión de Recursos Farmacéuticos y Sostenibilidad" },
  ],
  8: [
    { code: "FBQ801", name: "Análisis Clínicos" },
    { code: "FBQ802", name: "Farmacia Clínica" },
    { code: "FBQ803", name: "Dermocosmética" },
    { code: "FBQ804", name: "Trabajo de Investigación" },
    { code: "FBQ805", name: "Atención Farmacéutica" },
    { code: "FBQ806", name: "Bromatología y Nutrición" },
    { code: "FBQ807", name: "Asuntos Regulatorios" },
  ],
  9: [
    { code: "FBQ901", name: "Prácticas Preprofesionales I" },
  ],
  10: [
    { code: "FBQ1001", name: "Prácticas Preprofesionales II" },
  ],
}

const programStats = [
  {
    icon: Users,
    label: "Estudiantes Activos",
    value: "320+",
    description: "Estudiantes matriculados en el programa",
  },
  {
    icon: GraduationCap,
    label: "Graduados",
    value: "800+",
    description: "Profesionales graduados desde 2008",
  },
  {
    icon: Award,
    label: "Tasa de Empleabilidad",
    value: "98%",
    description: "Graduados empleados en 6 meses",
  },
  {
    icon: TrendingUp,
    label: "Satisfacción",
    value: "4.9/5",
    description: "Calificación de empleadores",
  },
]

export default function FarmaciaBioquimicaPage() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [infoDialogOpen, setInfoDialogOpen] = useState(false)
  const [admissionDialogOpen, setAdmissionDialogOpen] = useState(false)
  const [visitDialogOpen, setVisitDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2fafa] via-white to-[#f2fafa]">
      <ModernNavigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4dcfd3] to-[#2ab3b7] opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#166769]/20 to-[#2ab3b7]/20" />
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
                <Flask className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#d6f5f6] bg-clip-text text-transparent">
              Farmacia y Bioquímica
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-[#d6f5f6]">
              Formamos profesionales expertos en medicamentos y análisis clínicos, líderes en innovación farmacéutica y
              salud pública
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>10 Semestres</span>
              </div>
              {/* <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
                <span>220 Créditos</span>
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
                <Card className="text-center hover:shadow-lg transition-shadow border-2 border-[#b3ecee]">
                  <CardContent className="pt-6">
                    <stat.icon className="w-12 h-12 text-[#4dcfd3] mx-auto mb-4" />
                    <div className="text-3xl font-bold text-[#1e8f92] mb-2">{stat.value}</div>
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
              <Card className="h-full border-2 border-[#b3ecee] hover:border-[#4dd6d8] transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Pill className="w-8 h-8 text-[#4dcfd3]" />
                    <CardTitle className="text-2xl text-[#1e8f92]">Misión del Programa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Formar profesionales farmacéuticos-bioquímicos con sólida formación científica, técnica y
                    humanística, capaces de contribuir al uso racional de medicamentos, realizar análisis clínicos
                    especializados y participar en la investigación farmacéutica para mejorar la salud pública.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Nuestro programa integra la ciencia farmacéutica con la práctica clínica, formando profesionales
                    versátiles y altamente competentes.
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
              <Card className="h-full border-2 border-[#b3ecee] hover:border-[#4dd6d8] transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Microscope className="w-8 h-8 text-[#4dcfd3]" />
                    <CardTitle className="text-2xl text-[#1e8f92]">Visión del Programa</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ser reconocidos como el programa líder en formación de farmacéuticos-bioquímicos, destacando por la
                    excelencia académica, investigación innovadora y compromiso con el desarrollo de la industria
                    farmacéutica y los servicios de salud a nivel nacional e internacional.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Aspiramos a ser referente en innovación farmacéutica y análisis clínico, contribuyendo al avance
                    científico y tecnológico del sector.
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
            <h2 className="text-3xl font-bold text-center mb-4 text-[#1e8f92]">Competencias Profesionales</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Formamos profesionales integrales con competencias especializadas en las áreas farmacéutica y bioquímica,
              preparados para los desafíos del sector salud
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Beaker,
                  title: "Análisis Clínicos",
                  description:
                    "Realizar análisis de laboratorio clínico con precisión y calidad, interpretando resultados y contribuyendo al diagnóstico médico mediante técnicas analíticas avanzadas.",
                  skills: ["Hematología", "Química Clínica", "Microbiología", "Inmunología"],
                },
                {
                  icon: Atom,
                  title: "Desarrollo Farmacéutico",
                  description:
                    "Participar en investigación y desarrollo de nuevos medicamentos, desde el diseño molecular hasta la formulación y evaluación de formas farmacéuticas innovadoras.",
                  skills: ["Química Medicinal", "Formulación", "Control de Calidad", "I+D"],
                },
                {
                  icon: Building2,
                  title: "Gestión Farmacéutica",
                  description:
                    "Administrar servicios farmacéuticos y garantizar calidad en la atención, liderando equipos y optimizando procesos en diferentes entornos de práctica profesional.",
                  skills: ["Atención Farmacéutica", "Gestión de Calidad", "Farmacovigilancia", "Administración"],
                },
              ].map((competency, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 border-[#edfcfc]">
                  <CardContent className="pt-6">
                    <competency.icon className="w-12 h-12 text-[#4dcfd3] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-[#1e8f92]">{competency.title}</h3>
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
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-[#1e8f92]">Malla Curricular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan de estudios estructurado en 10 ciclos con formación integral, combinando ciencias básicas,
              profesionales y práctica clínica
            </p>
          </motion.div>

          {/* Grilla */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mx-auto" style={{ minWidth: '1000px' }}>
              <thead>
                <tr>
                  {Object.keys(curriculumData).map((ciclo) => (
                    <th
                      key={ciclo}
                      className="border border-gray-300 bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-2 text-center"
                    >
                      Ciclo {ciclo}
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
                            subject ? 'bg-[#4dcfd3] text-white border-[#2ab3b7]' : 'bg-gray-50'
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
            <h2 className="text-3xl font-bold mb-4 text-[#1e8f92]">Campo Laboral</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diversas oportunidades en el sector farmacéutico y de salud con excelentes perspectivas de crecimiento
              profesional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Farmacias Comunitarias",
                description: "Atención farmacéutica directa, dispensación y seguimiento farmacoterapéutico",
                icon: Building2,
              },
              {
                title: "Hospitales y Clínicas",
                description: "Farmacia hospitalaria, farmacotecnia y atención farmacéutica especializada",
                icon: Target,
              },
              {
                title: "Laboratorios Clínicos",
                description: "Análisis clínicos especializados, control de calidad y diagnóstico",
                icon: Microscope,
              },
              {
                title: "Industria Farmacéutica",
                description: "Investigación, desarrollo, producción y control de medicamentos",
                icon: Flask,
              },
              {
                title: "Control de Calidad",
                description: "Validación de métodos, análisis fisicoquímicos y microbiológicos",
                icon: Award,
              },
              {
                title: "Investigación y Desarrollo",
                description: "I+D farmacéutico, química medicinal y desarrollo de nuevos fármacos",
                icon: Atom,
              },
              {
                title: "Regulación Sanitaria",
                description: "Entidades regulatorias, registro sanitario y farmacovigilancia",
                icon: Users,
              },
              {
                title: "Consultoría Farmacéutica",
                description: "Asesoría técnica, auditorías y consultoría especializada",
                icon: GraduationCap,
              },
              {
                title: "Docencia Universitaria",
                description: "Formación académica e investigación en ciencias farmacéuticas",
                icon: BookOpen,
              },
              {
                title: "Farmacovigilancia",
                description: "Monitoreo de seguridad de medicamentos y reacciones adversas",
                icon: Zap,
              },
              {
                title: "Análisis Toxicológicos",
                description: "Toxicología clínica, forense y evaluación de riesgos",
                icon: Beaker,
              },
              {
                title: "Biotecnología Farmacéutica",
                description: "Desarrollo de biofármacos y tecnologías farmacéuticas avanzadas",
                icon: Pill,
              },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full border-2 border-[#edfcfc]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#d6f5f6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <field.icon className="w-6 h-6 text-[#4dcfd3]" />
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
      <section className="py-16 bg-[#f2fafa]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-[#b3ecee]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1e8f92]">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#4dcfd3]" />
                    <div>
                      <span className="font-medium">Coordinación Académica</span>
                      <p className="text-sm text-gray-600">+51 945 987 048</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#4dcfd3]" />
                    <div>
                      <span className="font-medium">Correo Electrónico</span>
                      <p className="text-sm text-gray-600">informes@unidx.edu.pe</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#4dcfd3]" />
                    <div>
                      <span className="font-medium">Ubicación</span>
                      <p className="text-sm text-gray-600">Av. Bolivia 626, Lima 15082, Perú</p>
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
              <Card className="border-2 border-[#b3ecee]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1e8f92]">Recursos y Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-[#4dcfd3] hover:bg-[#2ab3b7] text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Malla Curricular
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#80dfe1] hover:bg-[#f2fafa] bg-transparent"
                    onClick={() => setInfoDialogOpen(true)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Solicitar Información Detallada
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#80dfe1] hover:bg-[#f2fafa] bg-transparent"
                    onClick={() => setAdmissionDialogOpen(true)}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Proceso de Admisión
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#80dfe1] hover:bg-[#f2fafa] bg-transparent"
                    onClick={() => setVisitDialogOpen(true)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Agendar Visita a Laboratorios
                  </Button>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 text-center">
                      ¿Interesado en conocer más sobre nuestros laboratorios y equipos especializados? Agenda una visita
                      guiada.
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="Tu número de teléfono" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Información de Interés</label>
              <select className="w-full p-2 border rounded-md">
                <option>Plan de estudios completo</option>
                <option>Laboratorios y equipos</option>
                <option>Costos y financiamiento</option>
                <option>Requisitos de admisión</option>
                <option>Prácticas profesionales</option>
                <option>Campo laboral</option>
              </select>
            </div>
            <Button className="w-full bg-[#4dcfd3] hover:bg-[#2ab3b7] text-white">Enviar Solicitud</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admission Process Dialog */}
      <Dialog open={admissionDialogOpen} onOpenChange={setAdmissionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center space-x-2 text-xl">
              <Calendar className="h-6 w-6 text-[#4dcfd3]" />
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
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="font-medium text-blue-900 text-sm mb-2">Información y Consultas</p>
                  <div className="space-y-1 text-xs text-blue-800">
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
                  className="w-full bg-[#4dcfd3] hover:bg-[#2ab3b7] text-white"
                  onClick={() => setAdmissionDialogOpen(false)}
                >
                  Entendido
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Laboratory Visit Dialog */}
      <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Visita a Laboratorios</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="Tu número de teléfono" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha Preferida</label>
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Horario Preferido</label>
              <select className="w-full p-2 border rounded-md">
                <option>Mañana (8:00 AM - 12:00 PM)</option>
                <option>Tarde (2:00 PM - 6:00 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Laboratorios de Interés</label>
              <select className="w-full p-2 border rounded-md">
                <option>Todos los laboratorios</option>
                <option>Química Analítica</option>
                <option>Análisis Clínicos</option>
                <option>Farmacología</option>
                <option>Microbiología</option>
                <option>Control de Calidad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número de Acompañantes</label>
              <select className="w-full p-2 border rounded-md">
                <option>Solo yo</option>
                <option>1 acompañante</option>
                <option>2 acompañantes</option>
                <option>3 o más acompañantes</option>
              </select>
            </div>
            <Button className="w-full bg-[#4dcfd3] hover:bg-[#2ab3b7] text-white">Agendar Visita</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ModernFooter />
    </div>
  )
}
