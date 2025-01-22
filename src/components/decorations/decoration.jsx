import baby from "../../assets/angel.gif";
import pushshing from "../../assets/picmix.com_2376499.gif";
import "./decorations.css";

export const Baby = () => {
  return (
    <div className="baby">
      <img src={baby} alt="baby" />
    </div>
  );
};

export const Pushshing = ({ type = "normal" }) => {
  return (
    <div className={`pushshing ${type}`}>
      <img src={pushshing} alt="pushshing" />
    </div>
  );
};

