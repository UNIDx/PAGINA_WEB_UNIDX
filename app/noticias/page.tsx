"use client"

import { useState } from "react"
import Image from "next/image"
import { ModernNavigation } from "@/components/modern-navigation"
import { ModernFooter } from "@/components/modern-footer"
import { Calendar, X, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo de noticias
const newsData: NewsItem[] = [
  {
    id: 6,
    title: "GESTIÓN DE LA INVESTIGACIÓN EN UNID",
    description: "Plataforma para la gestión de la investigación. Rendimiento, seguridad y escalabilidad para tus proyectos editoriales con Servidor Privado y Dedicado, Seguridad Avanzada, Escalabilidad Flexible y Soporte Especializado.",
    image: "https://img.youtube.com/vi/29kR-WpkLjQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/29kR-WpkLjQ?autoplay=1&mute=1&cc_load_policy=0&rel=0&modestbranding=1",
    date: "2026-06-15",
    views: 135,
    type: "video" as const,
  },
  {
    id: 1,
    title: "Inscripciones Abiertas 2026 - Proceso de Admisión",
    description: "Únete a la familia UNIDx. Inscripciones abiertas para el periodo académico 2026. El examen de admisión se realizará el 28 de marzo de 2026. Ofrecemos dos carreras profesionales: Enfermería y Farmacia y Bioquímica. ¡No pierdas esta oportunidad de formar parte de nuestra universidad!",
    image: "/images/noticias/flayer-inscripciones.webp",
    images: ["/images/noticias/flayer-inscripciones.webp"],
    date: "2026-02-10",
    views: 1234,
    type: "image" as const,
  },
  {
    id: 2,
    title: "Alcalde de Breña Felicita a UNIDx por Licenciamiento Institucional",
    description: "El alcalde de Breña, en un emotivo mensaje, felicitó a la Universidad Interamericana para el Desarrollo (UNIDx) por haber obtenido el licenciamiento institucional otorgado por SUNEDU. Este importante logro consolida a UNIDx como una institución de educación superior comprometida con la calidad académica y la formación de profesionales de excelencia. El licenciamiento representa el reconocimiento oficial del cumplimiento de las condiciones básicas de calidad establecidas por el ente rector de la educación superior universitaria en el Perú.",
    image: "/images/noticias/portadavideoalcalde.webp",
    videoUrl: "/video/videoalcalde.mp4",
    date: "2026-02-15",
    views: 856,
    type: "video" as const,
  },
  {
    id: 3,
    title: "Dr. Luis Aguilar se integra a UNIDx: experiencia en Neurociencia y trayectoria en la Antártida",
    description: "El rector de la Universidad UNIDx anunció con gran entusiasmo la incorporación del Dr. Luis Aguilar a nuestro prestigioso claustro académico, compartiendo además sus palabras y destacando su experiencia en la Antártida. El Dr. Aguilar es un reconocido experto en Neurociencia y Comportamiento, cuya vasta experiencia y conocimientos, incluidos los adquiridos en la Antártida, enriquecerán significativamente la formación de nuestros estudiantes. Esta incorporación refuerza el compromiso de UNIDx con la excelencia académica y la calidad educativa, brindando a nuestra comunidad estudiantil acceso a profesionales de primer nivel en sus respectivas áreas de especialización.",
    image: "/images/noticias/portada-video-2.jpeg",
    videoUrl: "https://www.youtube.com/embed/LN4I_REEq1I?playlist=LN4I_REEq1I,zWqFEY9DjjA&autoplay=1",
    date: "2026-02-17",
    views: 245,
    type: "video" as const,
  },
  {
    id: 4,
    title: "Dr. Luis Aguilar Mendoza: Investigador Renacyt II se Incorpora a UNIDx",
    description: "La Universidad Interamericana para el Desarrollo celebra la incorporación de uno de los mejores investigadores de nuestro país, el Dr. Luis Aguilar Mendoza, quien cuenta con el prestigioso nivel Renacyt II. El Dr. Aguilar se encuentra muy próximo a ser reconocido como investigador distinguido del Perú, un logro que evidencia su destacada trayectoria en investigación científica. Esta incorporación fortalece el compromiso de UNIDx con la investigación de alto nivel y la excelencia académica, brindando a nuestra comunidad universitaria acceso a uno de los más destacados científicos del país.",
    image: "/images/noticias/portada-4.jpeg",
    videoUrl: "/video/buendia-aguilar.mp4",
    date: "2026-02-18",
    views: 142,
    type: "video" as const,
  },
  {
    id: 5,
    title: "Modelo Educativo Exponencial: Innovación Académica en UNIDx",
    description: "La Universidad Interamericana para el Desarrollo presenta su innovador Modelo Educativo Exponencial, desarrollado estratégicamente cumpliendo las condiciones básicas de calidad establecidas por SUNEDU. Este modelo revolucionario permitirá a nuestros estudiantes, que actualmente enfrentan complejidades y dificultades en su formación, ser acompañados de la mano en la construcción de una carrera profesional altamente productiva para ellos y para el país. El modelo está respaldado por publicaciones académicas disponibles en el fondo editorial de la Universidad Interamericana, consolidando nuestro compromiso con la excelencia educativa y la innovación pedagógica.",
    image: "/images/noticias/libro-fondo.png",
    videoUrl: "/video/modelo-exponencial.mp4",
    date: "2026-02-19",
    views: 98,
    type: "video" as const,
  },

//   {
//     id: 3,
//     title: "Ceremonia de Graduación 2025",
//     description: "Celebramos con orgullo el éxito de nuestros graduados de la promoción 2025. Una ceremonia emotiva donde se reconoció el esfuerzo y dedicación de todos nuestros estudiantes.",
//     image: "/images/campus/auditorio.jpg",
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     date: "2026-02-14",
//     views: 2341,
//     type: "video" as const,
//   },
//   {
//     id: 4,
//     title: "Convenio Internacional con Universidad Europea",
//     description: "UNIDx firma importante convenio de colaboración con universidad europea para intercambio académico y programas de movilidad estudiantil.",
//     image: "/images/campus/biblioteca.jpg",
//     images: ["/images/campus/biblioteca.jpg"],
//     date: "2026-02-12",
//     views: 1567,
//     type: "image" as const,
//   },
//   {
//     id: 5,
//     title: "Estudiantes Ganan Concurso Nacional de Innovación",
//     description: "Equipo de estudiantes de Farmacia y Bioquímica ganan primer lugar en concurso nacional de innovación con proyecto sobre medicamentos genéricos.",
//     image: "/images/campus/laboratorio.jpg",
//     images: ["/images/campus/laboratorio.jpg"],
//     date: "2026-02-08",
//     views: 987,
//     type: "image" as const,
//   },
//   {
//     id: 6,
//     title: "Nueva Infraestructura: Inauguración de Laboratorios",
//     description: "UNIDx inaugura nuevos laboratorios de última generación para las carreras de Enfermería y Farmacia, equipados con tecnología de punta.",
//     image: "/images/campus/entrada.jpg",
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     date: "2026-02-05",
//     views: 2103,
//     type: "video" as const,
//   },
]

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  images?: string[]
  videoUrl?: string
  date: string
  views: number
  type: "image" | "video"
}

