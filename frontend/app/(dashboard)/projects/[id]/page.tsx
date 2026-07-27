'use client';
import TaskCard from "@/components/tasks/taskCard";
import TaskForm from "@/components/tasks/taskForm";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Skeleton from "@/components/ui/skeleton";
import api from "@/lib/api";
import { Project, Task } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => {
      setProject(res.data);
      setTasks(res.data.tasks);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [id]);

  const handleCreate = async (data: { title: string; description: string; status: string; priority: string }) => {
    setIsSubmitting(true);
    try {
      const res = await api.post(`/projects/${id}/tasks`, data);
      setTasks((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    await api.delete(`/projects/${id}/tasks/${taskId}`);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <div className="flex flex-col gap-6">

      {/* back link */}
      <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>

      {/* project header */}
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{project?.title}</h1>
          <p className="text-gray-500 mt-1">{project?.description}</p>
        </div>
      )}

      {/* top row */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Tasks</h2>
        <Button onClick={() => setIsModalOpen(true)}>+ New Task</Button>
      </div>

      {/* skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* empty state */}
      {!isLoading && tasks.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No tasks yet.</p>
          <p className="text-sm">Click &quot;+ New Task&quot; to get started.</p>
        </div>
      )}

      {/* task grid */}
      {!isLoading && tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
              onEdit={() => {}}
            />
          ))}
        </div>
      )}

      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Task"
      >
        <TaskForm onSubmit={handleCreate} isLoading={isSubmitting} />
      </Modal>

    </div>
  );
}