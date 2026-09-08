"use client";

import { useState } from "react";
import Image from "next/image";
import { Caso } from "@/types/casos";
import { ESTADOS_MASCOTA } from "@/lib/estadoMascota";

type Props = {
  caso: Caso;
  onConocerHistoria?: (id: string) => void;
};

export default function CasoCard({ caso, onConocerHistoria }: Props) {
  const imagenes = caso.mascota.imagenes ?? [];
  const estado = caso.mascota.estado ? ESTADOS_MASCOTA[caso.mascota.estado] : null;
  const [imagenActual, setImagenActual] = useState(0);
  const totalImagenes = imagenes.length;

  const irAAnterior = () => {
    setImagenActual((prev) => (prev === 0 ? totalImagenes - 1 : prev - 1));
  };

  const irASiguiente = () => {
    setImagenActual((prev) => (prev === totalImagenes - 1 ? 0 : prev + 1));
  };

  const imagenUrl =
    imagenes[imagenActual]?.url ?? "https://via.placeholder.com/400x300?text=Mascota";

  return (
    <div className="bg-white dark:bg-[#28180d] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col w-full overflow-hidden font-body-editorial group">
      {/* 🖼 Carrusel de imágenes */}
      <div className="relative w-full h-52 p-4 bg-[#fff8f5] dark:bg-[#1a0f08] border-b border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 flex items-center justify-center overflow-hidden">
        <Image
          src={imagenUrl}
          alt={caso.mascota.nombre}
          width={220}
          height={160}
          className="object-contain max-h-full rounded-xl transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {totalImagenes > 1 && (
          <>
            <button
              onClick={irAAnterior}
              className="absolute left-2 text-[#6c2f00] dark:text-[#ffdbc9] bg-white/90 dark:bg-[#28180d]/90 rounded-full shadow-xs p-1 hover:bg-[#ffeade] dark:hover:bg-[#3f2c20] transition-colors z-10 cursor-pointer flex items-center justify-center border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10"
              type="button"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={irASiguiente}
              className="absolute right-2 text-[#6c2f00] dark:text-[#ffdbc9] bg-white/90 dark:bg-[#28180d]/90 rounded-full shadow-xs p-1 hover:bg-[#ffeade] dark:hover:bg-[#3f2c20] transition-colors z-10 cursor-pointer flex items-center justify-center border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10"
              type="button"
              aria-label="Imagen siguiente"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display-editorial text-xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] group-hover:text-[#c85a32] transition-colors truncate">
            {caso.mascota.nombre}
          </h2>
          {estado && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${estado.className}`}>
              {estado.label}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          <button
            onClick={() => onConocerHistoria?.(caso.id)}
            className="w-full bg-[#fff1ea] dark:bg-[#3f2c20] hover:bg-[#c85a32] hover:text-white dark:hover:bg-[#c85a32] text-[#6c2f00] dark:text-[#ffdbc9] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 font-semibold text-xs py-2.5 px-4 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">info</span>
            Más información
          </button>
        </div>
      </div>
    </div>
  );
}




// // components/casos/CasoCard.tsx
// "use client";

// import { Caso } from "@/types/casos";
// import Image from "next/image";

// type Props = {
//   caso: Caso;
//   onConocerHistoria?: (id: string) => void;
// };

// export default function CasoCard({ caso, onConocerHistoria }: Props) {
//   const imagenUrl =
//     caso.mascota.imagenes?.[0]?.url ?? "https://via.placeholder.com/400x300?text=Mascota";

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col w-full max-w-xs">
//       <div className="w-full h-48 p-2 flex items-center justify-center bg-white">
//         <Image
//           src={imagenUrl}
//           alt={caso.mascota.nombre}
//           width={180}
//           height={130}
//           className="object-contain"
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
//       </div>

//       <div className="p-7 flex-1 flex flex-col justify-between">
//         <h2 className="text-xl font-bold text-[#FA8072] mb-2">{caso.mascota.nombre}</h2>

//         <div className="mt-auto">
//           <button
//             onClick={() => onConocerHistoria?.(caso.id)}
//             className="w-full bg-[#FA8072] hover:bg-[#e87366] text-white py-2 px-4 rounded-full transition"
//           >
//             Más info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
