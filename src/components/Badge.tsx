type BadgeVariant = 'green' | 'yellow' | 'red' | 'stone' | 'blue'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  stone: 'bg-stone-100 text-stone-600',
  blue: 'bg-blue-100 text-blue-800',
}

export default function Badge({ label, variant = 'stone' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${variantClasses[variant]}`}>
      {label}
    </span>
  )
}
