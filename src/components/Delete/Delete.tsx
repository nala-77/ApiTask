import "./Delete.css";

import { useEffect, useState } from "react";
import axios from "axios";

interface DeleteInfo {
  text: string;
  confirm: string;
  cancel: string;
  x: boolean;
  id: number;
  onClose: () => void;
}

function Delete({ text, confirm, cancel, x, id, onClose }: DeleteInfo) {
    
  const [state, setState] = useState<boolean>(x);

  useEffect(() => {
    setState(x);
  }, [x]);

  const deleteItem = () => {
    axios
      .delete(`https://test1.focal-x.com/api/items/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Item deleted:", res.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <section className="delete-parent">
      <div  className={`delete-head ${state ? 'pop-up' : ''}`}>
        <h3>{text}</h3>
        <div className="delete-btns">
          <button onClick={deleteItem}>{confirm}</button>
          <button onClick={onClose}>{cancel}</button>
        </div>
      </div>
    </section>
  );
}

export default Delete;
