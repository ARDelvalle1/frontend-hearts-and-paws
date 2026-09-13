'use client'

import { MascotaModalProps } from '@/types/mascotas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useUsuarioAuth } from '@/context/UsuarioAuthContext'
import { getDetalleDonacionPorCaso } from '@/services/donacion'
import { useEffect, useState } from 'react' 
import { useAuth } from '../SupabaseProvider'

export default function MascotaModal({
  mascota,
  visible,
  cargando = false,
  onClose,
  onAccion,
  modo,
}: MascotaModalProps) {
  const { usuario } = useUsuarioAuth()
  const router = useRouter()

  const [meta, setMeta] = useState<number | null>(null)
  const [recaudado, setRecaudado] = useState<number | null>(null)
    const { user } = useAuth();

  useEffect(() => {
    const cargarDonacion = async () => {
      if (modo !== 'donacion' || !mascota.casoId) return
      try {
  const detalle = await getDetalleDonacionPorCaso(mascota.casoId)
  if (detalle) {
    setMeta(detalle.metaDonacion)
    setRecaudado(detalle.estadoDonacion)
  } else {
    setMeta(null)
    setRecaudado(null)
  }
} catch (error) {
  console.error('Error al obtener meta en el modal:', error)
}

    }

    cargarDonacion()
  }, [modo, mascota.casoId])

  const imagenUrl =
    mascota.imagenes?.[0]?.url ?? 'https://via.placeholder.com/400x300?text=Mascota'

  const textoBoton = modo === 'adopcion' ? '¡Quiero Adoptar!' : '¡Quiero Donar!'

  const handleAccion = () => {
    if (!usuario&& !user) {
      toast.error('Necesitás iniciar sesión para continuar.')
      router.push('/login')
      return
    }

    onAccion?.(mascota.casoId ?? mascota.id)
  }

  const metaAlcanzada =
    modo === 'donacion' &&
    meta !== null &&
    recaudado !== null &&
    recaudado >= meta

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-body-editorial">
      <div className="relative bg-white dark:bg-[#1c1c21] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 overflow-hidden text-[#1c1c21] dark:text-[#ffede4]">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-[#6c2f00] dark:text-[#ffdbc9] hover:text-[#c85a32] dark:hover:text-[#c85a32] transition-colors p-2 rounded-full hover:bg-[#fff8f5] dark:hover:bg-[#26262e] cursor-pointer flex items-center justify-center z-20"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Imagen destacada */}
        <div className="mb-5 relative z-10 w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#6c2f00]/5 dark:bg-[#ffdbc9]/5 border border-[#6c2f00]/10 dark:border-[#ffdbc9]/15">
          <Image
            src={imagenUrl}
            alt={mascota.nombre}
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* Nombre de la mascota */}
        <h2 className="font-display-editorial text-2xl sm:text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-3 text-center relative z-10">
          {mascota.nombre}
        </h2>

        {/* Historia / Descripción */}
        <div className="relative z-10 mb-6 max-h-48 overflow-y-auto px-2">
          {cargando ? (
            <p className="text-center font-body-editorial text-sm text-[#54433a] dark:text-[#dac2b6]">Cargando historia...</p>
          ) : (
            <p className="font-body-editorial text-[#54433a] dark:text-[#dac2b6] text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-center">
              {mascota.descripcion || 'Un compañero amoroso que busca una segunda oportunidad y un hogar lleno de cariño.'}
            </p>
          )}
        </div>

        {/* Botón de Acción */}
        <div className="text-center z-10 relative">
          <button
            onClick={handleAccion}
            disabled={metaAlcanzada}
            className={`w-full py-3.5 px-6 rounded-full font-body-editorial font-semibold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              metaAlcanzada
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-not-allowed border border-neutral-300 dark:border-neutral-700'
                : 'bg-[#c85a32] hover:bg-[#a84320] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {modo === 'adopcion' ? 'pets' : 'favorite'}
            </span>
            <span>{metaAlcanzada ? 'Meta alcanzada 🐾' : textoBoton}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
