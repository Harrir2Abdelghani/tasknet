import React from 'react';
import { FaTachometerAlt, FaTasks, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import logo from '../../Assets/logo.png';
import AddTask from '../AddTask/AddTask.tsx';

const Sidebar = ({ onAdd }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleAdd = () => {
    setPopupOpen(true);
  };

  return (
    <div className="flex">
      <div
        className={`w-56 bg-blue-950 text-white p-6 sm:block ${
          isOpen ? 'block' : 'hidden'
        } sm:h-screen transition-all rounded-2xl duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="logo" className="h-20 w-20 rounded-2xl" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-center text-teal-300">
            TaskNet
          </h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:bg-purple-300 hover:text-black p-3 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <FaTachometerAlt />
              Dashboard
            </li>
            <li
              onClick={handleAdd}
              className="cursor-pointer hover:bg-purple-300 hover:text-black p-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <FaTasks />
              Add Task
            </li>
            <li className="cursor-pointer hover:bg-purple-300 hover:text-black p-3 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <FaUser />
              Profile
            </li>
            <li className="cursor-pointer hover:bg-purple-300 hover:text-black p-3 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <FaCog />
              Settings
            </li>
          </ul>
        </div>

        <div className="mt-24">
          <button className="w-full bg-teal-300 text-black py-3 rounded-lg hover:bg-purple-300 transition-colors duration-200 flex items-center justify-center gap-2">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      <div className="p-4 sm:hidden">
        <button
          className="text-white bg-black p-2 rounded-md focus:outline-none transition-transform transform hover:scale-105"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '❎' : '☰'}
        </button>
      </div>

      {popupOpen && (
        <AddTask onAdd={onAdd} onClose={() => setPopupOpen(false)} />
      )}
    </div>
  );
};

export default Sidebar;
