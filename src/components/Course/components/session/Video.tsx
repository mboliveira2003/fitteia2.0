import React, { useEffect, useRef, useState } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import Player from "@vimeo/player";

interface VideoProps {
  videoId: string;
  taskName: string;
  handleVideoCompleted: (skip: boolean) => void;
}

const Video: React.FC<VideoProps> = ({ videoId, taskName, handleVideoCompleted }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      const player = new Player(iframeRef.current);

      player.on("ended", () => {
        setVideoEnded(true);
        handleVideoCompleted(false);
      });
    }
  }, [videoId, handleVideoCompleted]);

  const handleButtonClick = () => {
    if (!videoEnded) {
      handleVideoCompleted(true);
    } else {
      handleVideoCompleted(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-4 duration-300 animate-in fade-in slide-in-from-left-10">
      <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title={taskName}
          ></iframe>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <button
          className="sm:text-md inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-2 ring-indigo-600 transition-all duration-200 ease-in-out hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit sm:px-4 sm:py-2"
          onClick={handleButtonClick}
        >
          Avançar
          <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Video;
