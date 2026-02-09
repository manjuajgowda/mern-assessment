import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [form, setForm] = useState({
    taskName: "",
    description: "",
    dueDate: "",
  });

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    try {
      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, form);
        alert("Task updated successfully!");
      } else {
        await API.post("/tasks", form);
        alert("Task added successfully!");
      }

      setShowModal(false);
      setEditingTaskId(null);
      setForm({ taskName: "", description: "", dueDate: "" });

      fetchTasks();

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Something went wrong.");
    }
  };


  const handleEdit = (task) => {
    setForm({
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate.slice(0, 16),
    });

    setEditingTaskId(task._id);
    setShowModal(true);
    setActiveMenu(null);
  };

const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/${id}`);

    alert("Task deleted successfully!");

    fetchTasks();

  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    alert("Failed to delete task.");
  }
};

  const formatDate = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1e3ba3]">
          Tasks Management
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1e3ba3] text-white px-4 md:px-5 py-2 rounded-full shadow-md"
        >
          + Add Task
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#1e3ba3] border-b">
              <th className="py-3">No</th>
              <th>Date & Time</th>
              <th>Task</th>
              <th>Description</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className="border-b hover:bg-gray-50">
                <td className="py-4">{index + 1}</td>
                <td>{formatDate(task.dueDate)}</td>
                <td>{task.taskName}</td>
                <td className="max-w-xs truncate">{task.description}</td>
                <td className="text-right relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === task._id ? null : task._id)
                    }
                    className="text-gray-500 hover:text-black"
                  >
                    <FiMoreVertical />
                  </button>

                  {activeMenu === task._id && (
                    <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-2 w-24 z-50">
                      <button
                        onClick={() => handleEdit(task)}
                        className="block w-full text-left text-[#1e3ba3] text-sm font-semibold py-1 hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          deleteTask(task._id);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left font-semibold text-sm py-1 text-[#1e3ba3] hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl shadow p-4 relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{task.taskName}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {task.description}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {formatDate(task.dueDate)}
                </p>

              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === task._id ? null : task._id
                    )
                  }
                >
                  <FiMoreVertical />
                </button>

                {activeMenu === task._id && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-24">
                    <button className="block w-full text-left text-sm py-1 hover:bg-gray-100">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="block w-full text-left text-sm py-1 text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-3">
        <button className="w-10 h-10 bg-white shadow rounded-full">
          {"<"}
        </button>
        <button className="w-10 h-10 bg-white shadow rounded-full">
          {">"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-xl p-8 shadow-2xl">
            <h3 className="text-center text-xl font-semibold mb-6">
              {editingTaskId ? "Edit Task" : "Add Task"}
            </h3>

            <form onSubmit={addTask} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Task Name"
                className="w-full p-3 rounded bg-gray-100"
                value={form.taskName}
                onChange={(e) =>
                  setForm({ ...form, taskName: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full p-3 rounded bg-gray-100"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Date Picker"
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                className="w-full p-3 rounded-lg bg-gray-100 outline-none"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
                required
              />

              <div className="flex flex-col items-center gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#1e3ba3] text-white px-8 py-2 rounded-full"
                >
                  {editingTaskId ? "Update" : "Save"}
                </button>


                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
