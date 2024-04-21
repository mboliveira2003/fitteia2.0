import { FC } from 'react';

interface NumberBadgeProps {
    number: number | string;
}

const NumberBadge: FC<NumberBadgeProps> = ({ number }) => {
    return (
        <div className="flex items-center justify-center p-2 sm:p-3 rounded-full bg-indigo-100">
            <h1 className="text-xl sm:text-2xl font-bold w-6 h-6 flex flex-row items-center justify-center text-indigo-600">{number}</h1>
        </div>
    );
};

export default NumberBadge;