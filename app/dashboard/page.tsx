'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-simple";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  nomeDoProjeto: string;
  descricao: string;
  linkDoSite?: string;
  linkDoGithub?: string;
  tags?: string[];
  foto?: string;
  sizeClasses?: string;
  colorClasses?: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    nomeDoProjeto: "",
    descricao: "",
    linkDoSite: "",
    linkDoGithub: "",
    tags: "",
    foto: "",
    sizeClasses: "",
    colorClasses: "",
  });

  const colorOptions = [
    { value: "blue", label: "Azul", hex: "#3b82f6" },
    { value: "purple", label: "Roxo", hex: "#a855f7" },
    { value: "orange", label: "Laranja", hex: "#f97316" },
  ];

  const sizeOptions = [
    { value: "small", label: "Pequeno" },
    { value: "medium", label: "Médio" },
    { value: "large", label: "Grande" },
  ];

  // Verificar autenticação
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('Usuário não autenticado, redirecionando para login...');
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setMessage({ type: "error", text: "Erro ao fazer logout." });
    }
  };

  async function fetchProjects() {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar projetos");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Resposta inesperada da API");

      const formatted: Project[] = data.map((p: any) => ({
        id: String(p.id ?? p._id ?? ""),
        nomeDoProjeto: p.nomeDoProjeto ?? "",
        descricao: p.descricao ?? "",
        linkDoSite: p.linkDoSite ?? "",
        linkDoGithub: p.linkDoGithub ?? "",
        tags: p.tags ?? [],
        foto: p.foto ?? "",
        sizeClasses: p.sizeClasses ?? "",
        colorClasses: p.colorClasses ?? "",
      }));

      setProjects(formatted);
      setMessage(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erro ao carregar projetos." });
    } finally {
      setLoading(false);
    }
  }

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.nomeDoProjeto.trim() || !form.descricao.trim()) {
      setMessage({ type: "error", text: "Preencha nome e descrição." });
      return;
    }

    try {
      setSubmitting(true);
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const bodyData = { ...form, tags: tagsArray };
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setMessage({ type: "error", text: data.error || "Erro ao adicionar projeto." });
        return;
      }

      setMessage({ type: "success", text: "Projeto adicionado com sucesso!" });
      setForm({
        nomeDoProjeto: "",
        descricao: "",
        linkDoSite: "",
        linkDoGithub: "",
        tags: "",
        foto: "",
        sizeClasses: "",
        colorClasses: "",
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erro ao adicionar projeto." });
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Erro ao deletar projeto");

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: "success", text: "Projeto deletado!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erro ao deletar projeto." });
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-[#1a1b1e] border-b border-gray-800 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">📊 Dashboard - Portfólio</h1>
              <span className="text-sm text-gray-400">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success" ? "bg-green-700" : "bg-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add Project Form */}
        <form onSubmit={addProject} className="bg-gray-900 p-6 rounded-2xl shadow mb-10 max-w-xl space-y-3">
          <h2 className="text-xl font-medium mb-4">Adicionar Projeto</h2>

          <input
            type="text"
            placeholder="Nome do Projeto"
            value={form.nomeDoProjeto}
            onChange={(e) => setForm({ ...form, nomeDoProjeto: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
            disabled={submitting}
          />

          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
            disabled={submitting}
          />

          <input
            type="url"
            placeholder="Link do Site"
            value={form.linkDoSite}
            onChange={(e) => setForm({ ...form, linkDoSite: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            disabled={submitting}
          />

          <input
            type="url"
            placeholder="Link do GitHub"
            value={form.linkDoGithub}
            onChange={(e) => setForm({ ...form, linkDoGithub: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            disabled={submitting}
          />

          <input
            type="text"
            placeholder="Tags (separe por vírgula)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            disabled={submitting}
          />

          <input
            type="url"
            placeholder="URL da imagem do projeto"
            value={form.foto}
            onChange={(e) => setForm({ ...form, foto: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            disabled={submitting}
          />

          {/* Seletor de tamanho */}
          <select
            value={form.sizeClasses}
            onChange={(e) => setForm({ ...form, sizeClasses: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            disabled={submitting}
          >
            <option value="">Selecione o tamanho</option>
            {sizeOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Seletor de cor com preview */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1">Cor</label>
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full border border-gray-600"
                style={{
                  backgroundColor:
                    colorOptions.find((c) => c.value === form.colorClasses)?.hex || "#1f2937",
                }}
              ></div>

              <select
                value={form.colorClasses}
                onChange={(e) => setForm({ ...form, colorClasses: e.target.value })}
                className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
                disabled={submitting}
              >
                <option value="">Selecione a cor</option>
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full font-medium"
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Adicionar"}
          </button>
        </form>

        {/* Projects List */}
        <div>
          <h2 className="text-xl font-medium mb-4">Projetos Cadastrados</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : projects.length === 0 ? (
            <p>Nenhum projeto cadastrado.</p>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-900 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{project.nomeDoProjeto}</h3>
                    <p className="text-gray-400 text-sm mb-2">{project.descricao}</p>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3 text-sm">
                      {project.linkDoSite && (
                        <a
                          href={project.linkDoSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          🔗 Site
                        </a>
                      )}
                      {project.linkDoGithub && (
                        <a
                          href={project.linkDoGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {project.foto && (
                    <img
                      src={project.foto}
                      alt={project.nomeDoProjeto}
                      className="w-full md:w-40 h-40 object-cover rounded-lg border border-gray-700"
                    />
                  )}

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-400 hover:text-red-300 self-start md:self-center"
                    disabled={submitting}
                  >
                    Deletar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
