
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Eye } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"
import { useState, useEffect } from "react"

export function EnhancedNews() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const news = [
    {
      title: "Acreditación Internacional para el Programa de Enfermería",
      excerpt:
        "Nuestro programa de Enfermería recibe reconocimiento internacional por su excelencia académica y calidad educativa.",
      date: "15 Enero 2024",
      category: "Académico",
      image: "/placeholder.svg?height=250&width=400",
      views: "1.2k",
      featured: true,
    },
    {
      title: "Nueva Alianza con Hospital Regional",
      excerpt:
        "Convenio estratégico amplía las oportunidades de práctica clínica para nuestros estudiantes de ciencias de la salud.",
      date: "10 Enero 2024",
      category: "Convenios",
      image: "/placeholder.svg?height=250&width=400",
      views: "856",
    },
    {
      title: "Investigación en Fitoterapia Gana Premio Nacional",
      excerpt:
        "Proyecto de investigación sobre plantas medicinales obtiene reconocimiento a nivel nacional por su innovación.",
      date: "5 Enero 2024",
      category: "Investigación",
      image: "/placeholder.svg?height=250&width=400",
      views: "2.1k",
    },
    {
      title: "Congreso Internacional de Ciencias de la Salud 2024",
      excerpt: "UNID será sede del congreso más importante de la región con expertos internacionales.",
      date: "28 Diciembre 2023",
      category: "Eventos",
      image: "/placeholder.svg?height=250&width=400",
      views: "3.4k",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Académico":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      case "Convenios":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      case "Investigación":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
      case "Eventos":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Parallax Background Pattern */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%), 
                           linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, rgba(59, 130, 246, 0.1) 75%), 
                           linear-gradient(-45deg, transparent 75%, rgba(59, 130, 246, 0.1) 75%)`,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Additional floating elements */}
        <div
          className="absolute top-20 right-20 w-40 h-40 bg-blue-500/3 rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * -0.1}px)`,
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-32 h-32 bg-purple-500/3 rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * 0.15}px)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeUp">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                Últimas Noticias
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Noticias y Eventos</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                Mantente informado sobre las últimas novedades, logros y eventos de nuestra facultad.
              </p>
            </div>
            <Button variant="ghost" className="text-blue-600 dark:text-blue-400 group hidden md:flex">
              Ver todas las noticias
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
          {/* Featured Article */}
          <ScrollAnimation animation="fadeLeft" className="lg:col-span-1">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white dark:bg-slate-800 hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={news[0].image || "/placeholder.svg"}
                  alt={news[0].title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">DESTACADO</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(news[0].category)}`}>
                      {news[0].category}
                    </span>
                    <div className="flex items-center text-xs text-white/80">
                      <Eye className="h-3 w-3 mr-1" />
                      {news[0].views}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  {news[0].date}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {news[0].title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">{news[0].excerpt}</p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Other Articles */}
          <div className="space-y-6">
            {news.slice(1).map((article, index) => (
              <ScrollAnimation key={index} animation="fadeRight" delay={index * 150}>
                <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 hover:-translate-y-1">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {article.date}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <ScrollAnimation animation="fadeUp" delay={400}>
          <div className="text-center">
            <Button
              variant="outline"
              className="group hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 bg-transparent"
            >
              Ver Todas las Noticias
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
