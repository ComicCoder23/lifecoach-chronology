import { Priority } from '@/types';

const styles: Record<Priority, string> = {
  critical: 'bg-priority-critical/10 text-priority-critical',
  high: 'bg-priority-high/10 text-priority-high',
  medium: 'bg-priority-medium/10 text-priority-medium',
  low: 'bg-priority-low/10 text-priority-low',
};

const labels: Record<Priority, string> = {
  critical: '🔴 Critical',
  high: '🟠 High',
  medium: '🔵 Medium',
  low: '🟢 Low',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority]}`}>
      {labels[priority]}
    </span>
  );
}
