"use client";

import { getCasosDonacion } from "@/services/adminconexion";
import { useEffect, useState } from "react";
import Footer from "../Footer";

type CasoDonacion = {
  id: string;
  titulo: string;
  descripcion: string;
  creado_en: string;
  mascota: {
    nombre: string;
    edad: number;
    imagenes: { url: string }[];
  };
  ong: {
    nombre: string;
  };
  donacion: {
    estadoDonacion: number;
    metaDonacion: number;
  } | null;
};

export default function DonacionesRegistradas() {
  const [casosConIngreso, setCasosConIngreso] = useState<CasoDonacion[]>([]);
  const [casosSinIngreso, setCasosSinIngreso] = useState<CasoDonacion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCasosDonacion() {
      try {
        setLoading(true);
        const res = await getCasosDonacion();

        if (!res || !res.ok) throw new Error("Error al cargar los casos de donación");

        const data: CasoDonacion[] = await res.json();

        const conIngreso = data.filter((caso) => (caso.donacion?.estadoDonacion || 0) > 0);
        const sinIngreso = data.filter((caso) => (caso.donacion?.estadoDonacion || 0) === 0);

        setCasosConIngreso(conIngreso);
        setCasosSinIngreso(sinIngreso);
      } catch (err) {
        setError("No se pudieron cargar los casos activos de donación.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCasosDonacion();
  }, []);

  const totalRecaudado = casosConIngreso.reduce(
    (acc, item) => acc + (item.donacion?.estadoDonacion || 0),
    0
  );

  const renderCasoCard = (caso: CasoDonacion) => {
    const estado = caso.donacion?.estadoDonacion || 0;
    const meta = caso.donacion?.metaDonacion || 1;
    const porcentaje = Math.min(100, Math.round((estado / meta) * 100));

    return (
      <div
        key={caso.id}
        className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between mb-4 font-body-editorial"
      >
        <div className="flex items-start gap-4 mb-3">
          <img
            src={caso.mascota?.imagenes?.[0]?.url || "/default-pet.jpg"}
            alt={caso.mascota?.nombre || "Mascota"}
            className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-2xl border-2 border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 shadow-xs shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-display-editorial text-lg font-bold text-[#6c2f00] dark:text-[#ffdbc9] truncate mb-1">
              {caso.titulo}
            </h2>
            <p className="text-xs text-[#54433a] dark:text-[#dac2b6] line-clamp-2 leading-relaxed mb-2">
              {caso.descripcion}
            </p>
            <div className="space-y-1 text-xs text-[#54433a] dark:text-[#dac2b6]">
              <p className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#c85a32]">pets</span>
                <strong>{caso.mascota?.nombre}</strong> ({caso.mascota?.edad} {caso.mascota?.edad === 1 ? 'año' : 'años'})
              </p>
              <p className="flex items-center gap-1 text-[#6c2f00] dark:text-[#ffdbc9]">
                <span className="material-symbols-outlined text-sm">domain</span>
                {caso.ong?.nombre || "Organización no asignada"}
              </p>
            </div>
          </div>
        </div>

        {caso.donacion && (
          <div className="pt-3 border-t border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 bg-[#fff8f5] dark:bg-[#121214] p-3 rounded-xl border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
            <div className="flex justify-between items-center text-xs font-semibold text-[#6c2f00] dark:text-[#ffdbc9] mb-1">
              <span>Recaudado: ${estado.toLocaleString("es-AR")}</span>
              <span className="text-[#54433a] dark:text-[#dac2b6]">Meta: ${meta.toLocaleString("es-AR")}</span>
            </div>
            <div className="w-full bg-[#fff1ea] dark:bg-[#26262e] h-2.5 rounded-full overflow-hidden border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
              <div
                className="h-full bg-[#c85a32] rounded-full transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <div className="text-[10px] text-[#54433a] dark:text-[#dac2b6] text-right mt-1 font-semibold">
              {porcentaje}% alcanzado
            </div>
          </div>
        )}

        <div className="mt-2 text-[10px] text-[#54433a] dark:text-[#dac2b6] text-right">
          Publicado el {new Date(caso.creado_en).toLocaleDateString("es-AR")}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#121214] text-[#1c1c21] dark:text-[#ffede4] font-body-editorial flex flex-col selection:bg-[#c85a32] selection:text-white">
      <div className="flex-grow max-w-[1280px] mx-auto px-6 md:px-12 py-12 w-full">
        {/* Encabezado Hero Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] font-body-editorial text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-base text-[#6c2f00] dark:text-[#ffdbc9]">payments</span>
            Recaudación de Fondos
          </div>
          <h1 className="font-display-editorial text-4xl sm:text-5xl md:text-6xl text-[#6c2f00] dark:text-[#ffdbc9] font-bold tracking-tight mb-4 leading-[1.1]">
            Panel de Donaciones
          </h1>
          <p className="font-body-editorial text-base sm:text-lg text-[#54433a] dark:text-[#dac2b6] leading-relaxed">
            Seguimiento de campañas de recaudación y aportes económicos destinados a ONGs y rescates.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar de Métricas */}
          <aside className="w-full md:w-64 shrink-0 space-y-4 sticky top-6 font-body-editorial">
            <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#6c2f00] dark:text-[#ffdbc9]">monetization_on</span>
                Total Recaudado
              </p>
              <p className="font-display-editorial text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                ${totalRecaudado.toLocaleString("es-AR")}
              </p>
            </div>

            <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#c85a32]">check_circle</span>
                Con Ingresos
              </p>
              <p className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                {casosConIngreso.length} casos
              </p>
            </div>

            <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl p-5 shadow-xs text-center">
              <p className="font-body-editorial text-xs font-bold uppercase tracking-wider text-[#54433a] dark:text-[#dac2b6] mb-1 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#54433a] dark:text-[#dac2b6]">hourglass_empty</span>
                Sin Ingresos
              </p>
              <p className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
                {casosSinIngreso.length} casos
              </p>
            </div>
          </aside>

          {/* Main Content: 2 Columnas */}
          <main className="flex-1 w-full">
            {loading ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-10 h-10 border-4 border-[#c85a32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-display-editorial text-lg text-[#6c2f00] dark:text-[#ffdbc9] font-bold">Cargando campañas de donación...</p>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-12 text-center shadow-xs">
                <span className="material-symbols-outlined text-5xl text-[#c85a32] mb-3">error</span>
                <p className="text-sm text-red-500 font-semibold">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna 1: Con Ingresos */}
                <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-6 shadow-xs">
                  <h2 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-6 flex items-center gap-2 pb-3 border-b border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
                    <span className="material-symbols-outlined text-xl text-[#6c2f00] dark:text-[#ffdbc9]">verified</span>
                    Con Ingresos Registrados
                  </h2>
                  {casosConIngreso.length === 0 ? (
                    <p className="text-xs text-[#54433a] dark:text-[#dac2b6] italic text-center py-6">No hay campañas con ingresos aún.</p>
                  ) : (
                    casosConIngreso.map(renderCasoCard)
                  )}
                </div>

                {/* Columna 2: Sin Ingresos */}
                <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-6 shadow-xs">
                  <h2 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-6 flex items-center gap-2 pb-3 border-b border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
                    <span className="material-symbols-outlined text-xl text-[#c85a32]">hourglass_empty</span>
                    Sin Ingresos Registrados
                  </h2>
                  {casosSinIngreso.length === 0 ? (
                    <p className="text-xs text-[#54433a] dark:text-[#dac2b6] italic text-center py-6">No hay recaudaciones sin ingresos.</p>
                  ) : (
                    casosSinIngreso.map(renderCasoCard)
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
