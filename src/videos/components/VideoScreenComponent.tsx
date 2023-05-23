import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';
import { PlayCircleFilledTwoTone, ReplayCircleFilledTwoTone, StopCircleTwoTone, FiberManualRecord, ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';
import { VIDEO_QUESTIONS as videoQuestions } from '../../data/videos';
import '../../styles/videoScreen.css';

export interface videoProps {
  question: { id: string; label: string; url: string | undefined };
}

var timeout: number;

export const VideoScreenComponent: React.FC<videoProps> = ({ question }) => {
  const navigate = useNavigate();
  const [completeQuestions, setCompleteQuestions] = useState(false);
  const [recordingTime, setRecordingTime] = useState(120);
  const [recordingStatus, setRecordingStatus] = useState<'unrecorded' | 'recording' | 'recorded'>('unrecorded');
  let { status, startRecording, stopRecording, mediaBlobUrl, previewStream } = useReactMediaRecorder({ video: true });
  const [videoUrl, setVideoUrl] = useState<string | undefined>('');
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (recordingTime < 0) {
      stopRecording();
      clearTimeout(timeout);
      setRecordingTime(120);
      setRecordingStatus('recorded');
    }
  }, [recordingTime]);

  useEffect(() => {
    const coundownTimeChanged = () => {
      setRecordingTime((prevCount) => prevCount - 1);
      clearTimeout(timeout);
      timeout = setTimeout(coundownTimeChanged, 1000);
    };
    if (videoQuestions.every((question) => question.url !== '')) {
      setCompleteQuestions(true);
    }
    if (recordingStatus === 'recording') {
      coundownTimeChanged();
    }
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
    if (status === 'stopped') {
      clearTimeout(timeout);
      setRecordingTime(120);
      if (question.url && videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = question.url;
      }
    }
  }, [status]);

  if (mediaBlobUrl) {
    if (mediaBlobUrl !== videoUrl) {
      question.url = mediaBlobUrl;
      setVideoUrl(mediaBlobUrl);
    }
  }

  const handleClicRecordinButtons = () => {
    if (recordingStatus === 'unrecorded') {
      setRecordingStatus('recording');
      startRecording();
    } else if (recordingStatus === 'recording') {
      stopRecording();
      setRecordingStatus('recorded');
    } else if (recordingStatus === 'recorded') {
      setRecordingStatus('recording');
      startRecording();
    }
  };

  const handleClicNextVideo = () => {
    setRecordingStatus('unrecorded');
    completeQuestions ? navigate('/') : navigate(`/question-${nextPage()}`);
  };

  const handleClicPrevVideo = () => {
    setRecordingStatus('unrecorded');
    completeQuestions ? navigate('/') : navigate(`/question-${prevPage()}`);
  };

  const nextPage = () => {
    let pageId = parseInt(question.id.split('-')[1]);
    pageId = (pageId % videoQuestions.length) + 1;
    return pageId;
  };

  const prevPage = () => {
    let pageId = parseInt(question.id.split('-')[1]) - 1;
    if (pageId === 0) {
      pageId = videoQuestions.length;
    }
    return pageId;
  };

  return (
    <div className='video-screen-container'>
      <div className='video-screen-header'>
        <Button
          onClick={() => {
            navigate('/');
          }}
          disabled={recordingStatus === 'recording'}
        >
          <ArrowBack />
          Volver
        </Button>
      </div>
      <div className='video-screen'>
        <video height='500px' width='1000px' ref={videoRef} poster={status} src={question.url} autoPlay playsInline loop></video>
        {recordingStatus === 'recording' ? (
          <div className='recording-time'>
            <p>{`${Math.floor(recordingTime / 60)}:${recordingTime % 60 < 10 ? `0${recordingTime % 60}` : recordingTime % 60}`}</p>
            <FiberManualRecord />
          </div>
        ) : undefined}
        <PlayCircleFilledTwoTone className={`recording-button ${recordingStatus !== 'unrecorded' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <StopCircleTwoTone className={`recording-button ${recordingStatus !== 'recording' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <ReplayCircleFilledTwoTone className={`recording-button ${recordingStatus !== 'recorded' ? 'hide' : ''}`} onClick={handleClicRecordinButtons} />

        <div className='video-screen-question'>{question.label}</div>
      </div>
      <div className='video-screen-footer'>
        <Button onClick={handleClicPrevVideo} disabled={recordingStatus === 'recording'}>
          <ArrowBack />
          Atras
        </Button>
        <Button onClick={handleClicNextVideo} disabled={recordingStatus === 'recording'} >
          {completeQuestions ? 'Terminar' : 'Siguiente'}
          <ArrowForward />
        </Button>
      </div>
    </div>
  );
};
