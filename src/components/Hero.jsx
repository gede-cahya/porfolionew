import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/30 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl text-purple-400 font-medium mb-4">Hello, I'm Cahya</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                        I build digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
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
                            className="text-2xl md:text-3xl text-gray-300 absolute"
                        >
                            I am a {roles[currentRole]}
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-purple-600/25">
                            View Projects <ArrowRight size={20} />
                        </button>
                        <button className="border border-white/20 hover:border-purple-500 hover:text-purple-400 text-gray-300 px-8 py-3 rounded-full flex items-center gap-2 transition-all hover:bg-white/5">
                            Download CV <Download size={20} />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Placeholder for Profile Image */}
                    <div className="w-full aspect-square max-w-md mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-cyan-600 rounded-3xl transform rotate-6 opacity-30 group-hover:rotate-12 transition-all duration-500 blur-sm"></div>
                        <div className="absolute inset-0 bg-neutral-900 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden z-10">
                            <span className="text-gray-600">Profile Image</span>
                            {/* <img src="/path/to/profile.jpg" alt="Cahya" className="w-full h-full object-cover" /> */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
