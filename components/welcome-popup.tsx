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

          {/* Modal Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative w-full h-full max-w-[95vw] max-h-[85vh] sm:max-h-[90vh] md:max-w-[85vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <Image
                src="/images/admision-agosto.webp"
                alt="Admisión Agosto"
                width={1200}
                height={1200}
                className="w-auto h-auto max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
