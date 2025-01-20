export const ProphecyModal = ({ item, children, close, ...props }) => {
  return (
    <div {...props}>
      <div className="df fdc aic gap-10 modal">
        <div className="df fdc aic gap-20">
          {item?.icon && <img src={item?.icon} alt="icon" />}
          <p>{item?.name}</p>
        </div>
        {children}
        <span className="close" onClick={close}>
          ×
        </span>
      </div>
    </div>
  );
};
