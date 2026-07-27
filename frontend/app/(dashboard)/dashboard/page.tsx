'use client';
import ProjectCard from "@/components/projects/projectCard";
import ProjectForm from "@/components/projects/projectForm";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Skeleton from "@/components/ui/skeleton";
import api from "@/lib/api";
import { Project } from "@/types";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get('/projects').then((res) => {
      setProjects(res.data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const handleCreate = async (data: { title: string; description: string }) => {
    setIsSubmitting(true);
    try {
      const res = await api.post('/projects', data);
      setProjects((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    await api.delete(`/projects/${projectId}`);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  return (
    <div className="flex flex-col gap-6">

      {/* top row */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ New Project</Button>
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
      {!isLoading && projects.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No projects yet.</p>
          <p className="text-sm">Click &quot;+ New Project&quot; to get started.</p>
        </div>
      )}

      {/* project grid */}
      {!isLoading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDelete(project.id)}
              onEdit={() => {}}
            />
          ))}
        </div>
      )}

      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Project"
      >
        <ProjectForm onSubmit={handleCreate} isLoading={isSubmitting} />
      </Modal>

    </div>
  );
}