import Image from 'next/image'
import Link from 'next/link'
import { MascotaCatalogoItem } from '@/types/mascotas'
import { ESTADOS_MASCOTA } from '@/lib/estadoMascota'

const ESTADO_BADGE_STYLES: Record<string, string> = {
  EN_ADOPCION: 'bg-emerald-50 text-emerald-700 border-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-600/40',
  EN_TRANSITO: 'bg-amber-50 text-amber-700 border-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-600/40',
  ADOPTADO: 'bg-sky-50 text-sky-700 border-sky-600/20 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-600/40',
  FALLECIDO: 'bg-stone-100 text-stone-600 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
}

export default function MascotaCatalogoCard({ mascota }: { mascota: MascotaCatalogoItem }) {
  const imagenUrl = mascota.imagenes[0]?.url ?? 'https://via.placeholder.com/400x300?text=Mascota'
  const estado = ESTADOS_MASCOTA[mascota.estado]
  const badgeStyle = ESTADO_BADGE_STYLES[mascota.estado] || estado.className

  return (
    <Link
      href={`/mascotas/${mascota.id}`}
      className="group bg-white dark:bg-[#1c1c21] rounded-2xl shadow-sm hover:shadow-md border border-[#6c2f00]/15 dark:border-[#c85a32]/25 overflow-hidden flex flex-col transition duration-200"
    >
      <div className="relative w-full h-44 bg-[#fff5f2] dark:bg-[#26262e] overflow-hidden">
        <Image
          src={imagenUrl}
          alt={mascota.nombre}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 640px) 50vw, 220px"
        />
        <span
          className={`absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-sm ${badgeStyle}`}
        >
          {estado.label}
        </span>
      </div>
      <div className="p-3.5 flex flex-col gap-0.5">
        <h3 className="font-serif font-bold text-base text-[#6c2f00] dark:text-[#ffdbc9] group-hover:text-[#c85a32] dark:group-hover:text-[#c85a32] transition truncate">
          {mascota.nombre}
        </h3>
        <p className="text-xs font-medium text-[#54433a]/80 dark:text-[#dac2b6]/80">
          {mascota.tipo.nombre}
        </p>
      </div>
    </Link>
  )
}
