import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("high");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("ITEMS")) || []
  );
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filteredPriority, setFilteredPriority] = useState("");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(tasks));
    handleFilterAndSort(filteredPriority);
  }, [tasks, filteredPriority]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTask = { task, priority };
      setTasks([...tasks, newTask]);
      setTask("");
      setPriority("high");
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleFilter = (e) => {
    setFilteredPriority(e.target.value);
  };

  const handleFilterAndSort = (filterValue) => {
    let filtered = tasks;
    if (filterValue) {
      filtered = tasks.filter((task) => task.priority === filterValue);
    }
    setFilteredTasks(filtered);
  };

  return (
    <div className="h-screen flex justify-center items-center p-3">
      <div className="max-w-2xl w-screen h-96 max-h-96 bg-neutral-700 rounded overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap h-28 sticky top-0 bg-slate-400">
          <div className="flex m-2 rounded justify-evenly h-12 items-center relative bg-white">
            <div className="flex absolute left-0">
              <div className="w-4 h-4 my-4 mx-2 rounded-full bg-[#fd99af]"></div>
              <div className="w-4 h-4 my-4 mx-1 rounded-full bg-[#34d4f4]"></div>
              <div className="w-4 h-4 my-4 mx-1 rounded-full bg-[#fac608]"></div>
            </div>
            <input
              onChange={handleChange}
              className="text-gray-500 font-medium rounded h-12 w-full my-2 ml-24  bg-white border-none outline-none"
              value={task}
              type="text"
              name="task"
              placeholder="What is your next task?"
            />
            <button
              type="submit"
              className="bg-blue-500 px-2.5 pb-1  rounded hover:bg-blue-600 absolute right-0 mr-2 text-3xl">
              +
            </button>
          </div>
          <div className="flex items-center justify-evenly">
            <select
              className="select font-medium after:bg-slate-300 bg-white text-gray-400 pl-2 outline-none rounded"
              name="filter"
              id="filter"
              onChange={handleFilter}
              value={filteredPriority}>
              <option value="">filter</option>
              <option value="high">high</option>
              <option value="mediam">mediam</option>
              <option value="low">low</option>
            </select>
            <div>
              <label htmlFor="priority" className="text-white font-medium pr-2">
                choose priority:
              </label>
              <select
                className="font-medium bg-white text-gray-400 pl-2 outline-none rounded"
                onChange={handlePriority}
                value={priority}
                name="dropdown"
                id="priority">
                <option value="high">high</option>
                <option value="mediam">mediam</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>
        </form>

        <div className="p-3 flex items-center justify-center content-center flex-col-reverse">
          {filteredTasks.map((taskItem, index) => (
            <div className={"flex w-full rounded mb-3 bg-white"}>
              <div
                key={index}
                className={`w-4 h-4 m-4 rounded-full ${
                  taskItem.priority === "high"
                    ? "bg-[#fd99af]"
                    : taskItem.priority === "mediam"
                    ? "bg-[#34d4f4]"
                    : "bg-[#fac608]"
                }`}></div>
              <div className=" w-full flex justify-between">
                <p className="text-center min-h-10 p-3 text-gray-500">
                  {taskItem.task}
                </p>
                <button
                  className=" px-3 py-1 rounded hover:bg-red-200 flex gap-2 items-center"
                  onClick={() => handleDelete(index)}>
                  <svg
                    className="w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ff8080">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M10 12V17"
                        stroke="#ff7070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                      <path
                        d="M14 12V17"
                        stroke="#ff7070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                      <path
                        d="M4 7H20"
                        stroke="#ff7070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                      <path
                        d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                        stroke="#ff7070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                      <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="#ff7070"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
