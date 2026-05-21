export function InvestigationVideo() {
  return (
 <section style={{ backgroundColor: "#f9fafb" }} className="py-12 sm:py-16 px-4">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8 tracking-tight">
      GESTIÓN DE LA INVESTIGACIÓN EN UNID
    </h2>

    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/29kR-WpkLjQ?autoplay=1&mute=1&cc_load_policy=0&rel=0&modestbranding=1"
        title="GESTIÓN DE LA INVESTIGACIÓN EN UNID"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>
  )
}
