import { FC } from 'react';
import clsx from 'clsx';

interface TimerProps {
    startingTime: number;
    currentTime: number;
}

const Timer: FC<TimerProps> = ({startingTime, currentTime}) => {

    const elapsedTime = currentTime - startingTime;

    const getTimeColor = () => {
        if (elapsedTime > 10800000) {
            return 'text-red-400';
        }
        if (elapsedTime > 10200000) {
            return 'text-orange-400';
        }
        if (elapsedTime > 9000000) {
            return 'text-yellow-400';
        }
        return 'text-gray-400';
    }


    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return <div className={clsx("flex items-center w-fit sm:text-lg text-md font-semibold transition duration-300 ease-in-out", getTimeColor())}>{formatTime(elapsedTime)}</div>;
};

export default Timer;