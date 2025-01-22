import cat from "../../assets/cat.gif";
import baby from "../../assets/angel.gif";
import pushshing from "../../assets/picmix.com_2376499.gif";
import witch from "../../assets/witcher.gif";
import "./decorations.css";

export const Cat = () => {
  return (
    <div className="cat">
      <img src={cat} alt="cat" />
    </div>
  );
};

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

export const Witch = () => {
  return (
    <div className="witch">
      <img src={witch} alt="witch" />
    </div>
  );
};
