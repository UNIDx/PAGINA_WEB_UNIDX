import { LanguageProvider } from "@/components/language-provider"
import { ModernNavigation } from "@/components/modern-navigation"
import { UniversityHero } from "@/components/university-hero"
import { BooksCarousel } from "@/components/books-carousel"
import { CompactPrograms } from "@/components/compact-programs"
import { CompactNews } from "@/components/compact-news"
import { ProjectsSection } from "@/components/projects-section"
import { PartnershipsSection } from "@/components/partnerships-section"
import { CompactContact } from "@/components/compact-contact"
import { ModernFooter } from "@/components/modern-footer"
import { PromotionalModal } from "@/components/promotional-modal"
import { HeroVideo } from "@/components/hero-video"
import { Footer } from "react-day-picker"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-grow">
          <ModernNavigation />
          {/* Video institucional - ancho completo, encima del carrusel */}
          <HeroVideo />
          {/* Cinta de anuncio animada */}
          <div className="w-full bg-[#1a3a6e] overflow-hidden py-3 border-y-2 border-yellow-400">
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: 'ticker 18s linear infinite',
              }}
            >
              {[...Array(6)].map((_, i) => (
                <span key={i} className="text-white font-bold text-sm sm:text-base tracking-widest uppercase px-12">
                EXAMEN DE ADMISIÓN&nbsp;
                  <span className="text-yellow-400">28 DE MARZO</span>
                  &nbsp;— INSCRÍBETE AHORA
                </span>
              ))}
            </div>
            <style>{`
              @keyframes ticker {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </div>
          <UniversityHero />
          <BooksCarousel />
          <CompactPrograms />
          <CompactNews />
          <ProjectsSection />
          <PartnershipsSection />
          <CompactContact />
        </main>
        {/* Footer stays at the bottom */}
        <ModernFooter />
        {/* Modal publicitario */}
        <PromotionalModal />
      </div>
    </LanguageProvider>
  )
}



//añaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAaaaaaaa

