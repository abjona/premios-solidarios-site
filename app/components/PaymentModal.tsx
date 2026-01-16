// src/components/PaymentModal.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, Timer, ShieldCheck, ArrowRight, ScanLine, Loader2, Trophy } from 'lucide-react';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalValue: number;
}

type PaymentStatus = 'pending' | 'processing' | 'approved';

export default function PaymentModal({ isOpen, onClose, totalValue }: PaymentModalProps) {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [timeLeft, setTimeLeft] = useState(300); 
  const [copied, setCopied] = useState(false);
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540410.005802BR5913PREMIOS GAME6008BRASILIA62070503***6304E1F2";

  useEffect(() => {
    if (isOpen) {
        setStatus('pending');
        setTimeLeft(300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || status !== 'pending') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500); // Feedback dura 2.5s
  };

  const handlePaymentConfirm = () => {
    setStatus('processing');
    setTimeout(() => {
        setStatus('approved');
    }, 2000);
  };

  const isExpired = timeLeft === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60]"
            onClick={status === 'approved' ? onClose : undefined}
          />
          
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center pointer-events-none p-0 md:p-4">
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // MOBILE: h-full e rounded-none para ocupar tela toda
              className="bg-[#121212] w-full max-w-lg h-full md:h-auto rounded-none md:rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:border-t-4 border-[#C51162] relative"
            >
              
              {/* --- TOAST DE FEEDBACK (Flutuante) --- */}
              <AnimatePresence>
                {copied && (
                    <motion.div 
                        initial={{ y: -50, opacity: 0 }} 
                        animate={{ y: 20, opacity: 1 }} 
                        exit={{ y: -50, opacity: 0 }}
                        className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
                    >
                        <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm">
                            <CheckCircle2 size={18} />
                            Código Pix Copiado!
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                
                {/* 1. TELA DE PAGAMENTO */}
                {status !== 'approved' && (
                    <motion.div
                        key="payment-screen"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col h-full bg-[#F0F2F5]"
                    >
                        {/* Header */}
                        <div className="bg-white p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-[#37474F] flex items-center gap-2">
                                    <ScanLine className="text-[#C51162]" /> Pagamento Pix
                                </h3>
                                <p className="text-xs text-gray-500 font-bold mt-0.5">
                                    Finalize para garantir suas chances
                                </p>
                            </div>
                            <button onClick={onClose} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Body Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
                            
                            {/* Timer Compacto */}
                            <div className={`
                                flex items-center gap-2 px-4 py-2 rounded-xl mb-6 shadow-sm w-full justify-center
                                ${isExpired ? 'bg-red-100 text-red-600' : 'bg-white text-[#C51162] border border-gray-100'}
                            `}>
                                <Timer className={`w-5 h-5 ${!isExpired && 'animate-pulse'}`} />
                                <div className="text-center flex gap-2 items-center">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        {isExpired ? 'Esgotado' : 'Expira em:'}
                                    </p>
                                    <p className="text-xl font-black font-mono leading-none">
                                        {formatTime(timeLeft)}
                                    </p>
                                </div>
                            </div>

                            {/* QR Code Responsivo (Menor no mobile) */}
                            <div className="relative bg-white p-3 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 mb-6">
                                <Image 
                                    src="/imgs/qrcode.png" 
                                    alt="QR Code Pix"
                                    width={160}
                                    height={160}
                                    className="w-40 h-40 object-contain mx-auto select-none" 
                                />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-200 shadow-sm whitespace-nowrap">
                                    Valor: R$ {totalValue.toFixed(2).replace('.', ',')}
                                </div>
                            </div>

                            {/* Campo de Cópia Otimizado */}
                            <div className="w-full mb-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block text-center">
                                    Copie e Cole no seu Banco
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-white border-2 border-gray-200 rounded-xl flex items-center px-3 overflow-hidden">
                                        <input 
                                            type="text" readOnly value={pixCode}
                                            className="w-full text-xs font-mono text-gray-500 bg-transparent focus:outline-none py-3 truncate"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleCopyPix}
                                        className={`
                                            shrink-0 px-4 py-3 rounded-xl transition-all font-bold text-xs flex items-center gap-2
                                            ${copied ? 'bg-green-500 text-white' : 'bg-[#C51162] text-white hover:bg-[#A00F50]'}
                                        `}
                                    >
                                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                        <span className="hidden md:inline">{copied ? 'COPIADO' : 'COPIAR'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Fixo */}
                        <div className="bg-white p-4 md:p-6 border-t border-gray-200 shrink-0 pb-8 md:pb-6">
                            <button 
                                onClick={handlePaymentConfirm}
                                disabled={status === 'processing'}
                                className={`
                                    w-full py-4 rounded-xl font-black text-lg shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 group
                                    ${status === 'processing' ? 'bg-gray-400 text-white shadow-none cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}
                                `}
                            >
                                {status === 'processing' ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" /> VERIFICANDO...
                                    </>
                                ) : (
                                    <>
                                        JÁ FIZ O PAGAMENTO 
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={4} />
                                    </>
                                )}
                            </button>
                            <div className="mt-3 flex items-center justify-center gap-1.5 text-gray-400">
                                <ShieldCheck size={12} />
                                <span className="text-[9px] font-bold uppercase">Ambiente 100% Seguro</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. TELA DE SUCESSO (APROVADO) */}
                {status === 'approved' && (
                    <motion.div
                        key="success-screen"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col h-full bg-white relative overflow-hidden"
                    >
                        <ConfettiParticles />

                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10">
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-50 shadow-xl"
                            >
                                <CheckCircle2 size={64} className="text-green-600" strokeWidth={3} />
                            </motion.div>

                            <motion.h2 
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                className="text-3xl font-black text-[#37474F] mb-2"
                            >
                                Pagamento <br/> <span className="text-green-600">Aprovado!</span>
                            </motion.h2>

                            <motion.p 
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                                className="text-gray-500 font-medium text-sm mb-8 max-w-xs leading-relaxed"
                            >
                                Suas cartelas já estão valendo. <br/>
                                Boa sorte no sorteio!
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                className="bg-[#FFF8E1] border border-[#FFE082] p-4 rounded-xl w-full"
                            >
                                <div className="flex items-center justify-center gap-2 text-[#F57C00] font-black uppercase text-xs mb-1">
                                    <Trophy size={14} /> Dica de Ouro
                                </div>
                                <p className="text-[#37474F] text-xs font-bold">
                                    Fique de olho no seu WhatsApp, enviaremos os resultados por lá!
                                </p>
                            </motion.div>
                        </div>

                        <div className="p-6 border-t border-gray-100 z-10 bg-white pb-8 md:pb-6">
                            <button 
                                onClick={onClose}
                                className="w-full py-4 rounded-xl bg-[#C51162] hover:bg-[#A00F50] text-white font-black text-lg shadow-[0_4px_0_#880E4F] active:shadow-none active:translate-y-[4px] transition-all"
                            >
                                VER MEUS BILHETES
                            </button>
                        </div>
                    </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function ConfettiParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-[#C51162]' : 'bg-green-500'}`}
                    initial={{ x: Math.random() * 300, y: -20, scale: Math.random() }}
                    animate={{ y: 800, rotate: 360 }}
                    transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                />
            ))}
        </div>
    )
}