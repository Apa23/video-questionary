import { useEffect, useState } from "react";
import { VideoSnippetComponent } from "./VideoSnippetComponent";
interface VideoContainerProps {
  questions: { label: string; url: string }[];
}

export const VideoContainerComponent: React.FC<VideoContainerProps> = ({
  questions,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string>();

  useEffect(() => {
    console.log(selectedVideo);

    return () => {};
  }, [selectedVideo]);

  const handleClicVideo = (video: string) => {
    setSelectedVideo(video);
  };

  return (
    <div className="video-snipet-container">
      {questions.map((question, index) => (
        <VideoSnippetComponent
          question={question}
          key={`video-snippet${index}`}
          selectedVideo={handleClicVideo}
        />
      ))}
    </div>
  );
};
