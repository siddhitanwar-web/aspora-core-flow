import { cn } from '@/lib/utils';

interface AvatarGroupProps {
  avatars: { src: string; name: string }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visible.map((avatar, index) => (
        <img
          key={index}
          src={avatar.src}
          alt={avatar.name}
          className={cn(
            'rounded-full border-2 border-background object-cover',
            sizeStyles[size]
          )}
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium text-muted-foreground',
            sizeStyles[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
