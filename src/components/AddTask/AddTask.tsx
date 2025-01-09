import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type AddTaskProps = {
  onAdd: (task: {
    id: number;
    title: string;
    description: string;
    image: string | null;
    estimatedTime: string;
    dueDate: string | null;
    status: string;
  }) => void;
  onClose: () => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      image,
      estimatedTime,
      dueDate: dueDate ? dueDate.toISOString().split('T')[0] : null,
      status: 'todo',
    };
    onAdd(newTask);
    setTitle('');
    setDescription('');
    setImage(null);
    setEstimatedTime('');
    setDueDate(null);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded mb-4 w-full"
            onChange={handleImageChange}
          />
          {image && (
            <img
              src={image}
              alt="Task Preview"
              className="mb-4 w-full h-auto rounded"
            />
          )}
          <input
            type="text"
            placeholder="Estimated Time (e.g., 2 hours)"
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            required
          />
          <label className="block mb-2">Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date | null) => setDueDate(date)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            dateFormat="yyyy/MM/dd"
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-300 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
