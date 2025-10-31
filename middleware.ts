import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is no longer needed since we are using client-side authentication
// The authentication check is handled by the useAuth hook in the dashboard page
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};