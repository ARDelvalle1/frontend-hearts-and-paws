'use client'

import LoginSupabaseForm from "../../../components/forms/LoginSupabase";


export default function LoginPage() {

  return (
      
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#121214] text-[#1c1c21] dark:text-[#ffede4] font-body-editorial flex items-center justify-center p-4">
      <LoginSupabaseForm />
    </div>
  );
}
