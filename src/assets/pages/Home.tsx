import React, { useEffect, useState } from "react";
import axios from "axios";

interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(false);
  const [addTodos, setAddTodos] = useState("");
  const fetchData = () => {
    axios
      .get<TodoData[]>("http://localhost:3000/todos")
      .then((response) => {
        setTodoData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = (id: number) => {
    axios
      .patch(`http://localhost:3000/todos/${id}`, {
        completed: !completed,
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (id: number) => {
    axios
      .patch(`http://localhost:3000/todos/${id}`, {
        title: addTodos,
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen">
      <div className="container mx-auto max-w-[1320px]">
        {/* Search and Filter Section */}
        <div className="w-full flex justify-start items-center gap-2 mb-10 mt-10">
          {/* Search Input */}
          <label className="w-3/5 relative input input-bordered input-primary flex items-center gap-2">
            <input
              type="text"
              className="grow w-full"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {/* Filter Select */}
          <div className="w-2/5">
            <select
              name="group"
              id="group"
              value={completed ? "completed" : "all"}
              onChange={(e) => setCompleted(e.target.value === "completed")}
              className="select select-primary w-full"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {/* Add Todo Section */}
        <div className="w-full flex justify-center items-center gap-2 mb-10">
          <input
            type="text"
            placeholder="New Todo..."
            className="input input-bordered input-primary w-full"
          />
          <button className="btn btn-active btn-primary p-2"> Add Todo</button>
        </div>
      </div>

      {/* Todo List */}
      <div className="container mx-auto max-w-[1320px] h-auto">
        <h1 className="text-4xl text-center mb-10 border-b border-primary p-3">
          Todo List
        </h1>
        <ul>
          {todoData
            .filter((todo) => todo.title.toLowerCase().includes(search))
            .filter(
              (todo) => todo.completed === completed || completed === false
            )
            .map((todo) => (
              <li
                key={todo.id}
                className="w-full flex justify-start border rounded-lg border-primary p-3 items-center gap-2 mb-10"
              >
                <div className="w-full flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="checkbox"
                  />
                  <p
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </p>
                </div>

                <div className="w-full flex justify-end items-center gap-2">
                  <button
                    className="btn btn-active btn-primary"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-active btn-secondary"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
