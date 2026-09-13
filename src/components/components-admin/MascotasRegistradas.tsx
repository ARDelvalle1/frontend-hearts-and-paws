"use client";

import { fetchMascotasObtenidas } from "@/services/adminconexion";
import { useEffect, useState } from "react";
import Footer from "../Footer";

type ImagenMascota = {
  id: string;
  url: string;
  mascotaId: string;
  subida_en: string;
};

type Mascota = {
  id: string;
  nombre: string;
  edad: number;
  descripcion: string;
  creada_en: string;
  organizacionId: string;
  tipoId: string;
  imagenes: ImagenMascota[];
};

export default function MascotasRegistradas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null);

  useEffect(() => {
    async function fetchMascotas() {
      try {
        setLoading(true);
        const res = await fetchMascotasObtenidas();
        if (!res || !res.ok) throw new Error("Error al obtener las Mascotas");
        const data = await res.json();
        setMascotas(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las mascotas.");
      } finally {
        setLoading(false);
      }
    }

    fetchMascotas();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#121214] text-[#1c1c21] dark:text-[#ffede4] font-body-editorial flex flex-col selection:bg-[#c85a32] selection:text-white">
      <div className="flex-grow max-w-[1280px] mx-auto px-6 md:px-12 py-12 w-full">
        {/* Encabezado Hero Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] font-body-editorial text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base text-[#6c2f00] dark:text-[#ffdbc9]">pets</span>
            Catálogo de Mascotas
          </div>
          <h1 className="font-display-editorial text-4xl sm:text-5xl md:text-6xl text-[#6c2f00] dark:text-[#ffdbc9] font-bold tracking-tight mb-4 leading-[1.1]">
            Mascotas Registradas
          </h1>
          <p className="font-body-editorial text-base sm:text-lg text-[#54433a] dark:text-[#dac2b6] leading-relaxed">
            Consulte la lista completa de animales registrados en la red Hearts&amp;Paws y conozca su historia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 space-y-4 sticky top-6 font-body-editorial">
            <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#6c2f00] dark:text-[#ffdbc9]">pets</span>
                Total Registradas
              </p>
              <p className="font-display-editorial text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                {mascotas.length}
              </p>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 w-full">
            {loading ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-10 h-10 border-4 border-[#c85a32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-display-editorial text-lg text-[#6c2f00] dark:text-[#ffdbc9] font-bold">Cargando catálogo de mascotas...</p>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#c85a32] mb-3">error</span>
                <p className="text-sm text-red-500 font-semibold">{error}</p>
              </div>
            ) : mascotas.length === 0 ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#6c2f00]/40 dark:text-[#ffdbc9]/40 mb-3">pets</span>
                <h3 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-2">No hay mascotas registradas</h3>
                <p className="text-sm text-[#54433a] dark:text-[#dac2b6]">Aún no hay mascotas ingresadas en la plataforma.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mascotas.map((mascota) => (
                  <div
                    key={mascota.id}
                    className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full h-52 p-4 bg-[#fff8f5] dark:bg-[#121214] flex items-center justify-center border-b border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 overflow-hidden">
                        <img
                          src={mascota.imagenes[0]?.url || "/default-pet.jpg"}
                          alt={`Foto de ${mascota.nombre}`}
                          className="object-contain max-h-full rounded-xl transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h2 className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                            {mascota.nombre}
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#fff1ea] dark:bg-[#26262e] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] text-xs font-semibold">
                            {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                          </span>
                        </div>

                        <button
                          onClick={() => setMascotaSeleccionada(mascota)}
                          className="w-full mt-3 py-2 px-4 bg-[#fff1ea] dark:bg-[#26262e] hover:bg-[#6c2f00] dark:hover:bg-[#c85a32] text-[#6c2f00] dark:text-[#ffdbc9] hover:text-white dark:hover:text-white border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">auto_stories</span>
                          Conocer historia
                        </button>
                      </div>
                    </div>

                    <div className="px-5 py-3 border-t border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 bg-[#fff8f5]/50 dark:bg-[#121214]/50 flex items-center justify-between text-[11px] text-[#54433a] dark:text-[#dac2b6]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#6c2f00] dark:text-[#ffdbc9]">calendar_today</span>
                        {new Date(mascota.creada_en).toLocaleDateString("es-AR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal Historia */}
      {mascotaSeleccionada && (
        <div className="fixed inset-0 z-50 bg-[#1c1c21]/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative font-body-editorial max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setMascotaSeleccionada(null)}
              className="absolute top-4 right-4 text-[#54433a] dark:text-[#dac2b6] hover:text-[#6c2f00] dark:hover:text-[#ffdbc9] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-2xl text-[#6c2f00] dark:text-[#ffdbc9]">pets</span>
              <h2 className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                {mascotaSeleccionada.nombre}
              </h2>
            </div>
            <div className="w-full h-56 bg-[#fff8f5] dark:bg-[#121214] rounded-2xl overflow-hidden p-3 border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 mb-4 flex items-center justify-center">
              <img
                src={mascotaSeleccionada.imagenes[0]?.url || "/default-pet.jpg"}
                alt={`Foto de ${mascotaSeleccionada.nombre}`}
                className="object-contain max-h-full rounded-xl"
              />
            </div>
            <div className="bg-[#fff8f5] dark:bg-[#121214] p-4 rounded-2xl border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-2">Historia y detalles</h3>
              <p className="text-xs text-[#54433a] dark:text-[#dac2b6] whitespace-pre-line leading-relaxed">
                {mascotaSeleccionada.descripcion || "Sin descripción proporcionada."}
              </p>
            </div>
            <button
              onClick={() => setMascotaSeleccionada(null)}
              className="w-full bg-[#6c2f00] dark:bg-[#c85a32] hover:bg-[#54433a] dark:hover:bg-[#a84320] text-white py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
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
