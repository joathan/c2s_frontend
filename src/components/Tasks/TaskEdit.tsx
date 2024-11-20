import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  status: string;
  url: string;
}

const TaskEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Você precisa estar logado para visualizar as tasks.");
        window.location.href = "/login";
        return;
      }

      // TODO: trocar para usar o token
      try {
        const response = await fetch(`http://localhost:3200/api/v1/tasks/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          setError("Erro ao carregar a tarefa.");
        }
      } catch (err) {
        setError("Erro ao conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:3200/api/v1/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: {
            title: task?.title,
            url: task?.url,
          },
        }),
      });

      if (response.ok) {
        alert("Task atualizada com sucesso!");
        navigate("/tasks");
      } else {
        alert("Erro ao atualizar task.");
      }
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={task?.title || ""}
          onChange={(e) => setTask({ ...task!, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">
          URL
        </label>
        <input
          type="url"
          className="form-control"
          id="url"
          value={task?.url || ""}
          onChange={(e) => setTask({ ...task!, url: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Salvar
      </button>
    </form>
  );
};

export default TaskEdit;
