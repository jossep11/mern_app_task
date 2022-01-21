import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initailForm = {
  author: "",
  title: "",
  note: "",
};

function CreateNotes() {
  const [quote, setQuote] = useState([]);
  const [data, setData] = useState(initailForm);
  const [edit, setEdit] = useState(false);

  // const [title, setTitle] = useState("");
  // const [note, setNote] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getUsers();
    console.log(id);
    if (id) {
      setEdit(true);
      dataUpdate();
    } else {
      setEdit(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    let authorcheck = data.author.trim();
    let titlecheck = data.title.trim();
    let notecheck = data.note.trim();
    console.log(authorcheck + " " + titlecheck + " " + notecheck);
    if (edit === false) {
      if (authorcheck === "" || titlecheck === "" || notecheck === "") {
        console.log("you cannot do this");
      } else {
        await axios.post("http://localhost:4000/api/notes", {
          title: data.title,
          author: data.author,
          note: data.note,
        });
        setData({ author: "", title: "", note: "" });
      }
    } else {
      if (authorcheck === "" || titlecheck === "" || notecheck === "") {
        console.log("you cannot do this");
      } else {
        await axios.put(`http://localhost:4000/api/notes/${id}`, {
          title: data.title,
          author: data.author,
          note: data.note,
        });
        setData({ author: "", title: "", note: "" });
        getUsers();
      }
    }
  };

  const dataUpdate = async (e) => {
    const res = await axios.get(`http://localhost:4000/api/notes/${id}`);
    setData({
      author: res.data.author,
      title: res.data.title,
      note: res.data.note,
    });
  };

  const onInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const getUsers = async () => {
    const users = await axios
      .get("http://localhost:4000/api/users")
      .then((res) => {
        setQuote(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a Note</h4>

        {/* select user */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <select
              className="form-control"
              name="author"
              id="author"
              onChange={onInputChange}
              value={data.author}
            >
              <option value={""}>--------</option>
              {quote.map((user) => (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="title"
              name="title"
              id="title"
              value={data.title}
              onChange={onInputChange}
            />
            <div className="form-group">
              <textarea
                name="note"
                className="form-control"
                placeholder="content"
                value={data.note}
                onChange={onInputChange}
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn_send">
            {edit === false ? "Save" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNotes;
