import "./comments.css";
import { comments } from "../../mocks/coins";

export const Comments = () => {
  return (
    <div className="wrapper">
      <div className="items">
        {comments.map((item) => {
          return (
            <div className="df fdc aic jcc item" tabIndex="0" key={item.id}>
              <div className="avatar">
                <img src={item.avatar} alt="avatar" />
              </div>
              <div className="w100 df fdc aic jcc gap-10 content">
                <div className="name">{item.name}</div>
                <div className="text-comments">{item.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
