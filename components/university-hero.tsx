"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Award, Stethoscope, FlaskRound } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export function UniversityHero() {
  const { t } = useLanguage()
  const [careersModalOpen, setCareersModalOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    "/images/noticias/licenciamiento1.jpeg",
    "/images/noticias/licenciamiento2.jpeg",
    "/images/noticias/licenciamiento3.jpeg",
  ]

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    function update() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const canRenderParticles = dimensions.width > 0 && dimensions.height > 0

  return (
    <section className="relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0 bg-gray-900">
        {carouselImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          >
            <Image
              src={image}
              alt={`Licenciamiento ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
          </motion.div>
        ))}
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0 z-[3]">
        {canRenderParticles && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{ x: Math.random() * dimensions.width, y: Math.random() * dimensions.height }}
            animate={{ x: Math.random() * dimensions.width, y: Math.random() * dimensions.height }}
            transition={{ duration: Math.random() * 10 + 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div>
          {/* Badge universitario */}
          <div className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-[10px] sm:text-xs font-medium mb-3 sm:mb-4 border border-white/20">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Universidad Interamericana para el Desarrollo
          </div>

          {/* Título principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight px-2">
            {t("hero.title")}
          </h1>

          {/* Subtítulo */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-blue-100 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed px-2">
            {t("hero.subtitle")}
          </p>

          {/* Fila de Sellos ISO */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-6 sm:mb-10 max-w-4xl mx-auto px-4">
            {[
              { src: "/images/iso-ambiental.webp", alt: "ISO Ambiental" },
              { src: "/images/iso-educacion.webp", alt: "ISO Educación" },
              { src: "/images/iso-calidad.webp", alt: "ISO Calidad" },
            ].map((iso, index) => (
              <div
                key={index}
                className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-md transition-transform duration-300 hover:scale-110 p-2 sm:p-3 md:p-4"
              >
                {/* Logo ISO */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src={iso.src}
                    alt={iso.alt}
                    fill
                    className="object-contain drop-shadow-lg"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 144px"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => setCareersModalOpen(true)}
                className="bg-white text-blue-900 hover:bg-blue-50 px-4 sm:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-sm font-semibold rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
              >
                {t("hero.cta")}
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVideoModalOpen(true)}
                className="border-white/30 text-white hover:bg-white/10 px-4 sm:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-sm font-semibold rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 bg-transparent w-full sm:w-auto"
              >
                <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                Ver video institucional
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>



      {/* Modal de carreras */}
      <Dialog open={careersModalOpen} onOpenChange={setCareersModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-800 mb-4">Elige tu Carrera</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => { router.push("/carreras/enfermeria"); setCareersModalOpen(false) }}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-3">
                <Stethoscope className="h-6 w-6" />
                <span>Licenciatura en Enfermería</span>
              </div>
            </Button>

            <Button
              onClick={() => { router.push("/carreras/farmacia-bioquimica"); setCareersModalOpen(false) }}
              className="w-full h-16 bg-[#4dcfd3] hover:bg-[#2ab3b7] text-white text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-3">
                <FlaskRound className="h-6 w-6" />
                <span>Farmacia y Bioquímica</span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de video institucional */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <Play className="h-6 w-6 text-blue-600" />
              <span>Video Institucional</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover" controls poster="images/video-poster.jpg">
                <source src="/video/video.mp4" type="video/mp4" />
                <p className="text-white p-4">
                  Tu navegador no soporta el elemento de video.
                  <a href="/video/video.mp4" className="text-blue-400 underline ml-2">Descargar video</a>
                </p>
              </video>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Conoce más sobre nuestra institución y nuestro compromiso con la formación de líderes en ciencias de la salud.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
