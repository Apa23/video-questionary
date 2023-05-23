import { useEffect, useState } from "react";
import { VideoSnippetComponent } from "./VideoSnippetComponent";
import { useNavigate } from "react-router-dom";

interface VideoContainerProps {
  questions: { id: string; label: string; url: string }[];
}

export const VideoContainerComponent: React.FC<VideoContainerProps> = ({
  questions,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    label: string;
    url: string;
  }>({ id: "", label: "", url: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedVideo) {
      navigate(`/${selectedVideo.id}`);
    }

    return () => {};
  }, [selectedVideo]);

  const handleOnClicVideo = (video: {
    id: string;
    label: string;
    url: string;
  }) => {
    setSelectedVideo(video);
  };

  return (
    <div className="video-snippet-container">
      {questions.map((question) => (
        <VideoSnippetComponent
          question={question}
          key={`video-snippet${question.id}`}
          selectedVideo={handleOnClicVideo}
        />
      ))}
    </div>
  );
};
