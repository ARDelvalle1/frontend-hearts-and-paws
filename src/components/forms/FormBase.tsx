'use client';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React from 'react';

interface Field<T> {
  name: keyof T;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

interface Props<T> {
  title: string;
  badgeText?: string;
  iconName?: string;
  fields: Field<T>[];
  formData: T;
  errors: Partial<Record<keyof T, string | undefined>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: (value: boolean) => void;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function FormBase<T>({
  title,
  badgeText,
  iconName,
  fields,
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading = false,
  showPasswordToggle = false,
  showPassword = false,
  setShowPassword,
  children,
  footerContent,
}: Props<T>) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#6c2f00]/15 relative font-body-editorial space-y-5"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] border border-[#6c2f00]/15 text-[#6c2f00] text-xs font-semibold mb-3 mx-auto">
            <span className="material-symbols-outlined text-base">
              {iconName || "app_registration"}
            </span>
            {badgeText || "Registro en Hearts&Paws"}
          </div>
          <h2 className="font-display-editorial text-3xl sm:text-4xl font-bold text-[#6c2f00] tracking-tight">
            {title}
          </h2>
        </div>

        {fields.map(({ name, label, type = 'text', multiline = false, rows = 4 }) => (
          <div key={String(name)}>
            <label
              htmlFor={String(name)}
              className="block text-xs font-semibold text-[#54433a] uppercase tracking-wider mb-1.5 ml-1"
            >
              {label}
            </label>

            {multiline ? (
              <textarea
                id={String(name)}
                name={String(name)}
                value={String(formData[name] ?? '')}
                onChange={onChange}
                disabled={isLoading}
                rows={rows}
                className={`w-full border ${
                  errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-[#6c2f00]/20'
                } bg-[#fff8f5] text-[#6c2f00] placeholder:text-[#54433a]/60 font-body-editorial text-sm font-semibold rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6c2f00] transition-all resize-none px-4 py-3`}
              />
            ) : (
              <div className="relative">
                <input
                  type={
                    name === 'contrasena' && showPasswordToggle
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : type
                  }
                  id={String(name)}
                  name={String(name)}
                  value={String(formData[name] ?? '')}
                  onChange={onChange}
                  disabled={isLoading}
                  className={`w-full border ${
                    errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-[#6c2f00]/20'
                  } bg-[#fff8f5] text-[#6c2f00] placeholder:text-[#54433a]/60 font-body-editorial text-sm font-semibold rounded-full shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6c2f00] transition-all px-5 py-2.5 ${
                    name === 'contrasena' && showPasswordToggle ? 'pr-12' : ''
                  }`}
                />
                {name === 'contrasena' && showPasswordToggle && setShowPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2.5 text-[#6c2f00] hover:text-[#ff6b6b] transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                )}
              </div>
            )}

            {errors[name] && (
              <p className="text-red-500 text-xs mt-1 ml-3 font-semibold">{errors[name]}</p>
            )}
          </div>
        ))}

        {children}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#ff6b6b] hover:bg-[#ae2f34] text-white font-body-editorial font-semibold py-3.5 px-6 rounded-full text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            isLoading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <span className="material-symbols-outlined text-xl">person_add</span>
          {isLoading ? 'Procesando...' : 'Crear cuenta'}
        </button>

        {footerContent}
      </form>

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-xs flex items-center justify-center pointer-events-auto">
          <div className="flex flex-col items-center gap-4 bg-[#fff8f5] border border-[#6c2f00]/15 p-8 rounded-3xl shadow-2xl max-w-xs text-center font-body-editorial">
            <div className="w-10 h-10 border-4 border-[#ff6b6b] border-t-transparent rounded-full animate-spin" />
            <div>
              <p className="font-display-editorial font-bold text-lg text-[#6c2f00]">
                Procesando registro...
              </p>
              <p className="text-xs text-[#54433a] mt-1">
                Creando tu cuenta, por favor aguardá un momento.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
