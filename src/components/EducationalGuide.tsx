import React from 'react';
import { KeyDefinition } from '../types/music';
import { CIRCLE_KEYS } from '../utils/musicTheory';
import { BookOpen, Lightbulb, Compass, ArrowRight, ArrowLeft, CheckCircle2, Music } from 'lucide-react';

interface EducationalGuideProps {
  onSelectKey: (key: KeyDefinition) => void;
  activeKey: KeyDefinition;
  onOpenReferenceImageModal: () => void;
}

export const EducationalGuide: React.FC<EducationalGuideProps> = ({
  onSelectKey,
  activeKey,
  onOpenReferenceImageModal,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Banner comparing with reference */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-indigo-700/40 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Guia Teórico: Entendendo o Ciclo de Quintas</h3>
            <p className="text-xs text-slate-300">
              Conceitos fundamentais de harmonia funcional e regras de composição baseados na ferramenta da imagem.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenReferenceImageModal}
          className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <span>Ver Imagem Original</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Entendendo o Ciclo Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-bold text-slate-100">Entendendo o Ciclo</h4>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Tonalidades maiores</strong> são dispostas em ordem de <strong>quintas</strong> (no sentido
                  horário: cada passo adiciona 1 sustenido ou remove 1 bemol).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Tonalidades menores (relativas)</strong> ficam no <strong>círculo interno</strong> e
                  compartilham exatamente as mesmas notas da escala maior correspondente.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  Cada tom tem uma relativa menor localizada no <strong>6º grau (vi)</strong> da escala (ex.: C maior →
                  Am).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  Tons vizinhos no círculo têm <strong>muitas notas em comum</strong>, sendo ideais para modulações
                  suaves e arranjos elegantes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>
                  É a ferramenta mais poderosa para <strong>compor, rearmonizar e improvisar</strong> sem precisar
                  memorizar fórmulas difíceis.
                </span>
              </li>
            </ul>
          </div>

          {/* Legenda Box */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Legenda Oficial</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-750">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 shrink-0" />
                <span className="text-slate-200">Tons Maiores (Círculo Externo)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-750">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shrink-0" />
                <span className="text-slate-200">Tons Menores (Círculo Interno)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-750">
                <span className="text-amber-400 font-bold font-mono">↷</span>
                <span className="text-slate-200">Sentido Quintas (+5ª Horário)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-750">
                <span className="text-blue-400 font-bold font-mono">↶</span>
                <span className="text-slate-200">Sentido Quartas (+4ª Anti-horário)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dica & O Campo Harmônico no Ciclo */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Dica do Mestre Box */}
          <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-black text-amber-300">Dica Prática</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Para usar o ciclo de quintas de forma eficiente, memorize a ordem e observe as tonalidades relativas. Isso
              facilita a construção instantânea de acordes, escalas e progressões harmônicas no violão, teclado ou voz!
            </p>
          </div>

          {/* O Segredo do Campo Harmônico na Roda */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Music className="w-4 h-4 text-emerald-400" />
              <span>O Segredo da Fatia de 3 Casas</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              Em qualquer tom maior no Ciclo de Quintas, os 6 acordes principais formam sempre um bloco de 3 casas
              adjacentes:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/60">
                <span className="text-[10px] text-blue-400 font-bold block">À Esquerda (-1)</span>
                <strong className="text-white text-sm block">IV (Maior)</strong>
                <span className="text-slate-400 text-[11px] block mt-0.5">ii (Menor)</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/60 ring-1 ring-emerald-400">
                <span className="text-[10px] text-emerald-400 font-bold block">Centro (Tom)</span>
                <strong className="text-emerald-300 text-sm block">I (Tônica)</strong>
                <span className="text-slate-300 text-[11px] block mt-0.5">vi (Relativa)</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/60">
                <span className="text-[10px] text-amber-400 font-bold block">À Direita (+1)</span>
                <strong className="text-white text-sm block">V (Dominante)</strong>
                <span className="text-slate-400 text-[11px] block mt-0.5">iii (Menor)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              E o acorde diminuto (vii°) fica na casa seguinte! Basta girar o bloco para tocar em qualquer tom.
            </p>
          </div>
        </div>
      </div>

      {/* Ordem das Tonalidades Interativas (Matching the Bottom Ribbon in the Photo) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Ordem das Tonalidades Maiores */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            Ordem das Tonalidades Maiores (Quintas no Sentido Horário)
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CIRCLE_KEYS.map((k, idx) => {
              const isSelected = activeKey.index === k.index;
              return (
                <React.Fragment key={`major-order-${k.index}`}>
                  <button
                    onClick={() => onSelectKey(k)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow-md scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {k.majorRoot}
                  </button>
                  {idx < CIRCLE_KEYS.length - 1 && <span className="text-slate-600 font-bold text-xs">→</span>}
                </React.Fragment>
              );
            })}
            <span className="text-slate-500 font-bold text-xs ml-1">→ Volta ao início:</span>
            <button
              onClick={() => onSelectKey(CIRCLE_KEYS[0])}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700"
            >
              C
            </button>
          </div>
        </div>

        {/* Ordem das Tonalidades Menores */}
        <div className="pt-3 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-2">
            Ordem das Tonalidades Menores (Relativas)
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {CIRCLE_KEYS.map((k, idx) => {
              const isSelected = activeKey.index === k.index;
              return (
                <React.Fragment key={`minor-order-${k.index}`}>
                  <button
                    onClick={() => onSelectKey(k)}
                    className={`px-2.5 py-1 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-purple-500 text-white ring-2 ring-white shadow-md scale-105'
                        : 'bg-slate-850 hover:bg-slate-800 text-purple-200 border border-slate-750'
                    }`}
                  >
                    {k.minorRoot}
                  </button>
                  {idx < CIRCLE_KEYS.length - 1 && <span className="text-slate-600 font-bold text-xs">→</span>}
                </React.Fragment>
              );
            })}
            <span className="text-slate-500 font-bold text-xs ml-1">→ Volta ao início:</span>
            <button
              onClick={() => onSelectKey(CIRCLE_KEYS[0])}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-purple-300 border border-slate-700 hover:bg-slate-700"
            >
              Am
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
