import { OngPerfilPublico } from '@/types/ong'

export default function OngPerfilHeader({ ong }: { ong: OngPerfilPublico }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 bg-white dark:bg-[#1c1c21] rounded-3xl shadow-xs border border-[#6c2f00]/15 dark:border-[#c85a32]/25 p-6 sm:p-8 transition-colors">
      {ong.imagenPerfil ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ong.imagenPerfil}
          alt={`Foto de perfil de ${ong.nombre}`}
          className="w-28 h-28 object-cover rounded-full border-4 border-[#c85a32] shadow-sm"
        />
      ) : (
        <div className="w-28 h-28 rounded-full border-4 border-[#c85a32] shadow-sm bg-[#ffeade] dark:bg-[#26262e] flex items-center justify-center text-3xl font-bold font-display-editorial text-[#6c2f00] dark:text-[#ffdbc9]">
          {ong.nombre.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="space-y-1">
        <h1 className="font-display-editorial text-2xl sm:text-3xl font-bold text-[#6c2f00] dark:text-[#ffdbc9] leading-tight tracking-tight">
          {ong.nombre}
        </h1>

        {(ong.ciudad || ong.pais) && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a84320] dark:text-[#e06b3f] flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {[ong.ciudad, ong.pais].filter(Boolean).join(', ')}
          </p>
        )}
      </div>

      {ong.descripcion && (
        <p className="text-sm text-[#54433a] dark:text-[#dac2b6] leading-relaxed max-w-xs">
          {ong.descripcion}
        </p>
      )}

      <div className="flex justify-around items-center w-full mt-2 pt-5 border-t border-[#6c2f00]/10 dark:border-[#c85a32]/20">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#c85a32]">{ong.mascotasActivas}</p>
          <p className="text-xs font-medium text-[#54433a] dark:text-[#dac2b6] mt-0.5">Mascotas activas</p>
        </div>
        <div className="w-px h-8 bg-[#6c2f00]/10 dark:bg-[#c85a32]/20" />
        <div className="text-center">
          <p className="text-2xl font-bold text-[#c85a32]">{ong.casosPublicados}</p>
          <p className="text-xs font-medium text-[#54433a] dark:text-[#dac2b6] mt-0.5">Casos publicados</p>
        </div>
      </div>
    </div>
  )
}
