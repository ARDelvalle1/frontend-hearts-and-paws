'use client'

import { useState, useEffect, useCallback } from 'react'
import { MascotaCatalogoItem } from '@/types/mascotas'
import { getMascotasOng } from '@/services/ongProfile'
import MascotaCatalogoCard from './MascotaCatalogoCard'
import { ESTADOS_MASCOTA, EstadoMascotaKey } from '@/lib/estadoMascota'

const LIMITE_POR_PAGINA = 12

export default function OngMascotasCatalogo({ ongId }: { ongId: string }) {
  const [mascotas, setMascotas] = useState<MascotaCatalogoItem[]>([])
  const [estado, setEstado] = useState<EstadoMascotaKey | ''>('')
  const [pagina, setPagina] = useState(1)
  const [total, setTotal] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [cargandoMas, setCargandoMas] = useState(false)
  const [error, setError] = useState('')

  const cargarPagina = useCallback(
    async (paginaActual: number, reemplazar: boolean) => {
      const data = await getMascotasOng(ongId, estado || undefined, paginaActual, LIMITE_POR_PAGINA)
      setMascotas((prev) => (reemplazar ? data.data : [...prev, ...data.data]))
      setTotal(data.total)
    },
    [ongId, estado],
  )

  useEffect(() => {
    let cancelado = false
    setCargando(true)
    setError('')
    setPagina(1)

    cargarPagina(1, true)
      .catch(() => {
        if (!cancelado) setError('No se pudo cargar el catálogo de mascotas.')
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    return () => {
      cancelado = true
    }
  }, [cargarPagina])

  const handleCargarMas = async () => {
    setCargandoMas(true)
    try {
      const siguiente = pagina + 1
      await cargarPagina(siguiente, false)
      setPagina(siguiente)
    } catch {
      setError('No se pudieron cargar más mascotas.')
    } finally {
      setCargandoMas(false)
    }
  }

  const hayMas = mascotas.length < total

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-[#6c2f00]/10 dark:border-[#c85a32]/15">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
            Mascotas
          </h2>
          {total > 0 && (
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c85a32] bg-[#fff1ea] dark:bg-[#26262e] px-3 py-1 rounded-full border border-[#6c2f00]/10 dark:border-[#c85a32]/25">
              {total} {total === 1 ? 'mascota' : 'mascotas'}
            </span>
          )}
        </div>

        <div className="relative">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as EstadoMascotaKey | '')}
            className="appearance-none text-sm font-medium pl-4 pr-10 py-2 rounded-full bg-white dark:bg-[#1c1c21] text-[#6c2f00] dark:text-[#ffdbc9] border border-[#6c2f00]/20 dark:border-[#c85a32]/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c85a32] cursor-pointer transition"
            aria-label="Filtrar por estado"
          >
            <option value="" className="bg-white dark:bg-[#1c1c21] text-[#6c2f00] dark:text-[#ffdbc9]">
              Todos los estados
            </option>
            {Object.entries(ESTADOS_MASCOTA).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-white dark:bg-[#1c1c21] text-[#6c2f00] dark:text-[#ffdbc9]">
                {label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#c85a32]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {cargando && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1c1c21] rounded-2xl border border-[#6c2f00]/15 dark:border-[#c85a32]/25 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="w-full h-44 bg-[#fff1ea] dark:bg-[#26262e]" />
              <div className="p-3.5 space-y-2">
                <div className="h-4 w-3/4 bg-[#fff1ea] dark:bg-[#26262e] rounded" />
                <div className="h-3 w-1/2 bg-[#fff1ea] dark:bg-[#26262e] rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-600 dark:text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      {!cargando && !error && mascotas.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/10 dark:border-[#c85a32]/20">
          <p className="text-base text-[#54433a] dark:text-[#dac2b6]">
            No hay mascotas para mostrar en este estado.
          </p>
        </div>
      )}

      {!cargando && mascotas.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {mascotas.map((mascota) => (
            <MascotaCatalogoCard key={mascota.id} mascota={mascota} />
          ))}
        </div>
      )}

      {hayMas && (
        <button
          onClick={handleCargarMas}
          disabled={cargandoMas}
          className="self-center mt-2 bg-white dark:bg-[#1c1c21] hover:bg-[#ffeade] dark:hover:bg-[#26262e] text-[#c85a32] border border-[#c85a32]/30 dark:border-[#c85a32]/40 font-semibold py-2.5 px-8 rounded-full shadow-sm transition disabled:opacity-50"
        >
          {cargandoMas ? 'Cargando...' : 'Cargar más mascotas'}
        </button>
      )}
    </div>
  )
}
