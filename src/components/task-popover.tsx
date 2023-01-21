import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useTasks } from "utils/task";
import { ButtonNoPadding } from "./lib";

export const TaskPopover = (props: {
  setTaskModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: tasks, isLoading } = useTasks();
  const pinnedTasks = tasks?.filter((task) => task.isPinned);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Favorites</Typography.Text>
      <List>
        {pinnedTasks?.map((task) => (
          <List.Item>
            <List.Item.Meta title={task.title} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type={"link"}
        onClick={() => props.setTaskModalOpen(true)}
      >
        Create Task
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>Tasks</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
