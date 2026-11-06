import React from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface ReferenceImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceImageModal: React.FC<ReferenceImageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Imagem de Referência Original (Ciclo de Quinta Físico)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Image */}
        <div className="p-4 overflow-y-auto flex flex-col items-center justify-center bg-slate-950/50">
          <img
            src="/assets/aistudio/B37BB218-51A0-48BE-8BAC-734C4FE83ACB_5e4efaf7.png"
            alt="Ciclo de Quinta - Ferramenta de Música Original"
            className="rounded-xl max-h-[70vh] object-contain shadow-2xl border border-slate-800"
          />
          <p className="text-xs text-slate-400 text-center mt-3 max-w-xl">
            Este aplicativo digitaliza e aprimora a ferramenta de madeira da foto, adicionando som de alta fidelidade,
            gerador de progressões com transposição automática, sequenciador rítmico e visualizadores de teclado e violão.
          </p>
        </div>
      </div>
    </div>
  );
};
