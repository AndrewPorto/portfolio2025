"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '../ui/button';
export default function HeroSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
          }}
        />
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Profile Image with Glow */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            {/* Use local placeholder from /public (file.svg). If you add a custom avatar, place it in /public and update the src */}
            <Image
              src="/avatar.jpg"
              alt="Developer"
              width={128}
              height={128}
              className="w-full h-full object-cover object-[center_top]"
              priority
            />
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Projetos disponiveis</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Desenvolvedor
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
              Front-End
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            
Desenvolvedor full-stack criando experiências digitais excepcionais com tecnologias modernas.
Transformando ideias em realidade por meio de código limpo e design elegante.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            onClick={() => scrollToSection('projects')}
            className="group cursor-pointer relative px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            <span className="relative z-10">Veja meu trabalho</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          </Button>
          
          <a
            href="/CvAndrewPorto.pdf"
            download
            className="px-8 cursor-pointer py-3 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/20 text-white rounded-full text-lg font-semibold backdrop-blur-sm transition-all duration-300 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={() => scrollToSection('projects')}
          className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-sm">Mais projetos</span>
          <div className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-blue-500/20 rounded-lg rotate-12 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          
    </section>
  );
}