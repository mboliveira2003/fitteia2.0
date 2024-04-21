import { ReactElement, FC } from "react";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import {
  PlusIcon,
  MinusIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/20/solid";

const Controls = () => {
  // Hook to enable controls of zoom, pan and pinch
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute right-2 top-2 z-40 flex flex-col items-center divide-y divide-gray-200 rounded-sm bg-gray-100 text-gray-600 shadow-sm">
      <PlusIcon className="h-7 w-7 cursor-pointer" onClick={() => zoomIn()} />
      <MinusIcon
        className="h-7 w-7 cursor-pointer "
        onClick={() => zoomOut()}
      />
      <ArrowPathRoundedSquareIcon
        className="h-7 w-7 cursor-pointer "
        onClick={() => resetTransform()}
      />
    </div>
  );
};

interface ImageZoomContainerProps {
  children: ReactElement;
}

const ImageZoomContainer: FC<ImageZoomContainerProps> = ({ children }) => {
  return (
    // Disable scroll zooming and touchpad zooming
    <TransformWrapper wheel={{ disabled: true, touchPadDisabled: true }}>
      <Controls />
      <TransformComponent>{children}</TransformComponent>
    </TransformWrapper>
  );
};

export default ImageZoomContainer;
export { Controls };