import React from "react";
import Toolbar from "./Toolbar.tsx";
import SettingBar from "./SettingBar.tsx";
import Canvas from "./Canvas.tsx";

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
