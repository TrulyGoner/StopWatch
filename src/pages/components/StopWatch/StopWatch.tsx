import { StopWatchItem } from "../../../StopWatchItem/index.ts";
import { useStopWatchList } from "../../../hooks/useStopWatchList.ts";
import styles from './StopWatch.module.scss'

const StopWatch = () => {
  const item = useStopWatchList();
  
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Stopwatch App</h1>
      <button onClick={item.addStopWatch} className={styles.addButton}>Add Stopwatch</button>
      <div className={styles.list}>
        {item.stopwatches.map(sw => (
          <StopWatchItem
            key={sw.id}
            stopwatch={sw}
            onStart={item.startStopWatch}
            onPause={item.pauseStopWatch}
            onResume={item.resumeStopWatch}
            onClear={item.clearStopWatch}
            onDelete={item.deleteStopWatch}
          />  
        ))}
      </div>
    </div>
  );
}

export default StopWatch;
