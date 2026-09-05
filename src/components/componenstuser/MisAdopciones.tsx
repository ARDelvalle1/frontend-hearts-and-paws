'use client';

import { useEffect, useState } from 'react';
import { getMisSolicitudesDeAdopcion } from '@/services/usuario';
import AdopcionCard from './AdopcionCard';
import { SolicitudDeAdopcion } from '@/types/adopcionesdeusuario';
import { useRouter } from 'next/navigation';
import { useAuth } from '../SupabaseProvider';

export default function MisAdopciones() {
  const [adopciones, setAdopciones] = useState<SolicitudDeAdopcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    async function fetchAdopciones() {
      try {
        const data = await getMisSolicitudesDeAdopcion(token ?? undefined);
          console.log('Solicitudes recibidas:', data); 
        setAdopciones(data);
      } catch {
        setError('No se pudieron cargar tus solicitudes');
      } finally {
        setLoading(false);
      }
    }
    fetchAdopciones();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#1a0f08] text-[#28180d] dark:text-[#ffede4] font-body-editorial flex justify-center py-10 md:py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-8 max-w-5xl w-full">
        {/* Sidebar centrado estilo Earth & Heart */}
        <nav className="flex flex-col p-6 bg-[#ffeade] dark:bg-[#28180d] rounded-xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 w-full md:w-64 shadow-none flex-shrink-0">
          <div className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6c2f00] dark:text-[#ffdbc9]">person</span>
            <span>Perfil</span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push('/dashboard/usuario')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-[#54433a] dark:text-[#dac2b6] hover:bg-[#ffe3d2] dark:hover:bg-[#3f2c20] hover:text-[#6c2f00] dark:hover:text-[#ffdbc9] transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Principal</span>
            </button>

            <button
              onClick={() => router.push('/usuario/adopciones')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold bg-[#fff1ea] dark:bg-[#3f2c20] text-[#6c2f00] dark:text-[#ffdbc9] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">pets</span>
              <span>Mis Adopciones</span>
            </button>

            <button
              onClick={() => router.push('/usuario/donaciones')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-[#54433a] dark:text-[#dac2b6] hover:bg-[#ffe3d2] dark:hover:bg-[#3f2c20] hover:text-[#6c2f00] dark:hover:text-[#ffdbc9] transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">volunteer_activism</span>
              <span>Mis Donaciones</span>
            </button>

            <button
              onClick={() => router.push('/usuario/favoritos')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-[#54433a] dark:text-[#dac2b6] hover:bg-[#ffe3d2] dark:hover:bg-[#3f2c20] hover:text-[#6c2f00] dark:hover:text-[#ffdbc9] transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">favorite</span>
              <span>Mis Favoritos</span>
            </button>

            <button
              onClick={() => router.push('/chat')}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-[#54433a] dark:text-[#dac2b6] hover:bg-[#ffe3d2] dark:hover:bg-[#3f2c20] hover:text-[#6c2f00] dark:hover:text-[#ffdbc9] transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>Mensajes</span>
            </button>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="flex-1 w-full max-w-3xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="font-display-editorial text-3xl md:text-4xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                Mis Adopciones
              </h1>
              <p className="font-body-editorial text-sm text-[#54433a] dark:text-[#dac2b6] mt-1">
                Seguimiento de tus solicitudes de adopción
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-3xl text-[#6c2f00] dark:text-[#ffdbc9] animate-spin mb-2">progress_activity</span>
              <p className="font-body-editorial text-sm text-[#54433a] dark:text-[#dac2b6]">Cargando tus solicitudes...</p>
            </div>
          )}

          {error && (
            <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-xl text-center text-sm font-body-editorial border border-[#ba1a1a]/20">
              {error}
            </div>
          )}

          {!loading && !error && adopciones.length === 0 && (
            <div className="bg-[#fff1ea] dark:bg-[#28180d] rounded-xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-[#6c2f00] dark:text-[#ffdbc9] mb-3 opacity-60">pets</span>
              <p className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-2">Aún no tienes solicitudes</p>
              <p className="font-body-editorial text-sm text-[#54433a] dark:text-[#dac2b6] max-w-md mx-auto mb-6">
                Cuando encuentres a tu compañero ideal y envíes tu solicitud de adopción, podrás ver su estado aquí.
              </p>
              <button
                onClick={() => router.push('/adoptar/adopcion')}
                className="bg-[#ff6b6b] hover:bg-[#ae2f34] text-[#6d0010] hover:text-white font-body-editorial font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm inline-flex items-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-base">search</span>
                <span>Explorar Mascotas</span>
              </button>
            </div>
          )}

          <div className="space-y-6">
            {adopciones.map((adopcion) => (
              <AdopcionCard key={adopcion.id} adopcion={adopcion} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
