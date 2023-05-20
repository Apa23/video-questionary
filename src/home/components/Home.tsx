import { useState } from "react";
import { Button } from "@mui/material";
import { VIDEO_QUESTIONS as videoQuestions } from "../../data/videos";
import Carousel from "react-material-ui-carousel";

import "../../styles/home.css";
import { VideoContainerComponent } from "./VideoContainerComponent";

export function Home() {
  const [videoList, setVideoList] = useState(videoQuestions);
  const [videoCompleted, setVideoCompleted] = useState(false);

  

  return (
    <main>
      <h1>Video Questionary</h1>
      <Carousel
        className="video-list"
        autoPlay={false}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
      >
        {videoList.map((video) => (
          <VideoContainerComponent
            key={`video-snippet-container${video.id}`}
            questions = {video.questions}
          />
        ))}
      </Carousel>
      <div className="video-list-footer">
        <Button disabled={videoCompleted}>Enviar</Button>
      </div>
    </main>
  );
}
