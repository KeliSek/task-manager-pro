'use client';
import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Select from "../ui/select";

interface TaskFormProps{
    onSubmit: (data: { title: string; description: string, status: string, priority: string }) => void;
    isLoading: boolean;
    initialValues?: {title: string, description: string, status: string, priority: string}
}

export default function TaskForm({
    onSubmit,
    isLoading,
    initialValues,
}: TaskFormProps){
        const [title, setTitle] = useState(initialValues?.title || '')
        const [description, setDescription] = useState(initialValues?.description || '')
        const [status, setStatus] = useState(initialValues?.status || 'TODO')
        const [priority, setPriority] = useState(initialValues?.priority || 'HIGH')

        const statusOptions = [
            { value: 'TODO', label: 'Todo' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'DONE', label: 'Done' },
        ];

        const priorityOptions = [
            {value: 'HIGH', label: 'High'},
            {value: 'MEDIUM', label: 'Medium'},
            {value: 'LOW', label: 'Low'},
        ];

        const handleSubmit = (e: React.FormEvent)=>{
            e.preventDefault();
            onSubmit({title, description, status, priority});
        };

        return(
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    required
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                        rows={3}
                    />
                </div>
                <Select
                    label="status"
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}
                    options={statusOptions}
                />
                <Select
                    label="priority"
                    value={priority}
                    onChange={(e)=> setPriority(e.target.value)}
                    options={priorityOptions}
                />
                <Button type="submit" isLoading={isLoading}>Save Task</Button>
            </form>
        )
}