import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, MapPin } from 'lucide-react';

const hotspots = [
    {
        id: "hotspot_cukurova",
        location: "Çukurova Bölgesi",
        poet: "Karacaoğlan",
        quote: "Sen ne diyon... Del'ediyon",
        pedagogicalNote: "Süsten uzak, berrak halk Türkçesi vurgulanır.",
        audioSrc: "/ses_karacaoglan.mp3", // Temsili ses dosyası
        position: { top: "65%", left: "45%" } // Çukurova konumu (ince ayar)
    },
    {
        id: "hotspot_istanbul",
        location: "İstanbul Bölgesi",
        poet: "Ziya Gökalp",
        quote: "Güzel dil Türkçe bize / İstanbul konuşması... En sâf, en ince bize",
        pedagogicalNote: "Yeni Lisan hareketi anlatılır.",
        audioSrc: "/ses_ziyagokalp.mp3", // Temsili ses dosyası
        position: { top: "20%", left: "15%" } // İstanbul konumu (ince ayar)
    },
    {
        id: "hotspot_dogu",
        location: "Fırat / Doğu Anadolu Bölgesi",
        poet: "Yavuz Bülent Bakiler",
        quote: "Malatya’da Elazığ’da bizim dilimiz... Fırat'ta şelâle, bir köpüklü su",
        pedagogicalNote: "Türkçenin coğrafyayla bütünleşen şiir dili vurgulanır.",
        audioSrc: "/ses_bakiler.mp3", // Temsili ses dosyası
        position: { top: "43%", left: "58%" } // Doğu Anadolu konumu (ince ayar)
    }
];

export default function Stage3() {
    const [activeModal, setActiveModal] = useState(null);
    const [visitedHotspots, setVisitedHotspots] = useState(new Set());
    const audioRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && activeModal) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeModal]);

    const openModal = (hotspot) => {
        setActiveModal(hotspot);
        setVisitedHotspots((prev) => new Set(prev).add(hotspot.id));

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = hotspot.audioSrc;
            audioRef.current.play().catch(e => {
                console.warn("Otomatik oynatma kısıtlaması nedeniyle ses çalınamadı (ses_karacaoglan.mp3 vb. public klasöründe olmalıdır).");
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
        <section id="stage-3" className="relative py-32 object-cover overflow-hidden bg-center bg-cover bg-no-repeat transition-colors duration-500" style={{ backgroundImage: "url('/harita.png')" }}>
            {/* Harita Odaklı Şeffaf Koyu Katman (Etkileşimliliği öne çıkarır) */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

            <audio ref={audioRef} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
                <div className="mx-auto max-w-3xl text-center mb-16 cursor-default">
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Şiir Coğrafyası
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-amber-50 drop-shadow-md mx-auto italic font-serif">
                        Türk dilinin yolculuğunu mekânsal bir düzlemde göstermek için haritadaki parlayan durakları keşfedin.
                    </p>
                </div>

                {/* Harita Container - img ile doğal oran korunuyor */}
                <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-white/20 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.6)] overflow-hidden">
                    <img src="/harita.png" alt="Türkiye Haritası" className="w-full h-auto block" />

                    {hotspots.map((hotspot, index) => {
                        const isVisited = visitedHotspots.has(hotspot.id);
                        return (
                            <motion.button
                                key={hotspot.id}
                                onClick={() => openModal(hotspot)}
                                style={{ top: hotspot.position.top, left: hotspot.position.left }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.3, type: "spring" }}
                                className={`
                  absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group
                `}
                            >
                                {/* Yanıp sönen dalga efekti (Ziyaret edilmemişse) */}
                                {!isVisited && (
                                    <span className="absolute flex h-16 w-16">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                                    </span>
                                )}

                                {/* Pin İkonu */}
                                <div className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md border-[3px]
                  ${isVisited ? 'bg-cyan-950/80 border-cyan-800/80 text-cyan-600' : 'bg-cyan-500/90 border-cyan-100 text-white hover:bg-cyan-400 cursor-pointer'}
                `}>
                                    <MapPin className="w-6 h-6" />
                                </div>

                                {/* Etiket */}
                                <span className={`
                  mt-2 px-3 py-1 rounded-md text-sm font-bold transition-opacity whitespace-nowrap drop-shadow-lg shadow-black
                  ${isVisited ? 'bg-black/80 text-cyan-600 opacity-100' : 'bg-black/90 text-white opacity-0 group-hover:opacity-100'}
                `}>
                                    {hotspot.location}
                                </span>
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
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-2xl w-full bg-[#111827] rounded-3xl overflow-hidden shadow-[0_0_50px_-5px_cyan] border border-cyan-900 flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

                                <div className="p-8 sm:p-10 flex flex-col relative z-10">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="w-8 h-8 text-cyan-500" />
                                        <span className="text-cyan-500 font-bold uppercase tracking-widest text-sm bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{activeModal.location}</span>
                                    </div>

                                    <Quote className="w-12 h-12 text-slate-800/80 mb-4" />

                                    <h3 className="text-2xl font-serif text-white font-bold mb-4">
                                        {activeModal.poet}
                                    </h3>

                                    <p className="text-3xl font-serif italic text-cyan-200/90 leading-tight mb-8">
                                        "{activeModal.quote}"
                                    </p>

                                    <div className="bg-slate-900/80 rounded-2xl p-6 border-l-4 border-cyan-600">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2">Pedagojik Not</h4>
                                        <p className="text-slate-300 font-medium leading-relaxed">
                                            {activeModal.pedagogicalNote}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
