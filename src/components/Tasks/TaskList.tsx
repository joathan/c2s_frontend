import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Você precisa estar logado para visualizar as tasks.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:3200/api/v1/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          alert("Erro ao carregar tasks.");
        }
      } catch (error) {
        console.error("Erro ao carregar tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Lista de Tasks</h1>
      <Link to="/tasks/new">Criar Nova Task</Link>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            <p>Título: {task.title}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
