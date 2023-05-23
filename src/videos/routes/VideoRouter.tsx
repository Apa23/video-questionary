import { Navigate, Route, Routes } from "react-router-dom";
import { VideoScreenComponent } from "../components/VideoScreenComponent";
import { VIDEO_QUESTIONS as videoQuestions } from "../../data/videos";



export const VideoRouter = () => {
  return (
    <Routes>
      {videoQuestions.map((question) => (
        <Route
          key={`video-router${question.id}`}
          path={`/${question.id}`}
          element={<VideoScreenComponent question={question}  />}
        />
      ))}
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
