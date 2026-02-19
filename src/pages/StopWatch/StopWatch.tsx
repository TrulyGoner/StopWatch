import { useState, useCallback, useEffect } from "react";
import { StopWatchItem } from "../components/StopWatchItem/index.ts";
import { loadStopWatches } from "../../shared/utils/localStorage";
import { ConfirmationModal } from "../../widgets/ConfirmationModal";
import styles from './StopWatch.module.scss'

const StopWatch = () => {
  const [stopwatchIds, setStopwatchIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = loadStopWatches();
    if (saved.length > 0) {
      setStopwatchIds(saved.map(sw => sw.id));
    }
  }, []);

  const handleAddClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleConfirmAddStopWatch = useCallback(() => {
    const newId = Date.now().toString();
    setStopwatchIds(prev => [...prev, newId]);
    setIsModalOpen(false);
  }, []);
  
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Stopwatch App</h1>
      <button onClick={handleAddClick} className={styles.addButton}>Add Stopwatch</button>
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Ты уверен, что хочешь создать таймер?"
        onConfirm={handleConfirmAddStopWatch}
        onCancel={() => setIsModalOpen(false)}
        confirmText="Да"
        cancelText="Нет"
      />
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
