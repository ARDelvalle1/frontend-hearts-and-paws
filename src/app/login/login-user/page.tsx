import LoginUsuario from "@/components/forms/LoginUsuario";

export default function LoginUsuarioPage() {
  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#28180d] font-body-editorial flex items-center justify-center p-4 selection:bg-[#c85a32] selection:text-white">
      <div className="w-full max-w-md">
        <LoginUsuario />
      </div>
    </div>
  );
}