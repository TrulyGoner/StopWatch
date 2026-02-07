import { StopWatchItem } from "./StopWatchItem";
import { useStopWatchList } from "./hooks/useStopWatchList.ts";
import './App.scss'

const App = () => {
  const item = useStopWatchList();
  
  return (
    <div className="app">
      <h1 className="app__title">Stopwatch App</h1>
      <button onClick={item.addStopWatch} className="app__add-button">Add Stopwatch</button>
      <div className="app__list">
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
export default App
