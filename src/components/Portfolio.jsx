import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Loader2, Star, GitFork } from 'lucide-react';
import { useState, useEffect } from 'react';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/gede-cahya/repos?sort=updated&per_page=6');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();

                const formattedProjects = data
                    .filter(repo => !repo.fork)
                    .slice(0, 5) // Take top 5 for Bento (1 large, 4 small/medium)
                    .map((repo, index) => {
                        // Assign Bento Spans based on index
                        let spanClass = "col-span-1";
                        if (index === 0) spanClass = "md:col-span-2 md:row-span-2"; // Featured project (Big)
                        else if (index === 3) spanClass = "md:col-span-2"; // Wide project

                        return {
                            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                            description: repo.description,
                            category: repo.language || "Development",
                            tags: repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 3) : [repo.language || "Code"],
                            github: repo.html_url,
                            demo: repo.homepage || repo.html_url,
                            stars: repo.stargazers_count,
                            span: spanClass,
                            index: index
                        };
                    });

                setProjects(formattedProjects);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects from GitHub.");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="portfolio" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-40 right-[-10%] w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 left-[-10%] w-96 h-96 bg-cyan-900/10 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
                >
                    <div className="max-w-2xl">
                        <span className="text-purple-400 font-medium tracking-widest uppercase text-xs border border-purple-500/20 px-3 py-1 rounded-full bg-purple-500/5">My Work</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white leading-tight">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span></h2>
                        <p className="mt-4 text-gray-400 font-light text-lg">A selection of my recent code experiments and production builds.</p>
                    </div>
                    <a href="https://github.com/gede-cahya" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 text-white transition-all hover:bg-white/5 font-medium group">
                        View GitHub <Github size={18} className="group-hover:rotate-12 transition-transform" />
                    </a>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20 min-h-[400px]">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center text-gray-500 py-10 border border-white/5 rounded-3xl bg-white/5">
                        <p>{error}</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(250px,auto)] gap-6"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.01 }}
                                className={`group rounded-3xl p-8 relative overflow-hidden border border-white/10 bg-[#111] hover:border-white/20 transition-all duration-300 flex flex-col justify-between ${project.span}`}
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-colors duration-500"></div>

                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-white/5 p-3 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                                            {index === 0 ? <Star size={24} className="text-yellow-400 fill-yellow-400/20" /> : <GitFork size={24} className="text-cyan-400" />}
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-colors border border-white/5" title="View Code">
                                                <Github size={18} />
                                            </a>
                                            {project.demo && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors border border-white" title="Live Demo">
                                                    <ArrowUpRight size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all capitalize">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                        {project.description || "No description provided for this repository."}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-gray-300 group-hover:border-white/10 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <a href="https://github.com/gede-cahya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white border-b border-purple-500 pb-1">
                        View All Projects <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
