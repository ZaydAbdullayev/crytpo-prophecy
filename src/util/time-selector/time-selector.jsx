import "./selector.scss";
import { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Hours from "./hour";
import Calendar from "./calendar";
import { getDays } from "../datas";

export const TimeSelector = ({ open, setOpen, setData, priceList, dev = false }) => {
  const [day, setDay] = useState(2);
  const containerRef = useRef(null);

  const handleScroll = (container, setFunction) => {
    if (!container) return;

    const children = container.children;
    let middleIndex = null;
    Array.from(children).forEach((child) => {
      const rect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (
        rect.top < containerRect.top + containerRect.height / 2 &&
        rect.bottom > containerRect.top + containerRect.height / 2
      ) {
        middleIndex = child.dataset.index;
      }
    });

    if (middleIndex !== null) {
      setFunction(parseInt(middleIndex, 10));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", () =>
        handleScroll(container, setDay)
      );
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", () =>
          handleScroll(container, setDay)
        );
      }
    };
  }, []);

  function getClassName(index, current) {
    const diff = index - current;
    const classMap = {
      0: "active",
      1: "top",
      "-1": "bottom",
      2: "top2",
      "-2": "bottom2",
      3: "top3",
      "-3": "bottom3",
    };
    return classMap[diff] || "";
  }

  const acceptData = () => {
    setData((prev) => ({
      ...prev,
      time: `${day - 2} kun`,
      price: priceList[day] * (day - 2),
    }));
    setOpen(false);
  };

  const acceptAddData = () => {
    setOpen(false);
  };

  const getprice = (e, index) => {
    setData((prev) => ({
      ...prev,
      daily_price_list: {
        ...prev.daily_price_list,
        [index - 3]: e.target.value,
      },
    }));
  };

  return (
    <div className={`time-selector ${open && "open"}`}>
      <div className="selector-container">
        <div className="tittle">
          <span>kun</span>
          <span>narx</span>
        </div>
        <div className="ts_days" ref={containerRef}>
          {getDays().map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`ts_day ${getClassName(index, day)}`}
            >
              <span>{item}</span>
              {dev ? (
                <input
                  name={item}
                  type="number"
                  defaultValue={priceList[index]}
                  autoComplete="off"
                  onChange={(e) => getprice(e, index)}
                />
              ) : (
                <span>{priceList[index]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="selector">
          <i>×</i>
        </div>
      </div>
      <i className="close" onClick={() => setOpen(false)}>
        <RxCross2 />
      </i>

      <button
        className="accept_button"
        onClick={dev ? acceptAddData : acceptData}
      >
        Tasdiqlash
      </button>
    </div>
  );
};

export const DateSelector = ({ open = true, setOpen, setData, reserves }) => {
  const [part, setPart] = useState(0);
  const [hour, setHour] = useState("--:--");
  const [date, setDate] = useState({
    time: new Date().getDate(),
    month: new Date().getMonth() + 1,
  });

  const acceptData = () => {
    if (hour !== "--:--") {
      const month = date.month?.toString().padStart(2, "0");
      const day = date?.day?.toString().padStart(2, "0");
      setData((prev) => ({
        ...prev,
        ...date,
        start_hour: hour,
        start_date: `${month}.${day} - ${hour}`,
      }));
      setOpen(false);
    }
  };

  return (
    <div className={`time-selector ${open ? "open" : ""}`}>
      <Hours
        extraClass={part === 2 ? "z" : ""}
        setPart={setPart}
        date={date}
        set={setHour}
        reserves={reserves}
      />
      <Calendar
        extraClass={part === 1 ? "opened" : part === 2 ? "closed" : ""}
        setPart={setPart}
        setDate={setDate}
      />
      <i className="close" onClick={() => setOpen(false)}>
        <RxCross2 />
      </i>
      <button
        className="accept_button"
        onClick={acceptData}
        disabled={hour === "--:--"}
        style={{ color: hour === "--:--" ? "#444" : "" }}
      >
        Tasdiqlash
      </button>
    </div>
  );
};
