export interface StopWatch {
    id: string;
    time: number;
    isRunning: boolean; 
}

export interface StopWatchProps {
  stopwatch: StopWatch;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onClear: (id: string) => void;
  onDelete: (id: string) => void;
}

export type ButtonType = 'start' | 'pause' | 'resume' | 'clear' | 'delete';

export interface StopWatchButtonProps {
  type: ButtonType;
  onClick: () => void;
  children: React.ReactNode;
}