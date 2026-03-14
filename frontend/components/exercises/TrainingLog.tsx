'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { History, Calendar, Loader2, ArrowRight } from 'lucide-react';
import { LogEntry, WorkoutSessionDTO, WorkoutSetDTO } from '@/types';
import { fetchAllSessions } from '@/app/exercises/[exerciseId]/actions';

interface ExtendedLogEntry extends LogEntry {
  rawDate: string;
}

export default function TrainingLog({
  exerciseId,
  onNavigate,
}: {
  exerciseId: string;
  onNavigate?: (dest: string) => void;
}) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<ExtendedLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getToken();
        const sessions: WorkoutSessionDTO[] = await fetchAllSessions(token);

        const filteredLog: ExtendedLogEntry[] = sessions
          .map((session: WorkoutSessionDTO) => {
            const exerciseSets = session.sets.filter(
              (set: WorkoutSetDTO) => set.exerciseId === parseInt(exerciseId)
            );

            return {
              rawDate: session.date.split('T')[0],
              date: new Date(session.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }),
              sets: exerciseSets.map((set: WorkoutSetDTO) => ({
                weight: set.weight,
                reps: set.reps,
              })),
              totalVolume: exerciseSets.reduce(
                (acc: number, set: WorkoutSetDTO) => acc + set.weight * set.reps,
                0
              ),
            };
          })
          .filter((entry) => entry.sets.length > 0);

        setHistory(filteredLog);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };
    if (exerciseId) fetchHistory();
  }, [exerciseId, getToken]);

  const handleLogClick = (date: string) => {
    const destination = `/exercises/${exerciseId}?date=${date}`;

    if (onNavigate) {
      onNavigate(destination);
    } else {
      router.push(destination);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10 mt-12">
        <Loader2 className="animate-spin text-red-500 h-8 w-8" />
      </div>
    );

  return (
    <div className="mt-12 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <History size={24} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">
          Full Training Log
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {history.length === 0 ? (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-800 rounded-[2rem]">
            <p className="text-zinc-500 italic">No previous history found for this exercise.</p>
          </div>
        ) : (
          history.map((session, idx) => (
            <button
              key={idx}
              onClick={() => handleLogClick(session.rawDate)}
              className="group text-left bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-6 hover:border-red-500/50 hover:bg-zinc-900/60 transition-all duration-300 active:scale-[0.98] outline-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {session.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">
                    {session.sets.length} {session.sets.length === 1 ? 'SET' : 'SETS'}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-black bg-zinc-800 text-red-500 px-3 py-1 rounded-full italic border border-red-500/20">
                    {session.totalVolume.toLocaleString()}kg VOL
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-zinc-700 group-hover:text-red-500 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {session.sets.slice(0, 3).map((set, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-zinc-800/50"
                  >
                    <span className="text-[10px] font-black text-zinc-600 italic">
                      Set {sIdx + 1}
                    </span>
                    <span className="font-bold text-zinc-200">
                      {set.weight}kg × {set.reps}
                    </span>
                  </div>
                ))}
                {session.sets.length > 3 && (
                  <p className="text-[10px] text-center text-zinc-500 font-bold mt-2 uppercase">
                    + {session.sets.length - 3} more sets
                  </p>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
