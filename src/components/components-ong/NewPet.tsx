"use client";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOngAuth } from "@/context/OngAuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPet, petImages } from "@/services/pet";
import { fetchPetTypes } from "@/services/petTypes";

interface TipoMascota {
  id: string;
  nombre: string;
}

interface IMascotaFormData {
  nombre: string;
  edad: number;
  descripcion: string;
  tipoId: string;
  imagenes: FileList;
}
export interface NuevaMascotaData {
  nombre: string;
  edad: number;
  descripcion: string;
  tipoId: string;
  
}

const NewPet = () => {
  const { ong, loading: authLoading } = useOngAuth();
  const router = useRouter();
  const [tipos, setTipos] = useState<TipoMascota[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Redirige si no hay sesión
  useEffect(() => {
    if (!authLoading && !ong) {
      router.push("/login");
    }
  }, [authLoading, ong, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IMascotaFormData>();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const data = await fetchPetTypes();
        setTipos(data);
      } catch (error) {
        console.error("Error al cargar tipos de mascota", error);
      }
    };
    fetchTipos();
  }, []);

  const imagenesSeleccionadas = watch("imagenes");

  useEffect(() => {
    if (!imagenesSeleccionadas || imagenesSeleccionadas.length === 0) {
      setPreviewUrls([]);
      return;
    }
    const objectUrls = Array.from(imagenesSeleccionadas).map((archivo) =>
      URL.createObjectURL(archivo)
    );
    setPreviewUrls(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagenesSeleccionadas]);

  // 🔒 Bloqueo de scroll mientras está cargando
  useEffect(() => {
    if (loading) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [loading]);

  const onSubmit = async (data: IMascotaFormData) => {
    if (!ong) {
      toast.error("No se encontró la ONG");
      return;
    }

    try {
      setLoading(true);

      const nuevaMascota = await createPet({
        nombre: data.nombre,
        edad: Number(data.edad),
        descripcion: data.descripcion,
        tipoId: data.tipoId,
      });

      if (data.imagenes.length > 0) {
        await petImages(nuevaMascota.id, data.imagenes);
      }

      toast.success("Mascota registrada con éxito");

      reset();

      setTimeout(() => {
        router.push("/dashboard/ong/crear-caso");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al registrar la mascota");
      setLoading(false);
    }
  };

  if (authLoading || !ong) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1c1c21]/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center pointer-events-auto p-4">
        <div className="flex flex-col items-center gap-4 bg-white dark:bg-[#1c1c21] p-8 rounded-3xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 shadow-2xl max-w-sm text-center">
          <div className="text-[#6c2f00] dark:text-[#ffdbc9] font-serif font-bold text-lg">
            Registrando mascota...
          </div>
          <p className="text-sm text-[#54433a] dark:text-[#dac2b6]">
            Redirigiendo al formulario de caso, por favor aguardá.
          </p>
          <div className="w-8 h-8 border-4 border-[#c85a32] border-t-transparent rounded-full animate-spin mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center bg-[#fff8f5] dark:bg-[#121214] transition-colors">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1c1c21] p-6 sm:p-10 rounded-3xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 shadow-xs transition-colors">
        <div className="mb-6">
          <Link
            href="/dashboard/ong"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c85a32] hover:text-[#a84320] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c85a32] mb-1">
            Gestión de Mascotas
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
            Registrar Nueva Mascota
          </h1>
          <p className="text-sm text-[#54433a] dark:text-[#dac2b6] mt-2">
            Ingresá los datos y fotos de la mascota para luego poder publicar su caso de adopción o rescate.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ej: Milo, Luna, Rocco"
              {...register("nombre", { required: true })}
              className="w-full px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">Este campo es obligatorio.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
              Edad (en años)
            </label>
            <input
              type="number"
              placeholder="Ej: 2"
              {...register("edad", { required: true, min: 0 })}
              className="w-full px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
            />
            {errors.edad && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">Ingresa una edad válida.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
              Descripción
            </label>
            <textarea
              placeholder="Contanos sobre su personalidad, cuidados especiales, tamaño, historia..."
              {...register("descripcion", { required: true })}
              className="w-full px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
              rows={4}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">Este campo es obligatorio.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
              Tipo de Mascota
            </label>
            <div className="relative">
              <select
                {...register("tipoId", { required: true })}
                className="w-full appearance-none px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
                  Selecciona un tipo
                </option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id} className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#54433a] dark:text-[#dac2b6]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.tipoId && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">Este campo es obligatorio.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
              Imágenes
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("imagenes", { required: true })}
              className="w-full p-2.5 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-sm text-[#54433a] dark:text-[#dac2b6] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#ffeade] file:text-[#6c2f00] dark:file:bg-[#26262e] dark:file:text-[#ffdbc9] hover:file:opacity-90 transition-colors cursor-pointer"
            />
            {errors.imagenes && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                Debes subir al menos una imagen.
              </p>
            )}
          </div>

          {previewUrls.length > 0 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative shrink-0 rounded-2xl overflow-hidden border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 shadow-xs">
                  <img
                    src={url}
                    alt={`Vista previa ${index + 1}`}
                    className="w-28 h-28 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#c85a32] hover:bg-[#a84320] text-white py-3.5 rounded-xl font-semibold shadow-xs transition-colors duration-200 mt-4 cursor-pointer"
          >
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPet;
