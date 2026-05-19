'use client';

import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

export const Countdown = () => {

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const target = "2026-08-08T18:00:00-03:00";

  useEffect(() => {
    const targetDate = new Date(target);
    const updateCountdown = () => {
      const now = new Date();

      if (now >= targetDate) {
        setTimeLeft({
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return
      }

      const duration = intervalToDuration({
        start: now,
        end: target,
      });

      setTimeLeft({
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      });
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [target])

  return (
    <section className="font-cormorant flex justify-center h-150 text-white text-3xl text-center relative after:absolute 
                        after:bg-transparent after:bg-[url(/images/ripped-bg-3.png)] after:bg-no-repeat after:bg-bottom 
                        after:bg-contain after:w-full after:h-full">
      <div >
        <div >
          <div >Faltam:</div>
          <div className="flex gap-20">
            <div>
              <div className="text-9xl font-cormorant-300" >{timeLeft.months}</div>
              <div className="mt-6">MESES</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">{timeLeft.days}</div>
              <div className="mt-6">DIAS</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">{timeLeft.hours}</div>
              <div className="mt-6">HORAS</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">{timeLeft.minutes}</div>
              <div className="mt-6">MINUTOS</div>
            </div>
            <div>
              <div className="text-9xl font-cormorant-300">{timeLeft.seconds}</div>
              <div className="mt-6">SEGUNDOS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}
