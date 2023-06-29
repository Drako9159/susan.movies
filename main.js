import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const video = document.querySelector("#my-video")

const player = videojs(video, {
  playbackRates: [0.5, 1, 1.5, 2],
  buffer: {
    maxBufferLength: 30,
    highBufferLength: 10,
    bufferWhilePaused: true,
  },
});

