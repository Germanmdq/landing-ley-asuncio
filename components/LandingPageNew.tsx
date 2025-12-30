'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
    onSelect: (maestroId: string) => void;
}

interface Autor {
    nombre: string;
    iniciales: string;
    anos: string;
    frase: string;
    tag: string;
    link: string;
    id: string;
}

const autores: Autor[] = [
    {
        nombre: "Christian D. Larson",
        iniciales: "CL",
        anos: "1874-1962",
        frase: "Your Forces and How to Use Them",
        tag: "40+ libros",
        link: "/christian-larson",
        id: "larson"
    },
    {
        nombre: "Emmet Fox",
        iniciales: "EF",
        anos: "1886-1951",
        frase: "The Sermon on the Mount",
        tag: "12 libros",
        link: "/emmet-fox",
        id: "fox"
    },
    {
        nombre: "Ernest Holmes",
        iniciales: "EH",
        anos: "1887-1960",
        frase: "The Science of Mind",
        tag: "25+ libros",
        link: "/ernest-holmes",
        id: "holmes"
    },
    {
        nombre: "Eugene Del Mar",
        iniciales: "ED",
        anos: "Siglo XX",
        frase: "The Key to the Scriptures",
        tag: "3 libros",
        link: "/eugene-del-mar",
        id: "delmar"
    },
    {
        nombre: "Florence Scovel Shinn",
        iniciales: "FS",
        anos: "1871-1940",
        frase: "The Game of Life",
        tag: "4 libros",
        link: "/florence-scovel-shinn",
        id: "shinn"
    },
    {
        nombre: "Genevieve Behrend",
        iniciales: "GB",
        anos: "1881-1960",
        frase: "Your Invisible Power",
        tag: "2 libros",
        link: "/genevieve-behrend",
        id: "behrend"
    },
    {
        nombre: "Henry Harrison Brown",
        iniciales: "HB",
        anos: "1840-1918",
        frase: "Not Hypnotism But Suggestion",
        tag: "10+ libros",
        link: "/henry-harrison-brown",
        id: "brown"
    },
    {
        nombre: "Henry Thomas Hamblin",
        iniciales: "HH",
        anos: "1873-1958",
        frase: "Within You is the Power",
        tag: "15+ libros",
        link: "/henry-hamblin",
        id: "hamblin"
    },
    {
        nombre: "James Allen",
        iniciales: "JA",
        anos: "1864-1912",
        frase: "As a Man Thinketh",
        tag: "19 libros",
        link: "/james-allen",
        id: "allen"
    },
    {
        nombre: "Joseph Murphy",
        iniciales: "JM",
        anos: "1898-1981",
        frase: "The Power of Your Subconscious Mind",
        tag: "30+ libros",
        link: "/joseph-murphy",
        id: "murphy"
    },
    {
        nombre: "Margaret Ruth Broome",
        iniciales: "MB",
        anos: "Siglo XX",
        frase: "The Perfect Key",
        tag: "1 libro",
        link: "/margaret-broome",
        id: "broome"
    },
    {
        nombre: "Napoleon Hill",
        iniciales: "NH",
        anos: "1883-1970",
        frase: "Think and Grow Rich",
        tag: "15+ libros",
        link: "/napoleon-hill",
        id: "hill"
    },
    {
        nombre: "Orison Swett Marden",
        iniciales: "OM",
        anos: "1848-1924",
        frase: "Pushing to the Front",
        tag: "50+ libros",
        link: "/orison-marden",
        id: "marden"
    },
    {
        nombre: "Prentice Mulford",
        iniciales: "PM",
        anos: "1834-1891",
        frase: "Thoughts Are Things",
        tag: "6 volúmenes",
        link: "/prentice-mulford",
        id: "mulford"
    },
    {
        nombre: "Ralph Waldo Trine",
        iniciales: "RT",
        anos: "1866-1958",
        frase: "In Tune with the Infinite",
        tag: "12 libros",
        link: "/ralph-trine",
        id: "trine"
    },
    {
        nombre: "Robert Collier",
        iniciales: "RC",
        anos: "1885-1950",
        frase: "The Secret of the Ages",
        tag: "8 libros",
        link: "/robert-collier",
        id: "collier"
    },
    {
        nombre: "Thomas Troward",
        iniciales: "TT",
        anos: "1847-1916",
        frase: "The Edinburgh Lectures",
        tag: "6 libros",
        link: "/thomas-troward",
        id: "troward"
    },
    {
        nombre: "U.S. Andersen",
        iniciales: "UA",
        anos: "1917-1986",
        frase: "Three Magic Words",
        tag: "6 libros",
        link: "/us-andersen",
        id: "andersen"
    },
    {
        nombre: "Uriel Buchanan",
        iniciales: "UB",
        anos: "Siglo XX",
        frase: "Mind Mastery",
        tag: "7+ libros",
        link: "/uriel-buchanan",
        id: "buchanan"
    },
    {
        nombre: "Venice Bloodworth",
        iniciales: "VB",
        anos: "1908-1998",
        frase: "Key to Yourself",
        tag: "1 libro",
        link: "/venice-bloodworth",
        id: "bloodworth"
    },
    {
        nombre: "Wallace Wattles",
        iniciales: "WW",
        anos: "1860-1911",
        frase: "The Science of Getting Rich",
        tag: "3 libros",
        link: "/wallace-wattles",
        id: "wattles"
    },
    {
        nombre: "Walter Lanyon",
        iniciales: "WL",
        anos: "1887-1967",
        frase: "The Laughter of God",
        tag: "20+ libros",
        link: "/walter-lanyon",
        id: "lanyon"
    },
    {
        nombre: "William Walker Atkinson",
        iniciales: "WA",
        anos: "1862-1932",
        frase: "Thought Vibration",
        tag: "100+ libros",
        link: "/william-atkinson",
        id: "atkinson"
    }
];

