import { RegisterONGForm } from '../../../components/forms/RegisterONGForm';

export default function RegisterPageONG() {
  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#28180d] font-body-editorial flex items-center justify-center p-4 py-12 selection:bg-[#c85a32] selection:text-white">
      <div className="w-full max-w-xl">
        <RegisterONGForm />
      </div>
    </div>
  );
}