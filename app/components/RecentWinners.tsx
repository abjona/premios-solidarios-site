// src/components/RecentWinners.tsx
'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Trophy, CheckCircle, Calendar, Star } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function RecentWinners() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const winners = [
    {
      id: 1,
      image: '/imgs/ganhadores.png',
      name: 'Maria Silva',
      prize: 'R$ 3.000.000,00',
      edition: 'Edição 01',
      location: 'São Paulo, SP'
    },
    {
      id: 2,
      image: '/imgs/ganhadores.png',
      name: 'João Santos',
      prize: 'Casa dos Sonhos',
      edition: 'Edição 02',
      location: 'Rio de Janeiro, RJ'
    },
    {
      id: 3,
      image: '/imgs/ganhadores.png',
      name: 'Ana Costa',
      prize: 'R$ 1.000.000,00',
      edition: 'Edição 03',
      location: 'Curitiba, PR'
    },
    {
      id: 4,
      image: '/imgs/ganhadores.png',
      name: 'Pedro Oliveira',
      prize: 'R$ 500.000,00',
      edition: 'Edição 04',
      location: 'Belo Horizonte, MG'
    },
    {
      id: 5,
      image: '/imgs/ganhadores.png',
      name: 'Carla Souza',
      prize: 'Carro 0km',
      edition: 'Edição 05',
      location: 'Salvador, BA'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-[#F0F2F5] overflow-hidden relative">
      {/* Elementos de Fundo Decorativos (Confetes sutis) */}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho do Hall da Fama */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFD700] text-[#37474F] font-black px-4 py-1.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.1)] mb-4 transform -rotate-2">
            <Trophy size={18} /> HALL DA FAMA
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#C51162] tracking-tighter drop-shadow-sm">
            GANHADORES <br className="md:hidden" /> RECENTES
          </h2>
        </div>
        
        <div className="relative">
          {/* Botão esquerdo - Arcade Style */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white border-2 border-gray-200 text-gray-400 w-12 h-12 rounded-xl items-center justify-center shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px] active:border-gray-300 transition-all hover:text-[#C51162] hover:border-[#C51162]/30"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          {/* Carrossel de Cards */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {winners.map((winner, index) => (
              <motion.div 
                key={winner.id}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                className="
                  group relative min-w-[300px] md:min-w-[320px] snap-center
                  bg-white rounded-[2rem] overflow-visible
                  border-4 border-white
                  shadow-[0_10px_0_#e5e7eb] hover:shadow-[0_15px_0_#e0e0e0] hover:border-[#FFD700]
                  transition-all duration-300 cursor-pointer
                "
              >
                {/* Badge da Edição (Fita no canto) */}
                <div className="absolute -top-3 -left-2 z-20 bg-gradient-to-r from-[#C51162] to-[#D81B60] text-white text-xs font-black px-4 py-1.5 rounded-r-lg rounded-tl-lg shadow-md border-2 border-white transform -rotate-2 group-hover:scale-110 transition-transform">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} /> {winner.edition}
                  </div>
                </div>

                {/* Imagem com Efeito de Moldura */}
                <div className="relative h-56 w-full rounded-t-[1.7rem] overflow-hidden bg-gray-100 border-b-4 border-gray-50">
                   {/* Overlay gradiente para destacar o texto se necessário */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 group-hover:opacity-0 transition-opacity" />
                   
                   <Image 
                    src={winner.image}
                    alt={`Ganhador ${winner.name}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 pt-4 text-center">
                  
                  {/* Nome */}
                  <h3 className="font-black text-gray-800 text-xl mb-1 group-hover:text-[#C51162] transition-colors">
                    {winner.name}
                  </h3>
                  
                  {/* Localização (opcional) */}
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-4">
                    {winner.location}
                  </p>

                  {/* Prêmio em Destaque */}
                  <div className="bg-[#FFF8E1] rounded-xl p-3 border border-[#FFE082] group-hover:bg-[#FFD700] group-hover:text-[#37474F] group-hover:border-[#FFD700] transition-colors duration-300">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1 group-hover:text-[#37474F]/70">Prêmio recebido</p>
                    <div className="text-[#F57C00] font-black text-lg leading-none group-hover:text-[#37474F]">
                      {winner.prize}
                    </div>
                  </div>

                  {/* Status de Verificado */}
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-green-600 bg-green-50 rounded-full py-1 px-3 w-fit mx-auto border border-green-100">
                    <div className="bg-green-500 rounded-full p-0.5">
                        <CheckCircle size={10} className="text-white" strokeWidth={4} />
                    </div>
                    <span className="text-xs font-bold tracking-tight">ENTREGUE</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
          
          {/* Botão direito - Arcade Style */}
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white border-2 border-gray-200 text-gray-400 w-12 h-12 rounded-xl items-center justify-center shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px] active:border-gray-300 transition-all hover:text-[#C51162] hover:border-[#C51162]/30"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}