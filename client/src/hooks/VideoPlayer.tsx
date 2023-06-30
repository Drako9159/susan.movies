import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({
  source_type,
  source,
  title
}: {
  source_type: string;
  source: string;
  title: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && document.body.contains(videoRef.current)) {
      videojs(videoRef.current, {
        playbackRates: [0.5, 1, 1.5, 2],
        buffer: {
          maxBufferLength: 30,
          highBufferLength: 10,
          bufferWhilePaused: true,
        },
      });
    }
  }, []);

  return (
    <div data-vjs-player>
      <video
        id="my-video"
        ref={videoRef}
        className="video-js vjs-default-skin"
        width="460px"
        controls
        preload="none"
        title={title}
      >
        <source src={source} type={source_type} />
      </video>
    </div>
  );
}
