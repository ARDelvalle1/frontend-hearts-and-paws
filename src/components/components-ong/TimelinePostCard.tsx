import Image from 'next/image'
import Link from 'next/link'
import { CasoTimelineItem } from '@/types/casos'

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function TimelinePostCard({ caso }: { caso: CasoTimelineItem }) {
  const imagenUrl = caso.mascota.imagenes[0]?.url ?? 'https://via.placeholder.com/400x300?text=Mascota'
  const esAdopcion = caso.tipo === 'ADOPCION'

  return (
    <article className="group bg-white dark:bg-[#1c1c21] rounded-2xl shadow-sm hover:shadow-md border border-[#6c2f00]/15 dark:border-[#c85a32]/25 overflow-hidden flex flex-col sm:flex-row transition duration-200">
      <div className="relative w-full sm:w-56 h-48 sm:h-auto min-h-[12rem] shrink-0 bg-[#fff5f2] dark:bg-[#26262e] overflow-hidden">
        <Image
          src={imagenUrl}
          alt={caso.mascota.nombre}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 640px) 100vw, 224px"
        />
      </div>

      <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full border ${
                esAdopcion
                  ? 'bg-[#ffeade] text-[#934b19] border-[#934b19]/20 dark:bg-[#934b19]/30 dark:text-[#ffdbc9] dark:border-[#934b19]/40'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-600/30'
              }`}
            >
              {esAdopcion ? 'En adopción' : 'Donación'}
            </span>
            <span className="text-xs text-[#54433a]/70 dark:text-[#dac2b6]/70">
              {formatearFecha(caso.creado_en)}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] group-hover:text-[#c85a32] dark:group-hover:text-[#c85a32] transition line-clamp-2">
            {caso.titulo}
          </h3>
          <p className="text-sm text-[#54433a] dark:text-[#dac2b6] line-clamp-3 leading-relaxed">
            {caso.descripcion}
          </p>
        </div>

        <div className="pt-2">
          <Link
            href={`/mascotas/${caso.mascota.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c85a32] hover:text-[#a84320] dark:text-[#c85a32] dark:hover:text-[#ffdbc9] transition"
          >
            <span>Ver a {caso.mascota.nombre}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
