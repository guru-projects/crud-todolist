import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("high");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("ITEMS")) || []
  );
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortPriority, setSortPriority] = useState("");
  const [filteredPriority, setFilteredPriority] = useState("");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(tasks));
    handleFilterAndSort(filteredPriority, sortPriority);
  }, [tasks, filteredPriority, sortPriority]);

  const priorityOrder = {
    high: 1,
    mediam: 2,
    low: 3,
  };

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

  const handleSort = (e) => {
    setSortPriority(e.target.value);
  };

  const handleFilter = (e) => {
    setFilteredPriority(e.target.value);
  };

  const handleFilterAndSort = (filterValue, sortValue) => {
    let filtered = tasks;
    if (filterValue) {
      filtered = tasks.filter((task) => task.priority === filterValue);
    }

    if (sortValue) {
      filtered.sort((a, b) => {
        const priorityA = priorityOrder[a.priority];
        const priorityB = priorityOrder[b.priority];
        return priorityA - priorityB;
      });
    }

    setFilteredTasks(filtered);
  };

  return (
    <div className="h-screen flex justify-center items-center p-3">
      <div className="max-w-2xl w-screen h-96 max-h-96 bg-neutral-700 rounded overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-wrap h-28 sticky top-0 bg-slate-400"
        >
          <div className="flex justify-evenly items-center">
            <input type="text" name="search" />
            <select
              className="select after:bg-slate-300"
              name="sort"
              id="sort"
              onChange={handleSort}
              value={sortPriority}
            >
              <option value="">sort</option>
              <option value="high">high</option>
              <option value="mediam">mediam</option>
              <option value="low">low</option>
            </select>
            <select
              className="select after:bg-slate-300"
              name="filter"
              id="filter"
              onChange={handleFilter}
              value={filteredPriority}
            >
              <option value="">filter</option>
              <option value="high">high</option>
              <option value="mediam">mediam</option>
              <option value="low">low</option>
            </select>
          </div>
          <div className="flex items-center justify-evenly">
            <textarea
              onChange={handleChange}
              className="rounded w-fit"
              value={task}
              type="text"
              name="task"
              placeholder="Create a task"
            />
            <div>
              <label htmlFor="priority">choose priority:</label>
              <select
                onChange={handlePriority}
                value={priority}
                name="dropdown"
                id="priority"
              >
                <option value="high">high</option>
                <option value="mediam">mediam</option>
                <option value="low">low</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              submit
            </button>
          </div>
        </form>
        <div className="p-3 flex items-center justify-center content-center flex-col-reverse">
          {filteredTasks.map((taskItem, index) => (
            <div
              key={index}
              className={`w-full rounded mb-3 flex justify-between ${
                taskItem.priority === "high"
                  ? "bg-red-300"
                  : taskItem.priority === "mediam"
                  ? "bg-yellow-300"
                  : "bg-green-300"
              }`}
            >
              <p className="text-center min-h-10 p-3">
                {taskItem.task} - {taskItem.priority}
              </p>
              <button
                className="bg-red-200 px-3 py-1 rounded hover:bg-red-600 flex gap-2 items-center"
                onClick={() => handleDelete(index)}
              >
                Delete
                <svg
                  className="w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ff8080"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10 12V17"
                      stroke="#ff7070"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M14 12V17"
                      stroke="#ff7070"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M4 7H20"
                      stroke="#ff7070"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#ff7070"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#ff7070"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
