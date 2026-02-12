import { useState, useCallback, useEffect } from "react";
import { StopWatchItem } from "../components/StopWatchItem/index.ts";
import { loadStopWatches } from "../../shared/utils/localStorage";
import styles from './StopWatch.module.scss'

const StopWatch = () => {
  const [stopwatchIds, setStopwatchIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = loadStopWatches();
    if (saved.length > 0) {
      setStopwatchIds(saved.map(sw => sw.id));
    }
  }, []);

  const addStopWatch = useCallback(() => {
    const newId = Date.now().toString();
    setStopwatchIds(prev => [...prev, newId]);
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
            setStopwatchIds={setStopwatchIds}
          />  
        ))}
      </div>
    </div>
  );
}

export default StopWatch;
