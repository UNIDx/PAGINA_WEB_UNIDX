"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Menu,
  Globe,
  Phone,
  Mail,
  ChevronDown,
  ExternalLink,
  X,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  Bell,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export function ModernNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSecondaryDropdown, setActiveSecondaryDropdown] = useState<string | null>(null)
  const [isAdmissionDialogOpen, setIsAdmissionDialogOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const handleSecondaryDropdownEnter = (dropdown: string) => {
    setActiveSecondaryDropdown(dropdown)
  }

  const handleSecondaryDropdownLeave = () => {
    setActiveSecondaryDropdown(null)
  }

  const handleAdmissionClick = () => {
    setIsAdmissionDialogOpen(true)
  }

  return (
    <>
      {/* Secondary Navigation Bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-slate-800 text-white py-1 sm:py-2 text-[10px] sm:text-xs relative z-50"
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex justify-between items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-[9px] sm:text-xs">+51 945987048</span>
            </div>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-[9px] sm:text-xs">informes@unidx.edu.pe</span>
            </div>
          </motion.div>

          {/* Botón Admisiones 2025 para móvil */}
          <div className="lg:hidden">
            <Button
              onClick={handleAdmissionClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 h-6 text-[10px] font-semibold rounded"
            >
              Admision 2026
            </Button>
          </div>

          {/* Secondary Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <Link href="/egresados" className="hover:text-blue-300 transition-colors duration-200"
                  style={{ display: "none" }} // Oculta el enlace directo, ya está en el dropdown
            >
              Egresados
            </Link>
            <Link href="/investigacion" className="hover:text-blue-300 transition-colors duration-200">
              Investigación
            </Link>
            {/* Biblioteca Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleSecondaryDropdownEnter("biblioteca")}
              onMouseLeave={handleSecondaryDropdownLeave}
            >
              <button className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200">
                <span>Biblioteca</span>
                <motion.div
                  animate={{ rotate: activeSecondaryDropdown === "biblioteca" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-2.5 w-2.5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeSecondaryDropdown === "biblioteca" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <Link
                      href="https://biblioteca.concytec.gob.pe/"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Concytec</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://scielo.org/es/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>SciELO</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://revistasinvestigacion.unmsm.edu.pe/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Revistas de investigación UNMSM</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://www.biomedcentral.com/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>BioMed Central</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://asnneuro.org/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>ASN Neuro</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                                        <Link
                      href="https://authorservices.wiley.com/open-research/open-access/browse-journals.html"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Wiley Open Access</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://ojs.ehu.eus/index.php/enf"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Nursing Science</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://www.nureinvestigacion.es/OJS/index.php/nure"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Nure Investigación</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="http://www.index-f.com/index-enfermeria/revista.php"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Índex de Enfermería</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://www.nature.com/nature-portfolio/open-access"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Nature Portfolio</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="http://revistamedica.imss.gob.mx/editorial/index.php/revista_medica/issue/archive"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Revista Médica del Instituto Mexicano del Seguro Social</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="http://www.revistas.unam.mx/index.php/?inst=Escuela%20Nacional%20de%20Enfermer%C3%ADa%20y%20Obstetricia"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Escuela de Enfermería y Obstétrica</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://www.epistemonikos.org/en/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Epistemonikos</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="http://www.freemedicaljournals.com/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Free Medical Journals</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="http://www.freebooks4doctors.com/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>FreeBooks4Doctors</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://pubmed.ncbi.nlm.nih.gov/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>PubMed</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://www.mdpi.com/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Free Medical Journals</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Link
                      href="https://bvsalud.org/es/"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>Biblioteca Virtual en Salud</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Fin Biblioteca Dropdown */}
            <Link
              href="https://repositorio.unidx.edu.pe"
              target="_blank"
              className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200"
            >
              <span>Repositorio</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
            <Link
              href="https://transparencia.unidx.edu.pe"
              target="_blank"
              className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200"
            >
              <span>Transparencia</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
            <Link
              href="https://bolsadetrabajo.unidx.edu.pe"
              target="_blank"
              className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200"
            >
              <span>Bolsa de Trabajo</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>

            {/* Applications Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleSecondaryDropdownEnter("aplicaciones")}
              onMouseLeave={handleSecondaryDropdownLeave}
            >
              <button className="flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200">
                <span>Aplicaciones</span>
                <motion.div
                  animate={{ rotate: activeSecondaryDropdown === "aplicaciones" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-2.5 w-2.5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeSecondaryDropdown === "aplicaciones" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <Link
                      href="https://erpeduca.unidx.edu.pe"
                      target="_blank"
                      className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                    >
                      <span>ERPEduca</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/defensoria" className="hover:text-blue-300 transition-colors duration-200">
              Defensoría
            </Link>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="h-6 px-2 text-white hover:text-blue-300 hover:bg-white/10 text-xs transition-all duration-200"
            >
              <Globe className="h-3 w-3 mr-1" />
              {language.toUpperCase()}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-transform duration-200"
                >
                  <Image
                    src="/images/unid-complete-logo.png"
                    alt="UNID - Universidad Interamericana para el Desarrollo"
                    width={160}
                    height={60}
                    className="h-10 sm:h-11 md:h-12 w-auto"
                  />
                </motion.div>
                {/* Separador vertical */}
                <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
                {/* Logo SUNEDU */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="transition-transform duration-200"
                >
                  <Image
                    src="/images/noticias/logo-sunedu.png"
                    alt="Licenciada por SUNEDU"
                    width={120}
                    height={60}
                    className="h-16 sm:h-11 md:h-20 lg:h-24 xl:h-28 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex items-center space-x-8"
            >
              {/* Institucional Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("institucional")}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === "institucional" ? null : "institucional")}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200 py-2"
                >
                  <span>Institucional</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === "institucional" ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "institucional" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden"
                    >
                      <Link
                        href="/"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Inicio
                      </Link>
                      <Link
                        href="/nosotros"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Nosotros
                      </Link>
                      <Link
                        href="/noticias"
                        className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span>Noticias</span>
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse ml-2"></span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recursos */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("recursos")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200 py-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Recursos</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === "recursos" ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "recursos" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-4 z-50"
                    >
                      {/* Fondos Editoriales */}
                      <div className="px-4 py-2">
                        <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                          Fondos Editoriales
                        </div>
                        <div className="space-y-2 ml-6">
                          <Link
                            href="https://editorialfondo.com"
                            target="_blank"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200 group"
                          >
                            <div>
                              <div className="font-medium text-sm">Fondo editorial FEPOL</div>
                              <div className="text-xs text-gray-500">Publicaciones especializadas</div>
                            </div>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <Link
                            href="https://fondoeditorial.unidx.edu.pe"
                            target="_blank"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200 group"
                          >
                            <div>
                              <div className="font-medium text-sm">Fondo editorial FEUNIDx</div>
                              <div className="text-xs text-gray-500">Editorial institucional</div>
                            </div>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <Link
                            href="http://proceedings.unidx.edu.pe/"
                            target="_blank"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200 group"
                          >
                            <div>
                              <div className="font-medium text-sm">Libro de Resúmenes</div>
                              <div className="text-xs text-gray-500">Proceedings</div>
                            </div>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Revistas */}
                      <div className="px-4 py-2">
                        <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                          Revistas
                        </div>
                        <div className="ml-6">
                          <Link
                            href="https://revistas.unidx.edu.pe/index.php/FitoVida"
                            className="flex items-center p-2 rounded-lg hover:bg-green-50 hover:text-green-900 transition-colors duration-200"
                          >
                            <div>
                              <div className="font-medium text-sm">FitoVida</div>
                              <div className="text-xs text-gray-500">Revista científica de salud</div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Eventos Internacionales */}
                      <div className="px-4 py-2">
                        <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                          Eventos Internacionales
                        </div>
                        <div className="ml-6">
                          <Link
                            href="https://cientec.com.pe"
                            className="flex items-center p-2 rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-colors duration-200"
                          >
                            <div>
                              <div className="font-medium text-sm">CIENTEC</div>
                              <div className="text-xs text-gray-500">Congreso Internacional</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Facultad */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("facultad")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200 py-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Facultad</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === "facultad" ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "facultad" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-4 z-50"
                    >
                      <div className="px-4 py-2">
                        <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                          Carreras Profesionales
                        </div>
                        <div className="space-y-2 ml-6">
                          
                          {/* Temporalmente deshabilitado - NO ELIMINAR */}
                          <Link
                            href="/carreras/enfermeria"
                            className="block p-3 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                          >
                            <div className="font-medium text-sm">Enfermería</div>
                            <div className="text-xs text-gray-500">Licenciatura - 5 años</div>
                          </Link>
                          <Link
                            href="/carreras/farmacia-bioquimica"
                            className="block p-3 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200"
                          >
                            <div className="font-medium text-sm">Farmacia y Bioquímica</div>
                            <div className="text-xs text-gray-500">Químico Farmacéutico - 5 años</div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Convocatoria - nueva página */}
              <Link
                href="/convocatoria"
                className="text-gray-700 hover:text-blue-900 text-sm font-medium transition-colors duration-200 relative group py-2"
              >
                Convocatoria
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Actions Container */}
              <div className="flex items-center space-x-4">
                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleAdmissionClick}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 xl:px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg relative overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">Admisión 2026-II</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </motion.div>

                <div className="h-8 w-px bg-gray-300 hidden xl:block"></div>

                {/* Cientec Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="transition-transform duration-200"
                >
                  <a href="https://www.cientec.com.pe" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image
                      src="/images/cientec-logo.webp"
                      alt="CIENTEC"
                      width={160}
                      height={60}
                      className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain"
                    />
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile Actions - Logo CIENTEC + Menu Hamburguesa */}
            <div className="flex lg:hidden items-center gap-2">
              <a href="https://www.cientec.com.pe" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Image
                  src="/images/cientec-logo.webp"
                  alt="CIENTEC"
                  width={120}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </a>
              
              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white border-l border-gray-200">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                        <Image
                          src="/images/unid-logo.png"
                          alt="UNID Icon"
                          width={32}
                          height={32}
                          className="h-6 w-6"
                        />
                      </div>
                      <span className="font-bold text-blue-900">UNIDX</span>
                    </div>
                    {/* <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                      <X className="h-5 w-5" />
                    </Button> */}
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 py-4 space-y-4 overflow-y-auto">
                    {/* Contact Info */}
                    <div className="space-y-2 pb-4 border-b border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>+51 945 987 048 / 01 9041269</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>informes@unidx.edu.pe</span>
                      </div>
                    </div>

                    {/* Institucional (Mobile) */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 font-medium text-blue-900">
                        <span className="ml-1">Institucional</span>
                      </div>
                      <div className="pl-4 border-l-2 border-gray-100 space-y-1">
                        <Link
                          href="/"
                          className="block text-gray-600 hover:text-blue-900 text-sm py-2 px-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Inicio
                        </Link>
                        <Link
                          href="/nosotros"
                          className="block text-gray-600 hover:text-blue-900 text-sm py-2 px-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Nosotros
                        </Link>
                        <Link
                          href="/noticias"
                          className="flex items-center text-gray-600 hover:text-blue-900 text-sm py-2 px-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Noticias
                          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse ml-2"></span>
                        </Link>
                      </div>
                    </div>

                    <Link
                      href="/convocatoria"
                      className="block text-gray-700 hover:text-blue-900 font-medium py-3 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Convocatoria
                    </Link>

                    {/* Recursos */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 font-medium text-blue-900">
                        <BookOpen className="h-5 w-5" />
                        <span>Recursos</span>
                      </div>
                      <div className="pl-7 space-y-3">
                        <div className="text-sm font-medium text-gray-700">Fondos Editoriales</div>
                        <Link
                          href="https://editorialfondo.com"
                          target="_blank"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Fondo editorial FEPOL
                        </Link>
                        <Link
                          href="https://fondoeditorial.unidx.edu.pe"
                          target="_blank"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Fondo editorial FEUNIDx
                        </Link>
                        <Link
                          href="http://proceedings.unidx.edu.pe/"
                          target="_blank"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Libro de Resúmenes
                        </Link>

                        <div className="text-sm font-medium text-gray-700 pt-2">Revistas</div>
                        <Link
                          href="https://revistas.unidx.edu.pe/index.php/FitoVida"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          FitoVida
                        </Link>

                        <div className="text-sm font-medium text-gray-700 pt-2">Eventos Internacionales</div>
                        <Link
                          href="https://cientec.com.pe"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          CIENTEC
                        </Link>
                      </div>
                    </div>

                    {/* Facultad */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 font-medium text-blue-900">
                        <GraduationCap className="h-5 w-5" />
                        <span>Facultad</span>
                      </div>
                      <div className="pl-7 space-y-3">
                        <div className="text-sm font-medium text-gray-700">Carreras</div>
                        <div className="block pl-4 text-gray-500 text-sm py-2 cursor-not-allowed opacity-60">
                          Próximamente...
                        </div>
                        {/* Temporalmente deshabilitado - NO ELIMINAR */}
                        {/* <Link
                          href="/carreras/enfermeria"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Enfermería
                        </Link>
                        <Link
                          href="/carreras/farmacia-bioquimica"
                          className="block pl-4 text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Farmacia y Bioquímica
                        </Link> */}
                      </div>
                    </div>

                    {/* Secondary Menu Items */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-3">Enlaces Rápidos</div>
                      <Link
                        href="/egresados"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Egresados
                      </Link>
                      <Link
                        href="/investigacion"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Investigación
                      </Link>
                      <Link
                        href="https://repositorio.unidx.edu.pe"
                        target="_blank"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Repositorio
                      </Link>
                      <Link
                        href="https://transparencia.unidx.edu.pe"
                        target="_blank"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Transparencia
                      </Link>
                      <Link
                        href="https://bolsadetrabajo.unidx.edu.pe"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Bolsa de trabajo
                      </Link>
                      <Link
                        href="https://erpeduca.unidx.edu.pe"
                        target="_blank"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        ERPEduca
                      </Link>
                      <Link
                        href="/defensoria"
                        className="block text-gray-600 hover:text-blue-900 text-sm py-2 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Defensoría
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="border-t border-gray-200 pt-4">
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleAdmissionClick()
                      }}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white transition-all duration-200 hover:shadow-lg relative overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10">Admisión 2026-II</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Dialog Component */}
      <Dialog open={isAdmissionDialogOpen} onOpenChange={setIsAdmissionDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center space-x-2 text-xl">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Admisión 2026-II</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 sm:py-6">
            <div className="text-center space-y-6">
              {/* Badge de Inscripciones Abiertas */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-semibold text-lg">Inscripciones Abiertas</span>
              </div>

              {/* Fecha de Examen */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-orange-600 font-medium">Fecha de Examen de Admisión</p>
                    <p className="text-2xl font-bold text-orange-900">01 de agosto</p>
                  </div>
                </div>
                <p className="text-orange-700 text-sm">
                  El examen de admisión se llevará a cabo el 01 de agosto
                </p>
              </div>

              {/* Información Adicional */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">¿Quieres ser notificado?</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Regístrate para recibir información sobre fechas importantes, requisitos y modalidades de
                        ingreso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="font-medium text-green-900 text-sm mb-2">Información y Consultas</p>
                  <div className="space-y-1 text-xs text-green-800">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>+51 945 987 048 / 01 9041269</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>informes@unidx.edu.pe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Inscripción */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    window.open('https://erpeduca.unidx.edu.pe/admision/proceso/InscripcionPostulante/ingresoExterno/inscripcionPostulanteExterno/universidad', '_blank', 'noopener,noreferrer')
                  }}
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Inscríbete Ahora
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAdmissionDialogOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
