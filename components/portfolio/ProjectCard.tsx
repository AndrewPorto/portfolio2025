import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Project {
  id: string;
  nomeDoProjeto: string;
  descricao: string;
  linkDoSite?: string;
  linkDoGithub?: string;
  tags?: string[];
  foto?: string;
  colorClasses?: ColorType;
  sizeClasses?: SizeType;
  createdAt: string;
  // Legacy support
  title?: string;
  description?: string;
  image?: string;
  urlImagem?: string;
}

type ColorType = 'blue' | 'purple' | 'orange';
type SizeType = 'small' | 'medium' | 'large';

const colorClasses: Record<ColorType, string> = {
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-400/50',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400/50',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 hover:border-orange-400/50'
};

const sizeClasses: Record<SizeType, string> = {
  small: 'md:col-span-1 md:row-span-1',
  medium: 'md:col-span-1 md:row-span-1',
  large: 'md:col-span-2 md:row-span-1'
};

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

// normalização / fallbacks
const title = project.nomeDoProjeto ?? project.title ?? "Untitled Project";
const description = project.descricao ?? project.description ?? "";
const imageSrc = project.foto ?? project.image ?? project.urlImagem ?? "";
const tags = Array.isArray(project.tags) ? project.tags : [];

// usar valores vindos do banco
const color = project.colorClasses && colorClasses[project.colorClasses]
  ? project.colorClasses
  : "blue";

const size = project.sizeClasses && sizeClasses[project.sizeClasses]
  ? project.sizeClasses
  : "medium";

const colorClass = colorClasses[color];
const sizeClass = sizeClasses[size];

  // Placeholder de fallback
  const placeholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%230a0a0f"/><text x="50%" y="50%" font-size="20" fill="%23ffffff" text-anchor="middle" dy=".3em">No image</text></svg>';

  return (
    <div
      className={`group relative rounded-2xl border bg-gradient-to-br ${colorClass} backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] overflow-hidden ${sizeClass} animate-fadeInUp`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Imagem do Projeto */}
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img
          src={imageSrc || placeholder}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== placeholder) target.src = placeholder;
          }}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`}
        />

        {/* Botões Hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {project.linkDoSite && (
            <a
              href={project.linkDoSite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
          {project.linkDoGithub && (
            <a
              href={project.linkDoGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs"
              >
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-gray-500">Sem tags</span>
          )}
        </div>
      </div>

      {/* Efeito Glow */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 rounded-2xl blur-xl ${
            color === 'blue'
              ? 'from-blue-500/20 to-purple-500/20'
              : color === 'purple'
              ? 'from-purple-500/20 to-orange-500/20'
              : 'from-orange-500/20 to-blue-500/20'
          }`}
          style={{ background: undefined }}
        />
      </div>
    </div>
  );
}
