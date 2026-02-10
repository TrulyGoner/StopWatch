export interface StopWatchType {
    id: string;
    time: number;
    isRunning: boolean;
    hasStarted: boolean;
}

export interface StopWatchProps {
  stopwatch: StopWatchType;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onClear: (id: string) => void;
  onDelete: (id: string) => void;
}
