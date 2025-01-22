import "./card.css";
import { Loader } from "../decorations/loader";
import CountUp from "react-countup";

export const Card = ({ item, prices, ...props }) => {
  return (
    <div className="df fdc aic card gap-5" {...props}>
      <img src={item?.icon} alt="icon" />
      <p>{item.name}</p>
      <b className="df aic gap-5">
        {(
          <CountUp
            start={0.0}
            end={prices[item.id]?.usd}
            duration={5}
            delay={2}
            separator=" "
            decimals={prices[item.id]?.usd?.toString()?.split(".")[1]?.length}
            decimal=","
          />
        ) || <Loader small={true} />}
        $
      </b>
    </div>
  );
};
