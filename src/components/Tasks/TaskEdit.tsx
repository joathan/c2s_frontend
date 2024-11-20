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
      const response = await fetch(`http://localhost:3200/api/v1/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Tarefa atualizada com sucesso!");
        navigate("/tasks");
      } else {
        setError("Erro ao atualizar a tarefa.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
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
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-select"
          value={task?.status || ""}
          onChange={(e) => setTask({ ...task!, status: e.target.value })}
          required
        >
          <option value="pending">Pendente</option>
          <option value="in_progress">Em progresso</option>
          <option value="completed">Concluída</option>
        </select>
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
