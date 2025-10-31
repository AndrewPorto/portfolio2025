'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Code2, Sparkles } from 'lucide-react';
import HeroSection from '../components/portfolio/HeroSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectCard from '../components/portfolio/ProjectCard';
import ContactSection from '@/components/portfolio/ContactSection';

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Erro ao buscar projetos");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Andrew Porto
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Projetos
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Skills
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Contato
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/andrewporto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/andrewluizporto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection scrollToSection={scrollToSection} />

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Meu trabalho!</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Projetos <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">Selecionados</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Criar experiências digitais que ultrapassem limites e gerem resultados.
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <p className="text-center text-gray-400">Carregando projetos...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum projeto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      <SkillsSection />
      <ContactSection />
    </div>
  );
}