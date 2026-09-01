"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ModernNavigation } from "@/components/modern-navigation"
import { ModernFooter } from "@/components/modern-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Scale,
  Heart,
  BookOpen,
  MessageSquare,
  Send,
  Download,
  Eye,
  UserCheck,
  Gavel,
  HelpCircle,
} from "lucide-react"

export default function DefensoriaPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoConsulta: "",
    asunto: "",
    descripcion: "",
    anonimo: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [numeroConsulta, setNumeroConsulta] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/defensoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setNumeroConsulta(result.numeroConsulta)
        setIsSubmitted(true)
      } else {
        alert(result.error || 'Error al enviar la consulta')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión al enviar la consulta')
    } finally {
      setIsSubmitting(false)
    }
  }

  const servicios = [
    {
      icon: Shield,
      title: "Protección de Derechos",
      description:
        "Defensa y protección de los derechos fundamentales de estudiantes, docentes y personal administrativo.",
    },
    {
      icon: Scale,
      title: "Mediación y Conciliación",
      description: "Resolución pacífica de conflictos mediante procesos de mediación entre las partes involucradas.",
    },
    {
      icon: FileText,
      title: "Asesoría Legal",
      description:
        "Orientación jurídica gratuita en temas relacionados con la vida universitaria y derechos estudiantiles.",
    },
    {
      icon: Users,
      title: "Atención a Quejas",
      description: "Recepción, investigación y seguimiento de quejas y denuncias de la comunidad universitaria.",
    },
    {
      icon: Heart,
      title: "Apoyo Psicológico",
      description: "Contención emocional y derivación a servicios especializados en casos que lo requieran.",
    },
    {
      icon: BookOpen,
      title: "Capacitación",
      description: "Talleres y charlas sobre derechos, deberes y convivencia en el ámbito universitario.",
    },
  ]

  const tiposConsulta = [
    "Discriminación",
    "Acoso académico",
    "Acoso laboral",
    "Problemas académicos",
    "Conflictos interpersonales",
    "Violación de derechos",
    "Consulta general",
    "Otro",
  ]

  const estadisticas = [
    { numero: "1,247", label: "Casos Atendidos", icon: FileText },
    { numero: "94%", label: "Casos Resueltos", icon: CheckCircle },
    { numero: "48h", label: "Tiempo Promedio de Respuesta", icon: Clock },
    { numero: "15", label: "Años de Servicio", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Defensoría Universitaria</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Protegemos y defendemos los derechos de toda la comunidad universitaria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3"
                onClick={() => document.getElementById("consulta")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Realizar Consulta
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Eye className="h-5 w-5 mr-2" />
                Ver Servicios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {estadisticas.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.numero}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Principal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es la Defensoría Universitaria?</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  La Defensoría Universitaria es un órgano autónomo e independiente que tiene como misión velar por el
                  respeto de los derechos y deberes de los miembros de la comunidad universitaria, promoviendo la
                  justicia, equidad y transparencia en todas las relaciones institucionales.
                </p>
                <p>
                  Nuestro compromiso es brindar un servicio gratuito, confidencial y especializado para resolver
                  conflictos, atender quejas y garantizar que todos los miembros de nuestra comunidad puedan
                  desarrollarse en un ambiente de respeto mutuo.
                </p>
                <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-900">Principios Fundamentales</p>
                    <p className="text-blue-700 text-sm">
                      Independencia, imparcialidad, confidencialidad, gratuidad y accesibilidad.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+51 945 987 048</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">defensoria.universitaria@unidx.edu.pe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ubicación</p>
                    <p className="text-gray-600">Av. Bolivia 626, Lima 15082, Perú</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">  
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Horario de Atención</p>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios para garantizar el bienestar de nuestra comunidad universitaria
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <servicio.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{servicio.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{servicio.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Consulta */}
      <section id="consulta" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Realizar una Consulta</h2>
            <p className="text-xl text-gray-600">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad
            </p>
          </motion.div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Formulario de Consulta</span>
              </CardTitle>
              <CardDescription>
                Todos los campos marcados con * son obligatorios. Tu información será tratada de forma confidencial.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Ingresa tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu.email@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+51 999 999 999"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoConsulta">Tipo de Consulta *</Label>
                    <Select onValueChange={(value) => handleInputChange("tipoConsulta", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposConsulta.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto *</Label>
                  <Input
                    id="asunto"
                    value={formData.asunto}
                    onChange={(e) => handleInputChange("asunto", e.target.value)}
                    placeholder="Resumen breve de tu consulta"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción Detallada *</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                    placeholder="Describe detalladamente tu consulta, incluyendo fechas, personas involucradas y cualquier información relevante..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonimo"
                    checked={formData.anonimo}
                    onChange={(e) => handleInputChange("anonimo", e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="anonimo" className="text-sm">
                    Deseo mantener mi consulta de forma anónima
                  </Label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Confidencialidad Garantizada</p>
                      <p>
                        Toda la información proporcionada será tratada con estricta confidencialidad y solo será
                        utilizada para el procesamiento de tu consulta.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Consulta
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Message */}
      {isSubmitted && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 bg-green-50"
        >
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">Consulta Enviada Exitosamente</h2>
            <p className="text-green-700 mb-6">
              Tu consulta ha sido registrada con el número <strong>{numeroConsulta}</strong>
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué sigue ahora?</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Tu consulta será evaluada por el Defensor Universitario</li>
                <li>• Recibirás una respuesta en los próximos días hábiles</li>
                <li>• Si requiere reunión presencial, se te contactará para coordinar</li>
                {!formData.anonimo && <li>• Toda comunicación será a través del correo: {formData.email}</li>}
              </ul>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  nombre: "",
                  email: "",
                  telefono: "",
                  tipoConsulta: "",
                  asunto: "",
                  descripcion: "",
                  anonimo: false,
                })
              }} 
              className="mr-4"
            >
              Realizar Otra Consulta
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Volver al Inicio
            </Button>
          </div>
        </motion.section>
      )}

      {/* Recursos y Documentos */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos y Documentos</h2>
            <p className="text-xl text-gray-600">Accede a información importante sobre tus derechos y procedimientos</p>
          </motion.div>

          <Tabs defaultValue="derechos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="derechos">Derechos y Deberes</TabsTrigger>
              <TabsTrigger value="procedimientos">Procedimientos</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="derechos" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <span>Derechos de los Estudiantes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Recibir educación de calidad</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ser tratado con respeto y dignidad</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Participar en la vida universitaria</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Acceder a servicios de bienestar</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Presentar quejas y reclamos</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gavel className="h-5 w-5 text-blue-600" />
                      <span>Deberes de los Estudiantes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Cumplir con las normas académicas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Respetar a la comunidad universitaria</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Cuidar las instalaciones</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Mantener conducta ética</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Cumplir con obligaciones académicas</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="procedimientos" className="mt-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Proceso de Atención de Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Recepción de la Consulta</h4>
                          <p className="text-gray-600 text-sm">Se recibe y registra la consulta en nuestro sistema</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Evaluación Inicial</h4>
                          <p className="text-gray-600 text-sm">
                            Se evalúa la consulta y se determina el procedimiento a seguir
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Investigación</h4>
                          <p className="text-gray-600 text-sm">Se realiza la investigación correspondiente del caso</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Resolución</h4>
                          <p className="text-gray-600 text-sm">Se propone una solución y se comunica al consultante</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Download className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Reglamento de la Defensoría</h3>
                        <p className="text-gray-600 text-sm">Normativa que rige el funcionamiento</p>
                        <Badge variant="secondary" className="mt-2">
                          PDF - 2.3 MB
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Download className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Código de Ética Universitaria</h3>
                        <p className="text-gray-600 text-sm">Principios éticos institucionales</p>
                        <Badge variant="secondary" className="mt-2">
                          PDF - 1.8 MB
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Download className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Guía de Procedimientos</h3>
                        <p className="text-gray-600 text-sm">Manual de procesos y trámites</p>
                        <Badge variant="secondary" className="mt-2">
                          PDF - 3.1 MB
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Download className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Formularios</h3>
                        <p className="text-gray-600 text-sm">Formatos para consultas y denuncias</p>
                        <Badge variant="secondary" className="mt-2">
                          ZIP - 0.8 MB
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600">Encuentra respuestas a las consultas más comunes</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                pregunta: "¿Cuánto tiempo toma resolver una consulta?",
                respuesta:
                  "El tiempo promedio de respuesta es de 48 horas para consultas generales. Los casos complejos pueden tomar hasta 15 días hábiles.",
              },
              {
                pregunta: "¿Puedo presentar una consulta de forma anónima?",
                respuesta:
                  "Sí, puedes presentar tu consulta de forma anónima. Sin embargo, esto puede limitar nuestra capacidad de seguimiento y comunicación contigo.",
              },
              {
                pregunta: "¿Qué tipos de casos no puede atender la Defensoría?",
                respuesta:
                  "No podemos atender casos que estén en proceso judicial, asuntos de carácter académico que correspondan a otras instancias, o consultas fuera del ámbito universitario.",
              },
              {
                pregunta: "¿El servicio tiene algún costo?",
                respuesta:
                  "No, todos nuestros servicios son completamente gratuitos para toda la comunidad universitaria.",
              },
              {
                pregunta: "¿Cómo puedo hacer seguimiento a mi consulta?",
                respuesta:
                  "Una vez presentada tu consulta, recibirás un número de caso que podrás usar para hacer seguimiento vía email o teléfono.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{faq.pregunta}</h3>
                      <p className="text-gray-600 text-sm">{faq.respuesta}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}
