import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { VIDEO_QUESTIONS as videoQuestions } from '../../data/videos';
import Carousel from 'react-material-ui-carousel';
import { VideoContainerComponent } from './VideoContainerComponent';
import '../../styles/home.css';

/* Componente que representa la primera vista de al app */

export function Home() {
  /* Inicialmente aplicamos un slice de la lista de preguntas importadas para poder obtener listas de máximo 4 posiciones */
  let startIndex = 0;
  let newList: { id: string; label: string; url: string }[][] = []; /* Array donde guardaremos las listas fragmentadas */

  for (let i = 0; i <= videoQuestions.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      /* Cada 4 posiciones hacemos un slice y agregamos al array */
      newList.push(videoQuestions.slice(startIndex, i));
      startIndex = i;
    } else if (i === videoQuestions.length - 1) {
      /* Si sobran menos de 4 elementos al final de la lista los agregamos */
      newList.push(videoQuestions.slice(startIndex, i + 1));
    }
  }

  /* Guardamos el array de preguntas fregmentadas en un estado, esto por si se desea implementar una modificación de las preguntas
  en tiempo de ejecución en un futura versión de la app */
  const [videoList, setVideoList] = useState<{ id: string; label: string; url: string }[][]>(newList);
  /* Estado que nos permite rectificar si todas las preguntas ya han sido respondidas */
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    /* Por cada actualización del componente buscamos si para todas la preguntas se cumple que tengan una url de la video respuesta
    en ese caso seteamos el estado de videoCompleted a true */
    if (videoQuestions.every((question) => question.url !== '')) {
      setVideoCompleted(true);
    }
  }, []);

  /* Función que maneja el evento de envío de las respuestas. Por ahora se muestra una alerta con agradecimiento
    Se desabilita el botón de envío.*/
  const handleSend = () => {
    setVideoCompleted(false);
    alert('Gracias por tus respuestas');
  };

  return (
    <main>
      <h1>Video Cuestionario</h1>
      {/* Se utiliza el componente Carousel de material ui para mostrar las preguntas de manera interactíva */}
      <Carousel className='video-list' autoPlay={false} animation='slide' indicators={false} navButtonsAlwaysVisible={true}>
        {videoList.map((videoSubList, index) => (
          /* Por cada fragmeto de preguntas en el estado videoList vamos a crear un elemento del carousel con el componente
          VideoContainerComponent el cual va a conter las tarjetas de las preguntas del fragmento enviado por props*/
          <VideoContainerComponent questions={videoSubList} key={`video-container${index}`} />
        ))}
      </Carousel>

      <div className='video-list-footer'>
        {/* Boton de envíar que solo se habilita cuando las preguntas hayan sido contestadas en su totalidad */}
        <Button disabled={!videoCompleted} variant='contained' onClick={handleSend}>
          Enviar
        </Button>
      </div>
    </main>
  );
}
