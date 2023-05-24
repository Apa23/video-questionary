import { Navigate, Route, Routes } from 'react-router-dom';
import { VideoScreenComponent } from '../components/VideoScreenComponent';
import { VIDEO_QUESTIONS as videoQuestions } from '../../data/videos';

/* Componente que se encarga de generar las rutas para cada una de las preguntas */

export const VideoRouter = () => {
  return (
    <Routes>
      {videoQuestions.map((question) => (
        /* Por cada pregunta que se encuentren en la lista de preguntas importada creamos
        una ruta con path igual al id de la pregunta y con un componente VideoScreenComponent como elemento */
        <Route key={`video-router${question.id}`} path={`/${question.id}`} element={<VideoScreenComponent question={question} />} />
      ))}

      {/* Cualquier otra ruta que no sea valida nos llevará de vuelta al home */}
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  );
};
