import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function App() {
  const [tasks, setTasks] = useState([]);
  const [job, setJob] = useState();
  const [name, setName] = useState();
  const [cv, setCV] = useState(null);

  function handleChange(event) {
    setCV(event.target.value);
    console.log(event)
  }
  // const handleChange = e => {
  //   console.log(e.target.files[0]);
  //   setCV(e.target.files[0]);
  // };
  function handleSubmit(event) {
    console.log(cv)
    event.preventDefault();
    const url = "http://127.0.0.1:8000/api/file";
    // const updTask = {
    //   cv,
    //   name,
    //   job
    // };
    let formData = new FormData(); 
    formData.append("job", job); //append the values with key, value pair
    formData.append("name", name);
    formData.append("cv", cv);
    if (event.target.files) {
      setTasks(event.target);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }
  useEffect(() => {
    const getTasks = async () => {
      const UserFromServer = await fetchTasks();
      setTasks(UserFromServer);
    };

    getTasks();
  }, []);
  //fetch from server
  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/file");
    const data = await res.json();
    console.log(data);
    return data;
  };

  return (
    <div className="App">
      <Container>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>React File Upload</h1>
          <input
            type="text"
            className="form-control m-2"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control m-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="file"
            className="form-control m-2"
            value={cv}
            onChange={handleChange}
            // onChange={(e) => setCV(e.target.value)}
            required
          />
          {/* <input type="file" onChange={handleChange} /> */}
          <Button type="btn" variant="primary">
            Upload
          </Button>{" "}
          {/* <button type="submit">Upload</button> */}
        </form>
        <hr />
        <div className="main-table">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Job</th>
                <th scope="col">Name</th>
                <th scope="col">Cv</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((data, index) => (
                <tr key={data.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.job}</td>
                  <td>{data.name}</td>
                  <td>{data.cv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default App;
