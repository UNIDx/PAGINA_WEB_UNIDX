"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function IsoRibbon() {
  const isos = [
    { src: "/images/iso-ambiental.webp", alt: "ISO Ambiental" },
    { src: "/images/iso-educacion.webp", alt: "ISO Educación" },
    { src: "/images/iso-calidad.webp", alt: "ISO Calidad" },
  ]

  return (
    <section className="bg-white py-6 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16 lg:gap-24">
          {isos.map((iso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={iso.src}
                alt={iso.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
