'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, ArrowRight } from 'lucide-react';

interface SaveAnywayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDiscard: () => void;
}

export default function SaveAnywayModal({
  isOpen,
  onClose,
  onConfirm,
  onDiscard,
}: SaveAnywayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 rounded-[2rem] max-w-sm sm:max-w-md border shadow-2xl overflow-hidden">
        <DialogHeader className="flex flex-col items-center gap-4 p-2">
          <div className="p-4 bg-red-500/10 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-white text-center">
            Incomplete Sets
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center font-medium leading-relaxed px-4">
            You have sets with missing data. Would you like to save the partial progress or discard
            them?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4 p-2">
          <Button
            onClick={onConfirm}
            className="group w-full py-7 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black uppercase italic tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Save as 0 & Continue{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            onClick={onDiscard}
            className="w-full py-7 rounded-2xl border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-red-500 hover:bg-zinc-900 font-bold uppercase tracking-widest text-xs transition-colors"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Discard Incomplete & Exit
          </Button>

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full py-4 text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            Keep Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
