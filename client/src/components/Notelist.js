import { React, useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import routes from "./routes";

export default function Notelist() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await axios
      .get("http://localhost:4000/api/notes")
      .then((res) => setNotes(res.data))
      .catch((error) => console.log(error));
  };

  const deleteNote = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    getUsers();
  };

  return (
    <div className="row">
      {notes.length > 0 ? (
        notes.map((notes) => (
          <div className="col-md-4 p-2" key={notes._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>Title:{notes.title}</h5>
                <Link
                  className="btn btn-secondary"
                  to={routes.edit + notes._id}
                >
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>Author: {notes.author}</p>
                <p>Note: {notes.note}</p>
                <p>
                  <TimeAgo date={notes.createdAt} />
                </p>
              </div>
              <div className="card-footer ">
                <button
                  className="btn btn-danger btn_delete"
                  onClick={() => deleteNote(notes._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card-header">
          <h5>No hay data</h5>
        </div>
      )}
    </div>
  );
}
