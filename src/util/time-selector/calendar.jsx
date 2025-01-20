import { useState, useMemo, useCallback } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { months } from "../datas";

const splitIntoWeeks = (days) => {
  const weeks = [];
  let currentWeek = Array(7).fill(null);

  days.forEach((day) => {
    const dayOfWeek = day.getDay();
    currentWeek[dayOfWeek] = day;
    if (dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
    }
  });

  if (currentWeek.some((day) => day !== null)) {
    weeks.push(currentWeek);
  }

  return weeks;
};

const today = new Date();
const Calendar = ({ extraClass, setPart, setDate }) => {
  const year = today.getFullYear();
  const [month, setMonth] = useState(today.getMonth());
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const currentMonth = today.getMonth();

  const days = Array.from({ length: months[month].days }, (_, i) => i + 1).map(
    (day) => new Date(year, month, day)
  );
  const weeks = useMemo(() => splitIntoWeeks(days), [days]);

  const handleMonthChange = useCallback(
    (direction) => {
      if (direction === 1) {
        if (month === currentMonth) {
          setMonth((prevMonth) => (prevMonth < 11 ? prevMonth + 1 : prevMonth));
        }
      } else {
        if (month !== currentMonth) {
          setMonth((prevMonth) => (prevMonth > 0 ? prevMonth - 1 : prevMonth));
        }
      }
    },
    [month, currentMonth]
  );

  const onClick = useCallback(
    (day) => {
      if (day < today.getDate() && currentMonth === month) return;
      setPart(2);
      setDate({ month: month + 1, day: day });
      setCurrentDay(day);
    },
    [setPart, setDate, month, currentMonth]
  );

  return (
    <div className={`calendar ${extraClass}`}>
      <div className="w100 df aic jcsb gap-10 fs-20">
        <IoChevronBack onClick={() => handleMonthChange(-1)} />
        {months[month].name} {year}
        <IoChevronForward onClick={() => handleMonthChange(+1)} />
      </div>
      <div className="calendar-header">
        <div>Yak</div>
        <div>Du</div>
        <div>Se</div>
        <div>Chor</div>
        <div>Pa</div>
        <div>Jum</div>
        <div>Shan</div>
      </div>
      <div className="calendar-body">
        {weeks.map((week, i) => (
          <div key={i} className="week">
            {week.map((day, j) => {
              const d = day ? day.getDate() : null;
              return (
                <div
                  key={j}
                  className={`day aspect ${
                    d === currentDay && currentMonth <= month ? "active" : ""
                  }`}
                  onClick={() => onClick(d)}
                  style={{
                    color:
                      (d < today.getDate() && currentMonth === month) ||
                      currentMonth > month
                        ? "#555"
                        : "",
                  }}
                >
                  {d || ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
