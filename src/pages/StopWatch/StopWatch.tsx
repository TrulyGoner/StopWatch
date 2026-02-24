import { useState, useCallback, useEffect, useRef, type CSSProperties, type ReactElement, type Dispatch, type SetStateAction } from "react";
import { List } from "react-window";
import { StopWatchItem } from "../components/StopWatchItem/index.ts";
import { loadStopWatches } from "../../shared/utils/localStorage";
import { ConfirmationModal } from "../../widgets/ConfirmationModal";
import styles from './StopWatch.module.scss'

const ITEM_HEIGHT = 200;

interface RowExtraProps {
  stopwatchIds: string[];
  setStopwatchIds: Dispatch<SetStateAction<string[]>>;
}

const Row = ({ index, style, stopwatchIds, setStopwatchIds }: {
  ariaAttributes: Record<string, unknown>;
  index: number;
  style: CSSProperties;
} & RowExtraProps): ReactElement => (
  <div style={style}>
    <StopWatchItem
      id={stopwatchIds[index]}
      setStopwatchIds={setStopwatchIds}
    />
  </div>
);

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
  
  const listRef = useRef<any>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key !== "Tab") return;

      e.preventDefault();
      const items = outerRef.current?.querySelectorAll<HTMLElement>("[data-stopwatch]");
      if (!items || items.length === 0) return;

      const active = document.activeElement as HTMLElement;
      const currentIndex = Array.from(items).indexOf(active);

      let nextIndex: number;
      if (e.shiftKey) {
        nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex < 0 || currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
      }

      items[nextIndex].focus();
      items[nextIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    };

    document.getElementsByTagName("html")[0].addEventListener("keydown", handleKeyDown);

    return () => {
      document.getElementsByTagName("html")[0].removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Stopwatch App</h1>
      <button onClick={handleAddClick} className={styles.addButton}>Add Stopwatch</button>
      <ConfirmationModal 
        message="Ты уверен что хочешь создать таймер?"
        isOpen={isModalOpen}
        onConfirm={handleConfirmAddStopWatch}
        onCancel={() => setIsModalOpen(false)}
      />
      <div className={styles.list} ref={outerRef}>
        <List<RowExtraProps>
          listRef={listRef}
          rowCount={stopwatchIds.length}
          rowHeight={ITEM_HEIGHT}
          rowComponent={Row}
          rowProps={{ stopwatchIds, setStopwatchIds }}
        />
      </div>
    </div>
  );
}

export default StopWatch;
