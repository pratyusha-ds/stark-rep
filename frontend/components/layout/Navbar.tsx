'use client';

import { UserButton, SignInButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

/**
 * Main navigation bar component.
 * * Renders a responsive, sticky header featuring the StarkRep branding and authentication
 * controls via Clerk.
 * * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-black italic uppercase transition-all duration-500 tracking-tighter hover:tracking-normal"
        >
          <div className="flex items-center">
            <span className="bg-linear-to-r from-white via-white to-zinc-300 bg-clip-text text-transparent">
              Stark
            </span>

            <span className="text-red-600">Rep</span>

            <div className="ml-2 flex flex-col gap-1 transition-all duration-300 group-hover:ml-4">
              <div className="h-0.75 w-4 bg-white rounded-full transition-all duration-300 group-hover:w-6" />
              <div className="h-0.75 w-6 bg-white rounded-full transition-all duration-300 group-hover:w-4" />
              <div className="h-0.75 w-3 bg-red-600 rounded-full transition-all duration-300 group-hover:w-5 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          {isLoaded && isSignedIn && (
            <>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/categories"
                  className="text-xs font-bold uppercase tracking-widest hover:text-[#ef4444] transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/history"
                  className="text-xs font-bold uppercase tracking-widest hover:text-[#ef4444] transition-colors"
                >
                  History
                </Link>
              </nav>

              <div className="pl-4 border-l border-white/10">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-9 h-9 border border-[#ef4444]/50',
                    },
                  }}
                />
              </div>
            </>
          )}

          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-black uppercase px-6 py-2.5 rounded-sm transition-all tracking-widest active:scale-95">
                Login
              </button>
            </SignInButton>
          )}

          {!isLoaded && <div className="h-9 w-9 rounded-full bg-white/5 animate-pulse" />}
        </div>
      </div>
    </nav>
  );
}
