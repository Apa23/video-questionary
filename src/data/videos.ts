import { v4 as uuidv4 } from "uuid";

export const VIDEO_QUESTIONS = [
  {
    id: uuidv4(),
    questions: [
      { label: "¿Dónde naciste? Describe la ciudad o pueblo", url: "" },
      { label: "¿Cuál es tu animal favorito y por qué? ", url: "" },
      {
        label: "¿Cuál es tu comida favorita y cuál es la que más detestas?", url: "" },
      { label: "¿Cómo te ves a ti mismo dentro de 5 años?", url: "" },
    ],
  },
  {
    id: uuidv4(),
    questions: [
      {
        label: "¿Cuál es tu deporte favorito? ¿Lo practicas seguido?", url: "" },
      {
        label: "¿Si pudieras pedir un deseo en este momento qué pedirías?", url: "" },
    ],
  },
];
