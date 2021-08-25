import React, { useEffect, useState } from "react";
import "./App.css";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs";

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (watchOn) {
          setTime((val) => val + 1);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);

  const handleStart = () => {
    setWatchOn(prevState => !prevState);
  }

  const handleStop = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
  }


  const handleReset = () => {
    setTime(0);
    setWatchOn(false);
  }

  return (
    <div className="App">
      <div className="container">
        <div className='timeBlock'>
          <span>
            {("0" + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}
          </span>
          &nbsp;:&nbsp;
          <span>{("0" + Math.floor(time / 6000)).slice(-2)}</span>&nbsp;:&nbsp;
          <span>{("0" + Math.floor((time / 100) % 60)).slice(-2)}</span>
          &nbsp;:&nbsp;
          <span>{("0" + Math.floor(time % 100)).slice(-2)}</span>
        </div>
        <div className="btnBlock">
          <button onClick={handleStart}>Start/Stop</button>
          <button onClick={handleStop}>Wait</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
export default App;
