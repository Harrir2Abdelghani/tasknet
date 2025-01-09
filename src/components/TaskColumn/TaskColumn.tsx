import React from 'react';
import Card from '../Card/Card.tsx';
import { Droppable } from 'react-beautiful-dnd';

type Task = {
  id: string | number;
  title: string;
  description: string;
  image?: string | null;
  estimatedTime: string;
  dueDate: string;
};

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  columnId: string;
  onDelete: (taskId: string | number) => void;
  onEdit: (updatedTask: Task) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  columnId,
  onDelete,
  onEdit,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="bg-white rounded-lg p-4 max-h-screen overflow-auto md:h-[calc(100vh-4rem)] sm:h-[calc(100vh-3rem)]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="font-bold text-lg mb-4">{title}</h2>
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              task={task}
              index={index}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
