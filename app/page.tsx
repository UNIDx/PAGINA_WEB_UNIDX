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

import { HeroVideo } from "@/components/hero-video"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-grow">
          <ModernNavigation />
          {/* Video institucional - ancho completo, encima del carrusel */}
          <HeroVideo />

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

      </div>
    </LanguageProvider>
  )
}



//añaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAaaaaaaa

