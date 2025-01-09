import Sidebar from './components/Sidebar/Sidebar';
import React from 'react'
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import { addTask } from './redux/taskSlice';
import AddTask from './components/AddTask/AddTask.tsx';

function App() {
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = React.useState(false);

  React.useEffect (() => {}, [dispatch]);
  const handleAdd = (newTask) => {
    dispatch(addTask(newTask));
    setPopupOpen(false);
  };

return (
  <div className="flex bg-gray-300 h-screen">
    <Sidebar onAdd={handleAdd} />
    <div className="flex-1 p-6 overflow-y-auto">
      <button
        onClick={() => setPopupOpen(true)}
        className="bg-teal-300 text-black font-bold px-4 ml-4 py-2 rounded-lg "
      >
        Add Task
      </button>
      <Dashboard />
      {popupOpen && (
        <AddTask onAdd={handleAdd} onClose={() => setPopupOpen(false)} />
      )}
    </div>
  </div>
  
  );
}

export default App;