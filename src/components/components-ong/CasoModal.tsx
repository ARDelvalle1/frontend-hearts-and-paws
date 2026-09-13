"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Caso } from "@/types/casos";
import Image from "next/image";
import { ESTADOS_MASCOTA, EstadoMascotaKey } from "@/lib/estadoMascota";
import { updateEstadoMascota } from "@/services/pet";

type CasoModalProps = {
  caso: Caso;
  visible: boolean;
  onClose: () => void;
};

export default function CasoModal({ caso, visible, onClose }: CasoModalProps) {
  const [estado, setEstado] = useState<EstadoMascotaKey>(caso.mascota.estado ?? "EN_ADOPCION");
  const [guardando, setGuardando] = useState(false);

  if (!visible) return null;

  const imagenUrl =
    caso.mascota.imagenes?.[0]?.url ?? "https://via.placeholder.com/400x300?text=Mascota";

  const handleCambiarEstado = async (nuevoEstado: EstadoMascotaKey) => {
    const anterior = estado;
    setEstado(nuevoEstado);
    setGuardando(true);
    try {
      await updateEstadoMascota(caso.mascota.id, nuevoEstado);
      toast.success(`Estado de ${caso.mascota.nombre} actualizado a "${ESTADOS_MASCOTA[nuevoEstado].label}"`);
    } catch {
      setEstado(anterior);
      toast.error("No se pudo actualizar el estado de la mascota.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c21]/60 dark:bg-black/75 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-[#1c1c21] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-[#6c2f00] dark:text-[#ffdbc9] hover:bg-[#ffeade] dark:hover:bg-[#26262e] transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5 flex justify-center overflow-hidden rounded-2xl border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 shadow-xs">
          <Image
            src={imagenUrl}
            alt={caso.mascota.nombre}
            width={400}
            height={260}
            className="w-full h-52 object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold font-serif text-[#6c2f00] dark:text-[#ffdbc9] mb-3 text-center">
          {caso.titulo}
        </h2>

        <div className="max-h-44 overflow-y-auto whitespace-pre-wrap leading-relaxed text-sm text-[#54433a] dark:text-[#dac2b6] text-center mb-5 px-1">
          {caso.descripcion}
        </div>

        <div className="border-t border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 pt-4">
          <label htmlFor="estado-mascota" className="block text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9] mb-2 text-center">
            Estado de {caso.mascota.nombre}
          </label>
          <div className="relative">
            <select
              id="estado-mascota"
              value={estado}
              disabled={guardando}
              onChange={(e) => handleCambiarEstado(e.target.value as EstadoMascotaKey)}
              className="w-full appearance-none px-4 py-2.5 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-center font-medium text-[#1c1c21] dark:text-[#ffdbc9] focus:outline-none focus:ring-2 focus:ring-[#c85a32] disabled:opacity-50 transition-colors cursor-pointer"
            >
              {Object.entries(ESTADOS_MASCOTA).map(([key, { label }]) => (
                <option key={key} value={key} className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#54433a] dark:text-[#dac2b6]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
