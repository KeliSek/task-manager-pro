'use client';

import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";

interface ProjectFormProps{
    onSubmit: (data: { title: string; description: string }) => void;
    isLoading: boolean;
    initialValues?: {title: string, description: string}
}

export default function ProjectForm({
    onSubmit,
    isLoading,
    initialValues,
} :ProjectFormProps){
    const [title, setTitle] = useState(initialValues?.title || '')
    const [description, setDescription] = useState(initialValues?.description  || '')

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        onSubmit({title, description});
    };

    return(<form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        required
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
        <Button type="submit" isLoading={isLoading}>Save Project</Button>
    </form>
    )
}