import { motion } from 'framer-motion';
import { Code, Palette, Monitor, Video } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Fullstack Developer",
            desc: "End-to-end web solutions with React, Node, and modern databases.",
            icon: <Code size={32} className="text-white" />,
            color: "bg-purple-600",
            delay: 0.1,
            cols: "md:col-span-2"
        },
        {
            title: "UX/UI Designer",
            desc: "Pixel-perfect designs focusing on user journey and aesthetics.",
            icon: <Palette size={32} className="text-white" />,
            color: "bg-cyan-600",
            delay: 0.2,
            cols: "md:col-span-1"
        },
        {
            title: "IT Support",
            desc: "Hardware & software troubleshooting.",
            icon: <Monitor size={32} className="text-white" />,
            color: "bg-green-600",
            delay: 0.3,
            cols: "md:col-span-1"
        },
        {
            title: "Content Creator",
            desc: "Tech tutorials and reviews on YouTube & TikTok.",
            icon: <Video size={32} className="text-white" />,
            color: "bg-red-600",
            delay: 0.4,
            cols: "md:col-span-2"
        }
    ];

    return (
        <section id="services" className="py-20 bg-neutral-950">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">What I Do</span>
                    <h2 className="text-4xl font-bold mt-2 text-white">My Expertise</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group overflow-hidden relative ${service.cols} bg-neutral-900`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`}></div>

                            <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-${service.color}/20`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
