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

        <div className="flex flex-col gap-6">
          <button
            onClick={() => router.push('/login/login')}
            className="bg-[#FA8072] hover:bg-[#e87366] text-white font-semibold py-4 px-6 rounded-md text-lg transition w-full"
          >
            Iniciar sesión con Google
          </button>

          <button
            onClick={() => router.push('/login/login-ong')}
            className="bg-[#ffece8] dark:bg-zinc-800 hover:bg-[#ffcfc7] dark:hover:bg-zinc-700 text-[#FA8072] font-semibold py-4 px-6 rounded-md text-lg transition w-full border border-[#FA8072]"
          >
            Iniciar sesión como ONG
          </button>

          <button
            onClick={() => router.push('/login/login-user')}
            className="bg-[#ffece8] dark:bg-zinc-800 hover:bg-[#ffcfc7] dark:hover:bg-zinc-700 text-[#FA8072] font-semibold py-4 px-6 rounded-md text-lg transition w-full border border-[#FA8072]"
          >
            Iniciar sesión como Usuario
          </button>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm">
          Elegí la opción que se corresponda con tu cuenta.
        </p>
      </div>
    </div>
  );
}