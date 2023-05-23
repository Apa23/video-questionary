import { Route, Routes } from 'react-router-dom';
import { Home } from './home/components/Home';
import { VideoRouter } from './videos/routes/VideoRouter';


export const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Home
             
            />
          }
        />
        <Route path='/*' element={<VideoRouter  />} />
      </Routes>
    </>
  );
};
