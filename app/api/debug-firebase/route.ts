import { NextResponse } from "next/server";
import { getApp } from "firebase/app";
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Tenta acessar o app inicializado
    const app = getApp();
    const options = app.options;

    return NextResponse.json({
      firebaseConfig: {
        apiKey: options.apiKey || null,
        authDomain: options.authDomain || null,
        projectId: options.projectId || null,
        storageBucket: options.storageBucket || null,
        appId: options.appId || null,
      },
      env: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "OK" : "FALTANDO",
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "OK" : "FALTANDO",
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "OK" : "FALTANDO",
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? "OK" : "FALTANDO",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "OK" : "FALTANDO",
      },
    });
  } catch (error) {
    // Corrige o erro de tipo no TypeScript
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
