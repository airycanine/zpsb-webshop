import React, { useState } from "react";

interface Entry {
  entry: string[];
  onFocusLost: Function;
}
const EntryEditor = ({ entry, onFocusLost }: Entry) => {
  const [val, setVal] = useState(entry[1]);
  return (
    <div className="entry">
      <span className="info-key">{entry[0]}</span>
      <span className="separator">: </span>
      <span className="info-value">
        {entry[1] && entry[1] != " " ? entry[1] : "not specified"} =>{"  "}
      </span>
      <input
        onBlur={() => onFocusLost(val)}
        className="info-value"
        value={val}
        onChange={(event) => setVal(event.target.value)}
      ></input>
    </div>
  );
};
export default EntryEditor;
