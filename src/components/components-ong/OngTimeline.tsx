'use client'

import { useState, useEffect, useCallback } from 'react'
import { CasoTimelineItem } from '@/types/casos'
import { getTimelineOng } from '@/services/ongProfile'
import TimelinePostCard from './TimelinePostCard'

const LIMITE_POR_PAGINA = 10

export default function OngTimeline({ ongId }: { ongId: string }) {
  const [casos, setCasos] = useState<CasoTimelineItem[]>([])
  const [pagina, setPagina] = useState(1)
  const [total, setTotal] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [cargandoMas, setCargandoMas] = useState(false)
  const [error, setError] = useState('')

  const cargarPagina = useCallback(
    async (paginaActual: number, reemplazar: boolean) => {
      const data = await getTimelineOng(ongId, paginaActual, LIMITE_POR_PAGINA)
      setCasos((prev) => (reemplazar ? data.data : [...prev, ...data.data]))
      setTotal(data.total)
    },
    [ongId],
  )

  useEffect(() => {
    let cancelado = false
    setCargando(true)
    setError('')
    setPagina(1)

    cargarPagina(1, true).catch(() => {
      if (!cancelado) setError('No se pudo cargar el timeline de esta organización.')
    }).finally(() => {
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
      setError('No se pudieron cargar más publicaciones.')
    } finally {
      setCargandoMas(false)
    }
  }

  const hayMas = casos.length < total

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-2 border-b border-[#6c2f00]/10 dark:border-[#c85a32]/15">
        <h2 className="font-serif text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
          Publicaciones
        </h2>
        {total > 0 && (
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c85a32] bg-[#fff1ea] dark:bg-[#26262e] px-3 py-1 rounded-full border border-[#6c2f00]/10 dark:border-[#c85a32]/25">
            {total} {total === 1 ? 'caso' : 'casos'}
          </span>
        )}
      </div>

      {cargando && (
        <div className="flex flex-col gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 sm:h-48 bg-white dark:bg-[#1c1c21] rounded-2xl border border-[#6c2f00]/15 dark:border-[#c85a32]/25 p-4 flex flex-col sm:flex-row gap-4 shadow-sm"
            >
              <div className="w-full sm:w-52 h-36 sm:h-full bg-[#fff1ea] dark:bg-[#26262e] rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-1 gap-2">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-[#fff1ea] dark:bg-[#26262e] rounded-full" />
                  <div className="h-6 w-3/4 bg-[#fff1ea] dark:bg-[#26262e] rounded-lg" />
                  <div className="h-3 w-full bg-[#fff1ea] dark:bg-[#26262e] rounded" />
                  <div className="h-3 w-4/5 bg-[#fff1ea] dark:bg-[#26262e] rounded" />
                </div>
                <div className="h-4 w-28 bg-[#fff1ea] dark:bg-[#26262e] rounded" />
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

      {!cargando && !error && casos.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/10 dark:border-[#c85a32]/20">
          <p className="text-base text-[#54433a] dark:text-[#dac2b6]">
            Esta organización todavía no publicó ningún caso.
          </p>
        </div>
      )}

      {!cargando && casos.length > 0 && (
        <div className="flex flex-col gap-4">
          {casos.map((caso) => (
            <TimelinePostCard key={caso.id} caso={caso} />
          ))}
        </div>
      )}

      {hayMas && (
        <button
          onClick={handleCargarMas}
          disabled={cargandoMas}
          className="self-center mt-2 bg-white dark:bg-[#1c1c21] hover:bg-[#ffeade] dark:hover:bg-[#26262e] text-[#c85a32] border border-[#c85a32]/30 dark:border-[#c85a32]/40 font-semibold py-2.5 px-8 rounded-full shadow-sm transition disabled:opacity-50"
        >
          {cargandoMas ? 'Cargando...' : 'Cargar más publicaciones'}
        </button>
      )}
    </div>
  )
}
