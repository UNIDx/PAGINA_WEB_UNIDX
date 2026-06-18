"use client"

import { motion } from "framer-motion"
import { Microscope, HeartPulse, BriefcaseMedical, ShieldCheck, Pill } from "lucide-react"

const programs = [
  {
    title: "Doctorado en Ciencias de la Salud",
    description: "Formación de investigadores y líderes académicos capaces de generar conocimiento científico para la solución de problemas prioritarios de salud y contribuir al desarrollo sostenible del país.",
    icon: Microscope,
  },
  {
    title: "Maestría en Enfermería de Práctica Avanzada en Atención Primaria de la Salud Comunitaria",
    description: "Orientada al fortalecimiento de competencias clínicas, comunitarias y de liderazgo para mejorar la calidad de la atención y promover el bienestar de las comunidades.",
    icon: HeartPulse,
  },
  {
    title: "Maestría en Gestión Estratégica y Dirección de Consultorios de Enfermería",
    description: "Dirigida a profesionales que buscan desarrollar capacidades de gestión, emprendimiento y liderazgo para la administración eficiente de consultorios y servicios de enfermería.",
    icon: BriefcaseMedical,
  },
  {
    title: "Maestría en Farmacovigilancia y Regulación de Medicamentos",
    description: "Especializa a los profesionales en la vigilancia de la seguridad de los medicamentos, la gestión de riesgos y el cumplimiento de las normativas regulatorias nacionales e internacionales.",
    icon: ShieldCheck,
  },
  {
    title: "Maestría en Gestión de Farmacias y Servicios Farmacéuticos",
    description: "Forma líderes capaces de optimizar la gestión de farmacias y servicios farmacéuticos mediante estrategias innovadoras orientadas a la calidad y la atención centrada en el paciente.",
    icon: Pill,
  },
]

export function PostgraduatePrograms() {
  return (
    <section className="py-8 sm:py-12 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Nuestra Escuela de <span className="text-blue-600">Posgrado</span>
            </h2>
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mb-4 shadow-sm">
              Admisión 2026 Abierta
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Impulsa tu carrera con programas diseñados para transformar el sistema de salud. Fórmate como líder en investigación, gestión estratégica y atención avanzada para responder a los grandes desafíos sanitarios del país.
            </p>
          </motion.div>
        </div>

        {/* Content Area with Cards and Image */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cards Area (Left) */}
          <div className="w-full lg:w-[65%] flex flex-wrap justify-start gap-3 sm:gap-4">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, y: 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col w-full sm:w-[calc(50%-8px)]"
                >
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed flex-grow text-justify">
                    {program.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Image Area (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-[35%] flex flex-col justify-center mt-10 lg:mt-0"
          >
            <div className="relative w-full max-w-sm mx-auto lg:max-w-none flex flex-col items-center">
              {/* Image */}
              <div className="relative z-10 w-full flex justify-center transform transition-transform duration-500 hover:-translate-y-2">
                <img 
                  src="/images/escuelapost.webp" 
                  alt="Escuela de Posgrado UNID" 
                  className="w-[115%] lg:w-[125%] max-w-none h-auto object-contain drop-shadow-2xl"
                />
              </div>
              {/* Thick Line Base */}
              <div className="w-[100%] h-4 sm:h-6 bg-blue-600 rounded-full shadow-md relative z-20 -mt-16 sm:-mt-20 lg:-mt-20"></div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
