import "./card.css";
import { Loader } from "../decorations/loader";
// import AnimatedNumbers from "react-animated-numbers";

export const Card = ({ item, prices, ...props }) => {
  console.log("P", prices);

  return (
    <div className="df fdc aic card gap-5" {...props}>
      <img src={item?.icon} alt="icon" />
      <p>{item.name}</p>
      <b className="df aic gap-5">
        {prices[item.id]?.usd || <Loader small={true} />}$
      </b>
    </div>
  );
};
