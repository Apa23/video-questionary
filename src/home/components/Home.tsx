import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { VIDEO_QUESTIONS as videoQuestions } from "../../data/videos";
import Carousel from "react-material-ui-carousel";
import { VideoContainerComponent } from "./VideoContainerComponent";

import "../../styles/home.css";


export function Home() {
  let startIndex = 0;
  let newList: { id: string; label: string; url: string }[][] = [];

  for (let i = 0; i <= videoQuestions.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      newList.push(videoQuestions.slice(startIndex, i));
      startIndex = i;
    } else if (i === videoQuestions.length - 1) {
      newList.push(videoQuestions.slice(startIndex, i + 1));
    }
  }

  const [videoList, setVideoList] =
    useState<{ id: string; label: string; url: string }[][]>(newList);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    if (videoQuestions.every((question) => question.url !== '')) {
      setVideoCompleted(true);
    }
  }, [])
  


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
        {videoList.map((videoSubList, index) => (
          <VideoContainerComponent
            questions={videoSubList}
            key={`video-container${index}`}
          />
        ))}
      </Carousel>

      <div className="video-list-footer">
        <Button disabled={!videoCompleted}>Enviar</Button>
      </div>
    </main>
  );
}
