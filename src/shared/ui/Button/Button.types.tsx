export type ButtonVariant = 'start' | 'pause' | 'resume' | 'clear' | 'delete';

export interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
  children: React.ReactNode;
}