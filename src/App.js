import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const serverURL = "BACKEND SERVER ADDRESS GOES HERE";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch(serverURL);
        const data = await res.json();

        return data;
    };

    const fetchTask = async (id) => {
        const res = await fetch(`${serverURL}/${id}`);
        const data = await res.json();

        return data;
    };

    const addTask = async (task) => {
        const res = await fetch(`${serverURL}/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    };

    const deleteTask = async (id) => {
        await fetch(`${serverURL}/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder,
        };

        const res = await fetch(`${serverURL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        );
    };

    return (
        <Router>
            <div className="container">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    addActive={showAddTask}
                />

                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <>
                                {showAddTask && <AddTask onAdd={addTask} />}
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                    />
                                ) : (
                                    "Add your first task"
                                )}
                            </>
                        }
                    />

                    <Route path="/about" element={<About />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
