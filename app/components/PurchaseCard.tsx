// src/components/PurchaseCard.tsx
"use client";
import Image from 'next/image';
import { Minus, Plus, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from './PaymentModal'; // <--- IMPORTAR
import TicketSelectionModal from './TicketSelectionModal'; // Importando o modal

export default function PurchaseCard() {
    const [quantity, setQuantity] = useState(5);
    const [selectedPackage, setSelectedPackage] = useState({ chances: 6, price: 30.00 });
    const [isAnimatingPrice, setIsAnimatingPrice] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const packages = [
        { chances: 2, price: 20.00, popular: false },
        { chances: 6, price: 30.00, popular: true },
        { chances: 12, price: 50.00, popular: false },
    ];

    const total = quantity * selectedPackage.price;

    useEffect(() => {
        setIsAnimatingPrice(true);
        const timer = setTimeout(() => setIsAnimatingPrice(false), 300);
        return () => clearTimeout(timer);
    }, [total]);


    const handleConfirmSelection = () => {
        setIsModalOpen(false); // Fecha a seleção
        setIsPaymentOpen(true); // Abre o pagamento
    };

    return (
        <>
            {/* Modal Separado */}
           <TicketSelectionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmSelection} // <--- Passar essa nova prop (veja ajuste abaixo)
                quantity={quantity}
                packageDetails={selectedPackage}
            />

            <PaymentModal 
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                totalValue={total}
            />

            <div className="relative z-30 max-w-7xl mx-auto -mt-12 md:-mt-20 px-3 md:px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden p-4 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-stretch border-4 border-white ring-1 ring-black/5"
                >
                    {/* LADO ESQUERDO (VISUAL) */}
                    <div className="w-full md:w-[35%] shrink-0 flex flex-row md:flex-col items-center gap-4 md:gap-0">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg relative group cursor-pointer w-24 h-24 shrink-0 md:w-full md:h-auto md:aspect-square"
                        >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                            <Image
                                src="/imgs/sorteio-1.png"
                                alt="Prêmios Solidários"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 md:top-4 md:left-4 z-20 bg-red-600 text-white text-[8px] md:text-xs font-black px-1.5 py-0.5 md:px-3 md:py-1 rounded-full shadow-md animate-pulse border border-white/20">
                                AO VIVO
                            </div>
                        </motion.div>

                        <div className="flex flex-col items-start md:items-center justify-center w-full">
                            <div className="md:hidden">
                                <h3 className="text-gray-800 font-black text-lg leading-tight">PRÊMIOS SOLIDÁRIOS</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Edição #01</p>
                            </div>
                            <div className="mt-0 md:mt-4 w-full text-center text-[#C51162] font-black text-xs md:text-sm tracking-widest uppercase bg-pink-50 px-2 py-1 md:px-4 md:py-2 rounded-lg self-start md:self-center hidden md:block">
                                Edição 01 • 18/01/25
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden w-full h-px bg-gray-100"></div>

                    {/* LADO DIREITO (CONTROLES) */}
                    <div className="w-full md:w-[65%] flex flex-col justify-between gap-4 md:gap-8">
                        <div>
                            <h3 className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-2 ml-1">1. Selecione seu pacote</h3>
                            <div className="grid grid-cols-3 gap-2 md:gap-4">
                                {packages.map((pkg) => {
                                    const isSelected = selectedPackage.chances === pkg.chances;
                                    const isPopular = pkg.popular;
                                    return (
                                        <div key={pkg.chances} className="relative group z-0 hover:z-10">
                                            {isPopular && (
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFAB00] text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap z-30 flex items-center gap-1 pointer-events-none">
                                                    <Sparkles size={8} /> POPULAR
                                                </div>
                                            )}
                                            <motion.button
                                                onClick={() => setSelectedPackage(pkg)}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative rounded-xl flex flex-col items-center justify-center transition-all duration-200 border-2 cursor-pointer w-full py-2 md:p-4
                                                ${isSelected ? 'border-[#C51162] bg-[#FFF0F5] shadow-md' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                            >
                                                {isSelected && <motion.div layoutId="selected-bg" className="absolute inset-0 bg-gradient-to-br from-[#C51162]/5 to-[#C51162]/10 z-0" />}
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <span className={`text-[9px] md:text-xs font-bold leading-none mb-1 ${isSelected ? 'text-[#C51162]' : 'text-gray-400'}`}>{pkg.chances} CHANCES</span>
                                                    <span className={`text-base md:text-2xl font-black leading-none ${isSelected ? 'text-[#C51162]' : 'text-gray-800'}`}>R${pkg.price.toFixed(0)}</span>
                                                    <div className={`h-3 md:h-5 flex items-center justify-center mt-1`}>
                                                        <AnimatePresence>
                                                            {isSelected && (
                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                                    <div className="bg-[#C51162] rounded-full p-0.5"><Check size={10} className="text-white md:w-3 md:h-3" strokeWidth={4} /></div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col md:block gap-4">
                            <div className="flex flex-row md:flex-col items-end md:items-stretch justify-between gap-4">
                                <div className="flex-1 md:w-full">
                                    <h3 className="md:hidden text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-2 ml-1">2. Qtd</h3>
                                    <div className="bg-gray-50 rounded-xl p-1.5 md:p-2 border border-gray-100 flex items-center justify-between">
                                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-200 text-gray-400 rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition hover:text-[#C51162]"><Minus size={18} /></motion.button>
                                        <div className="flex flex-col items-center">
                                            <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Quantidade</span>
                                            <motion.span key={quantity} initial={{ scale: 1.5, color: "#C51162" }} animate={{ scale: 1, color: "#37474F" }} className="text-2xl md:text-4xl font-black text-[#37474F]">{quantity}</motion.span>
                                        </div>
                                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 md:w-12 md:h-12 bg-[#C51162] text-white rounded-lg flex items-center justify-center shadow-md active:scale-90 transition"><Plus size={18} /></motion.button>
                                    </div>
                                </div>
                                <div className="flex-1 md:w-full text-right md:text-left flex flex-col justify-end md:block pb-1 md:pb-0 md:pt-2">
                                    <div className="flex flex-col md:flex-row md:items-end md:justify-between md:px-2 md:pb-2 md:border-b md:border-dashed md:border-gray-200">
                                        <span className="text-gray-400 font-bold text-[10px] md:text-xl uppercase">Total</span>
                                        <motion.span animate={{ scale: isAnimatingPrice ? 1.1 : 1, color: isAnimatingPrice ? "#2E7D32" : "#1B5E20" }} className="text-[#2E7D32] font-black text-3xl md:text-4xl tracking-tight leading-none">R$ {total.toFixed(2).replace('.', ',')}</motion.span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="group relative w-full py-4 md:py-5 rounded-xl mt-2 md:mt-4 bg-gradient-to-b from-[#FFD700] to-[#FFB300] text-[#37474F] font-black text-lg md:text-2xl uppercase tracking-wide shadow-[0_4px_0_rgb(217,119,6)] md:shadow-[0_6px_0_rgb(217,119,6)] active:shadow-none active:translate-y-[4px] md:active:translate-y-[6px] transition-all duration-100 flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
                            >
                                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
                                <span className="relative z-10 drop-shadow-sm">COMPRAR AGORA</span>
                                <div className="bg-black/10 rounded-full p-1 md:p-1.5 transition-transform group-hover:translate-x-1 relative z-10"><ChevronRight size={20} className="text-[#37474F]" strokeWidth={4} /></div>
                            </motion.button>
                            <p className="text-center text-[10px] md:mt-4 md:text-xs text-gray-400 font-medium flex items-center justify-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Pagamento 100% Seguro via PIX</p>
                        </div>
                    </div>
                </motion.div>
                <style jsx global>{`
                    @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
                    .animate-shine { animation: shine 1.5s infinite linear; }
                `}</style>
            </div>
        </>
    );
}