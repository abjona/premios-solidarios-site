// src/components/Hero.tsx
'use client';

import Image from 'next/image';
import { Timer, Sparkles, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative w-full flex flex-col">
      
      {/* SEÇÃO PRINCIPAL */}
      {/* MOBILE: min-h-[340px] - Bem compacto pois o layout é horizontal */}
      <section className="relative w-full min-h-[300px] md:min-h-[480px] flex items-center justify-center overflow-hidden pb-6 md:pb-0">
        
        {/* 1. Fundo (Banner) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/imgs/banner.png"
            alt="Banner Fundo"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#C51162]/95 via-[#C51162]/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <FloatingParticles />

        {/* 2. Conteúdo */}
        {/* MOBILE: pt-24 para compensar o header fixo */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 pt-24 md:pt-20">
          
          {/* GRID: grid-cols-2 no mobile para ficar lado a lado */}
          <div className="grid grid-cols-2 gap-1 md:gap-12 items-center">

            {/* COLUNA 1: Texto (Esquerda) */}
            <div className="flex flex-col items-start text-left space-y-1 md:space-y-4 z-20">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20"
              >
                <Sparkles size={10} className="text-yellow-400 md:w-4 md:h-4" />
                <span className="text-[9px] md:text-sm font-bold tracking-wide uppercase text-white">Edição #01</span>
              </motion.div>

              <div className="space-y-0">
                {/* Fonte menor no mobile (text-2xl/3xl) para não estourar a coluna */}
                <h1 className="text-[1.7rem] leading-[0.9] sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
                    SUA SORTE
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#FFB300] filter drop-shadow-sm">
                    MORA AQUI!
                  </span>
                </h1>
              </div>

              {/* Texto de apoio (só desktop) */}
              <p className="hidden md:block text-gray-200 text-sm md:text-lg font-medium max-w-md leading-relaxed">
                Garanta sua chance de mudar de vida agora!
              </p>
              
              {/* Call to action textual simples no mobile */}
              <p className="md:hidden text-[10px] text-gray-300 font-medium leading-tight max-w-[120px]">
                Prêmios incríveis esperam por você.
              </p>
            </div>

            {/* COLUNA 2: Imagem Carro (Direita) */}
            {/* Translate-x positivo no mobile para jogar o carro um pouco para a borda e ganhar espaço */}
            <div className="flex flex-col items-center justify-center relative translate-x-4 md:translate-x-0">
                 
                 <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    // MOBILE: w-[170px] é um tamanho seguro para metade da tela
                    className="relative z-10 w-[150px] sm:w-[280px] md:w-[280px]"
                 >
                    <Image
                      src="/imgs/img-carros-casa.png"
                      alt="Carros e Casa"
                      width={500}
                      height={400}
                      className="w-full h-auto drop-shadow-2xl"
                      priority
                    />
                    
                    {/* Badge do Prêmio */}
                    <div className="absolute -top-1 -right-2 md:top-0 md:right-10 bg-gradient-to-br from-yellow-300 to-yellow-600 text-[#37474F] text-[8px] md:text-xs font-black px-2 py-0.5 md:px-3 md:py-1 rounded-lg shadow-lg border border-white transform rotate-12 flex items-center gap-1">
                        <Trophy size={8} className="md:w-3 md:h-3" /> PRÊMIO
                    </div>
                 </motion.div>

                 {/* Countdown HUD - Super Compacto no Mobile */}
                 <div className="mt-2 md:mt-4 bg-black/50 backdrop-blur-md border border-white/10 p-1.5 md:p-2 pr-3 md:pr-4 rounded-xl shadow-xl flex items-center gap-2 md:gap-3 md:translate-x-8 scale-[0.80] md:scale-100 origin-center -translate-x-4 md:translate-x-0">
                    <div className="bg-[#C51162] p-1.5 md:p-2 rounded-lg text-white">
                        <Timer size={14} className="md:w-5 md:h-5 animate-spin-slow" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[8px] md:text-[9px] text-gray-300 font-bold uppercase tracking-widest whitespace-nowrap">Encerra em</span>
                        <div className="flex items-baseline gap-1 text-white leading-none">
                            <span className="text-base md:text-xl font-black tabular-nums">03</span><span className="text-[8px] md:text-[9px] font-bold text-gray-400 mr-1">D</span>
                            <span className="text-base md:text-xl font-black tabular-nums">14</span><span className="text-[8px] md:text-[9px] font-bold text-gray-400 mr-1">H</span>
                            <span className="text-base md:text-xl font-black tabular-nums">25</span><span className="text-[8px] md:text-[9px] font-bold text-gray-400">M</span>
                        </div>
                    </div>
                  </div>
            </div>

          </div>
        </div>
      </section>

      {/* Faixa Marquee */}
      <div className="h-6 md:h-10 bg-[#C51162] w-full overflow-hidden flex items-center relative border-t-2 md:border-t-4 border-[#A00F50] shadow-lg z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-10 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3 text-white font-bold text-[10px] md:text-sm tracking-wide uppercase">
                    <Star size={10} fill="white" className="text-yellow-300 md:w-3 md:h-3" />
                    <span>Mais de R$ 3 Milhões em prêmios</span>
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-yellow-400 rounded-full" />
                    <span>Sorteio Ao Vivo Domingo</span>
                </div>
            ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  );
}

function FloatingParticles() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-yellow-400 rounded-full opacity-20"
                    initial={{ x: Math.random() * 300, y: Math.random() * 600 }}
                    animate={{ y: [null, Math.random() * -100], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
                    style={{ width: Math.random() * 8 + 4, height: Math.random() * 8 + 4 }}
                />
            ))}
        </div>
    )
}