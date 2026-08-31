"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react"

import { useEffect } from "react"

export function ModernFooter() {
  useEffect(() => {
    const _c1 = (v: string) => {
      try {
        return decodeURIComponent(escape(window.atob(v)));
      } catch (e) { return window.atob(v); }
    };
    
    const _d1 = _c1('RGV2ZWxvcGVyOiBHb256YWxvIEplc8O6cyBDw6FyZGVuYXMgTGl6YW5h');
    const _w1 = _c1('d3d3LmNhcmRlbmFzZ2ouY29t');

    console.log(
      `%c ${_d1} | ${_w1} `, 
      "background:#0f172a;color:#38bdf8;padding:5px;border-radius:4px;font-family:monospace;font-size:11px;font-weight:bold;border:1px solid #1e293b;"
    );

    try {
      if (typeof document !== 'undefined' && !document.querySelector('meta[name="core-sys-dev-id"]')) {
        const _cmt = document.createComment(` ${_d1} | ${_w1} `);
        document.body.appendChild(_cmt);
        const _mt = document.createElement('meta');
        _mt.name = 'core-sys-dev-id';
        _mt.content = _d1;
        document.head.appendChild(_mt);
      }
    } catch (e) {}
  }, [])

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* University Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 sm:space-y-4"
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Image
                src="/images/unid-complete-logo.png"
                alt="UNID - Universidad Interamericana para el Desarrollo"
                width={200}
                height={60}
                className="h-6 sm:h-8 lg:h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 text-[10px] sm:text-xs lg:text-sm leading-relaxed">
              Universidad de Ciencias de la Salud comprometida con la formación de profesionales de excelencia.
            </p>
            <div className="flex space-x-2 sm:space-x-4">
              <Link href="https://www.facebook.com/unidxoficial" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Link>
              <Link href="https://www.instagram.com/unidxoficial" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Link>
              <Link href="https://www.youtube.com/@INTERAMERICANAUNIDX" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/interamericana-unid/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2 sm:space-y-4"
          >
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs lg:text-sm">
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/carreras/enfermeria" className="text-gray-300 hover:text-white transition-colors">
                  Enfermería
                </Link>
              </li>
              <li>
                <Link href="/carreras/farmacia-bioquimica" className="text-gray-300 hover:text-white transition-colors">
                  Farmacia y Bioquímica
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 sm:space-y-4"
          >
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold">Recursos</h3>
            <ul className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs lg:text-sm">
              <li>
                <Link href="https://revistas.unidx.edu.pe" className="text-gray-300 hover:text-white transition-colors">
                  Revista FitoVida
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.cientec.com.pe" 
                  className="relative inline-block text-yellow-400 hover:text-yellow-300 font-bold transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">CIENTEC</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-sm rounded animate-pulse"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://repositorio.unidx.edu.pe"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Repositorio
                </Link>
              </li>
              <li>
                <Link
                  href="https://transparencia.unidx.edu.pe"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Transparencia
                </Link>
              </li>
              <li>
                <Link
                  href="https://bolsadetrabajo.unidx.edu.pe"
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bolsa de Trabajo
                </Link>
              </li>
              <li>
                <Link href="/defensoria" className="text-gray-300 hover:text-white transition-colors">
                  Defensoría
                </Link>
              </li>
              <li>
                <Link href="/libro-reclamaciones" className="text-gray-300 hover:text-white transition-colors">
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2 sm:space-y-4"
          >
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold">Contacto</h3>
            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 text-[10px] sm:text-xs lg:text-sm">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-blue-400" />
                <span className="text-gray-300">+51 945 987 048</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-blue-400" />
                <span className="text-gray-300">informes@unidx.edu.pe</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300">
                  Av. Bolivia 626, Lima 15082
                  <br />
                  Lima, Perú
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 UNIDX - Universidad Interamericana para el Desarrollo
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            <div className="flex space-x-4">
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Uso
              </Link>
            </div>
            

          </div>
        </motion.div>
      </div>
    </footer>
  )
}
