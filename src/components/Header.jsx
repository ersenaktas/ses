import { motion } from 'framer-motion';
import { BookOpen, Sparkles, GraduationCap } from 'lucide-react';

export default function Header() {
    return (
        <header className="relative overflow-hidden bg-background pt-24 pb-16 sm:pt-32 sm:pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center space-x-2 mb-6"
                    >
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Öğretmen Adayları (Eğitim Fakültesi / Lisans)
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6"
                    >
                        Edebiyat Eğitiminde Pedagojik Bir Araç Olarak
                        <span className="text-primary block mt-2"> 'Şiir Dili'</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-muted-foreground"
                    >
                        Şiir dilinin Türkçenin tarihsel gelişimindeki rolü ve bu bilincin gelecek nesillere aktarımı. Dil, kültür ve kimlik inşası üzerine derinlemesine bir inceleme.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <a
                            href="#stage-1"
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            Eğitime Başla
                        </a>
                        <a href="#stage-2" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Metin İncelemeleri <span aria-hidden="true">→</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
