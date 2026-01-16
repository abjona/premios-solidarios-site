// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User, Trophy, Home, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efeito para mudar o visual quando rolar a página
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#', icon: <Home size={18} /> },
    { name: 'Prêmios', href: '#premios', icon: <Trophy size={18} /> },
    { name: 'Ganhadores', href: '#ganhadores', icon: <User size={18} /> },
    { name: 'Como Jogar', href: '#como-jogar', icon: <HelpCircle size={18} /> },
  ];

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-[#C51162] shadow-lg border-b-4 border-[#880E4F] py-2' 
            : 'bg-[#C51162] border-b-4 border-transparent py-3 md:py-4'
          }
        `}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* 1. Logo (Esquerda) */}
          <div className="shrink-0 relative z-50 cursor-pointer hover:scale-105 transition-transform">
            <Image 
              src="/imgs/logo.png" 
              alt="Prêmios Solidários" 
              width={140} 
              height={80}
              className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* 2. Navegação Desktop (Centro) */}
          <nav className="hidden md:flex items-center gap-1 bg-black/10 rounded-full p-1 border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="
                  px-5 py-2 rounded-full text-sm font-bold text-white/90 
                  hover:bg-white hover:text-[#C51162] hover:shadow-sm
                  transition-all duration-200 flex items-center gap-2
                "
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* 3. Ações (Direita) */}
          <div className="flex items-center gap-3">
            
            {/* Botão Login (Desktop) */}
            <button className="hidden md:flex items-center gap-2 text-white font-bold hover:bg-white/20 px-4 py-2 rounded-xl transition-colors">
                <User size={20} />
                <span>Entrar</span>
            </button>

            {/* Botão Carrinho "Gamificado" */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative flex items-center gap-2 px-4 py-2 rounded-xl
                bg-gradient-to-b from-[#FFD700] to-[#FFB300]
                text-[#37474F] font-black text-sm shadow-[0_4px_0_rgb(217,119,6)]
                active:shadow-none active:translate-y-[4px] transition-all cursor-pointer
              "
            >
              <div className="bg-white/30 rounded-full p-1">
                <ShoppingCart size={18} strokeWidth={3} />
              </div>
              <span className="hidden sm:inline">CARRINHO</span>
              
              {/* Badge de contador */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#C51162] font-bold">
                0
              </div>
            </motion.button>

            {/* Botão Menu Mobile (Hamburger) */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-white/20 p-2 rounded-lg text-white hover:bg-white/30 transition-colors relative z-50"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* 4. Menu Mobile Overlay (Estilo Painel de Jogo) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            
            {/* Painel Deslizante */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-40 bg-[#F0F2F5] rounded-b-[2rem] shadow-2xl overflow-hidden border-b-8 border-[#C51162]"
            >
              <div className="pt-24 pb-8 px-6 flex flex-col gap-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-2">Menu Principal</p>
                
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="
                      flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-gray-200
                      text-gray-700 font-bold shadow-sm active:scale-98 active:bg-gray-50 transition-all
                    "
                  >
                    <div className="bg-pink-100 text-[#C51162] p-2 rounded-lg">
                      {link.icon}
                    </div>
                    {link.name}
                    <div className="ml-auto text-gray-300">
                        <ChevronRightIcon size={20} />
                    </div>
                  </motion.a>
                ))}

                <div className="h-px bg-gray-200 my-2" />

                <button className="w-full py-4 rounded-xl bg-[#C51162] text-white font-black shadow-[0_4px_0_#880E4F] active:shadow-none active:translate-y-[4px] transition-all">
                  ENTRAR NA MINHA CONTA
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Pequeno helper icon para o menu mobile
function ChevronRightIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}