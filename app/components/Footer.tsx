// src/components/Footer.tsx
'use client';

import Image from 'next/image';
import { Facebook, Instagram, Twitter, MessageCircle, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1A1A1A] text-white pt-16 pb-8 overflow-hidden border-t-8 border-[#C51162]">
      
      {/* Background Decorativo (Padrão de Grade) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Marca e Sobre */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <div className="bg-white p-1 rounded-lg shadow-[0_4px_0_#333]">
                 <Image 
                    src="/imgs/logo.png" 
                    alt="Logo" 
                    width={50} 
                    height={50} 
                    className="w-10 h-auto"
                 />
               </div>
               <span className="font-black text-xl tracking-tight text-white">
                 PRÊMIOS <span className="text-[#C51162]">SOLIDÁRIOS</span>
               </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              A plataforma de sorteios mais divertida e segura do Brasil. Sua sorte mora aqui!
            </p>
            
            {/* Selo de Segurança */}
            <div className="inline-flex items-center gap-2 bg-[#2D2D2D] px-3 py-2 rounded-lg border border-[#333]">
                <ShieldCheck size={16} className="text-green-400" />
                <span className="text-xs font-bold text-gray-300">Site 100% Seguro</span>
            </div>
          </div>

          {/* 2. Links Rápidos (Menu) */}
          <div>
            <h4 className="text-[#FFD700] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span> Menu
            </h4>
            <ul className="space-y-2">
              {['Início', 'Prêmios', 'Ganhadores', 'Como Jogar'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm font-bold">
                    <span className="text-[#C51162] opacity-0 hover:opacity-100 transition-opacity">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Links Legais */}
          <div>
            <h4 className="text-[#FFD700] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span> Legal
            </h4>
            <ul className="space-y-2">
              {['Termos de Uso', 'Política de Privacidade', 'Regulamento', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 text-sm font-bold">
                    <span className="text-[#C51162] opacity-0 hover:opacity-100 transition-opacity">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Social & Newsletter */}
          <div>
            <h4 className="text-[#FFD700] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span> Conecte-se
            </h4>
            <div className="flex gap-3 mb-6">
                {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, idx) => (
                    <motion.a 
                        key={idx}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        href="#" 
                        className="w-10 h-10 bg-[#2D2D2D] rounded-lg flex items-center justify-center text-white border border-[#444] shadow-[0_3px_0_#000] hover:bg-[#C51162] hover:border-[#C51162] transition-colors"
                    >
                        <Icon size={18} />
                    </motion.a>
                ))}
            </div>
            <button className="w-full bg-[#C51162] hover:bg-[#AD0E45] text-white text-xs font-black py-3 px-4 rounded-xl shadow-[0_4px_0_#880E4F] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-wide">
                Falar no WhatsApp
            </button>
          </div>

        </div>

        {/* DIVISOR */}
        <div className="h-px bg-[#333] w-full mb-8"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="text-center md:text-left">
                <p className="text-xs text-gray-500 font-bold">
                    © 2025 Prêmios Solidários. Todos os direitos reservados.
                </p>
                <p className="text-[10px] text-gray-600 mt-1 flex items-center justify-center md:justify-start gap-1">
                    Feito com <Heart size={10} className="text-red-500 fill-current" /> para você ganhar.
                </p>
            </div>

            {/* Botão Voltar ao Topo */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#2D2D2D] text-gray-400 hover:text-white p-3 rounded-lg border border-[#444] shadow-[0_3px_0_#000] active:shadow-none active:translate-y-[3px] transition-all"
            >
                <ArrowUp size={18} strokeWidth={3} />
            </motion.button>

        </div>
      </div>
    </footer>
  );
}