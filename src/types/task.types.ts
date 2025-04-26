export interface TaskRequest {
    businessID: string;
    assignedTo: string;
    title: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
    dueDate?: Date;
  }
  