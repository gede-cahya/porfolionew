import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MousePointer2 } from 'lucide-react';
import Hero3D from './Hero3D';

const Hero = () => {
    const roles = [
        "Fullstack Developer",
        "UX/UI Designer",
        "IT Support",
        "Content Creator"
    ];

    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#0a0a0a]">
            {/* Background Gradient Orbs - Enhanced Animation */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-6">
                        <span className="text-purple-400 text-sm font-medium tracking-wide">Hello, I'm Cahya</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white tracking-tight">
                        I build <span className="italic font-light text-gray-400">digital</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x">
                            experiences
                        </span>
                    </h1>

                    <div className="h-12 mb-8 overflow-hidden relative">
                        <motion.div
                            key={currentRole}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl md:text-3xl text-gray-300 absolute font-light"
                        >
                            I am a <span className="font-medium text-white">{roles[currentRole]}</span>
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-8 py-4 rounded-full flex items-center gap-2 font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
                        >
                            View Projects <ArrowRight size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="border border-white/20 text-white px-8 py-4 rounded-full flex items-center gap-2 font-medium backdrop-blur-sm transition-all"
                        >
                            Download CV <Download size={20} />
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center lg:justify-end h-full"
                >
                    {/* 3D Interactive Element */}
                    <div className="relative w-full max-w-lg aspect-square">
                        <Hero3D />

                        {/* Decor elements */}
                        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                        <MousePointer2 className="absolute bottom-10 right-10 text-white/20 w-8 h-8 animate-bounce" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
