import { FC } from "react";
import styles from "./Fire.module.css";

import { Transition } from "@headlessui/react";

const Fire: FC = () => {
  return (
    <div className={styles.fire}>
      <div className={styles.flames}>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
      </div>
    </div>
  );
};

interface FireAnimationProps {
  show: boolean;
  streak: number;
}

const FireAnimation: FC<FireAnimationProps> = ({ show, streak }) => {
  return (
    <Transition
      as="div"
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      show={show}
      className="from-33% via-66% to-99% fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-indigo-500/10 via-rose-600/10 to-orange-500/10 backdrop-blur"
    >
      <div className="relative flex h-32 w-32 flex-col items-center justify-center">
        <div className={styles.fire}>
          <div className={styles.flames}>
            <div className={styles.flame}></div>
            <div className={styles.flame}></div>
            <div className={styles.flame}></div>
            <div className={styles.flame}></div>
          </div>
        </div>
        <p className="mt-64 whitespace-nowrap text-3xl font-bold text-gray-600">
          {(() => {
            if (streak === 3) {
              return "Estás On Fire!";
            } else if (streak === 5) {
              return "Estás imparável!";
            } else if (streak === 10) {
              return "Não há quem te pare!";
            } else {
              return "Estás On Fire!";
            }
          })()}
        </p>
        <p className="whitespace-nowrap text-lg font-medium  text-gray-400">
          {streak} seguidas
        </p>
      </div>
    </Transition>
  );
};

export default Fire;
export { FireAnimation };
