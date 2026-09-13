import RegisterUserForm from "../../../components/forms/RegisterUserForm";


export default function RegisterPageUser() {
  return (
    <div className="min-h-screen bg-[#fff8f5] dark:bg-[#121214] text-[#1c1c21] dark:text-[#ffede4] font-body-editorial flex items-center justify-center p-4 py-12 selection:bg-[#c85a32] selection:text-white">
      <div className="w-full max-w-lg">
        <RegisterUserForm />
      </div>
    </div>
  );
}
