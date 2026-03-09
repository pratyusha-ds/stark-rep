import Image from 'next/image';
import { SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import desktopBg from '@/assets/hero-desktop.jpg';
import mobileBg from '@/assets/hero-mobile.jpg';
import { ShieldCheck, Zap, History } from 'lucide-react';

/**
 * The Landing Page component.
 * * Features a hero section with responsive background images and
 * dynamic authentication redirection for logged-in users.
 */
export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/categories');
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black">
      <section className="relative h-[75vh] md:h-screen w-full flex flex-col items-center justify-center p-6 shrink-0">
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="block md:hidden h-full w-full">
            <Image
              src={mobileBg}
              alt="Stark Rep Training"
              fill
              className="object-cover object-left grayscale-60"
              priority
            />
          </div>
          <div className="hidden md:block h-full w-full">
            <Image
              src={desktopBg}
              alt="Stark Rep Training"
              fill
              className="object-cover object-left grayscale-60"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 z-10 bg-linear-to-r from-black/40 via-black/80 to-black" />

        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl -mt-24 md:-mt-32">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
            Sweat now.
            <br />
            <span className="text-red-600">Complain later.</span>
          </h1>

          <p className="text-zinc-300 text-base md:text-xl font-bold mb-10 max-w-md tracking-tight">
            Your Fitness Journey, Simplified.
          </p>

          <div className="flex flex-col items-center gap-4 w-full">
            <SignUpButton mode="modal" forceRedirectUrl="/categories">
              <button className="w-full sm:w-64 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-5 text-xl uppercase italic tracking-widest transition-all active:scale-95 rounded-none shadow-2xl shadow-red-900/20">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <Zap className="text-red-600 h-8 w-8" />
              <h3 className="text-xl font-black uppercase italic">Performance Entry</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Input sets, reps, and weight through a streamlined interface designed for active
                sessions.
              </p>
            </div>

            <div className="space-y-4">
              <History className="text-red-600 h-8 w-8" />
              <h3 className="text-xl font-black uppercase italic">Training Logs</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Access a chronological record of all previous workouts and completed strength
                cycles.
              </p>
            </div>

            <div className="space-y-4">
              <ShieldCheck className="text-red-600 h-8 w-8" />
              <h3 className="text-xl font-black uppercase italic">Secure Storage</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                All training data is stored securely. No external tracking or secondary data
                processing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
