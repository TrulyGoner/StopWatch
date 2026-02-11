import { useState, useCallback } from "react";
import { StopWatchItem } from "../components/StopWatchItem/index.ts";
import styles from './StopWatch.module.scss'

const StopWatch = () => {
  const [stopwatchIds, setStopwatchIds] = useState<string[]>([]);

  const addStopWatch = useCallback(() => {
    const newId = Date.now().toString();
    setStopwatchIds(prev => [...prev, newId]);
  }, []);

  const deleteStopWatch = useCallback((id: string) => {
    setStopwatchIds(prev => prev.filter(swId => swId !== id));
  }, []);
  
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Stopwatch App</h1>
      <button onClick={addStopWatch} className={styles.addButton}>Add Stopwatch</button>
      <div className={styles.list}>
        {stopwatchIds.map(id => (
          <StopWatchItem
            key={id}
            id={id}
            onDelete={deleteStopWatch}
          />  
        ))}
      </div>
    </div>
  );
}

export default StopWatch;
