// src/components/PreviousDraws.tsx
'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, History, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function PreviousDraws() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const draws = [
    { edition: '01', image: '/imgs/sorteio-1.png', date: '18/01/25', status: 'Concluído' },
    { edition: '02', image: '/imgs/sorteio-1.png', date: '25/01/25', status: 'Concluído' },
    { edition: '03', image: '/imgs/sorteio-1.png', date: '01/02/25', status: 'Concluído' },
    { edition: '04', image: '/imgs/sorteio-1.png', date: '08/02/25', status: 'Concluído' },
    { edition: '05', image: '/imgs/sorteio-1.png', date: '15/02/25', status: 'Concluído' },
    { edition: '06', image: '/imgs/sorteio-1.png', date: '22/02/25', status: 'Concluído' },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
        {/* Background Pattern Sutil (Pontilhado) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#C51162 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 font-bold px-3 py-1 rounded-lg mb-2 text-xs uppercase tracking-wider">
                    <History size={14} /> Arquivo
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#37474F]">
                    SORTEIOS <span className="text-[#C51162]">ANTERIORES</span>
                </h2>
            </div>
            
            {/* Botão de "Ver Todos" estilo Link de Jogo */}
            <a href="#" className="hidden md:flex items-center gap-2 text-[#C51162] font-black hover:gap-3 transition-all">
                VER HISTÓRICO COMPLETO <ArrowRight size={20} strokeWidth={3} />
            </a>
        </div>
        
        <div className="relative group/carousel">
          {/* Botão esquerdo - Arcade Style */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 bg-white border-2 border-gray-200 text-gray-400 w-12 h-12 rounded-xl items-center justify-center shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px] active:border-gray-300 transition-all hover:text-[#C51162] hover:border-[#C51162]/30"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          {/* Carrossel */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {draws.map((draw) => (
              <motion.div 
                key={draw.edition}
                whileHover={{ y: -5 }}
                className="
                    group relative min-w-[280px] snap-start cursor-pointer
                    bg-white rounded-2xl overflow-hidden
                    border-2 border-gray-100
                    shadow-[0_6px_0_#e5e7eb] 
                    hover:shadow-[0_10px_0_#C51162] hover:border-[#C51162]
                    transition-all duration-200
                "
              >
                {/* Selo de "Concluído" (Estilo Carimbo) */}
                <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-white/20">
                    <CheckCircle2 size={12} className="text-green-400" /> FINALIZADO
                </div>

                {/* Imagem com efeito grayscale que some no hover */}
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  <Image 
                    src={draw.image}
                    alt={`Edição ${draw.edition}`}
                    width={280}
                    height={280}
                    className="w-full h-full object-cover filter grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Overlay de cor no hover */}
                  <div className="absolute inset-0 bg-[#C51162]/0 group-hover:bg-[#C51162]/10 transition-colors duration-300" />
                </div>

                {/* Footer do Card (Estilo Label de Cartucho) */}
                <div className="p-4 bg-white relative">
                    {/* Linha decorativa no topo do footer */}
                    <div className="absolute top-0 left-4 right-4 h-1 bg-gray-100 group-hover:bg-[#C51162]/20 transition-colors" />

                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <span className="block text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">
                                {draw.date}
                            </span>
                            <h3 className="text-xl font-black text-gray-800 group-hover:text-[#C51162] transition-colors">
                                EDIÇÃO {draw.edition}
                            </h3>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#C51162] group-hover:text-white transition-all duration-300">
                            <ArrowRight size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Botão direito - Arcade Style */}
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 bg-white border-2 border-gray-200 text-gray-400 w-12 h-12 rounded-xl items-center justify-center shadow-[0_4px_0_#e5e7eb] active:shadow-none active:translate-y-[4px] active:border-gray-300 transition-all hover:text-[#C51162] hover:border-[#C51162]/30"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
      
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}