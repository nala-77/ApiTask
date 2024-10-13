import { useNavigate } from "react-router-dom";
import "./Card.css"
interface CardProps {
  id: number;
  image_url: string;
  name: string;
  onDelete: () => void; // New prop for handling delete
}

function Card({ id, image_url, name, onDelete }: CardProps) {
  const navigate = useNavigate();

  const showItem = (id: number) => {
    navigate(`/dashboard/show/${id}`);
  };

  const editItem = (id: number) => {
    navigate(`/dashboard/edit/${id}`);
  };

  return (
    <div className="item">
      <img src={image_url} alt="item" />
      <div className="item-overlay">
        <h4
          className="item-name"
          onClick={() => showItem(id)}
        >
          {name}
        </h4>
        <div className="item-btns">
          <button className="edit-btn" onClick={() => editItem(id)}>
            Edit
          </button>
          <button onClick={onDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
