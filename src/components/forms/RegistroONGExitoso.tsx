'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function RegistroConfirmadoPage() {
  useEffect(() => {
    // Desactivar scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Restaurar scroll al desmontar
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
   <div className="min-h-screen flex items-start justify-center bg-[#fff8f5] dark:bg-[#1a0f08] text-[#28180d] dark:text-[#ffede4] font-body-editorial px-4 pt-24 selection:bg-[#c85a32] selection:text-white">
      <div className="bg-white dark:bg-[#28180d] rounded-3xl shadow-2xl p-8 sm:p-10 max-w-xl w-full text-center border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c85a32]/10 dark:bg-[#c85a32]/20 text-[#c85a32] mb-6">
          <span className="material-symbols-outlined text-3xl">mark_email_read</span>
        </div>
        <h1 className="font-display-editorial text-2xl sm:text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-4">
          ¡Gracias por registrar tu organización!
        </h1>
        <p className="font-body-editorial text-[#54433a] dark:text-[#dac2b6] text-sm leading-relaxed mb-4">
          Hemos recibido la información de tu organización dedicada al cuidado, protección y difusión de animales en situación de calle.
        </p>
        <p className="font-body-editorial text-[#54433a] dark:text-[#dac2b6] text-sm leading-relaxed mb-4">
          En las próximas <strong className="text-[#6c2f00] dark:text-[#ffdbc9]">24 horas</strong> recibirás un correo electrónico con el estado de tu solicitud: <strong>APROBADA</strong> o <strong>RECHAZADA</strong>, en caso de que no se haya podido validar algún tipo de documentación.
        </p>
        <p className="font-body-editorial text-[#54433a] dark:text-[#dac2b6] text-sm leading-relaxed mb-6">
          Si no recibís el correo dentro del plazo estipulado, recordá revisar la carpeta de <strong>correo no deseado</strong>. De no encontrarlo, por favor comunicate con el administrador del sistema.
        </p>
        <Link
          href="/"
          className="inline-block mt-2 bg-[#c85a32] hover:bg-[#a84320] text-white font-body-editorial font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}