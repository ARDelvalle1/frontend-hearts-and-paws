'use client';

import { getTotalOrganizacionesRechazadas } from '@/services/adminconexion';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../Footer';

interface Organizacion {
  id: string;
  nombre: string;
  ciudad: string;
  email: string;
  descripcion: string;
  imagenPerfil: null | string;
}

export default function OngsRechazadas() {
  const router = useRouter();
  const [ongs, setOngs] = useState<Organizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOng, setSelectedOng] = useState<Organizacion | null>(null);

  useEffect(() => {
    const obtenerOngs = async () => {
      try {
        setLoading(true);
        const res = await getTotalOrganizacionesRechazadas();
        if (!res || !res.ok) throw new Error('Error al obtener ONGs');
        const data = await res.json();
        setOngs(data);
      } catch (error) {
        console.error('Error cargando ONGs:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerOngs();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#28180d] font-body-editorial flex flex-col selection:bg-[#ff6b6b] selection:text-white">
      <div className="flex-grow max-w-[1280px] mx-auto px-6 md:px-12 py-12 w-full">
        {/* Encabezado Hero Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] border border-[#6c2f00]/15 text-[#6c2f00] font-body-editorial text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base text-[#ff6b6b]">cancel</span>
            Administración ONG
          </div>
          <h1 className="font-display-editorial text-4xl sm:text-5xl md:text-6xl text-[#6c2f00] font-bold tracking-tight mb-4 leading-[1.1]">
            Organizaciones Rechazadas
          </h1>
          <p className="font-body-editorial text-base sm:text-lg text-[#54433a] leading-relaxed">
            Registro de solicitudes de ONGs no aprobadas en la plataforma Hearts&amp;Paws.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0 space-y-4 sticky top-6 font-body-editorial">
            <div className="bg-white border border-[#6c2f00]/15 rounded-2xl p-5 shadow-xs">
              <h2 className="font-display-editorial text-lg font-bold text-[#6c2f00] mb-4 flex items-center gap-2 pb-3 border-b border-[#6c2f00]/10">
                <span className="material-symbols-outlined text-xl text-[#6c2f00]">domain</span>
                Navegación ONG
              </h2>
              <button
                onClick={() => router.push('/dashboard/admin/organizaciones')}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#54433a] hover:text-[#6c2f00] bg-[#fff8f5] hover:bg-[#fff1ea] border border-[#6c2f00]/15 rounded-full transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#6c2f00]">verified</span>
                  <span>Ver Aprobadas</span>
                </div>
                <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </button>
            </div>

            {/* Contador de Rechazadas */}
            <div className="bg-white border border-[#6c2f00]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#ff6b6b]">block</span>
                Total Rechazadas
              </p>
              <p className="font-display-editorial text-3xl font-bold text-[#6c2f00]">
                {ongs.length}
              </p>
            </div>
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1 w-full">
            {loading ? (
              <div className="bg-white border border-[#6c2f00]/15 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-10 h-10 border-4 border-[#ff6b6b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-display-editorial text-lg text-[#6c2f00] font-bold">Cargando solicitudes rechazadas...</p>
              </div>
            ) : ongs.length === 0 ? (
              <div className="bg-white border border-[#6c2f00]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#6c2f00]/40 mb-3">check_circle</span>
                <h3 className="font-display-editorial text-xl font-bold text-[#6c2f00] mb-2">Sin solicitudes rechazadas</h3>
                <p className="text-sm text-[#54433a]">No hay registros de organizaciones rechazadas actualmente.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ongs.map((org) => (
                  <div
                    key={org.id}
                    className="bg-white border border-[#6c2f00]/15 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={org.imagenPerfil ?? "/default-profile.png"}
                          alt={`Foto de ${org.nombre}`}
                          className="w-16 h-16 object-cover border-2 border-[#6c2f00]/20 rounded-2xl shadow-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#ffe6e6] border border-[#ff6b6b]/30 text-[#ff6b6b] text-[10px] font-bold uppercase tracking-wider">
                              Rechazada
                            </span>
                          </div>
                          <h2 className="font-display-editorial text-xl font-bold text-[#6c2f00] truncate">
                            {org.nombre}
                          </h2>
                          <p className="text-xs text-[#54433a] flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {org.ciudad || "Ubicación no especificada"}
                          </p>
                        </div>
                      </div>

                      {org.descripcion && (
                        <p className="text-xs text-[#54433a] line-clamp-3 mb-4 leading-relaxed bg-[#fff8f5] p-3 rounded-xl border border-[#6c2f00]/10">
                          {org.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#6c2f00]/10 flex items-center justify-between text-xs text-[#6c2f00]">
                      <span className="font-semibold truncate flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#ff6b6b]">mail</span>
                        {org.email}
                      </span>
                      <button
                        onClick={() => setSelectedOng(org)}
                        className="px-3 py-1 rounded-full bg-[#fff1ea] hover:bg-[#6c2f00] hover:text-white border border-[#6c2f00]/20 text-[#6c2f00] text-xs font-semibold transition-colors cursor-pointer shrink-0 ml-2"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedOng && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#6c2f00]/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative font-body-editorial">
            <button
              onClick={() => setSelectedOng(null)}
              className="absolute top-4 right-4 text-[#54433a] hover:text-[#6c2f00] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedOng.imagenPerfil ?? "/default-profile.png"}
                alt={selectedOng.nombre}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6c2f00]/20 shadow-xs"
              />
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffe6e6] border border-[#ff6b6b]/30 text-[#ff6b6b] text-[10px] font-bold uppercase tracking-wider">
                  Rechazada
                </span>
                <h3 className="font-display-editorial text-2xl font-bold text-[#6c2f00] mt-1">
                  {selectedOng.nombre}
                </h3>
              </div>
            </div>
            <div className="space-y-3 text-xs text-[#54433a] bg-[#fff8f5] p-4 rounded-2xl border border-[#6c2f00]/10 mb-6">
              <p><strong>Ubicación:</strong> {selectedOng.ciudad || "No especificada"}</p>
              <p><strong>Email:</strong> {selectedOng.email}</p>
              <p><strong>ID:</strong> <code className="bg-white px-2 py-0.5 rounded border border-[#6c2f00]/10 text-[11px]">{selectedOng.id}</code></p>
              <div>
                <strong className="block mb-1">Descripción:</strong>
                <p className="leading-relaxed">{selectedOng.descripcion || "Sin descripción proporcionada."}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedOng(null)}
              className="w-full bg-[#6c2f00] hover:bg-[#54433a] text-white py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
