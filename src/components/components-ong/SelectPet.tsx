"use client";
import React, { useEffect, useState } from "react";
import { useOngAuth } from "@/context/OngAuthContext";
import { fetchPetsByOngId } from "@/services/petsService";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInputs } from "@/types/formsOng";

interface Pet {
  id: string;
  nombre: string;
}

interface Props {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const SelectPet = ({ register, errors }: Props) => {
  const { ong } = useOngAuth();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (!ong) return;

    fetchPetsByOngId()
      .then(setPets)
      .catch((err) => console.error("Error fetching pets", err));
  }, [ong]);

  return (
    <div>
      <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-[#6c2f00] dark:text-[#ffdbc9]">
        Mascota Asignada
      </label>
      <div className="relative">
        <select
          {...register("petId", { required: true })}
          className="w-full appearance-none px-4 py-3 bg-[#fff8f5] dark:bg-[#121214] border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 rounded-xl text-[#1c1c21] dark:text-[#ffdbc9] focus:outline-none focus:ring-2 focus:ring-[#c85a32] transition-colors cursor-pointer"
        >
          <option value="" className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
            Selecciona una mascota
          </option>
          {pets.map((p) => (
            <option key={p.id} value={p.id} className="bg-white dark:bg-[#1c1c21] text-[#1c1c21] dark:text-[#ffdbc9]">
              {p.nombre}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#54433a] dark:text-[#dac2b6]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {errors.petId && (
        <p className="text-red-500 text-xs mt-1.5 font-medium">Debes seleccionar una mascota.</p>
      )}
    </div>
  );
};

export default SelectPet;
