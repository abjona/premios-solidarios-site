// src/components/TicketSelectionModal.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Check, RefreshCw, ChevronRight, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

// --- TIPAGENS ---
interface TicketChance {
    idx: number;
    id: string;
    numbers: number[];
}

interface TicketGroup {
    mainId: string;
    chances: TicketChance[];
}

interface TicketSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    quantity: number;
    packageDetails: {
        chances: number;
        price: number;
        label?: string;
    };
}

// --- AUXILIARES ---
const generateRandomNumbers = () => {
    const numbers = new Set<number>();
    while (numbers.size < 15) {
        numbers.add(Math.floor(Math.random() * 60) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

// --- SUB-COMPONENTE: CARD COM EFEITO STACK E SCROLL ---
const StackCard = ({
    group,
    isSelected,
    onToggle,
    onShuffle
}: {
    group: TicketGroup;
    isSelected: boolean;
    onToggle: () => void;
    onShuffle: (mainId: string, chanceIndex: number) => void;
}) => {
    const [currentChanceIndex, setCurrentChanceIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Detecta qual chance está visível ao scrollar
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            if (index !== currentChanceIndex && index >= 0 && index < group.chances.length) {
                setCurrentChanceIndex(index);
            }
        }
    };

    // Botões de navegação manual (Opcional, bom para UX)
    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative select-none py-2 px-1">

            {/* --- CAMADAS DO STACK (FUNDO) --- */}
            {/* Camada 3 (Fundo mais distante) */}
            <div className={`absolute top-0 left-0 w-full h-full rounded-2xl border-2 transition-all duration-300
        ${isSelected ? 'bg-pink-100 border-pink-200 translate-x-2 translate-y-2' : 'bg-gray-100 border-gray-200 translate-x-1 translate-y-1'}
      `}></div>

            {/* Camada 2 (Meio) */}
            <div className={`absolute top-0 left-0 w-full h-full rounded-2xl border-2 transition-all duration-300 z-0
        ${isSelected ? 'bg-pink-50 border-pink-300 translate-x-1 translate-y-1' : 'bg-white border-gray-300'}
      `}></div>

            {/* --- CAMADA PRINCIPAL (FRENTE) --- */}
            <div
                onClick={onToggle}
                className={`
          relative z-10 w-full bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer
          ${isSelected
                        ? 'border-[#C51162] shadow-[0_0_15px_rgba(197,17,98,0.15)]'
                        : 'border-gray-300 hover:border-gray-400'
                    }
        `}
            >
                {/* HEADER DO CARD */}
                <div className="px-4 pt-3 pb-2 flex justify-between items-center border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#C51162] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            Chance {currentChanceIndex + 1}/{group.chances.length}
                        </span>
                    </div>

                    {/* Indicadores de Paginação (Bolinhas) */}
                    <div className="flex gap-1">
                        {group.chances.map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentChanceIndex ? (isSelected ? 'bg-[#C51162]' : 'bg-gray-800') : 'bg-gray-200'}`} />
                        ))}
                    </div>
                </div>

                {/* ÁREA DE SCROLL HORIZONTAL (CAROUSEL) */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full bg-gray-50"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {group.chances.map((chance, idx) => (
                        <div
                            key={chance.id}
                            className="min-w-full snap-center p-4 flex flex-col items-center justify-center relative"
                        >
                            {/* Navegação Lateral (Setas Visuais) - Apenas dica visual */}
                            {idx > 0 && (
                                <button onClick={(e) => { e.stopPropagation(); scrollToIndex(idx - 1) }} className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 p-1">
                                    <ArrowLeft size={16} />
                                </button>
                            )}
                            {idx < group.chances.length - 1 && (
                                <button onClick={(e) => { e.stopPropagation(); scrollToIndex(idx + 1) }} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 p-1">
                                    <ArrowRight size={16} />
                                </button>
                            )}

                            {/* GRID DE NÚMEROS */}
                            <div className="grid grid-cols-5 gap-2 md:gap-3 w-full max-w-[240px]">
                                {chance.numbers.map((num, nIdx) => (
                                    <div
                                        key={nIdx}
                                        className={`
                      aspect-square rounded-full flex items-center justify-center text-sm font-bold border shadow-sm
                      ${isSelected
                                                ? 'border-[#C51162] bg-white text-[#C51162]'
                                                : 'border-gray-200 bg-white text-gray-400'
                                            }
                    `}
                                    >
                                        {num.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER DO CARD */}
                <div className={`
          py-3 px-4 flex items-center justify-between border-t relative z-20
          ${isSelected ? 'bg-[#C51162]' : 'bg-[#1A1A1A]'}
          transition-colors duration-200
        `}>
                    <div className="flex flex-col">
                        <span className="text-[8px] text-white/60 font-bold uppercase tracking-widest">
                            ID da Chance {currentChanceIndex + 1}
                        </span>
                        <span className="text-white text-base font-black tracking-widest font-mono leading-none">
                            {group.chances[currentChanceIndex].id}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onShuffle(group.mainId, currentChanceIndex);
                        }}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors active:rotate-180 duration-300"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>

                {/* Check Overlay (Flutuante) */}
                {isSelected && (
                    <div className="absolute top-3 right-3 z-30 bg-green-500 text-white p-1 rounded-full shadow-lg ring-2 ring-white animate-in zoom-in duration-200">
                        <Check size={14} strokeWidth={4} />
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function TicketSelectionModal({ isOpen, onClose, onConfirm, quantity, packageDetails }: TicketSelectionModalProps) {
    const [ticketGroups, setTicketGroups] = useState<TicketGroup[]>([]);
    const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

    // Gera as cartelas
    useEffect(() => {
        if (isOpen) {
            const newGroups: TicketGroup[] = Array.from({ length: quantity }, () => {
                const baseNum = Math.floor(Math.random() * 90000);
                const baseIdString = baseNum.toString().padStart(6, '0');

                const chances: TicketChance[] = Array.from({ length: packageDetails.chances }, (_, i) => {
                    const currentIdNum = baseNum + (i * 100000);
                    const currentId = currentIdNum.toString().padStart(7, '0');
                    return {
                        idx: i,
                        id: currentId,
                        numbers: generateRandomNumbers()
                    };
                });

                return { mainId: baseIdString, chances: chances };
            });

            setTicketGroups(newGroups);
            setSelectedGroupIds(newGroups.map(t => t.mainId));
        }
    }, [isOpen, quantity, packageDetails.chances]);

    // Função Shuffle
    const shuffleChance = (groupId: string, chanceIndex: number) => {
        setTicketGroups(prev => prev.map(group => {
            if (group.mainId !== groupId) return group;
            const updatedChances = [...group.chances];
            updatedChances[chanceIndex] = {
                ...updatedChances[chanceIndex],
                numbers: generateRandomNumbers()
            };
            return { ...group, chances: updatedChances };
        }));
    };

    const toggleSelection = (id: string) => {
        if (selectedGroupIds.includes(id)) {
            setSelectedGroupIds(prev => prev.filter(groupId => groupId !== id));
        } else {
            setSelectedGroupIds(prev => [...prev, id]);
        }
    };

    const totalValue = selectedGroupIds.length * packageDetails.price;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-4">
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#121212] w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] rounded-none md:rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:border-t-4 border-[#C51162]"
                        >
                            {/* --- HEADER --- */}
                            <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative z-20">
                                <div>
                                    <h3 className="text-lg md:text-2xl font-black text-[#1A1A1A] flex items-center gap-2 uppercase tracking-tight">
                                        <Layers className="text-[#C51162]" size={20} /> Seleção
                                    </h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                            {packageDetails.chances} Chances
                                        </span>
                                        <p className="text-gray-400 text-xs font-medium">
                                            {ticketGroups.length} pacotes
                                        </p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                                    <X size={20} className="text-gray-600" />
                                </button>
                            </div>

                            {/* --- GRID SCROLLABLE --- */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F0F2F5]">
                                {/* Grid adaptável */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-32 md:pb-0">
                                    {ticketGroups.map((group) => (
                                        <StackCard
                                            key={group.mainId}
                                            group={group}
                                            isSelected={selectedGroupIds.includes(group.mainId)}
                                            onToggle={() => toggleSelection(group.mainId)}
                                            onShuffle={shuffleChance}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* --- FOOTER --- */}
                            <div className="bg-white p-4 border-t border-gray-200 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 z-30 shadow-[0_-5px_30px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total</span>
                                        <span className="text-2xl font-black text-[#1A1A1A] tracking-tighter leading-none">
                                            R$ {totalValue.toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                    <div className="bg-[#C51162]/10 text-[#C51162] px-3 py-1 rounded-lg text-xs font-bold md:hidden">
                                        {selectedGroupIds.length} selecionados
                                    </div>
                                </div>

                                <button
                                    onClick={onConfirm}
                                    className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-[#C51162] hover:bg-[#A00F50] text-white font-black text-lg shadow-[0_4px_0_#880E4F] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={selectedGroupIds.length === 0}
                                >
                                    Confirmar <ChevronRight size={20} strokeWidth={4} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}