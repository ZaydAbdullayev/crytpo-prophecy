import { useCallback, useMemo } from "react";
import dayjs from "dayjs";

export const removeZero = (str) => {
  return str.replace(/^0+/, "");
};

export const useReserved = (reserves, date, today) => {
  const currentTime = useCurrentTime();
  const currentDay = today === date.day;

  const isReserved = useCallback(
    (s) => {
      const selectedDateObj = new Date(
        `${date.year}/${date.month}/${date.day} ${s}`
      );
      if (s <= currentTime && currentDay) {
        return true;
      }

      if (reserves && Array.isArray(reserves)) {
        return reserves.some((reserve) => {

          const [startMonth, startDay] = getMonthAndDay(reserve.start_date);
          const [endMonth, endDay] = getMonthAndDay(reserve.end_date);

          const startDateObj = new Date(
            `${date.year}/${startMonth}/${startDay} ${reserve.start_hour}`
          );
          const endDateObj = new Date(
            `${date.year}/${endMonth}/${endDay} ${reserve.end_hour}`
          );

          return (
            (selectedDateObj >= startDateObj &&
              selectedDateObj <= endDateObj) ||
            (selectedDateObj > startDateObj && selectedDateObj < endDateObj)
          );
        });
      }
    },
    [currentTime, reserves, date, currentDay]
  );

  return { isReserved };
};

export const useCurrentTime = () => {
  return useMemo(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  }, []);
};

const toDateTime = (dateStr, hourStr) => {
  const [month, day] = getMonthAndDay(dateStr);
  const [hour, minute] = hourStr.split(":").map(Number);
  const now = new Date();
  return new Date(now.getFullYear(), month - 1, day, hour, minute);
};

export const getMonthAndDay = (date) => {
  const [month, day] = (date?.slice(5, 10) ?? "").split("-")
  return [month, day];
}

const formatPadStart = (value) => {
  return value.toString().padStart(2, "0");
}

export const findAvailableTimeSlots = (reserves, orderTimesOptions) => {
  let result = [];
  let availableOptions = [...orderTimesOptions];

  if (reserves?.length > 0) {
    reserves.sort(
      (a, b) =>
        toDateTime(a.start_date, a.start_hour) -
        toDateTime(b.start_date, b.start_hour)
    );

    for (let i = 0; i <= reserves.length; i++) {
      let currentEnd =
        i === 0
          ? new Date()
          : toDateTime(reserves[i - 1].end_date, reserves[i - 1].end_hour);

      let nextStart =
        i === reserves.length
          ? new Date(currentEnd.getTime() + 7 * 24 * 60 * 60 * 1000)
          : toDateTime(reserves[i].start_date, reserves[i].start_hour);

      let gapHours = (nextStart - currentEnd) / (1000 * 60 * 60);

      availableOptions = availableOptions.filter((option) => {
        const duration = option?.bonus?.status ? option.duration + option?.bonus?.amount : option.duration;
        if (option.nightOnly) {
          if (gapHours >= 12 && currentEnd.getHours() <= 22) {
            const nightStart = new Date(currentEnd);
            nightStart.setHours(22, 0);
            if (nightStart < nextStart) {
              result.push({
                ...option,
                start_hour: "22:00",
                start_date: `${formatPadStart(nightStart.getMonth() + 1)}.${formatPadStart(nightStart.getDate())}`,
              });
            }
            return false;
          }
          return true;
        } else if (duration <= gapHours) {
          let startHour = `${formatPadStart(currentEnd.getHours())}:${formatPadStart(currentEnd.getMinutes())}`;
          let startDate = `${formatPadStart(currentEnd.getMonth() + 1)}.${formatPadStart(currentEnd.getDate())}`;

          result.push({
            ...option,
            start_hour: startHour,
            start_date: startDate,
          });

          return false;
        }
        return true;
      });
    }
  } else {
    result = availableOptions.map((option) => {
      const now = new Date();
      let startHour = `${formatPadStart(now.getHours())}:${formatPadStart(now.getMinutes())}`;
      let startDate = `${formatPadStart(now.getMonth() + 1)}.${formatPadStart(now.getDate())}`;

      return {
        ...option,
        start_hour: startHour,
        start_date: startDate,
      };
    });
  }

  return result;
};

export function hourDiff(timeRange) {
  const [startTime, endTime] = timeRange;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  let diffMinutes = endTotalMinutes - startTotalMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }
  return diffMinutes / 60;
}

export const convertToTimeFormat = (value) => {
  const num = parseFloat(value);
  if (num >= 24) {
    const days = Math.floor(num / 24);
    const remainingHours = num % 24;
    if (remainingHours > 0) {
      return `${days} kun ${remainingHours.toFixed(1).replace(".0", "")} soat`;
    } else {
      return `${days} kun`;
    }
  }
  const hours = Math.floor(num);
  const minutes = Math.round((num - hours) * 60);
  if (minutes === 0) {
    return `${hours} soat`;
  } else if (minutes === 60) {
    return `${hours + 1} soat`;
  } else {
    return `${hours} soat ${minutes} minut`;
  }
};

export const calculateDiscount = (price, discount) => {
  return price - (price * discount) / 100;
}

export const is_after = (date) => {
  const inputTime = dayjs(date);
  console.log(date, inputTime, dayjs(), inputTime.isAfter(dayjs()));
  return inputTime.isBefore(dayjs());
}