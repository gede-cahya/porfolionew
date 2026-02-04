import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/gede-cahya/repos?sort=updated&per_page=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();

                // Filter out forks if preferred, or just take the top ones. 
                // For now, taking top 4 non-forked useful repos, or just top 4 updated.
                // Let's take the top 4 to match the grid layout (or 6 if we want more).
                // The previous static list had 4 items.

                const formattedProjects = data
                    .filter(repo => !repo.fork) // Optional: typically portfolios show original work
                    .slice(0, 4)
                    .map((repo, index) => {
                        // Generate a deterministic gradient based on index or name length to keep it consistent
                        const gradients = [
                            "bg-gradient-to-br from-indigo-600 to-blue-500",
                            "bg-gradient-to-br from-pink-600 to-rose-500",
                            "bg-gradient-to-br from-red-600 to-orange-500",
                            "bg-gradient-to-br from-emerald-600 to-teal-500",
                            "bg-gradient-to-br from-purple-600 to-indigo-500",
                            "bg-gradient-to-br from-orange-600 to-yellow-500"
                        ];

                        return {
                            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Format title
                            category: repo.language || "Development",
                            image: gradients[index % gradients.length],
                            tags: repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 3) : [repo.language || "Code"],
                            github: repo.html_url,
                            demo: repo.homepage || repo.html_url // Fallback to repo if no homepage
                        };
                    });

                setProjects(formattedProjects);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                // Fallback to static data if API fails? 
                // For now, let's just show the error or empty state, or handle gracefully.
                // Reverting to empty array and showing error state.
                setError("Failed to load projects from GitHub.");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="portfolio" className="py-20 bg-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-16"
                >
                    <div>
                        <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">Portfolio</span>
                        <h2 className="text-4xl font-bold mt-2 text-white">Recent Work</h2>
                    </div>
                    <a href="https://github.com/gede-cahya" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        View All Projects <ArrowUpRight size={18} />
                    </a>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center text-gray-400 py-10">
                        <p>{error}</p>
                        <p className="text-sm mt-2">Please check back later or visit my GitHub directly.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden"
                            >
                                <div className={`h-64 w-full ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"><Github size={20} /></a>
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"><ExternalLink size={20} /></a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-sm font-medium text-purple-400 mb-2 block">{project.category}</span>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors capitalize">{project.title}</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
