import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';
import { PlayCircleFilledTwoTone, ReplayCircleFilledTwoTone, StopCircleTwoTone, FiberManualRecord, ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';
import { VIDEO_QUESTIONS as videoQuestions } from '../../data/videos';
import '../../styles/videoScreen.css';

/* Tipado de los props que recibe el componente 
   Recibe un objetos con el formato de las preguntas {id, label, url} */
export interface videoProps {
  question: { id: string; label: string; url: string | undefined };
}

/* Variable auxiliar para la función de tiempo del contador */
var timeout: number;

/* Componente que muestra un pantalla para la grabación del video respuesta para la pregunta dada */
export const VideoScreenComponent: React.FC<videoProps> = ({ question }) => {
  /* Estado que ayuda a controlar si todas las preguntas fueron respondidas */
  const [completeQuestions, setCompleteQuestions] = useState(false);
  /* Estado con el tiempo disponible para la grabación */
  const [recordingTime, setRecordingTime] = useState(120);
  /* Estado en que se encuentra la grabación del video */
  const [recordingStatus, setRecordingStatus] = useState<'unrecorded' | 'recording' | 'recorded'>('unrecorded');
  /* Variables que retorna la función que permite la grabación de video */
  let { status, startRecording, stopRecording, mediaBlobUrl, previewStream } = useReactMediaRecorder({ video: true });
  /* Url de la video respuesta */
  const [videoUrl, setVideoUrl] = useState<string | undefined>('');
  /* Referencia al elemento video donde se muestra la grabación de la respuesta */
  const videoRef = useRef<null | HTMLVideoElement>(null);
  /* Con esta función podremos navegar entre las rutas de la app */
  const navigate = useNavigate();

  /* Cada que se actualiza el tiempo de grabación miramos si este ya se acabó. En caso de que se acabe
    la grabación se detiene y se setea el tiempo de grabación nuevamente en caso de querer regrabar */
  useEffect(() => {
    if (recordingTime < 0) {
      stopRecording();
      clearTimeout(timeout);
      setRecordingTime(120);
      setRecordingStatus('recorded');
    }
  }, [recordingTime]);

  /* Cuando el estado retornado por la función para la grabación cambia ejecutamos las siguientes acciones */
  useEffect(() => {
    /* Función con tiempo que se encarga de ir disminuyendo el tiempo de grabación en 1 por cada segundo*/
    const coundownTimeChanged = () => {
      setRecordingTime((prevCount) => prevCount - 1);
      clearTimeout(timeout);
      timeout = setTimeout(coundownTimeChanged, 1000);
    };
    /* Por cada actualización del componente buscamos si para todas la preguntas se cumple que tengan una url de la video respuesta
    en ese caso seteamos el estado de completeQuestions a true */
    if (videoQuestions.every((question) => question.url !== '')) {
      setCompleteQuestions(true);
    }
    /* Si la grabación inicia iniciamos el contador */
    if (status === 'recording') {
      coundownTimeChanged();
    }
    /* Si tenemos una referencia a un elemento de video y recibimos información de la grabación mostramos
       el video que estamos grabando en pantalla a tiempo real */
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
    /* Si la grabación termina reiniciamos el tiempo de grabación y mostramos el video grabado en pantalla */
    if (status === 'stopped') {
      clearTimeout(timeout);
      setRecordingTime(120);
      if (question.url && videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = question.url;
      }
    }
  }, [status]);

  /* Si recibimos información del video grabado y esta es distinta a la que posee el componente
     la guardamos en la pregunta y en el estado  */
  if (mediaBlobUrl) {
    if (mediaBlobUrl !== videoUrl) {
      question.url = mediaBlobUrl;
      setVideoUrl(mediaBlobUrl);
    }
  }

  /* Función que se encarga de iniciar o detener la grabación y cambiar el estado de la misma según el estado en que se encuentre */
  const handleClicRecordinButtons = () => {
    if (recordingStatus === 'unrecorded') {
      setRecordingStatus('recording');
      startRecording();
    } else if (recordingStatus === 'recording') {
      stopRecording();
      setRecordingStatus('recorded');
    } else if (recordingStatus === 'recorded') {
      setRecordingStatus('recording');
      startRecording();
    }
  };

  /* Función que enruta hacia la proxíma pregunta */
  const handleClicNextVideo = () => {
    setRecordingStatus('unrecorded');
    completeQuestions ? navigate('/') : navigate(`/question-${nextPage()}`);
  };

  /* Función que enruta hacia la anterior pregunta */
  const handleClicPrevVideo = () => {
    setRecordingStatus('unrecorded');
    completeQuestions ? navigate('/') : navigate(`/question-${prevPage()}`);
  };

  /* Función que calcula el id de la próxima pregunta valida */
  const nextPage = () => {
    let pageId = parseInt(question.id.split('-')[1]);
    pageId = (pageId % videoQuestions.length) + 1;
    return pageId;
  };

  /* Función que calcula el id de la anterior pregunta valida */
  const prevPage = () => {
    let pageId = parseInt(question.id.split('-')[1]) - 1;
    if (pageId === 0) {
      pageId = videoQuestions.length;
    }
    return pageId;
  };

  return (
    <div className='video-screen-container'>
      <div className='video-screen-header'>
        {/* Botón de retorno al home */}
        <Button
          onClick={() => {
            navigate('/');
          }}
          disabled={recordingStatus === 'recording'}
        >
          <ArrowBack />
          Volver
        </Button>
      </div>
      <div className='video-screen'>
        {/* Elemento de video donde se muestra la grabación de la pregunta */}
        <video height='500px' width='1000px' ref={videoRef} poster={status} src={question.url} autoPlay playsInline loop></video>
        {/* Si la grabación ha iniciado se muestra el contador */}
        {status === 'recording' ? (
          <div className='recording-time'>
            <p>{`${Math.floor(recordingTime / 60)}:${recordingTime % 60 < 10 ? `0${recordingTime % 60}` : recordingTime % 60}`}</p>
            <FiberManualRecord />
          </div>
        ) : undefined}

        {/* Botones de play/stop/repeat que se muestran según el estado de la grabación */}
        <PlayCircleFilledTwoTone className={`recording-button ${recordingStatus !== 'unrecorded' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <StopCircleTwoTone className={`recording-button ${recordingStatus !== 'recording' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <ReplayCircleFilledTwoTone className={`recording-button ${recordingStatus !== 'recorded' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <div className='video-screen-question'>{question.label}</div>
      </div>
      <div className='video-screen-footer'>
        {/* Botones para navegar entre preguntas */}
        <Button onClick={handleClicPrevVideo} disabled={recordingStatus === 'recording'}>
          <ArrowBack />
          Atras
        </Button>
        <Button onClick={handleClicNextVideo} disabled={recordingStatus === 'recording'}>
          {completeQuestions ? 'Terminar' : 'Siguiente'}
          <ArrowForward />
        </Button>
      </div>
    </div>
  );
};
