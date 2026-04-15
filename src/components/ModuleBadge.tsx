import { ModuleType, MODULE_LABELS } from '@/types';

const moduleStyles: Record<ModuleType, string> = {
  recovery: 'bg-module-recovery module-recovery border-module-recovery',
  health: 'bg-module-health module-health border-module-health',
  content: 'bg-module-content module-content border-module-content',
  adp: 'bg-module-adp module-adp border-module-adp',
  faith: 'bg-module-faith module-faith border-module-faith',
  family: 'bg-module-family module-family border-module-family',
  mail: 'bg-module-mail module-mail border-module-mail',
  debt: 'bg-module-debt module-debt border-module-debt',
};

export function ModuleBadge({ module, size = 'sm' }: { module: ModuleType; size?: 'sm' | 'md' }) {
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${moduleStyles[module]} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
      {MODULE_LABELS[module]}
    </span>
  );
}
