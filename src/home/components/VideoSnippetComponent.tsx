import { PlayCircleFilledTwoTone, StopCircleTwoTone } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';

/* Tipado de los props que recibe el componente 
   Recibe un objetos con el formato de las preguntas {id, label, url} 
   y una función que referenciar el video seleccionado por el usuario */
interface VideoSnippetProps {
  question: { id: string; label: string; url: string };
  selectedVideo: (video: { id: string; label: string; url: string }) => void;
}

/* Componente que se muestra como una tarjeta en el carousel con la información de la pregunta recibida por props */
export const VideoSnippetComponent: React.FC<VideoSnippetProps> = ({ question, selectedVideo }: VideoSnippetProps) => {
  /* Estado que muestra si el video de la pregunta se está reproduciendo o no */
  const [playStatus, setplayStatus] = useState<'play' | 'stop'>('stop');
  /* Estado que muestra si una pregunta ya tiene un video respuesta */
  const [isRecorded, setIsRecorded] = useState(false);
  /* Referencia al elemento video donde se muestra la respuesta de la pregunta */
  const videoRef = useRef<null | HTMLVideoElement>(null);

  /* Por cada actualización del componente miramos si el componente video ya cuenta con una url valida de video */
  useEffect(() => {
    if (videoRef.current?.src !== 'http://localhost:5173/') {
      /* En caso de que ya teng aun video seteamos el estado isRecorded en true */
      setIsRecorded(true);
    }
  }, []);

  /* Función que se activa al darle clic en los botones play/stop y reproduce o detiene el video segun sea el caso 
    Solo se puede dar play si el estado isRecorded es true, osea si existe un video respeusta para la pregunta*/
  const handleOnPlay = () => {
    if (playStatus === 'play') {
      videoRef.current?.pause();
      setplayStatus('stop');
    } else if (playStatus === 'stop' && isRecorded) {
      videoRef.current?.play();
      setplayStatus('play');
    }
  };

  return (
    <div className='video-snippet-container'>
      <div className='video-snippet'>
        {/* Elemento que muestra el video respuesta de la pregunta en caso de que exista */}
        <video ref={videoRef} width='300' height='400' onClick={() => selectedVideo(question)} src={question.url} loop></video>
        {/* Botones de play/stop del video que cambian segun el estado playStatus */}
        {playStatus === 'stop' ? (
          <PlayCircleFilledTwoTone fontSize='large' onClick={handleOnPlay} />
        ) : (
          <StopCircleTwoTone fontSize='large' onClick={handleOnPlay} />
        )}
        <div className='video-snippet-footer'>{question.label}</div>
      </div>
    </div>
  );
};
