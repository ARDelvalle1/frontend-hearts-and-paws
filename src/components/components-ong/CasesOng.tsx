"use client";

import { useState, useEffect } from "react";
import CasoCard from "./CasoCard";
import CasoModal from "./CasoModal";
import { Caso } from "@/types/casos";
import { useOngAuth } from "@/context/OngAuthContext";
import { getCasesByOng } from "@/services/casesService";

export default function CasesOng() {
  const { ong } = useOngAuth();
  const [casos, setCasos] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState<Caso | null>(null);

  useEffect(() => {
    if (!ong) return;

    const fetchCasos = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCasesByOng();
        setCasos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCasos();
  }, [ong]);

  const handleConocerHistoria = (id: string) => {
    const caso = casos.find((c) => c.id === id);
    if (caso) {
      setCasoSeleccionado(caso);
    }
  };

  const cerrarModal = () => setCasoSeleccionado(null);

  return (
    <div className="bg-white dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-3xl p-6 sm:p-8 shadow-xs font-body-editorial transition-colors">
      {/* Encabezado */}
      <div className="mb-6 pb-6 border-b border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff1ea] dark:bg-[#26262e] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] text-xs font-semibold mb-3">
          <span className="material-symbols-outlined text-base text-[#c85a32]">folder_open</span>
          Publicaciones Activas
        </div>
        <h1 className="font-display-editorial text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
          Mis Casos Publicados
        </h1>
        <p className="text-sm text-[#54433a] dark:text-[#dac2b6] mt-1">
          Consulta y gestiona todos los casos de adopción y recaudación que registraste como organización.
        </p>
      </div>

      {loading && (
        <div className="p-12 text-center">
          <div className="w-10 h-10 border-4 border-[#c85a32] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-display-editorial text-lg text-[#6c2f00] dark:text-[#ffdbc9] font-bold">Cargando casos...</p>
        </div>
      )}

      {error && (
        <div className="p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-[#c85a32] mb-3">error</span>
          <p className="text-sm text-red-500 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && casos.length === 0 && (
        <div className="p-12 text-center bg-[#fff8f5] dark:bg-[#121214] rounded-2xl border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10">
          <span className="material-symbols-outlined text-5xl text-[#6c2f00]/30 dark:text-[#ffdbc9]/30 mb-3">pets</span>
          <h3 className="font-display-editorial text-lg font-bold text-[#6c2f00] dark:text-[#ffdbc9] mb-1">
            No tienes casos publicados aún
          </h3>
          <p className="text-xs sm:text-sm text-[#54433a] dark:text-[#dac2b6] max-w-md mx-auto mb-5">
            Publica un caso de adopción o campaña de recaudación para conectar con potenciales adoptantes o donantes.
          </p>
        </div>
      )}

      {!loading && casos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {casos.map((caso) => (
            <div key={caso.id} className="flex flex-col items-stretch">
              <CasoCard caso={caso} onConocerHistoria={handleConocerHistoria} />
            </div>
          ))}
        </div>
      )}

      {casoSeleccionado && (
        <CasoModal
          caso={casoSeleccionado}
          visible={true}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
}
