import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Builder from "../Builder";

const Home = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Builder />
      </DndProvider>
    </div>
  );
};

export default Home;
