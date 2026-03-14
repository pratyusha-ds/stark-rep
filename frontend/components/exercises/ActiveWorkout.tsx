'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ActiveWorkoutProps } from '@/types';
import { cn } from '@/lib/utils';

interface ExtendedProps extends ActiveWorkoutProps {
  shakingSetId?: number | null;
}

export default function ActiveWorkout({
  sets,
  onAddSet,
  onUpdateSet,
  onSaveSet,
  onDeleteSet,
  shakingSetId,
}: ExtendedProps) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-800 rounded-[2rem] p-6 md:p-8 backdrop-blur-sm">
      <div className="grid grid-cols-4 mb-6 px-4 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
        <span>Set</span>
        <span>Weight (kg)</span>
        <span>Reps</span>
        <span className="text-right px-2">Action</span>
      </div>
      <div className="space-y-4">
        {sets.map((set, index) => {
          const isError = shakingSetId === set.id;
          const isWeightEmpty = !set.weight.toString().trim();
          const isRepsEmpty = !set.reps.toString().trim();

          return (
            <div
              key={set.id}
              className={cn(
                'grid grid-cols-4 items-center p-4 rounded-2xl border transition-all duration-300 bg-zinc-900 shadow-xl',
                isError
                  ? 'border-red-500 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'border-zinc-800 hover:border-zinc-700'
              )}
            >
              <span
                className={cn(
                  'font-black text-2xl ml-2 italic transition-colors',
                  isError ? 'text-red-500' : 'text-zinc-700'
                )}
              >
                {index + 1}
              </span>

              <Input
                type="number"
                inputMode="decimal"
                value={set.weight}
                placeholder="0"
                onChange={(e) => {
                  onUpdateSet(set.id, 'weight', e.target.value);
                  onSaveSet(set.id);
                }}
                onFocus={(e) => e.target.select()}
                className={cn(
                  'w-20 md:w-32 bg-zinc-800/40 border-none font-black text-xl transition-colors',
                  isError && isWeightEmpty
                    ? 'text-red-500 placeholder:text-red-800'
                    : 'text-red-500'
                )}
              />

              <Input
                type="number"
                inputMode="numeric"
                value={set.reps}
                placeholder="0"
                onChange={(e) => {
                  onUpdateSet(set.id, 'reps', e.target.value);
                  onSaveSet(set.id);
                }}
                onFocus={(e) => e.target.select()}
                className={cn(
                  'w-20 md:w-32 bg-zinc-800/40 border-none font-black text-xl transition-colors',
                  isError && isRepsEmpty ? 'text-red-500 placeholder:text-red-800' : 'text-red-500'
                )}
              />

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Delete set"
                  onClick={() => onDeleteSet(set.id)}
                  className="h-12 w-12 rounded-xl text-zinc-600 hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        onClick={onAddSet}
        variant="ghost"
        className="w-full mt-6 text-zinc-500 hover:text-red-500 py-10 border-2 border-dashed border-zinc-800 rounded-[1.5rem] group"
      >
        <Plus className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="font-bold tracking-widest uppercase">Add New Set</span>
      </Button>
    </div>
  );
}
