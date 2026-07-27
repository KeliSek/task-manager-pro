'use client'
import { Task } from "@/types";
import Badge from "../ui/badge";
import Button from "../ui/button";

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement>{
    task: Task;
    onDelete: ()=> void;
    onEdit: ()=> void;
}

export default function TaskCard({
    task,
    onDelete,
    onEdit,
}:TaskCardProps) {


    return(
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className=" text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
            <div className="flex gap-2">
                    <Badge label={task.status} type="status" />
                    <Badge label={task.priority} type="priority" />
                </div>
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</Button>
                    <Button variant="danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</Button>
                </div>
            </div>

        </div>
    )
}