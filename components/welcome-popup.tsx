"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const POPUP_SESSION_KEY = "hasSeenCareersPopup"

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return

    const timer = window.setTimeout(() => setIsOpen(true), 350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isOpen])

  const handleClose = () => {
    sessionStorage.setItem(POPUP_SESSION_KEY, "true")
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Carreras profesionales de UNID"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Cerrar anuncio"
          />

          <motion.div
            className="relative w-auto max-w-[min(92vw,650px)] overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/30"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="absolute right-2.5 top-2.5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-slate-950/70 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4"
              aria-label="Cerrar popup"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <Image
              src="/images/carreras_unid.webp"
              alt="Conoce las carreras profesionales de la Universidad Interamericana para el Desarrollo"
              width={2376}
              height={2938}
              priority
              sizes="(max-width: 640px) 92vw, 650px"
              className="block h-auto max-h-[92dvh] w-auto max-w-full object-contain"
            />

            <div className="pointer-events-none absolute bottom-[0.5%] right-[0.5%] z-10 sm:bottom-[1.5%] sm:right-[1.5%]">
              <motion.a
                href="https://erpeduca.unidx.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sessionStorage.setItem(POPUP_SESSION_KEY, "true")}
                className="pointer-events-auto whitespace-nowrap rounded-md border border-white/30 bg-[#0639c9] px-2 py-1.5 text-center text-[10px] font-bold tracking-normal text-white shadow-[0_6px_18px_rgba(0,35,191,0.45)] transition-colors hover:bg-[#002ba3] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700 sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-wide"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Inscríbete ahora en ERP Educa"
              >
                Inscríbete ahora
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
