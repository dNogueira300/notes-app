import type { Database } from "./database";

// Tipos de Supabase
export type Tables = Database["public"]["Tables"];
export type Note = Tables["notes"]["Row"];
export type NoteInsert = Tables["notes"]["Insert"];
export type NoteUpdate = Tables["notes"]["Update"];

// Tipos de usuario
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

// Tipos de colores para notas
export type NoteColor =
  | "yellow"
  | "pink"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "gray";

export interface NoteColorOption {
  name: string;
  value: NoteColor;
  bg: string;
  text: string;
  border: string;
}

// Tipos para estados de la aplicación
export interface AppState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface NotesState {
  notes: Note[];
  searchTerm: string;
  selectedColor: NoteColor | null;
  isCreating: boolean;
  editingId: string | null;
}

// Tipos para formularios
export interface NoteForm {
  title: string;
  content: string;
  color: NoteColor;
}

// Tipos para theme
export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  primaryColor: string;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
}

// Tipos para búsqueda
export interface SearchOptions {
  searchFields: ("title" | "content")[];
  threshold: number;
  includeScore: boolean;
}

// Tipos para notificaciones
export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}
