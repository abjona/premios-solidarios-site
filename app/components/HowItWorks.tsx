// src/components/HowItWorks.tsx
'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, UserPlus, Ticket, Gift, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: 1,
      title: 'Cadastre-se',
      description: 'Crie sua conta em segundos e prepare-se para ganhar.',
      icon: <UserPlus className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
      shadow: 'shadow-blue-700'
    },
    {
      number: 2,
      title: 'Escolha a cartela',
      description: 'Selecione seu pacote da sorte. Quanto mais cartelas, melhor!',
      icon: <Ticket className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      shadow: 'shadow-purple-700'
    },
    {
      number: 3,
      title: 'Aguarde o sorteio',
      description: 'Cruze os dedos! O resultado sai ao vivo na data marcada.',
      icon: <Gift className="w-6 h-6 text-white" />,
      color: 'bg-pink-500',
      shadow: 'shadow-pink-700'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Variantes para animação sequencial dos cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  return (
    <section className="py-12 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Título - Lado Esquerdo com estilo Arcade */}
        <div className="shrink-0 text-center lg:text-left relative z-10">
          <div className="inline-block bg-[#FFD700] text-[#37474F] text-xs font-black px-3 py-1 rounded-full mb-2 shadow-sm border-2 border-white rotate-[-2deg]">
            <span className="flex items-center gap-1"><Sparkles size={12}/> TUTORIAL RÁPIDO</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#C51162] tracking-tight leading-[0.9]">
            COMO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 filter drop-shadow-sm">
              JOGAR
            </span>
          </h2>
          <p className="mt-3 text-gray-500 font-medium max-w-[250px] mx-auto lg:mx-0 leading-tight">
            Siga os 3 passos simples para participar dos sorteios.
          </p>
        </div>
        
        {/* Divisória pontilhada (apenas Desktop) */}
        <div className="hidden lg:block h-32 w-px border-r-2 border-dashed border-gray-300 mx-4"></div>

        {/* Passos - Carrossel Gamificado */}
        <div className="relative w-full lg:flex-1 min-w-0">
          
          {/* Botão esquerdo - Mobile */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white border-2 border-gray-100 text-gray-400 p-3 rounded-xl shadow-lg active:scale-95 transition-all lg:hidden"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>

          <motion.div 
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-8 pt-4 px-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.number} 
                variants={itemVariants}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                className="
                  relative flex flex-col items-center text-center p-6 
                  min-w-[260px] lg:min-w-0 lg:flex-1 snap-center
                  bg-white rounded-3xl border-2 border-gray-100
                  shadow-[0_8px_0_#e5e7eb] 
                  hover:shadow-[0_12px_0_#e5e7eb] hover:border-purple-200
                  transition-all duration-300 cursor-default group
                "
              >
                {/* Badge do Número Flutuante */}
                <div className={`
                  absolute -top-4 bg-gradient-to-br ${step.color.replace('bg-', 'from-')} to-gray-900 
                  w-10 h-10 rounded-xl flex items-center justify-center 
                  text-white font-black text-xl shadow-lg border-2 border-white rotate-3 group-hover:rotate-12 transition-transform
                `}>
                  {step.number}
                </div>

                {/* Ícone com Fundo Colorido */}
                <div className={`
                  mb-4 mt-2 p-4 rounded-2xl ${step.color} shadow-inner
                  transform group-hover:scale-110 transition-transform duration-300
                `}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed px-2">
                  {step.description}
                </p>

                {/* Seta de conexão (Visual apenas, esconde no último) */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-200">
                    <ChevronRight size={32} strokeWidth={4} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Botão direito - Mobile */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white border-2 border-gray-100 text-gray-400 p-3 rounded-xl shadow-lg active:scale-95 transition-all lg:hidden"
          >
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>

      </div>
    </section>
  );
}