import "./card.css";

export const Card = ({ item, ...props }) => {
  return (
    <div className="df fdc aic card cp" {...props}>
      <img src={item?.icon} alt="icon" />
      <p>{item.name}</p>
      <b>{item.price} $</b>
    </div>
  );
};
