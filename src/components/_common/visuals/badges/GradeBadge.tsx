import { FC} from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon} from '@heroicons/react/24/outline';

interface GradeBadgeProps {
    percentage: number;
    icon?: boolean;
}

const GradeBadge: FC<GradeBadgeProps> = ({ percentage, icon}) => {

    const grade = percentage/100 * 20;

    let gradeColor = "bg-indigo-100 text-indigo-600";

    if (grade < 9.5) {
        gradeColor = "bg-red-100 text-red-600";
    }
    if (9.5 <= grade && grade < 15) {
        gradeColor = "bg-yellow-100 text-yellow-600";
    }
    if (15 <= grade && grade <= 20) {
        gradeColor = "bg-green-100 text-green-600";
    }
    
    return (
        <div className={"flex flex-row gap-x-2 items-center justify-center px-4 py-2 rounded-lg " + gradeColor}>
            {icon && grade < 10 && <ArrowTrendingDownIcon className="h-6 w-6 -mb-0.5" />}
            {icon && grade >= 10 && <ArrowTrendingUpIcon className="h-6 w-6 -mb-0.5" />}
            <h1 className="text-xl sm:text-2xl font-semibold">Nota:</h1>
            <h1 className="text-xl sm:text-2xl font-bold">{grade.toFixed(1)}</h1>

        </div>
    );
};

export default GradeBadge;