import React from 'react';
import { Code2, Palette, Database, Zap, Cpu, Layers } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type ColorType = 'blue' | 'purple' | 'orange';

interface Skill {
  category: string;
  icon: LucideIcon;
  color: ColorType;
  techs: string[];
}

const skills: Skill[] = [
  {
    category: "Frontend",
    icon: Palette,
    color: "blue",
    techs: ["HTML", "CSS", "Next.js", "JavaScript", "NextJs", "React"]
  },
  {
    category: "Backend",
    icon: Database,
    color: "purple",
    techs: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  {
    category: "DevOps",
    icon: Cpu,
    color: "orange",
    techs: ["Docker", "AWS", "CI/CD", "Kubernetes", "Git"]
  },
  {
    category: "Tools",
    icon: Zap,
    color: "blue",
    techs: ["VS Code", "Figma", "Postman", "Elementor", "WordPress"]
  }
];

interface ColorClasses {
  border: string;
  bg: string;
  icon: string;
  glow: string;
}

const colorClasses: Record<ColorType, ColorClasses> = {
  blue: {
    border: 'border-blue-500/30 hover:border-blue-400/50',
    bg: 'bg-blue-500/10',
    icon: 'text-blue-400',
    glow: 'bg-blue-500/20'
  },
  purple: {
    border: 'border-purple-500/30 hover:border-purple-400/50',
    bg: 'bg-purple-500/10',
    icon: 'text-purple-400',
    glow: 'bg-purple-500/20'
  },
  orange: {
    border: 'border-orange-500/30 hover:border-orange-400/50',
    bg: 'bg-orange-500/10',
    icon: 'text-orange-400',
    glow: 'bg-orange-500/20'
  }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Habilidades</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Habilidades & <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Tecnologias</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Um conjunto diversificado de ferramentas para criar aplicações modernas e escaláveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const colors = colorClasses[skill.color];
            
            return (
              <div
                key={skill.category}
                className={`group relative rounded-2xl border ${colors.border} bg-white/5 backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105 animate-fadeInUp`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                {/* Category */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {skill.category}
                </h3>

                {/* Technologies */}
                <div className="space-y-2">
                  {skill.techs.map((tech, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.glow}`} />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl ${colors.glow} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}