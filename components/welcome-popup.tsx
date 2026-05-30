"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

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

          {/* Close Button - positioned absolutely inside viewport */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.15 }}
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000] bg-white/10 hover:bg-white/20 text-white hover:text-red-400 rounded-full p-2.5 border border-white/20 shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Cerrar ventana de bienvenida"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.button>

          {/* Modal Image Container (Social Media Card Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative flex flex-col w-full max-w-[340px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[82vh] sm:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Post Image Body */}
            <div className="relative w-full overflow-hidden bg-white">
              <Image
                src="/images/admision-agosto.webp"
                alt="Admisión Agosto"
                width={1200}
                height={1200}
                className="w-full h-auto block"
                priority
              />
            </div>

            {/* Post Actions / Footer */}
            <div className="p-4 bg-white border-t border-gray-100 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full"
              >
                <a
                  href="https://erpeduca.unidx.edu.pe/admision/proceso/InscripcionPostulante/ingresoExterno/inscripcionPostulanteExterno/universidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer z-50 uppercase tracking-wide text-center"
                >
                  Inscríbete Ahora
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
