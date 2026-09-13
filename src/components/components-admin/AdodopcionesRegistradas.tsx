"use client";

import { useEffect, useState } from "react";
import { getTodasAdopciones } from "@/services/adminconexion";
import Footer from "../Footer";

type Adopcion = {
  id: string;
  estado: string;
  caso: {
    titulo: string;
    descripcion: string;
    creado_en: string;
    mascota: {
      nombre: string;
      edad: number;
      descripcion: string;
      imagenes: { url: string }[];
      ongId: string;
      organizacion: {
        nombre: string;
        pais: string;
        ciudad: string;
      };
    };
  };
};

export default function AdopcionesRegistradas() {
  const [adopciones, setAdopciones] = useState<Adopcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarAdopciones() {
      try {
        setLoading(true);
        const res = await getTodasAdopciones();
        if (!res) return;
        const data = await res.json();
        setAdopciones(data);
      } catch (err) {
        console.error("Error cargando adopciones:", err);
        setError("No se pudieron cargar las adopciones.");
      } finally {
        setLoading(false);
      }
    }

    cargarAdopciones();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#121214] text-[#1c1c21] dark:text-[#ffede4] font-body-editorial flex flex-col selection:bg-[#c85a32] selection:text-white">
      <div className="flex-grow max-w-[1280px] mx-auto px-6 md:px-12 py-12 w-full">
        {/* Encabezado Hero Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] font-body-editorial text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base text-[#c85a32]">favorite</span>
            Registro de Adopciones
          </div>
          <h1 className="font-display-editorial text-4xl sm:text-5xl md:text-6xl text-[#6c2f00] dark:text-[#ffdbc9] font-bold tracking-tight mb-4 leading-[1.1]">
            Adopciones Registradas
          </h1>
          <p className="font-body-editorial text-base sm:text-lg text-[#54433a] dark:text-[#dac2b6] leading-relaxed">
            Seguimiento de procesos de adopción y casos con final feliz registrados en Hearts&amp;Paws.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0 space-y-4 sticky top-6 font-body-editorial">
            <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#c85a32]">favorite</span>
                Total Adopciones
              </p>
              <p className="font-display-editorial text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                {adopciones.length}
              </p>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 w-full">
            {loading ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-10 h-10 border-4 border-[#c85a32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-display-editorial text-lg text-[#6c2f00] dark:text-[#ffdbc9] font-bold">Cargando registros de adopción...</p>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#c85a32] mb-3">error</span>
                <p className="text-sm text-red-500 font-semibold">{error}</p>
              </div>
            ) : adopciones.length === 0 ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#6c2f00]/40 dark:text-[#ffdbc9]/40 mb-3">favorite</span>
                <h3 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-2">No hay adopciones registradas</h3>
                <p className="text-sm text-[#54433a] dark:text-[#dac2b6]">Aún no existen casos de adopción registrados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {adopciones.map((adopcion) => (
                  <div
                    key={adopcion.id}
                    className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={adopcion.caso.mascota.imagenes[0]?.url || "/default-pet.jpg"}
                          alt={adopcion.caso.mascota.nombre}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 shadow-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#fff1ea] dark:bg-[#26262e] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] text-[10px] font-bold uppercase tracking-wider">
                              Estado: {adopcion.estado || "Registrada"}
                            </span>
                          </div>
                          <h2 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] truncate">
                            {adopcion.caso.titulo}
                          </h2>
                          <p className="text-xs text-[#54433a] dark:text-[#dac2b6] flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-sm text-[#c85a32]">pets</span>
                            <strong>{adopcion.caso.mascota.nombre}</strong> ({adopcion.caso.mascota.edad} {adopcion.caso.mascota.edad === 1 ? 'año' : 'años'})
                          </p>
                        </div>
                      </div>

                      {adopcion.caso.descripcion && (
                        <p className="text-xs text-[#54433a] dark:text-[#dac2b6] line-clamp-3 leading-relaxed bg-[#fff8f5] dark:bg-[#121214] p-3 rounded-xl border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 mb-4">
                          {adopcion.caso.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 flex flex-col gap-1 text-xs text-[#54433a] dark:text-[#dac2b6]">
                      <div className="flex items-center gap-1.5 font-semibold text-[#6c2f00] dark:text-[#ffdbc9] truncate">
                        <span className="material-symbols-outlined text-sm">domain</span>
                        {adopcion.caso.mascota.organizacion?.nombre || "Organización no asignada"}
                      </div>
                      {(adopcion.caso.mascota.organizacion?.ciudad || adopcion.caso.mascota.organizacion?.pais) && (
                        <div className="text-[11px] text-[#54433a] dark:text-[#dac2b6] flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span>
                          {[adopcion.caso.mascota.organizacion.ciudad, adopcion.caso.mascota.organizacion.pais].filter(Boolean).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
