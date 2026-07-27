export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}
