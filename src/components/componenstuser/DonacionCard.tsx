'use client'

import React from 'react'
import Image from 'next/image'

type Donacion = {
  id: string
  monto: number
  fecha: string
  estadoPago: string
  mascota: {
    nombre: string
    imagenes?: { url: string }[]
  }
  organizacion: {
    nombre: string
  }
  casoDonacionId: string
}

type DonacionCardProps = {
  donacion: Donacion
}

export default function DonacionCard({ donacion }: DonacionCardProps) {
  const fechaFormateada = new Date(donacion.fecha).toLocaleDateString('es-AR')

  const estadoPagoTraducido: Record<string, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    failed: 'Fallido',
    canceled: 'Cancelado',
  }

  const colorEstadoPago: Record<string, string> = {
    paid: 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-800',
    pending: 'bg-[#ffeade] dark:bg-[#26262e] text-[#6c2f00] dark:text-[#ffdbc9] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20',
    failed: 'bg-[#ffdad6] dark:bg-[#93000a]/20 text-[#93000a] dark:text-[#ffdad6] border border-[#ba1a1a]/20',
    canceled: 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700',
  }

  const iconoEstado: Record<string, string> = {
    paid: 'check_circle',
    pending: 'schedule',
    failed: 'cancel',
    canceled: 'block',
  }

  const estado = donacion.estadoPago
  const textoEstado = estadoPagoTraducido[estado] || estado
  const color = colorEstadoPago[estado] || 'bg-gray-100 text-gray-800'
  const icono = iconoEstado[estado] || 'help'

  const TASA_CAMBIO = 1220; 
  const montoEnPesos = donacion.monto * TASA_CAMBIO;

  return (
    <div className="relative bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-xl shadow-none p-6 md:pr-32 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:border-[#6c2f00]/30 font-body-editorial">
      {/* Badge flotante */}
      <div
        className={`absolute right-6 top-6 md:top-1/2 md:-translate-y-1/2 text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1.5 ${color}`}
      >
        <span className="material-symbols-outlined text-sm">{icono}</span>
        <span>{textoEstado}</span>
      </div>

      {/* Imagen de la mascota o ícono por defecto */}
      <div className="w-full md:w-36 h-36 flex items-center justify-center bg-[#fff8f5] dark:bg-[#26262e] border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 rounded-lg overflow-hidden relative flex-shrink-0">
        {donacion.mascota.imagenes?.[0]?.url ? (
          <Image
            src={donacion.mascota.imagenes[0].url}
            alt={`Foto de ${donacion.mascota.nombre}`}
            fill
            className="object-cover"
          />
        ) : (
          <span className="material-symbols-outlined text-[#6c2f00] dark:text-[#ffdbc9] text-5xl opacity-40">pets</span>
        )}
      </div>

      {/* Info principal */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-1">{donacion.mascota.nombre}</h2>
        <p className="text-xs uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9] font-semibold mb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">home_work</span>
          <span>{donacion.organizacion.nombre}</span>
        </p>
        <p className="text-[#1c1c21] dark:text-[#ffede4] font-medium text-sm mt-1">
          <span className="font-semibold text-[#6c2f00] dark:text-[#ffdbc9]">Monto:</span> ${donacion.monto.toLocaleString()} USD (~${montoEnPesos.toLocaleString()} ARS)
        </p>

        <p className="text-[#54433a] dark:text-[#dac2b6] text-xs mt-1">
          <span className="font-semibold">Fecha:</span> {fechaFormateada}
        </p>
      </div>
    </div>
  )
}
