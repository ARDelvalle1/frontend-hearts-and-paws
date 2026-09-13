'use client'

import { useState, useEffect } from 'react'
import { OngPerfilPublico } from '@/types/ong'
import { getPerfilPublicoOng } from '@/services/ongProfile'
import OngPerfilHeader from './OngPerfilHeader'
import OngPerfilTabs from './OngPerfilTabs'

export default function OngPerfilPage({ id }: { id: string }) {
  const [ong, setOng] = useState<OngPerfilPublico | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarPerfil() {
      setCargando(true)
      setError('')
      try {
        const data = await getPerfilPublicoOng(id)
        setOng(data)
      } catch {
        setError('No se encontró la organización que buscás.')
        setOng(null)
      } finally {
        setCargando(false)
      }
    }
    cargarPerfil()
  }, [id])

  return (
    <div className="bg-[#fff8f5] dark:bg-[#121214] min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-body-editorial transition-colors">
      {cargando && (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start animate-pulse">
          <div className="flex flex-col items-center gap-4 bg-white dark:bg-[#1c1c21] rounded-3xl shadow-xs border border-[#6c2f00]/15 dark:border-[#c85a32]/25 p-6 sm:p-8">
            <div className="w-28 h-28 rounded-full bg-[#ffeade] dark:bg-[#26262e]" />
            <div className="h-6 w-40 bg-[#ffeade] dark:bg-[#26262e] rounded-xl" />
            <div className="h-4 w-24 bg-[#ffeade] dark:bg-[#26262e] rounded-lg" />
            <div className="h-4 w-full bg-[#ffeade] dark:bg-[#26262e] rounded-lg" />
            <div className="h-4 w-3/4 bg-[#ffeade] dark:bg-[#26262e] rounded-lg" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="h-11 w-64 bg-[#ffeade] dark:bg-[#26262e] rounded-full" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white dark:bg-[#1c1c21] rounded-2xl border border-[#6c2f00]/15 dark:border-[#c85a32]/25"
              />
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#c85a32]/30 text-center shadow-xs">
          <span className="material-symbols-outlined text-4xl text-[#c85a32] mb-2">error</span>
          <p className="text-sm font-semibold text-[#6c2f00] dark:text-[#ffdbc9]">{error}</p>
        </div>
      )}

      {!cargando && ong && (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-24">
            <OngPerfilHeader ong={ong} />
          </aside>
          <main>
            <OngPerfilTabs ongId={ong.id} />
          </main>
        </div>
      )}
    </div>
  )
}
