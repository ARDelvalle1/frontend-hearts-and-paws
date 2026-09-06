
import LoginONG from "@/components/forms/LoginONG"; ;

export default async function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#1a0f08] text-[#28180d] dark:text-[#ffede4] font-body-editorial flex items-center justify-center p-4 selection:bg-[#c85a32] selection:text-white">
      <div className="w-full max-w-md">
        <LoginONG />
      </div>
    </div>
  );
}