export default function NoticiasPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedNews(null), 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNavigation />

      {/* Header Simple */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Noticias
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Mantente informado sobre las últimas novedades de UNIDx
            </p>
          </motion.div>
        </div>
      </section>

     

      {/* Grid de Noticias */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleNewsClick(news)}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  style={news.id === 4 ? { objectPosition: 'center 40%' } : undefined}
                />
                {news.type === "video" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 text-justify">
                  {news.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(news.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[650px] max-h-[95vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">
            {selectedNews?.title || "Noticia"}
          </DialogTitle>
          {selectedNews && (
            <div className="relative">
              {/* Botón Cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Contenido del Modal */}
              <div className="bg-white">
                {/* Media Section */}
                {selectedNews.type === "video" && selectedNews.videoUrl ? (
                  selectedNews.videoUrl.includes("youtube") || selectedNews.videoUrl.includes("youtu.be") ? (
                    // Video de YouTube (iframe)
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={selectedNews.videoUrl}
                        title={selectedNews.title}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    // Video local con efecto de fondo
                    <div className="relative w-full h-[500px] overflow-hidden bg-black">
                      {/* Video de fondo desenfocado */}
                      <video
                        src={selectedNews.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
                        autoPlay
                        muted
                        loop
                      />
                      {/* Video principal */}
                      <div className="relative z-10 flex items-center justify-center h-full p-4">
                        <video
                          src={selectedNews.videoUrl}
                          controls
                          className="max-h-full max-w-full shadow-2xl"
                          autoPlay
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <div className="relative w-full">
                    <Image
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      width={650}
                      height={900}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedNews.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {selectedNews.title}
                  </h2>

                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line text-justify">
                    {selectedNews.description}
                  </p>

                  {/* Galería de imágenes adicionales si las hay */}
                  {selectedNews.images && selectedNews.images.length > 1 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Más imágenes</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {selectedNews.images.map((img, idx) => (
                          <div key={idx} className="relative h-40 rounded-lg overflow-hidden">
                            <Image
                              src={img}
                              alt={`${selectedNews.title} - imagen ${idx + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ModernFooter />
    </div>
  )
}
