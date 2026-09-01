"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Microscope,
  FlaskConical,
  Heart,
  Pill,
  Target,
  Clock,
  Building,
  Search,
  Calendar,
  User,
  FileText,
  ExternalLink,
  Download,
  Eye,
} from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"
import { ModernFooter } from "@/components/modern-footer"
import { LanguageProvider } from "@/components/language-provider"

export default function InvestigacionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState("all")

  // Base data - all projects
  const allProjects = [
    // Farmacología y Toxicología
    {
      title: "Evaluación de la Actividad Antimicrobiana de Extractos de Plantas Medicinales Peruanas",
      researcher: "Dr. María González Pérez",
      area: "Farmacología y Toxicología",
      status: "En desarrollo",
      duration: "2024-2026",
      funding: "CONCYTEC",
      progress: 65,
      description:
        "Investigación sobre las propiedades antimicrobianas de plantas medicinales nativas del Perú para el desarrollo de nuevos tratamientos contra bacterias resistentes.",
    },
    {
      title: "Desarrollo de Nanopartículas para Liberación Controlada de Fármacos",
      researcher: "Dr. Carlos Mendoza Silva",
      area: "Farmacología y Toxicología",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "FONDECYT",
      progress: 40,
      description:
        "Investigación en nanotecnología aplicada al desarrollo de sistemas de liberación controlada de medicamentos oncológicos.",
    },
    {
      title: "Toxicidad de Metales Pesados en Sistemas Biológicos",
      researcher: "Dra. Elena Vargas López",
      area: "Farmacología y Toxicología",
      status: "En desarrollo",
      duration: "2023-2025",
      funding: "Universidad",
      progress: 80,
      description:
        "Evaluación de los efectos tóxicos de metales pesados en diferentes sistemas biológicos y desarrollo de antídotos.",
    },
    {
      title: "Síntesis de Nuevos Compuestos Antitumorales",
      researcher: "Dr. María González Pérez",
      area: "Farmacología y Toxicología",
      status: "Finalizado",
      duration: "2022-2024",
      funding: "CONCYTEC",
      progress: 100,
      description:
        "Desarrollo y síntesis de nuevos compuestos con actividad antitumoral basados en productos naturales peruanos.",
      documentation: {
        type: "publication",
        title: "Synthesis and Antitumor Activity of Novel Compounds from Peruvian Natural Products",
        journal: "Journal of Natural Products",
        doi: "10.1021/acs.jnatprod.2024.00123",
        url: "https://pubs.acs.org/doi/10.1021/acs.jnatprod.2024.00123",
        pdfUrl: "/documents/antitumor-compounds-2024.pdf",
        abstract:
          "Este estudio presenta la síntesis y evaluación de la actividad antitumoral de nuevos compuestos derivados de productos naturales peruanos. Los resultados muestran una actividad prometedora contra líneas celulares de cáncer de mama y próstata.",
        keywords: ["Productos naturales", "Actividad antitumoral", "Síntesis orgánica", "Cáncer"],
        citationCount: 15,
        impactFactor: 4.2,
      },
    },
    // Salud Pública y Epidemiología
    {
      title: "Impacto de la Telemedicina en la Atención Primaria de Salud Rural",
      researcher: "Dra. Ana Rodríguez López",
      area: "Salud Pública y Epidemiología",
      status: "Finalizado",
      duration: "2023-2024",
      funding: "Universidad",
      progress: 100,
      description:
        "Evaluación del impacto de la implementación de telemedicina en comunidades rurales del interior del país.",
      documentation: {
        type: "report",
        title: "Impacto de la Telemedicina en Comunidades Rurales del Perú: Informe Final",
        institution: "Centro de Investigación UNID",
        reportNumber: "CI-UNID-2024-001",
        url: "https://repositorio.unidx.edu.pe/handle/123456789/001",
        pdfUrl: "/documents/telemedicina-rural-2024.pdf",
        abstract:
          "Informe completo sobre la implementación y evaluación del impacto de la telemedicina en 15 comunidades rurales de la sierra peruana, incluyendo análisis de costos, beneficios y recomendaciones para políticas públicas.",
        keywords: ["Telemedicina", "Salud rural", "Atención primaria", "Políticas de salud"],
        pages: 156,
        language: "Español",
      },
    },
    {
      title: "Factores de Riesgo Cardiovascular en Población Urbana",
      researcher: "Dr. Roberto Silva Martín",
      area: "Salud Pública y Epidemiología",
      status: "En desarrollo",
      duration: "2024-2026",
      funding: "MINSA",
      progress: 30,
      description:
        "Estudio epidemiológico sobre factores de riesgo cardiovascular en población urbana de Lima Metropolitana.",
    },
    {
      title: "Evaluación de Programas de Vacunación en Comunidades Rurales",
      researcher: "Mg. Carmen Torres Ruiz",
      area: "Salud Pública y Epidemiología",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "OPS",
      progress: 55,
      description: "Análisis de la efectividad de programas de vacunación en comunidades rurales de la sierra peruana.",
    },
    {
      title: "Prevalencia de Diabetes en Adultos Mayores",
      researcher: "Dra. Ana Rodríguez López",
      area: "Salud Pública y Epidemiología",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "Universidad",
      progress: 70,
      description:
        "Estudio de prevalencia y factores asociados a diabetes mellitus tipo 2 en adultos mayores de 65 años.",
    },
    // Biotecnología Farmacéutica
    {
      title: "Producción de Insulina Recombinante en Sistemas de Expresión",
      researcher: "Dr. Luis Herrera Castro",
      area: "Biotecnología Farmacéutica",
      status: "En desarrollo",
      duration: "2024-2026",
      funding: "CONCYTEC",
      progress: 45,
      description: "Desarrollo de sistemas de expresión eficientes para la producción de insulina humana recombinante.",
    },
    {
      title: "Desarrollo de Vacunas Biotecnológicas",
      researcher: "Dra. Patricia Morales Vega",
      area: "Biotecnología Farmacéutica",
      status: "En desarrollo",
      duration: "2023-2025",
      funding: "FONDECYT",
      progress: 60,
      description: "Investigación en el desarrollo de vacunas recombinantes contra enfermedades tropicales endémicas.",
    },
    {
      title: "Optimización de Procesos Fermentativos para Antibióticos",
      researcher: "Dr. Fernando Díaz Rojas",
      area: "Biotecnología Farmacéutica",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "Universidad",
      progress: 35,
      description: "Optimización de procesos biotecnológicos para la producción de antibióticos mediante fermentación.",
    },
    // Cuidados de Enfermería
    {
      title: "Calidad de Vida en Pacientes con Enfermedades Crónicas",
      researcher: "Mg. Patricia Silva Vargas",
      area: "Cuidados de Enfermería",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "Universidad",
      progress: 75,
      description: "Estudio sobre factores que influyen en la calidad de vida de pacientes con enfermedades crónicas.",
    },
    {
      title: "Protocolos de Cuidados Post-Quirúrgicos",
      researcher: "Mg. Rosa Mendoza Flores",
      area: "Cuidados de Enfermería",
      status: "En desarrollo",
      duration: "2024-2026",
      funding: "MINSA",
      progress: 50,
      description: "Desarrollo de protocolos estandarizados para cuidados de enfermería en el período post-quirúrgico.",
    },
    {
      title: "Intervenciones de Enfermería en Salud Mental",
      researcher: "Lic. Jorge Ramírez Soto",
      area: "Cuidados de Enfermería",
      status: "Finalizado",
      duration: "2023-2025",
      funding: "Universidad",
      progress: 100,
      description:
        "Evaluación de intervenciones de enfermería especializadas en pacientes con trastornos de salud mental.",
      documentation: {
        type: "thesis",
        title: "Intervenciones de Enfermería Basadas en Evidencia para Pacientes con Trastornos de Salud Mental",
        degree: "Maestría en Enfermería en Salud Mental",
        institution: "Universidad UNID",
        advisor: "Mg. Patricia Silva Vargas",
        url: "https://repositorio.unidx.edu.pe/handle/123456789/002",
        pdfUrl: "/documents/enfermeria-salud-mental-2025.pdf",
        abstract:
          "Esta investigación evalúa la efectividad de intervenciones de enfermería especializadas en el cuidado de pacientes con trastornos de salud mental, proporcionando evidencia para mejorar la práctica clínica.",
        keywords: ["Enfermería", "Salud mental", "Intervenciones", "Práctica basada en evidencia"],
        pages: 198,
        language: "Español",
        defenseDate: "2025-01-15",
      },
    },
    // Plantas Medicinales
    {
      title: "Actividad Antioxidante de Plantas Amazónicas",
      researcher: "Dr. Miguel Ángel Ruiz",
      area: "Plantas Medicinales",
      status: "En desarrollo",
      duration: "2024-2026",
      funding: "SERNANP",
      progress: 40,
      description:
        "Evaluación de la actividad antioxidante de especies vegetales amazónicas con potencial farmacológico.",
    },
    {
      title: "Desarrollo de Fitomedicamentos Antiinflamatorios",
      researcher: "Dra. Isabel Campos Vera",
      area: "Plantas Medicinales",
      status: "En desarrollo",
      duration: "2024-2025",
      funding: "CONCYTEC",
      progress: 60,
      description:
        "Desarrollo de medicamentos a base de plantas con propiedades antiinflamatorias comprobadas científicamente.",
    },
    {
      title: "Conservación de Especies Medicinales en Peligro",
      researcher: "Mg. Daniel Paredes Luna",
      area: "Plantas Medicinales",
      status: "Finalizado",
      duration: "2023-2026",
      funding: "MINAM",
      progress: 100,
      description:
        "Programa de conservación ex-situ e in-situ de especies medicinales peruanas en peligro de extinción.",
      documentation: {
        type: "database",
        title: "Base de Datos de Especies Medicinales Peruanas en Peligro de Extinción",
        platform: "Herbario Virtual UNID",
        url: "https://herbario.unidx.edu.pe/especies-peligro",
        accessType: "Público",
        abstract:
          "Base de datos completa con información taxonómica, distribución geográfica, usos tradicionales y estado de conservación de 127 especies medicinales peruanas en peligro de extinción.",
        keywords: ["Plantas medicinales", "Conservación", "Biodiversidad", "Etnobotánica"],
        recordCount: 127,
        lastUpdate: "2024-12-01",
      },
    },
  ]

  // Base data - all researchers
  const allResearchers = [
    // Farmacología y Toxicología
    {
      name: "Dr. María González Pérez",
      position: "Directora de Línea",
      specialization: "Farmacología Clínica",
      email: "mgonzalez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Farmacología y Toxicología",
    },
    {
      name: "Dr. Carlos Mendoza Silva",
      position: "Investigador Principal",
      specialization: "Toxicología Farmacéutica",
      email: "cmendoza@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Farmacología y Toxicología",
    },
    {
      name: "Dra. Elena Vargas López",
      position: "Investigadora Asociada",
      specialization: "Fitofarmacología",
      email: "evargas@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Farmacología y Toxicología",
    },
    {
      name: "Lic. Sofia Castro Torres",
      position: "Investigadora Junior",
      specialization: "Farmacocinética",
      email: "scastro@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Farmacología y Toxicología",
    },
    {
      name: "Tec. Juan Perez Ruiz",
      position: "Técnico de Laboratorio",
      specialization: "Análisis Toxicológico",
      email: "jperez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Farmacología y Toxicología",
    },
    // Salud Pública y Epidemiología
    {
      name: "Dra. Ana Rodríguez López",
      position: "Directora de Línea",
      specialization: "Epidemiología",
      email: "arodriguez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Salud Pública y Epidemiología",
    },
    {
      name: "Dr. Roberto Silva Martín",
      position: "Investigador Principal",
      specialization: "Salud Comunitaria",
      email: "rsilva@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Salud Pública y Epidemiología",
    },
    {
      name: "Mg. Carmen Torres Ruiz",
      position: "Investigadora Asociada",
      specialization: "Políticas de Salud",
      email: "ctorres@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Salud Pública y Epidemiología",
    },
    {
      name: "Lic. Pedro Gonzales Mejia",
      position: "Investigador Junior",
      specialization: "Salud Ambiental",
      email: "pgonzales@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Salud Pública y Epidemiología",
    },
    {
      name: "Est. Andrea Benavides Caldas",
      position: "Asistente de Investigación",
      specialization: "Bioestadística",
      email: "abenavides@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Salud Pública y Epidemiología",
    },
    // Biotecnología Farmacéutica
    {
      name: "Dr. Luis Herrera Castro",
      position: "Director de Línea",
      specialization: "Biotecnología Molecular",
      email: "lherrera@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Biotecnología Farmacéutica",
    },
    {
      name: "Dra. Patricia Morales Vega",
      position: "Investigadora Principal",
      specialization: "Ingeniería de Proteínas",
      email: "pmorales@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Biotecnología Farmacéutica",
    },
    {
      name: "Dr. Fernando Díaz Rojas",
      position: "Investigador Asociado",
      specialization: "Biofármacos",
      email: "fdiaz@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Biotecnología Farmacéutica",
    },
    {
      name: "Ing. Rosa Sanchez Leon",
      position: "Investigadora Junior",
      specialization: "Cultivo Celular",
      email: "rsanchez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Biotecnología Farmacéutica",
    },
    {
      name: "Tec. Javier Torres del Mar",
      position: "Técnico de Laboratorio",
      specialization: "Análisis Genético",
      email: "jtorres@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Biotecnología Farmacéutica",
    },
    // Cuidados de Enfermería
    {
      name: "Mg. Patricia Silva Vargas",
      position: "Directora de Línea",
      specialization: "Cuidados Críticos",
      email: "psilva@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Cuidados de Enfermería",
    },
    {
      name: "Mg. Rosa Mendoza Flores",
      position: "Investigadora Principal",
      specialization: "Enfermería Comunitaria",
      email: "rmendoza@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Cuidados de Enfermería",
    },
    {
      name: "Lic. Jorge Ramírez Soto",
      position: "Investigador Asociado",
      specialization: "Cuidados Paliativos",
      email: "jramirez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Cuidados de Enfermería",
    },
    {
      name: "Lic. Ana Maria Perez de Cuellar",
      position: "Investigadora Junior",
      specialization: "Salud Mental",
      email: "aperez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Cuidados de Enfermería",
    },
    {
      name: "Tec. Luis Quispe Prado",
      position: "Técnico de Enfermería",
      specialization: "Atención Primaria",
      email: "lquispe@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Cuidados de Enfermería",
    },
    // Plantas Medicinales
    {
      name: "Dr. Miguel Ángel Ruiz",
      position: "Director de Línea",
      specialization: "Fitoquímica",
      email: "maruiz@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Plantas Medicinales",
    },
    {
      name: "Dra. Isabel Campos Vera",
      position: "Investigadora Principal",
      specialization: "Etnobotánica",
      email: "icampos@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Plantas Medicinales",
    },
    {
      name: "Mg. Daniel Paredes Luna",
      position: "Investigador Asociado",
      specialization: "Productos Naturales",
      email: "dparedes@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Plantas Medicinales",
    },
    {
      name: "Biol. Carla Mendoza Perez",
      position: "Investigadora Junior",
      specialization: "Biodiversidad",
      email: "cmendoza@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Plantas Medicinales",
    },
    {
      name: "Tec. Raul Gomez Diaz",
      position: "Técnico de Laboratorio",
      specialization: "Extracción de Productos Naturales",
      email: "rgomez@unidx.edu.pe",
      image: "/placeholder.svg?height=60&width=60",
      area: "Plantas Medicinales",
    },
  ]

  // Publications data
  const publications = [
    {
      title: "Antimicrobial Activity of Peruvian Medicinal Plants Against Resistant Bacteria",
      authors: "González-Pérez, M., Vargas-López, E., Castro-Torres, S.",
      journal: "Journal of Ethnopharmacology",
      year: 2024,
      area: "Farmacología y Toxicología",
    },
    {
      title: "Telemedicine Impact on Rural Primary Healthcare in Peru",
      authors: "Rodríguez-López, A., Silva-Martín, R., Torres-Ruiz, C.",
      journal: "International Journal of Medical Informatics",
      year: 2024,
      area: "Salud Pública y Epidemiología",
    },
  ]

  // Calculate dynamic statistics
  const stats = useMemo(() => {
    const totalProjects = allProjects.length
    const totalResearchers = allResearchers.length
    const totalPublications = publications.length
    const researchLines = [...new Set(allProjects.map((p) => p.area))].length

    return [
      {
        icon: BookOpen,
        number: totalProjects.toString(),
        label: "Proyectos de Investigación",
        description: "Proyectos totales",
      },
      {
        icon: Users,
        number: totalResearchers.toString(),
        label: "Investigadores",
        description: "Docentes investigadores",
      },
      {
        icon: Award,
        number: totalPublications.toString(),
        label: "Publicaciones",
        description: "En revistas indexadas",
      },
      {
        icon: TrendingUp,
        number: researchLines.toString(),
        label: "Líneas de Investigación",
        description: "Áreas especializadas",
      },
    ]
  }, [allProjects, allResearchers, publications])

  // Calculate research lines with dynamic data
  const researchLines = useMemo(() => {
    const areas = [...new Set(allProjects.map((p) => p.area))]

    return areas.map((area) => {
      const areaProjects = allProjects.filter((p) => p.area === area)
      const areaResearchers = allResearchers.filter((r) => r.area === area)
      const finishedProjects = areaProjects.filter((p) => p.status === "Finalizado")

      const getIcon = (area: string) => {
        switch (area) {
          case "Farmacología y Toxicología":
            return Pill
          case "Salud Pública y Epidemiología":
            return Heart
          case "Biotecnología Farmacéutica":
            return FlaskConical
          case "Cuidados de Enfermería":
            return Microscope
          case "Plantas Medicinales":
            return BookOpen
          default:
            return BookOpen
        }
      }

      const getColor = (area: string) => {
        switch (area) {
          case "Farmacología y Toxicología":
            return "bg-blue-500"
          case "Salud Pública y Epidemiología":
            return "bg-red-500"
          case "Biotecnología Farmacéutica":
            return "bg-green-500"
          case "Cuidados de Enfermería":
            return "bg-purple-500"
          case "Plantas Medicinales":
            return "bg-emerald-500"
          default:
            return "bg-gray-500"
        }
      }

      const getDescription = (area: string) => {
        switch (area) {
          case "Farmacología y Toxicología":
            return "Investigación en efectos farmacológicos y toxicológicos de compuestos naturales y sintéticos, desarrollo de nuevos fármacos y evaluación de seguridad."
          case "Salud Pública y Epidemiología":
            return "Estudios epidemiológicos, investigación en salud comunitaria, análisis de políticas de salud y evaluación de intervenciones en salud pública."
          case "Biotecnología Farmacéutica":
            return "Desarrollo de productos biotecnológicos, ingeniería de proteínas, producción de biofármacos y aplicaciones de la biotecnología en la industria farmacéutica."
          case "Cuidados de Enfermería":
            return "Investigación en cuidados especializados, práctica basada en evidencia, calidad de atención y desarrollo de protocolos de enfermería."
          case "Plantas Medicinales":
            return "Estudio de propiedades medicinales de plantas nativas, desarrollo de fitomedicamentos y conservación de recursos naturales medicinales."
          default:
            return ""
        }
      }

      return {
        title: area,
        description: getDescription(area),
        icon: getIcon(area),
        projects: areaProjects.length,
        color: getColor(area),
        researchers: areaResearchers,
        highlightedProjects: finishedProjects,
      }
    })
  }, [allProjects, allResearchers])

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.area.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = selectedArea === "all" || project.area.toLowerCase().includes(selectedArea.toLowerCase())
    return matchesSearch && matchesArea
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getDocumentationIcon = (type: string) => {
    switch (type) {
      case "publication":
        return Award
      case "report":
        return FileText
      case "thesis":
        return BookOpen
      case "database":
        return Target
      default:
        return FileText
    }
  }

  const getDocumentationTypeLabel = (type: string) => {
    switch (type) {
      case "publication":
        return "Publicación Científica"
      case "report":
        return "Informe Técnico"
      case "thesis":
        return "Tesis"
      case "database":
        return "Base de Datos"
      default:
        return "Documento"
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <ModernNavigation />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6">
                <Microscope className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Centro de Investigación UNID</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Líneas de<span className="block text-blue-300">Investigación</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Nuestras líneas de investigación están alineadas con las necesidades de salud del país y las tendencias
                científicas internacionales
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  onClick={() => scrollToSection("research-lines")}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explorar Líneas
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 bg-transparent"
                    >
                      <Target className="h-5 w-5 mr-2" />
                      Ver Todos los Proyectos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Todos los Proyectos de Investigación</DialogTitle>
                      <DialogDescription>
                        Explora todos nuestros {allProjects.length} proyectos de investigación activos y finalizados
                      </DialogDescription>
                    </DialogHeader>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Buscar proyectos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedArea} onValueChange={setSelectedArea}>
                        <SelectTrigger className="w-full md:w-64">
                          <SelectValue placeholder="Área de investigación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas las áreas</SelectItem>
                          {researchLines.map((line) => (
                            <SelectItem key={line.title} value={line.title.toLowerCase()}>
                              {line.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-96 overflow-y-auto">
                      {filteredProjects.map((project, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                variant={project.status === "Finalizado" ? "default" : "secondary"}
                                className="mb-2"
                              >
                                {project.status}
                              </Badge>
                              <div className="text-right text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {project.duration}
                                </div>
                                <div className="font-medium">{project.funding}</div>
                              </div>
                            </div>
                            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                            <CardDescription className="text-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <User className="h-4 w-4" />
                                <span>{project.researcher}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Target className="h-4 w-4" />
                                <span>{project.area}</span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progreso</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            {project.documentation && (
                              <div className="mt-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium">Documentación disponible</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => window.open(project.documentation.url, "_blank")}
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      Ver
                                    </Button>
                                    {project.documentation.pdfUrl && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(project.documentation.pdfUrl, "_blank")}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        PDF
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredProjects.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No se encontraron proyectos que coincidan con los criterios de búsqueda.
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="font-semibold text-gray-700 mb-1">{stat.label}</div>
                      <div className="text-sm text-gray-500">{stat.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Lines Section */}
        <section id="research-lines" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestras Líneas de Investigación</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada línea cuenta con investigadores especializados y proyectos activos que contribuyen al avance
                científico en ciencias de la salud
              </p>
            </motion.div>

            <div className="space-y-12">
              {researchLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 ${line.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <line.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-2xl text-gray-900">{line.title}</CardTitle>
                            <Badge variant="secondary" className="text-sm">
                              {line.projects} proyectos
                            </Badge>
                          </div>
                          <CardDescription className="text-base leading-relaxed">{line.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Researchers */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-blue-600" />
                            Equipo de Investigadores ({line.researchers.length})
                          </h4>
                          <div className="space-y-4">
                            {line.researchers.map((researcher, resIndex) => (
                              <div key={resIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                  <img
                                    src={researcher.image || "/placeholder.svg"}
                                    alt={researcher.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{researcher.name}</div>
                                  <div className="text-sm text-blue-600">{researcher.position}</div>
                                  <div className="text-sm text-gray-500 truncate">{researcher.specialization}</div>
                                </div>
                                <Button variant="ghost" size="sm" className="flex-shrink-0">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Highlighted Projects */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Target className="h-5 w-5 mr-2 text-blue-600" />
                            Publicaciones Destacadas ({line.highlightedProjects.length})
                          </h4>
                          {line.highlightedProjects.length > 0 ? (
                            <div className="space-y-4">
                              {line.highlightedProjects.map((project, projIndex) => (
                                <Card
                                  key={projIndex}
                                  className="border border-gray-200 bg-white hover:shadow-md transition-shadow"
                                >
                                  <CardContent className="p-4">
                                    <div className="space-y-3">
                                      <div>
                                        <div className="font-medium text-gray-900 text-sm leading-relaxed mb-2">
                                          {project.title}
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <Badge variant="default" className="text-xs">
                                            Finalizado
                                          </Badge>
                                          <div className="text-xs text-gray-500">{project.researcher}</div>
                                        </div>
                                      </div>

                                      {project.documentation && (
                                        <div className="border-t pt-3">
                                          <div className="flex items-center space-x-2 mb-2">
                                            {(() => {
                                              const IconComponent = getDocumentationIcon(project.documentation.type)
                                              return <IconComponent className="h-4 w-4 text-blue-600" />
                                            })()}
                                            <span className="text-sm font-medium text-gray-700">
                                              {getDocumentationTypeLabel(project.documentation.type)}
                                            </span>
                                          </div>

                                          <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                                            {project.documentation.abstract}
                                          </div>

                                          <div className="flex flex-wrap gap-2">
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                                  <Eye className="h-3 w-3 mr-1" />
                                                  Ver Detalles
                                                </Button>
                                              </DialogTrigger>
                                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                                <DialogHeader>
                                                  <DialogTitle className="text-xl leading-tight">
                                                    {project.documentation.title}
                                                  </DialogTitle>
                                                  <DialogDescription>
                                                    {getDocumentationTypeLabel(project.documentation.type)} -{" "}
                                                    {project.researcher}
                                                  </DialogDescription>
                                                </DialogHeader>

                                                <div className="space-y-6">
                                                  {/* Project Info */}
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                                    <div>
                                                      <h4 className="font-semibold text-gray-900 mb-2">
                                                        Información del Proyecto
                                                      </h4>
                                                      <div className="space-y-1 text-sm">
                                                        <div>
                                                          <span className="font-medium">Investigador:</span>{" "}
                                                          {project.researcher}
                                                        </div>
                                                        <div>
                                                          <span className="font-medium">Duración:</span>{" "}
                                                          {project.duration}
                                                        </div>
                                                        <div>
                                                          <span className="font-medium">Financiamiento:</span>{" "}
                                                          {project.funding}
                                                        </div>
                                                        <div>
                                                          <span className="font-medium">Área:</span> {project.area}
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div>
                                                      <h4 className="font-semibold text-gray-900 mb-2">
                                                        Información del Documento
                                                      </h4>
                                                      <div className="space-y-1 text-sm">
                                                        {project.documentation.journal && (
                                                          <div>
                                                            <span className="font-medium">Revista:</span>{" "}
                                                            {project.documentation.journal}
                                                          </div>
                                                        )}
                                                        {project.documentation.institution && (
                                                          <div>
                                                            <span className="font-medium">Institución:</span>{" "}
                                                            {project.documentation.institution}
                                                          </div>
                                                        )}
                                                        {project.documentation.doi && (
                                                          <div>
                                                            <span className="font-medium">DOI:</span>{" "}
                                                            {project.documentation.doi}
                                                          </div>
                                                        )}
                                                        {project.documentation.pages && (
                                                          <div>
                                                            <span className="font-medium">Páginas:</span>{" "}
                                                            {project.documentation.pages}
                                                          </div>
                                                        )}
                                                        {project.documentation.language && (
                                                          <div>
                                                            <span className="font-medium">Idioma:</span>{" "}
                                                            {project.documentation.language}
                                                          </div>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {/* Abstract */}
                                                  <div>
                                                    <h4 className="font-semibold text-gray-900 mb-2">Resumen</h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                      {project.documentation.abstract}
                                                    </p>
                                                  </div>

                                                  {/* Keywords */}
                                                  {project.documentation.keywords && (
                                                    <div>
                                                      <h4 className="font-semibold text-gray-900 mb-2">
                                                        Palabras Clave
                                                      </h4>
                                                      <div className="flex flex-wrap gap-2">
                                                        {project.documentation.keywords.map((keyword, idx) => (
                                                          <Badge key={idx} variant="secondary" className="text-xs">
                                                            {keyword}
                                                          </Badge>
                                                        ))}
                                                      </div>
                                                    </div>
                                                  )}

                                                  {/* Additional Info */}
                                                  {(project.documentation.citationCount ||
                                                    project.documentation.impactFactor ||
                                                    project.documentation.recordCount) && (
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                                                      {project.documentation.citationCount && (
                                                        <div className="text-center">
                                                          <div className="text-2xl font-bold text-blue-600">
                                                            {project.documentation.citationCount}
                                                          </div>
                                                          <div className="text-sm text-gray-600">Citas</div>
                                                        </div>
                                                      )}
                                                      {project.documentation.impactFactor && (
                                                        <div className="text-center">
                                                          <div className="text-2xl font-bold text-blue-600">
                                                            {project.documentation.impactFactor}
                                                          </div>
                                                          <div className="text-sm text-gray-600">Factor de Impacto</div>
                                                        </div>
                                                      )}
                                                      {project.documentation.recordCount && (
                                                        <div className="text-center">
                                                          <div className="text-2xl font-bold text-blue-600">
                                                            {project.documentation.recordCount}
                                                          </div>
                                                          <div className="text-sm text-gray-600">Registros</div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  )}

                                                  {/* Action Buttons */}
                                                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                                                    <Button
                                                      onClick={() => window.open(project.documentation.url, "_blank")}
                                                      className="flex-1 sm:flex-none"
                                                    >
                                                      <ExternalLink className="h-4 w-4 mr-2" />
                                                      Ver en Repositorio
                                                    </Button>
                                                    {project.documentation.pdfUrl && (
                                                      <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                          window.open(project.documentation.pdfUrl, "_blank")
                                                        }
                                                        className="flex-1 sm:flex-none"
                                                      >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Descargar PDF
                                                      </Button>
                                                    )}
                                                  </div>
                                                </div>
                                              </DialogContent>
                                            </Dialog>

                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => window.open(project.documentation.url, "_blank")}
                                              className="text-xs"
                                            >
                                              <ExternalLink className="h-3 w-3 mr-1" />
                                              Repositorio
                                            </Button>

                                            {project.documentation.pdfUrl && (
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => window.open(project.documentation.pdfUrl, "_blank")}
                                                className="text-xs"
                                              >
                                                <Download className="h-3 w-3 mr-1" />
                                                PDF
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <Target className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                              <p>Publicaciones destacadas próximamente</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Colabora con Nosotros</h2>
              <p className="text-xl text-gray-600">
                ¿Interesado en colaborar en alguna línea de investigación? Contáctanos para explorar oportunidades
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Centro de Investigación</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium">Dirección</div>
                      <div className="text-gray-600">
                        Av. Bolivia 626, Lima 15082
                        <br />
                        Lima, Perú
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Teléfono</div>
                      <div className="text-gray-600">+51 945 987 048</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">informes@unidx.edu.pe</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Horario de Atención</div>
                      <div className="text-gray-600">
                        Lunes a Viernes: 8:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un Mensaje</CardTitle>
                  <CardDescription>Completa el formulario y nos pondremos en contacto contigo</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" placeholder="Tu nombre" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="institution">Institución</Label>
                      <Input id="institution" placeholder="Universidad o institución" />
                    </div>

                    <div>
                      <Label htmlFor="research-line">Línea de Investigación de Interés</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una línea" />
                        </SelectTrigger>
                        <SelectContent>
                          {researchLines.map((line) => (
                            <SelectItem key={line.title} value={line.title.toLowerCase()}>
                              {line.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="general">Consulta General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea id="message" placeholder="Describe tu propuesta o consulta..." rows={4} />
                    </div>

                    <Button type="submit" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ModernFooter />
      </div>
    </LanguageProvider>
  )
}
