import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, BrainCircuit } from 'lucide-react';

const metaphors = [
    {
        id: "btn_1",
        label: "1",
        poet: "Cemal Süreya",
        quote: "Yunus ki sütdişleriyle Türkçenin…",
        pedagogicalNote: "Yunus Emre'nin Türkçenin şiirini en baştan, bir çocuğun doğal gelişimi gibi ilk tazeliğiyle kurduğu hissettirilir.",
        audioSrc: "/ses1.mp3",
        modalImage: "/1.png"
    },
    {
        id: "btn_2",
        label: "2",
        poet: "Yahya Kemal Beyatlı",
        quote: "Türkçe ağzımda annemin sütüdür.",
        pedagogicalNote: "Türkçenin doğal, besleyici ve kökünü maziden alan bir kaynak olduğu hissettirilir.",
        audioSrc: "/ses2.mp3",
        modalImage: "/2.png"
    },
    {
        id: "btn_3",
        label: "3",
        poet: "Fazıl Hüsnü Dağlarca",
        quote: "Türkçem, benim ses bayrağım.",
        pedagogicalNote: "Şiirin en ulusal yapı olduğu ve dilin doğrudan kimliği temsil ettiği kavratılır.",
        audioSrc: "/ses3.mp3",
        modalImage: "/3.png"
    }
];

export default function Stage1() {
    const [activeModal, setActiveModal] = useState(null);
    const [clickedButtons, setClickedButtons] = useState(new Set());
    const audioRef = useRef(null);

    const isCompleted = clickedButtons.size === metaphors.length;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && activeModal) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeModal]);

    const openModal = (metaphor) => {
        setActiveModal(metaphor);
        setClickedButtons((prev) => new Set(prev).add(metaphor.id));

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = metaphor.audioSrc;
            audioRef.current.play().catch(e => {
                console.warn("Otomatik oynatma kısıtlaması nedeniyle ses çalınamadı.");
            });
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <section id="stage-1" className="relative py-32 object-cover overflow-hidden bg-center bg-cover bg-no-repeat transition-colors duration-500 min-h-screen flex flex-col justify-center" style={{ backgroundImage: "url('/background.png')" }}>
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

            <audio ref={audioRef} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="mx-auto max-w-3xl text-center mb-24 cursor-default">
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Dokunmatik Metaforlar: Şiir Dili Olarak Türkçe
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-amber-50 drop-shadow-md mx-auto italic font-serif">
                        Lütfen tahtadaki numaralı kapılara dokunarak şairlerin dil metaforlarını keşfedin.
                    </p>
                </div>

                {/* Hotspots (Gizemli Butonlar) */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-24 mb-24">
                    {metaphors.map((metaphor, index) => {
                        const isClicked = clickedButtons.has(metaphor.id);
                        return (
                            <motion.button
                                key={metaphor.id}
                                onClick={() => openModal(metaphor)}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.3, type: "spring" }}
                                className={`
                  relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full transition-all duration-300
                  ${isClicked ? 'bg-amber-500/20 border-amber-500/40' : 'bg-white/10 hover:bg-white/20 border-white/30'}
                  border-2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.3)] group
                `}
                            >
                                <span className={`font-serif text-4xl sm:text-6xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors ${isClicked ? 'text-amber-300/80' : 'text-white/90 group-hover:text-white'}`}>
                                    {metaphor.label}
                                </span>

                                {/* Dışarıya doğru atan hafif pulse efekti (Tıklanmamışsa) */}
                                {!isClicked && (
                                    <span className="absolute inset-0 rounded-full border border-white/40 animate-[ping_3s_ease-in-out_infinite]"></span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Lightbox / Modal Overlay */}
                <AnimatePresence>
                    {activeModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-4xl w-full bg-[#1c1917] rounded-3xl overflow-hidden shadow-[0_0_30px_-5px_rgba(217,119,6,0.5)] border border-amber-900/50 flex flex-col md:flex-row"
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Modal Sol Kısım - Görsel alanı */}
                                <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden bg-black/50">
                                    <img
                                        src={activeModal.modalImage}
                                        alt={activeModal.poet}
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                </div>

                                {/* Modal Sağ Kısım - İçerik */}
                                <div className="w-full md:w-3/5 p-8 sm:p-10 flex flex-col justify-center relative">
                                    <Quote className="absolute top-8 right-8 w-20 h-20 text-stone-800/50" />

                                    <h3 className="text-2xl sm:text-3xl font-serif text-amber-500 font-bold mb-4 z-10">
                                        {activeModal.poet}
                                    </h3>

                                    <p className="text-2xl sm:text-3xl font-serif italic text-stone-200 leading-tight mb-8 z-10 drop-shadow-sm">
                                        "{activeModal.quote}"
                                    </p>

                                    <div className="bg-amber-950/30 rounded-xl p-5 border-l-4 border-amber-600 z-10">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500/80 mb-2">Pedagojik Not</h4>
                                        <p className="text-stone-300 font-medium leading-relaxed text-sm sm:text-base">
                                            {activeModal.pedagogicalNote}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Completion Rule: Pedagojik Sentez Tartışma Panosu */}
                <AnimatePresence>
                    {isCompleted && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mx-auto max-w-5xl"
                        >
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 to-black p-[2px] shadow-[0_0_50px_-10px_rgba(217,119,6,0.6)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-20 animate-pulse"></div>

                                <div className="relative bg-[#1c1917]/95 backdrop-blur-xl rounded-[22px] p-8 sm:p-10">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                        <div className="flex flex-shrink-0 w-16 h-16 rounded-full bg-amber-900/40 items-center justify-center text-amber-400 border border-amber-500/50 shadow-inner">
                                            <BrainCircuit className="w-8 h-8" />
                                        </div>
                                        <div className="text-center sm:text-left flex-grow">
                                            <h3 className="text-xl font-bold text-amber-400 mb-4 pb-3 border-b border-stone-700 uppercase tracking-wider text-sm">
                                                Tartışma Panosu (Sentez)
                                            </h3>

                                            <div className="border-l-4 border-amber-600 pl-6 py-4 bg-stone-900/80 rounded-r-xl mb-6">
                                                <Quote className="w-8 h-8 text-amber-700/50 mb-2" />
                                                <p className="text-stone-300 text-lg md:text-xl font-serif leading-relaxed mb-3">
                                                    "Dil, insan topluluklarını bir yığın veya kitle olmaktan kurtararak aralarında 'duygu ve düşünce birliği' olan bir cemiyet, yani 'millet' haline getirir."
                                                </p>
                                                <p className="text-sm font-bold text-amber-700 uppercase tracking-wider">— Mehmet Kaplan</p>
                                            </div>

                                            <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                                                <p className="text-lg sm:text-xl text-stone-200 font-medium leading-relaxed">
                                                    Hangi metafor, öğrencilerinizde <strong className="text-amber-400 font-bold border-b-2 border-amber-500/30 pb-0.5">"dilin kimlik olduğu"</strong> fikrini en hızlı uyandırır? Neden?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