export default function LandingPageNew({ onSelect }: LandingPageProps) {
    const [theme, setTheme] = useState('dark');
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 200], [0, 1]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleSelect = (autor: Autor) => {
        const id = autor.id || autor.link.substring(1);
        onSelect(id);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>

            {/* Sticky Navbar */}
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-black/70 border-white/10' : 'bg-white/70 border-black/5'}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-xl font-semibold tracking-tight">Pregúntale a Neville</span>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
                <motion.div
                    style={{ scale }}
                    className="text-center max-w-4xl mx-auto z-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-current to-current/50"
                    >
                        Controla Tu Mente,<br />Controla Tu Vida.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className={`text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        Accede a la sabiduría atemporal de 26 maestros espirituales, potenciada por inteligencia artificial.
                    </motion.p>
                </motion.div>

                {/* Background Gradient Blob */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none ${theme === 'dark' ? 'bg-purple-900' : 'bg-blue-200'}`} />
            </section>

            {/* Maestros Grid Section */}
            <section className={`py-32 px-4 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Maestros Espirituales</h2>
                        <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Explora el legado de los grandes pensadores.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {autores.map((autor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onClick={() => handleSelect(autor)}
                                className={`group relative p-8 rounded-3xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
                                        ? 'bg-[#111] hover:bg-[#161616] border border-white/5'
                                        : 'bg-[#f5f5f7] hover:bg-[#eeeeee]'
                                    }`}
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
                                            }`}>
                                            {autor.iniciales}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 tracking-tight">{autor.nombre}</h3>
                                        <p className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{autor.anos}</p>
                                        <p className={`text-base leading-relaxed italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            "{autor.frase}"
                                        </p>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-white/10 text-gray-300' : 'bg-black/5 text-gray-600'
                                            }`}>
                                            {autor.tag}
                                        </span>
                                        <div className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-white text-black group-hover:bg-gray-200' : 'bg-black text-white group-hover:bg-gray-800'
                                            }`}>
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 px-6 border-t ${theme === 'dark' ? 'border-white/10 bg-black' : 'border-black/5 bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        &copy; {new Date().getFullYear()} Pregúntale a Neville. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
