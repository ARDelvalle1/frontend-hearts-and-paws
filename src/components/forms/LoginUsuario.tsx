"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUsuarioAuth } from "@/context/UsuarioAuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authMe } from "@/services/login";

export default function LoginUsuario() {
  const router = useRouter();
  const { loginUsuario } = useUsuarioAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Bloqueo scroll al montar y restaurar al desmontar
  useEffect(() => {
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
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Por favor ingresa tu email");
    return;
  }
  if (!validateEmail(email)) {
    toast.error("El formato del email no es válido");
    return;
  }
  if (!password) {
    toast.error("Por favor ingresa tu contraseña");
    return;
  }
  if (password.length < 6) {
    toast.error("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  setLoading(true);
  try {
    const success = await loginUsuario(email, password);

    if (success) {
      const authme = await authMe();
      const rol = authme ? await authme.json() : {};

      switch (rol.rol) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "USUARIO":
          router.push("/dashboard/usuario");
          break;
        case "ONG":
          router.push("/dashboard/ong");
          break;
        default:
          toast.error("Credenciales inválidas");
          setLoading(false); // solo si hubo error
      }
    } else {
      setLoading(false); // en caso de login fallido
    }
  } catch (error) {
    toast.error("Error de conexión, intenta nuevamente");
    console.log(error);
    setLoading(false);
  }
};


  return (
  <>
    <form
      onSubmit={handleLogin}
      className="w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#6c2f00]/15 relative font-body-editorial"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] border border-[#6c2f00]/15 text-[#6c2f00] text-xs font-semibold mb-4 mx-auto">
          <span className="material-symbols-outlined text-base">person</span>
          Cuenta de Usuario
        </div>
        <h2 className="font-display-editorial text-3xl font-bold text-[#6c2f00] tracking-tight">
          Iniciar sesión
        </h2>
      </div>

      <label className="block mb-4">
        <span className="block mb-1.5 font-semibold text-xs text-[#54433a] uppercase tracking-wider">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-2.5 border border-[#6c2f00]/20 bg-[#fff8f5] text-[#6c2f00] placeholder:text-[#54433a]/60 font-body-editorial text-sm font-semibold rounded-full shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6c2f00] transition-all"
          placeholder="ejemplo@correo.com"
          disabled={loading}
          required
        />
      </label>

      <label className="relative block mb-6">
        <span className="block mb-1.5 font-semibold text-xs text-[#54433a] uppercase tracking-wider">Contraseña</span>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-2.5 pr-12 border border-[#6c2f00]/20 bg-[#fff8f5] text-[#6c2f00] placeholder:text-[#54433a]/60 font-body-editorial text-sm font-semibold rounded-full shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6c2f00] transition-all"
          placeholder="Tu contraseña"
          disabled={loading}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute text-[#6c2f00] hover:text-[#ff6b6b] right-4 top-8 transition-colors p-1 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#ff6b6b] hover:bg-[#ae2f34] text-white font-body-editorial font-semibold py-3.5 px-6 rounded-full text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <span className="material-symbols-outlined text-xl">login</span>
        {loading ? "Ingresando..." : "Entrar"}
      </button>

      <div className="mt-6 text-center text-xs text-[#54433a] font-body-editorial">
        ¿No tenés una cuenta?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-[#6c2f00] font-bold hover:text-[#ff6b6b] transition-colors ml-1 underline underline-offset-2 cursor-pointer"
        >
          Registrate acá
        </button>
      </div>
    </form>

    {loading && (
      <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-xs flex items-center justify-center pointer-events-auto">
        <div className="flex flex-col items-center gap-4 bg-[#fff8f5] border border-[#6c2f00]/15 p-8 rounded-3xl shadow-2xl max-w-xs text-center font-body-editorial">
          <div className="w-10 h-10 border-4 border-[#ff6b6b] border-t-transparent rounded-full animate-spin" />
          <div>
            <p className="font-display-editorial font-bold text-lg text-[#6c2f00]">
              Iniciando sesión...
            </p>
            <p className="text-xs text-[#54433a] mt-1">
              Redirigiéndote a tu perfil, por favor aguardá.
            </p>
          </div>
        </div>
      </div>
    )}


  </>
);
}