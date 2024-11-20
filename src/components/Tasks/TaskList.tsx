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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Lista de Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          Criar Nova Task
        </Link>
      </div>

      {tasks.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any, index: number) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>
                  <span
                    className={`badge ${
                      task.status === "completed"
                        ? "bg-success"
                        : task.status === "in_progress"
                        ? "bg-warning"
                        : task.status === "failed"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-info me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Nenhuma task encontrada.</p>
      )}
    </div>
  );
};

export default TaskList;
