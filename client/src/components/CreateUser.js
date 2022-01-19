import { React, useState, useEffect } from "react";
import axios from "axios";

export default function CreateUser() {
  const [quote, setQuote] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await axios
      .get("http://localhost:4000/api/users")
      .then((res) => setQuote(res.data))
      .catch((error) => console.log(error));
  };

  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    getUsers();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let validation = text.trim();
    if (validation !== "") {
      await axios.post("http://localhost:4000/api/users", {
        name: text,
      });
      setText("");
    }
    getUsers();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                name="text"
                value={text}
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn_send">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {quote.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onDoubleClick={() => deleteUser(user._id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
