
import { AppRouter } from "./AppRouter";

/* Componente que se renderiza desde el main y retorna el enrutador principal de la app para aplicar la
lógica de enrutamiento */

export const VideoQuestionsApp = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};