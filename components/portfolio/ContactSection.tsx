import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Instagram, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 cursor-pointer">
            <Mail className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300">Entre em contato</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Vamos criar um projeto<span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent"> Juntos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos discutir como podemos dar vida às suas ideias
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-gray-500 h-14 rounded-xl backdrop-blur-sm"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-gray-500 h-14 rounded-xl backdrop-blur-sm"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white placeholder:text-gray-500 min-h-[150px] rounded-xl backdrop-blur-sm resize-none"
                />
              </div>
              <Button 
                type="submit"
                className="group relative w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              </Button>
            </form>

            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Email</h4>
                    <p className="text-white font-medium">andrewluizporto@hotmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Localização</h4>
                    <p className="text-white font-medium">Florianópolis, SC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-gray-400 mb-4">Contato</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/andrewporto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </a>
                <a 
                  href="https://linkedin.com/in/andrewluizporto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </a>
                <a 
                  href="https://instagram.com/andrewluizporto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-gray-300" />
                </a>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm">
              <p className="text-gray-300 italic text-lg leading-relaxed">
                "Faça como um programador. Quando tudo está errado e confuso, apague tudo e recomece do zero."
              </p>
              <p className="text-gray-500 mt-2">— Orlando Cordeiro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}