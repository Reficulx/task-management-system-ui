import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const TaskScreen = () => {
  return (
    <div>
      <h1>TaskScreen</h1>
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Task List</Link>
      <Routes>
        {/* tasks/:taskId/kanban */}
        <Route path={"/kanban"} element={<KanbanScreen />} />
        {/* tasks/:taskId/epic */}
        <Route path={"/epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};
