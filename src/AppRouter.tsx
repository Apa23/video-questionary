import { Route, Routes } from 'react-router-dom';
import { Home } from './home/components/Home';
import { VideoRouter } from './videos/routes/VideoRouter';

/* Componente enrutador principal de la App*/

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* Si el path es la raiz envía al home, de lo contrario envía a el enrutador de videos
        para terminar el enrutamiento con la logíca de ese componente */}
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<VideoRouter />} />
      </Routes>
    </>
  );
};
