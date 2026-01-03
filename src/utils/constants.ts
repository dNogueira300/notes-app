import type { NoteColorOption } from "../types";

export const NOTE_COLORS: NoteColorOption[] = [
  {
    name: "Amarillo",
    value: "yellow",
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  {
    name: "Rosa",
    value: "pink",
    bg: "bg-pink-200",
    text: "text-pink-800",
    border: "border-pink-300",
  },
  {
    name: "Azul",
    value: "blue",
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  {
    name: "Verde",
    value: "green",
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
  },
  {
    name: "Púrpura",
    value: "purple",
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  {
    name: "Naranja",
    value: "orange",
    bg: "bg-orange-200",
    text: "text-orange-800",
    border: "border-orange-300",
  },
  {
    name: "Rojo",
    value: "red",
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  {
    name: "Gris",
    value: "gray",
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-300",
  },
];

export const DEFAULT_NOTE_COLOR: NoteColorOption["value"] = "yellow";

export const SEARCH_CONFIG = {
  threshold: 0.3,
  keys: ["title", "content"],
  includeScore: true,
};
