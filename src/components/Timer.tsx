'use client';

import { useCountdown } from 'client-data/hooks/use-countdown';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

const DateValue = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="text-6xl">{value}</h3>
      <h6 className="text-lg">{label}</h6>
    </div>
  );
};

export const Timer = () => {
  dayjs.extend(advancedFormat);
  const day = dayjs('Wed, 01 Feb 2023 00:00:00 -0500').toDate();
  const [days, hours, minutes, seconds] = useCountdown(day);
  return (
    <div>
      <div className="flex gap-6 items-center justify-center">
        <DateValue value={days} label="Days" />
        <DateValue value={hours} label="Hours" />
        <DateValue value={minutes} label="Minutes" />
        <DateValue value={seconds} label="Seconds" />
      </div>

      <h4 className="text-3xl mt-6">{`Until ${dayjs(day).format(
        'MMMM Do'
      )}`}</h4>
    </div>
  );
};
