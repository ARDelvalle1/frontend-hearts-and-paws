'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function RegisterTypeSelector() {
  const router = useRouter();

  useEffect(() => {
    // Bloquear scroll del body cuando el componente está montado
    document.body.style.overflow = 'hidden';

    // Limpiar al desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#fff8f5] dark:bg-[#1a0f08] text-[#28180d] dark:text-[#ffede4] font-body-editorial overflow-hidden flex items-center justify-center px-4 selection:bg-[#c85a32] selection:text-white">
      <div className="max-w-xl w-full bg-white dark:bg-[#28180d] p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 relative font-body-editorial box-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] dark:bg-[#1a0f08] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base">person_add</span>
            Registro en Hearts&amp;Paws
          </div>
          <h1 className="font-display-editorial text-3xl sm:text-4xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] tracking-tight">
            ¿Cómo querés registrarte?
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/register/ong')}
            className="bg-[#c85a32] hover:bg-[#a84320] text-white font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 w-full shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">domain</span>
            Registrarme como ONG
          </button>

          <button
            onClick={() => router.push('/register/user')}
            className="border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 text-[#6c2f00] dark:text-[#ffdbc9] bg-[#fff8f5] dark:bg-[#1a0f08] hover:bg-[#fff1ea] dark:hover:bg-[#3f2c20] font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 w-full shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-[#6c2f00] dark:text-[#ffdbc9]">person</span>
            Registrarme como Usuario
          </button>
        </div>

        <p className="text-center text-[#54433a] dark:text-[#dac2b6] mt-8 text-xs font-body-editorial">
          Elegí el tipo de registro que se adapte a tu rol en la plataforma.
        </p>
      </div>
    </div>
  );
}