import {
  PlayCircleFilledTwoTone,
  StopCircleTwoTone,
  ReplayCircleFilledTwoTone,
} from "@mui/icons-material";
import { useState } from "react";
interface VideoProps {
  question: { label: string; url: string };
  selectedVideo: (video: string) => void
}

export const VideoSnippetComponent: React.FC<VideoProps> = ({
  question, selectedVideo
}: VideoProps) => {
  const [recordingStatus, setRecordingStatus] = useState<
    "unrecorded" | "recording" | "recorded"
  >("unrecorded");

  const handleClicRecordinButtons = () => {
    setRecordingStatus("recording");
  };

  return (
    <div className="video-snipet-container">
      <div className="video-snippet">
        <video
          width="300"
          height="440"
          poster="src\assets\react.svg"
          onClick={() => selectedVideo(question.label)}
        >
          <source src={question.url} type="video/mp4" />
        </video>
        {recordingStatus === "unrecorded" ? (
          <PlayCircleFilledTwoTone
            fontSize="large"
            onClick={handleClicRecordinButtons}
          />
        ) : recordingStatus === "recording" ? (
          <StopCircleTwoTone fontSize="large" />
        ) : (
          <ReplayCircleFilledTwoTone fontSize="large" />
        )}
        <div className="video-snippet-footer">{question.label}</div>
      </div>
    </div>
  );
};
