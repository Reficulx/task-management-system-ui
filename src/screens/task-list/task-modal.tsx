import React from "react";
import { Button, Drawer } from "antd";

export const TaskModal = (props: {
  taskModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.taskModelOpen}
      width={"100%"}
    >
      <h1>Task Modal</h1>
      <Button onClick={props.onClose}>Close</Button>
    </Drawer>
  );
};
