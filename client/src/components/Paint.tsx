import React from "react";
import Toolbar from "./Toolbar.tsx";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";

const Paint: React.FC = () => {
  return (
    <div>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
};

export default Paint;
