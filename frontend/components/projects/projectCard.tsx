'use client';
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import Button from "../ui/button";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement>{
    project: Project;
    onDelete:()=>void,
    onEdit:()=>void,
}

export default function ProjectCard({
    project,
    onDelete,
    onEdit,
} :ProjectCardProps){
    const router = useRouter();

    return (
    <div 
        onClick={() => router.push(`/projects/${project.id}`)}
        className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer"
    >
        {/* title */}
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        
        {/* description */}
        <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
        
        {/* bottom row */}
        <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
            {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
            <Button variant="secondary" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</Button>
            <Button variant="danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</Button>
        </div>
        </div>
    </div>
    );
}