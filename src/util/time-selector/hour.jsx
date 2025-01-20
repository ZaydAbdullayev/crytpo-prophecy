import { useState, useCallback } from "react";
import { IoChevronBack } from "react-icons/io5";
import { hours, half_hours, months } from "../datas";
import { useReserved, useCurrentTime } from "../services/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hours = ({ extraClass, setPart, date, set, reserves }) => {
  const [hour, setHour] = useState("--:--");
  const today = new Date().getDate();
  const currentTime = useCurrentTime();
  const { isReserved } = useReserved(reserves, date, today);
  const page = [":00", ":30"];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + page[index] + "</span>";
    },
  };

  const handleHourClick = useCallback(
    (s) => {
      if (date.day === today && s < currentTime) {
        return;
      }
      if (isReserved(s)) {
        return;
      }
      setHour(s);
      set(s);
    },
    [date.day, today, currentTime, set, isReserved]
  );

  const hours_set = [hours, half_hours];
  return (
    <div className={`calendar ${extraClass}`}>
      <div className="w100 df aic gap-10 fs-20 hour-header">
        <span
          onClick={() => {
            setPart(1);
            setHour("--:--");
          }}
          className="df aic gap-15"
        >
          <IoChevronBack /> <small>START:</small>
          <span>
            {months[date?.month - 1]?.name} {date?.day},
          </span>
        </span>
        <span>{hour}</span>
      </div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper2"
      >
        {hours_set.map((hour_set, i) => (
          <SwiperSlide key={i} className="hours-item">
            <div className="hour-body">
              {hour_set.map((s, j) => (
                <div
                  key={j}
                  className={`day ${
                    hour === s ? "active" : isReserved(s) ? "reserved" : ""
                  }`}
                  onClick={() => handleHourClick(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hours;
