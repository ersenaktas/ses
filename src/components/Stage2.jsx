import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Quote, Sparkles, AlertCircle } from 'lucide-react';

const targets = [
    { id: 'target_yunus', name: 'Yunus Emre', expectedWord: 'SÜT' },
    { id: 'target_yahya', name: 'Yahya Kemal Beyatlı', expectedWord: 'SÜT' },
    { id: 'target_fazil', name: 'Fazıl Hüsnü Dağlarca', expectedWord: 'SES' }
];

const words = [
    { id: 'word_sut', text: 'SÜT' },
    { id: 'word_ses', text: 'SES' }
];

const verses = {
    'target_yunus-SÜT': {
        quote: "Yunus ki sütdişleriyle Türkçenin…",
        note: "Dilin çocukluk/doğuş evresi"
    },
    'target_yahya-SÜT': {
        quote: "Türkçe ağzımda annemin sütüdür.",
        note: "Dilin besleyici/ana kaynağı"
    },
    'target_fazil-SES': {
        quote: "Türkçem, benim ses bayrağım.",
        note: "Dilin direniş ve birleştirici gücü"
    }
};

function DraggableWord({ id, text }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { text }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`
        px-8 py-4 rounded-xl font-bold font-serif text-2xl tracking-widest cursor-grab active:cursor-grabbing border bg-white
        ${isDragging ? 'shadow-2xl z-50 opacity-90 scale-105 border-primary ring-4 ring-primary/30 text-primary' : 'shadow-md border-border text-foreground hover:shadow-lg hover:border-primary/50'}
        transition-[box-shadow,background-color,color] duration-200
      `}
        >
            {text}
        </div>
    );
}

function DroppableTarget({ id, name, isOver, children, verse, isError }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="flex flex-col gap-4">
            <div
                ref={setNodeRef}
                className={`
          flex items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[120px]
          ${isOver ? 'bg-primary/10 border-primary shadow-inner scale-[1.02]' : 'bg-muted/30 border-muted-foreground/30'}
          ${isError ? 'bg-destructive/10 border-destructive/50' : ''}
          ${verse ? 'border-solid border-primary/40 bg-primary/5' : ''}
        `}
            >
                <div className="text-center relative z-10 w-full">
                    {children || (
                        <span className={`font-serif text-lg font-medium opacity-50 ${isError ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {isError ? "Yanlış Kelime!" : name}
                        </span>
                    )}
                </div>
            </div>

            {/* Şiir Açıklaması (Başarılı Eşleşme) */}
            <AnimatePresence>
                {verse && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        className="bg-card text-card-foreground p-5 rounded-xl border border-border/50 shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <Quote className="w-6 h-6 text-primary/20 absolute top-4 right-4" />
                        <p className="font-serif italic text-lg mb-2 text-foreground/90 pr-8 leading-snug">&quot;{verse.quote}&quot;</p>
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md mt-1 uppercase tracking-wider">{verse.note}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Stage2() {
    const [matches, setMatches] = useState({}); // { targetId: droppedWordText }
    const [errorTarget, setErrorTarget] = useState(null);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over) {
            const targetId = over.id;
            const wordText = active.data.current.text;

            // Doğrula: Target'ın beklediği kelime ile eşleşiyor mu? (Örn: Yunus -> SÜT)
            const targetObject = targets.find(t => t.id === targetId);

            if (targetObject && targetObject.expectedWord === wordText) {
                setMatches(prev => ({
                    ...prev,
                    [targetId]: wordText
                }));
                setErrorTarget(null);
            } else {
                // Hatalı yerleştirme
                setErrorTarget(targetId);
                setTimeout(() => setErrorTarget(null), 1500); // 1.5 sn sonra hatayı temizle
            }
        }
    };

    return (
        <section id="stage-2" className="py-32 bg-background border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mx-auto mb-4"
                    >
                        <Sparkles className="w-10 h-10 text-primary mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-5xl">
                        Sözcüğün Simyası
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground w-11/12 mx-auto">
                        Aynı kelimenin farklı şairlerin dünyasında nasıl farklı çağrışımlar üretebileceğini keşfedin. <br className="hidden sm:block" />
                        <strong className="text-foreground font-semibold">&quot;SÜT&quot;</strong> ve <strong className="text-foreground font-semibold">&quot;SES&quot;</strong> kelimelerini ilgili şairlerin kutularına sürükleyin.
                    </p>
                </div>

                <DndContext onDragEnd={handleDragEnd}>
                    {/* Hedef Kutular (Droppable) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 min-h-[250px]">
                        {targets.map((target) => (
                            <DroppableTarget
                                key={target.id}
                                id={target.id}
                                name={target.name}
                                verse={matches[target.id] ? verses[`${target.id}-${matches[target.id]}`] : null}
                                isError={errorTarget === target.id}
                            >
                                {/* Eğer kelime başarıyla bırakıldıysa o kelimeyi kutu içinde göster */}
                                {matches[target.id] ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">{target.name}</span>
                                        <span className="px-6 py-2 bg-primary text-primary-foreground font-serif text-xl sm:text-2xl font-bold tracking-widest rounded-lg shadow-sm">
                                            {matches[target.id]}
                                        </span>
                                    </motion.div>
                                ) : null}
                            </DroppableTarget>
                        ))}
                    </div>

                    {/* Sürüklenebilir Kelimeler (Draggable) */}
                    <div className="relative">
                        <div className="absolute inset-x-0 top-1/2 -mt-px h-px bg-border/50" aria-hidden="true" />
                        <div className="relative flex justify-center gap-6 sm:gap-12 py-8 bg-muted/10 rounded-3xl border border-border/50 max-w-2xl mx-auto shadow-inner">
                            {words.map((word) => (
                                <DraggableWord key={word.id} id={word.id} text={word.text} />
                            ))}
                        </div>
                    </div>
                </DndContext>

            </div>
        </section>
    );
}
