import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
export const runtime = 'nodejs';

interface Project {
  id: string;
  nomeDoProjeto: string;
  descricao: string;
  linkDoSite?: string;
  linkDoGithub?: string;
  tags?: string[];
  foto?: string;
  colorClasses?: string;
  sizeClasses?: string;
  createdAt: string;
}

// Referência da coleção
const projectsRef = collection(db, 'projects');

export async function GET() {
  try {
    const snapshot = await getDocs(projectsRef);
    const projects = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    
    return Response.json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return Response.json(
      { error: "Erro ao buscar projetos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nomeDoProjeto || !body.descricao) {
      return Response.json(
        { error: "Nome do projeto e descrição são obrigatórios" },
        { status: 400 }
      );
    }

    const newProject = {
      nomeDoProjeto: body.nomeDoProjeto,
      descricao: body.descricao,
      linkDoSite: body.linkDoSite || "",
      linkDoGithub: body.linkDoGithub || "",
      tags: body.tags || [],
      foto: body.foto || "",
      colorClasses: body.colorClasses || "blue",
      sizeClasses: body.sizeClasses || "medium",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(projectsRef, newProject);
    return Response.json({ 
      id: docRef.id,
      ...newProject
    });
  } catch (error: unknown) {
    console.error("Erro ao adicionar projeto:", error);
    return Response.json(
      { error: "Erro ao adicionar projeto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
    
    return Response.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return Response.json(
      { error: "Erro ao deletar projeto" },
      { status: 500 }
    );
  }
}
