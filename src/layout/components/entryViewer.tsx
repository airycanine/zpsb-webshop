import React from "react";

interface Entry {
  entry: string[];
}
const EntryViewer = ({ entry }: Entry) => {
  return (
    <div className="entry">
      <span className="info-key">{entry[0]}</span>
      <span className="separator">: </span>
      <span className="info-value">
        {entry[1] && entry[1] != " " ? entry[1] : "not specified"}
      </span>
    </div>
  );
};
export default EntryViewer;
