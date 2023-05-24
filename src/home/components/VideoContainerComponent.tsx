import { useEffect, useState } from 'react';
import { VideoSnippetComponent } from './VideoSnippetComponent';
import { useNavigate } from 'react-router-dom';

/* Tipado de los props que recibe el componente 
   Recibe un array de objetos con el formato de las preguntas {id, label, url} */
interface VideoContainerProps {
  questions: { id: string; label: string; url: string }[];
}

/* Componente que contiene las tarjetas de las preguntas para el carousel en el home */
export const VideoContainerComponent: React.FC<VideoContainerProps> = ({ questions }) => {
  /* Estado que nos almacenará el video que haya sido seleccionado por el usuario para ser respondido */
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    label: string;
    url: string;
  }>({ id: '', label: '', url: '' });

  /* Con esta función podremos navegar entre las rutas de la app */
  const navigate = useNavigate();

  /* En el momento que el estado de la pregunta seleccionada cambie navegaremos hacia la url del id seleccionado 
  Ver componente VideoRouter para la lógica del enrutado de los videos */
  useEffect(() => {
    if (selectedVideo) {
      navigate(`/${selectedVideo.id}`);
    }
  }, [selectedVideo]);

  /* Función que setea el video seleccionado por el usuario al estado selectedVideo */
  const handleOnClicVideo = (video: { id: string; label: string; url: string }) => {
    setSelectedVideo(video);
  };

  return (
    <div className='video-snippet-container'>
      {questions.map((question) => (
        /* Por cada pregunta que se encuentre en la lista pasada por props creamos un elemento VideoSnippetContainer que es
        una tarjeta que contiene la información de la pregunta */
        <VideoSnippetComponent question={question} key={`video-snippet${question.id}`} selectedVideo={handleOnClicVideo} />
      ))}
    </div>
  );
};
