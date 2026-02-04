import { motion } from 'framer-motion';
import { Code, Palette, Monitor, Video, Smartphone, Server } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Fullstack Development",
            desc: "Building scalable web applications using modern stacks like React, Node.js, and Cloud services.",
            icon: <Code size={32} className="text-white" />,
            color: "from-purple-600 to-indigo-600",
            shadow: "shadow-purple-500/20",
            delay: 0.1
        },
        {
            title: "UI/UX Design",
            desc: "Crafting intuitive and aesthetically pleasing user interfaces with a focus on user experience.",
            icon: <Palette size={32} className="text-white" />,
            color: "from-cyan-500 to-blue-500",
            shadow: "shadow-cyan-500/20",
            delay: 0.2
        },
        {
            title: "Mobile App Development",
            desc: "Creating responsive and performant mobile applications for iOS and Android platforms.",
            icon: <Smartphone size={32} className="text-white" />,
            color: "from-pink-500 to-rose-500",
            shadow: "shadow-pink-500/20",
            delay: 0.3
        },
        {
            title: "IT Support & DevOps",
            desc: "Ensuring system stability, troubleshooting hardware/software, and managing deployments.",
            icon: <Monitor size={32} className="text-white" />,
            color: "from-emerald-500 to-green-500",
            shadow: "shadow-emerald-500/20",
            delay: 0.4
        },
        {
            title: "Content Creation",
            desc: "Producing engaging tech content, tutorials, and reviews for social media platforms.",
            icon: <Video size={32} className="text-white" />,
            color: "from-red-500 to-orange-500",
            shadow: "shadow-red-500/20",
            delay: 0.5
        },
        {
            title: "Backend Architecture",
            desc: "Designing robust API systems and database schemas for high-performance applications.",
            icon: <Server size={32} className="text-white" />,
            color: "from-blue-600 to-cyan-600",
            shadow: "shadow-blue-500/20",
            delay: 0.6
        }
    ];

    return (
        <section id="services" className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-purple-400 font-medium tracking-widest uppercase text-xs border border-purple-500/20 px-4 py-1.5 rounded-full bg-purple-500/5">What I Offer</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Creating Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Value</span></h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-[2rem] border border-white/5 bg-[#111] hover:bg-[#151515] hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Card Background Glow */}
                            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-full blur-[60px] transition-opacity duration-500`}></div>

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg ${service.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-light">{service.desc}</p>

                            {/* Bottom border gradient line */}
                            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} w-0 group-hover:w-full transition-all duration-500`}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
