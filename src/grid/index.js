import React from "react";
import Grid from "./components/Grid/Grid";
import Column from "./components/Column/Column";

export const EzColumn = (props) => {
  return <Column {...props} />;
};

export const EzGrid = (props) => {
  return <Grid {...props} />;
};

export default EzGrid;
