import React from 'react'
import { DragDropContext} from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { moveTask,setTasks } from '../../redux/taskSlice';
import TaskColumn from '../TaskColumn/TaskColumn.tsx'

const Dashboard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);

    const groupe = {
        todo : tasks.filter((task) => task.status === 'todo'),
        doing : tasks.filter((task) => task.status === 'doing'),
        done : tasks.filter((task) => task.status === 'done'),
    };

    const onDragFinish = (result) => {
        const {source, destination, draggableId} = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) return;
    dispatch(
      moveTask({
        taskId: parseInt(draggableId),
        destination: destination.droppableId,
      })
    );
    };

    React.useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
          dispatch(setTasks(savedTasks));
        }
      }, [dispatch]);

    React.useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);

    const onDelete = (taskId) => {
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      dispatch(setTasks(filteredTasks)); 
    };

    const onEdit = (updatedTask) => {
      const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      dispatch(setTasks(updatedTasks));
    };

    return (
      <DragDropContext onDragEnd={onDragFinish}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:h-screen h-screen p-4">
          <TaskColumn
            className=" p-4 rounded-lg shadow-md flex flex-col h-full overflow-y-auto"
            title={<h2 className="text-center text-lg font-bold">To Do 📌</h2>}
            tasks={groupe.todo}
            columnId="todo"
            onEdit={onEdit}
            onDelete={onDelete}
          />

          <TaskColumn
            className=" p-4 rounded-lg shadow-md flex flex-col h-full overflow-y-auto"
            title={<h2 className="text-center text-lg font-bold">Doing ⏳</h2>}
            tasks={groupe.doing}
            columnId="doing"
            onEdit={onEdit}
            onDelete={onDelete}
          />

          <TaskColumn
            className=" p-4 rounded-lg shadow-md flex flex-col h-full overflow-y-auto"
            title={<h2 className="text-center text-lg font-bold">Done ✔️</h2>}
            tasks={groupe.done}
            columnId="done"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </DragDropContext>

    );
};

export default Dashboard