'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LoginSelector() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#28180d] font-body-editorial flex items-center justify-center p-4 selection:bg-[#ff6b6b] selection:text-white">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#6c2f00]/15 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] border border-[#6c2f00]/15 text-[#6c2f00] text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base">lock</span>
            Acceso a Hearts&amp;Paws
          </div>
          <h1 className="font-display-editorial text-3xl sm:text-4xl text-[#6c2f00] font-bold tracking-tight">
            ¿Cómo querés iniciar sesión?
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/login/login')}
            className="bg-[#ff6b6b] hover:bg-[#ae2f34] text-white font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 w-full shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">login</span>
            Iniciar sesión con Google
          </button>

          <button
            onClick={() => router.push('/login/login-ong')}
            className="border border-[#6c2f00]/20 text-[#6c2f00] bg-[#fff8f5] hover:bg-[#fff1ea] font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 w-full shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-[#6c2f00]">domain</span>
            Iniciar sesión como ONG
          </button>

          <button
            onClick={() => router.push('/login/login-user')}
            className="border border-[#6c2f00]/20 text-[#6c2f00] bg-[#fff8f5] hover:bg-[#fff1ea] font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 w-full shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-[#6c2f00]">person</span>
            Iniciar sesión como Usuario
          </button>
        </div>

        <p className="text-center text-[#54433a] mt-8 text-xs font-body-editorial">
          Elegí la opción que corresponda al tipo de cuenta registrada.
        </p>
      </div>
    </div>
  );
}