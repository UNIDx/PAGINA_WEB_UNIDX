"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function IsoModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya vio el modal en esta sesión
    const hasSeenModalInSession = sessionStorage.getItem("hasSeenIsoModal")

    if (!hasSeenModalInSession) {
      // Mostrar el modal después de un breve delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Guardar en sessionStorage que el usuario ya vio el modal
    sessionStorage.setItem("hasSeenIsoModal", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cierre - Posicionado fuera de la imagen en desktop si es posible, o con mejor contraste */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 sm:top-4 sm:right-4 z-50 bg-white shadow-lg hover:bg-gray-100 text-gray-800 rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image Content */}
            <div className="relative shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden bg-white">
              <Image
                src="/images/iso-web.png"
                alt="ISO Certification"
                width={1200}
                height={1600}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
