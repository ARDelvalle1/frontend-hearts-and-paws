"use client";
import React from "react";
import SelectPet from "./SelectPet";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FormInputs } from "@/types/formsOng";


interface Props {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  watch: UseFormWatch<FormInputs>;
}


const CaseForm = ({ register, errors, watch }: Props) => {
  const type = watch("type");

  return (
    <>
      <div>
        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
          Título del Caso
        </label>
        <input
          type="text"
          placeholder="Ej: Ayudemos a Toby con su tratamiento"
          {...register("title", { required: true })}
          className="w-full px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">
            Este campo es obligatorio.
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
          Historia / Descripción
        </label>
        <textarea
          placeholder="Explicá la situación actual de la mascota y por qué necesita un hogar o ayuda económica..."
          {...register("description", { required: true })}
          className="w-full px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">
            Este campo es obligatorio.
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
          Tipo de Caso
        </label>
        <div className="relative">
          <select
            {...register("type", { required: true })}
            className="w-full appearance-none px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
              Selecciona una modalidad
            </option>
            <option value="ADOPCION" className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
              Adopción
            </option>
            <option value="DONACION" className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
              Donación
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#54433a] dark:text-[#dac2b6]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">
            Este campo es obligatorio.
          </p>
        )}
      </div>

      <SelectPet register={register} errors={errors} />

      {type === "DONACION" && (
        <div className="p-4 rounded-2xl bg-[#ffeade]/40 dark:bg-[#26262e]/40 border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15">
          <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
            Meta Económica de Donación (ARS / USD)
          </label>
          <input
            type="number"
            {...register("donationGoal", { required: true, min: 1 })}
            className="w-full px-4 py-3 bg-white dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] placeholder:text-[#54433a]/50 dark:placeholder:text-[#dac2b6]/40 focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors"
            placeholder="Ej: 50000"
          />
          {errors.donationGoal && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              Este campo es obligatorio y debe ser mayor a 0.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CaseForm;