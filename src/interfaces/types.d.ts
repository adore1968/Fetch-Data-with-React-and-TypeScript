import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface TaskApiResponse {
  id: string;
  taskName: string;
  taskDescription: string;
  taskCompleted: boolean;
}

export type ChangeTaskProps = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export interface AppContextValue {
  tasks: Task[];
  isLoading: boolean;
  task: Task;
  currentId: string;
  taskInitialState: Task;
  changeTask: ({ target }: ChangeTaskProps) => void;
  createTask: () => void;
  setEditStates: (id: string) => void;
  editTask: () => void;
  setTask: Dispatch<SetStateAction<Task>>;
  changeCompleted: (newTask: Task) => void;
  deleteTask: (id: string) => void;
}
