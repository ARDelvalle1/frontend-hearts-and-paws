"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOngAuth } from "@/context/OngAuthContext";
import toast from "react-hot-toast";
import CaseForm from "./CaseForm";
import NewPet from "./NewPet";
import { createCase } from "@/services/createCases";
import { CasoBody, FormInputs } from "@/types/formsOng";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewCaseOng = () => {
  const { ong, loading: authLoading } = useOngAuth();
  const router = useRouter();
  const [mostrarNewPet] = useState(false);
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
    watch,
    reset,
  } = useForm<FormInputs>();

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

  if (authLoading || !ong) return null;

  if (mostrarNewPet) return <NewPet />;

  const onSubmit = async (data: FormInputs) => {
    if (!ong) {
      toast.error("Falta el ID de la ONG");
      return;
    }

    const donationGoalNum = data.donationGoal ? Number(data.donationGoal) : undefined;

    if (!data.petId) {
      toast.error("Falta seleccionar una mascota");
      return;
    }

    const body: CasoBody =
      data.type === "DONACION"
        ? {
            titulo: data.title,
            descripcion: data.description,
            tipo: "DONACION",
            mascotaId: data.petId,
            donacion: {
              metaDonacion: donationGoalNum,
            },
          }
        : {
            titulo: data.title,
            descripcion: data.description,
            tipo: "ADOPCION",
            mascotaId: data.petId,
          };

    try {
      setLoading(true);
      await createCase(body);
      toast.success("Caso publicado con éxito");
      reset();
      router.push("/dashboard/ong");
    } catch (err) {
      toast.error("Falló la publicación del caso");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center bg-[#fff8f5] dark:bg-[#1a0f08] transition-colors">
        <div className="max-w-2xl w-full bg-white dark:bg-[#28180d] p-6 sm:p-10 rounded-3xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 shadow-xs transition-colors">
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
              Publicación y Difusión
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#6c2f00] dark:text-[#ffdbc9]">
              Crear Nuevo Caso
            </h1>
            <p className="text-sm text-[#54433a] dark:text-[#dac2b6] mt-2">
              Publicá un caso de adopción o una campaña de recaudación económica para tu organización.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CaseForm register={register} errors={errors} watch={watch} />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c85a32] hover:bg-[#a84320] text-white py-3.5 rounded-xl font-semibold shadow-xs transition-colors duration-200 mt-6 cursor-pointer ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              Publicar Caso
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 bg-[#28180d]/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center pointer-events-auto p-4">
          <div className="flex flex-col items-center gap-4 bg-white dark:bg-[#28180d] p-8 rounded-3xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 shadow-2xl max-w-sm text-center">
            <LoaderCircle className="animate-spin w-10 h-10 text-[#c85a32]" />
            <div className="text-[#6c2f00] dark:text-[#ffdbc9] font-serif font-bold text-lg">
              Confirmando publicación...
            </div>
            <p className="text-sm text-[#54433a] dark:text-[#dac2b6]">
              Por favor aguarde unos instantes mientras creamos el caso.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCaseOng;