"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      src: "/images/admision-agosto.webp",
      alt: "Admisión Agosto",
      link: "https://erpeduca.unidx.edu.pe/admision/proceso/InscripcionPostulante/ingresoExterno/inscripcionPostulanteExterno/universidad",
      buttonText: "Inscríbete ahora"
    },
    {
      id: 2,
      src: "/images/popup-postgrado.webp",
      alt: "Admisión Postgrado",
      link: "https://erpeduca.unidx.edu.pe/admision/proceso/InscripcionPostulante/ingresoExterno/inscripcionPostulanteExterno/universidad",
      buttonText: "Inscríbete ahora"
    }
  ]

  useEffect(() => {
    // Check if user has already seen the welcome popup during this session
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcomePopup")

    if (!hasSeenWelcome) {
      // Show welcome popup with a short, smooth delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Slideshow interval
  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6500)

    return () => clearInterval(timer)
  }, [isOpen, slides.length])

  const handleClose = () => {
    setIsOpen(false)
    // Mark as seen for the current browser session
    sessionStorage.setItem("hasSeenWelcomePopup", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 select-none">
          {/* Overlay Background with smooth backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative flex flex-col max-w-[calc(100vw-2rem)] md:max-w-[600px] lg:max-w-[750px] bg-transparent rounded-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - inside popup top right */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-[1010] bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 border-[1.5px] border-white/80 transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm"
              aria-label="Cerrar ventana de bienvenida"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Post Image Body */}
            <div className="relative w-full flex justify-center items-center bg-transparent rounded-md min-h-[300px]">
              {/* Invisible placeholder to auto-size the container exactly to the image's real proportions */}
              <img
                src={slides[0].src}
                alt="placeholder"
                className="w-auto h-auto max-w-full max-h-[90vh] md:max-h-[85vh] opacity-0 pointer-events-none"
              />

              <AnimatePresence>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[currentSlide].src}
                    alt={slides[currentSlide].alt}
                    fill
                    className="object-contain block rounded-md"
                    priority
                  />
                  
                  {currentSlide === 0 && (
                    <>
                      {/* Overlay Gradient at the bottom to ensure button readability if needed */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-md z-10" />

                      {/* Button Overlaid at the bottom */}
                      <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center z-20">
                        <a
                          href={slides[currentSlide].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3.5 bg-[#0023bf] hover:bg-[#001da0] text-white font-bold text-[15px] sm:text-base rounded-full shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 tracking-wide"
                        >
                          {slides[currentSlide].buttonText}
                        </a>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
