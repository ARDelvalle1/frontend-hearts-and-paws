import SesionCerrada from '@/components/SesionCerrada';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sesión Cerrada | Hearts & Paws',
  description: 'Aviso de cierre de sesión exitoso en Hearts & Paws.',
};

export default function LogoutPage() {
  return <SesionCerrada />;
}
