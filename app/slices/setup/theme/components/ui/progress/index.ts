import { type VariantProps, cva } from 'class-variance-authority';

export { default as Progress } from './Progress.vue';

export const progressVariants = cva('', {
  variants: {
    variant: {
      default: '',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      info: 'bg-info text-info-foreground hover:bg-info/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-4',
      xs: 'h-2',
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
