'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';

// Variantes para orquestar la animación en cascada de los elementos
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconContainerVariants: Variants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -25 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      duration: 0.7,
    },
  },
};

export default function SesionCerrada() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#fff8f5] dark:bg-[#1a0f08] text-[#28180d] dark:text-[#ffede4] font-body-editorial selection:bg-[#c85a32] selection:text-white">
      {/* Elementos decorativos flotantes de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.15, 0.25, 0.15],
            y: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-[#ffdbc9] dark:bg-[#6c2f00]/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-[#c85a32]/20 dark:bg-[#a84320]/20 blur-3xl"
        />
      </div>

      {/* Tarjeta principal con animaciones */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg bg-white dark:bg-[#28180d] p-8 sm:p-12 rounded-3xl shadow-2xl border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-center backdrop-blur-xs"
      >
        {/* Badge superior */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff1ea] dark:bg-[#1a0f08] border border-[#6c2f00]/15 dark:border-[#ffdbc9]/15 text-[#6c2f00] dark:text-[#ffdbc9] text-xs font-semibold tracking-wide shadow-xs">
            <span className="material-symbols-outlined text-sm text-[#c85a32]">
              verified_user
            </span>
            Aviso de seguridad • Hearts &amp; Paws
          </span>
        </motion.div>

        {/* Icono animado */}
        <motion.div
          variants={iconContainerVariants}
          className="mx-auto mb-6 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#fff1ea] to-[#ffeade] dark:from-[#342013] dark:to-[#3f2c20] border-2 border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 shadow-inner"
        >
          <motion.span
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            className="material-symbols-outlined text-4xl sm:text-5xl text-[#c85a32] select-none"
          >
            pets
          </motion.span>
        </motion.div>

        {/* Título animado */}
        <motion.h1
          variants={itemVariants}
          className="font-display-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#6c2f00] dark:text-[#ffdbc9] mb-4"
        >
          ¡Has cerrado sesión correctamente!
        </motion.h1>

        {/* Mensaje de aviso */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-[#54433a] dark:text-[#dac2b6] leading-relaxed mb-3"
        >
          Tu cuenta se ha desconectado de forma segura en este navegador.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-[#877369] dark:text-[#ffdbc9]/70 leading-relaxed mb-8"
        >
          Gracias por acompañarnos y cuidar de las mascotas. ¡Esperamos verte pronto de regreso! 🐾
        </motion.p>

        {/* Recuadro informativo */}
        <motion.div
          variants={itemVariants}
          className="mb-8 p-4 rounded-2xl bg-[#fff8f5] dark:bg-[#1f130b] border border-[#6c2f00]/10 dark:border-[#ffdbc9]/10 text-xs sm:text-sm text-[#54433a] dark:text-[#dac2b6] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-base text-[#c85a32]">
            info
          </span>
          <span>Podés volver a ingresar en cualquier momento con tus credenciales.</span>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/login')}
            className="bg-[#c85a32] hover:bg-[#a84320] text-white font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer flex-1"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            Iniciar sesión
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="border border-[#6c2f00]/20 dark:border-[#ffdbc9]/20 text-[#6c2f00] dark:text-[#ffdbc9] bg-[#fff8f5] dark:bg-[#1a0f08] hover:bg-[#fff1ea] dark:hover:bg-[#3f2c20] font-body-editorial font-semibold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer flex-1"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Ir al inicio
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
