import "./App.css";
import { useState } from "react";
import { pingService } from "./services/pingService";
import { useEffect } from "react";

function App() {
  const [url, setUrl] = useState();
  const [res, setRes] = useState();
  const [pings, setPings] = useState();
  const [count, setCount] = useState(80);

  useEffect(async () => {
    const topPings = await pingService.getPings();
    setPings((prev) => topPings);
  }, [res]);

  const pingRequest = async () => {
    const output = await pingService.pingRequest(url, count);
    setRes((prev) => ({ output }));
  };

  return (
    <div className="App">
      <div className="input">
        <div>
          <label htmlFor="host">HOST: </label>
          <input
            name="host"
            type="text"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="count">Count: </label>
          <input
            name="count"
            type="range"
            value={count}
            onChange={(ev) => setCount((prev) => ev.target.value)}
          />
          <span>{count}</span>
        </div>
        <button onClick={() => pingRequest()}>Run</button>
      </div>
      <div className="output">
        <textarea cols="30" rows="10" value={res ? res.output : ""}></textarea>
      </div>
      <div className="top-pings">
        <h3>Top Pings Sites</h3>
        {pings &&
          pings.map((ping) => (
            <div className="ping">
              <p>{ping.url}</p>
              <p>{ping.count}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
