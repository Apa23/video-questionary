import { PlayCircleFilledTwoTone, StopCircleTwoTone } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';

interface VideoSnippetProps {
  question: { id: string; label: string; url: string };
  selectedVideo: (video: { id: string; label: string; url: string }) => void;
}

export const VideoSnippetComponent: React.FC<VideoSnippetProps> = ({ question, selectedVideo }: VideoSnippetProps) => {
  const [recordingStatus, setRecordingStatus] = useState<'play' | 'stop'>('stop');
  const [isRecorded, setIsRecorded] = useState(false);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current?.src !== 'http://localhost:5173/') {
      setIsRecorded(true);
    }

    return () => {};
  }, []);

  const handleOnPlay = () => {
    if (recordingStatus === 'play') {
      videoRef.current?.pause();
      setRecordingStatus('stop');
    } else if (recordingStatus === 'stop' && isRecorded) {
      videoRef.current?.play();
      setRecordingStatus('play');
    }
  };

  return (
    <div className='video-snippet-container'>
      <div className='video-snippet'>
        <video ref={videoRef} width='300' height='440' onClick={() => selectedVideo(question)} src={question.url} loop></video>
        {recordingStatus === 'stop' ? (
          <PlayCircleFilledTwoTone fontSize='large' onClick={handleOnPlay} />
        ) : (
          <StopCircleTwoTone fontSize='large' onClick={handleOnPlay} />
        )}
        <div className='video-snippet-footer'>{question.label}</div>
      </div>
    </div>
  );
};
