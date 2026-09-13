'use client'

import Image from 'next/image';

interface AdopcionCardProps {
  adopcion: {
    id: string;
    estado: string;
    casoAdopcion: {
      caso: {
        titulo: string;
        descripcion: string;
        mascota: {
          nombre: string;
          imagenes: { url: string }[];
        };
        ong: {
          nombre: string;
        };
      };
    };
  };
}

const estadoColor = {
  PENDIENTE: 'bg-[#ffeade] dark:bg-[#26262e] text-[#6c2f00] dark:text-[#ffdbc9] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20',
  ACEPTADA: 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-800',
  RECHAZADA: 'bg-[#ffdad6] dark:bg-[#93000a]/20 text-[#93000a] dark:text-[#ffdad6] border border-[#ba1a1a]/20',
};

export default function AdopcionCard({ adopcion }: AdopcionCardProps) {
  const { mascota, titulo, descripcion, ong } = adopcion.casoAdopcion.caso;
  const imagen = mascota.imagenes[0]?.url;

  return (
    <div className="relative bg-[#fff1ea] dark:bg-[#1c1c21] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 rounded-xl shadow-none p-6 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:border-[#6c2f00]/30 font-body-editorial">
      {imagen && (
        <div className="w-full md:w-40 h-40 relative rounded-lg overflow-hidden border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 bg-[#fff8f5] dark:bg-[#26262e] flex-shrink-0">
          <Image
            src={imagen}
            alt={mascota.nombre}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="font-display-editorial text-2xl font-bold text-[#6c2f00] dark:text-[#ffdbc9]">{mascota.nombre}</h2>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${
                estadoColor[adopcion.estado as keyof typeof estadoColor] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {adopcion.estado.toLowerCase()}
            </span>
          </div>

          <p className="text-[#1c1c21] dark:text-[#ffede4] font-semibold text-base mb-1">{titulo}</p>
          <p className="text-[#54433a] dark:text-[#dac2b6] text-sm leading-relaxed mb-3">{descripcion}</p>
        </div>

        <div className="pt-3 border-t border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 flex items-center justify-between text-xs">
          <p className="font-semibold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">home_work</span>
            <span>ONG: {ong.nombre}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
