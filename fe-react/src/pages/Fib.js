import axios from "axios";
import { useState, useEffect } from "react";

export const Fib = () => {
  const [index, setIndex] = useState("");
  const [listOfIndexes, setListOfIndexes] = useState([]);
  const [setOfCalculateFib, setFib] = useState({});

  const _fetchAllIndexes = async () => {
    const resData = await axios.get("/api/values/all");
    setListOfIndexes(resData.data);
  };

  const _fetchAllCalFib = async () => {
    const resFib = await axios.get("/api/values/current");
    setFib(resFib.data);
  };

  useEffect(() => {
    _fetchAllCalFib();
    _fetchAllIndexes();
  }, []);

  const _renderIndexesUI = () => {
    return listOfIndexes.map((item, i) => {
      return (
        <span key={i}>
          {item.number} {i > 0 ? ", " : ""}
        </span>
      );
    });
  };

  const _renderFibUI = () => {
    const entries = [];

    for (const key in setOfCalculateFib) {
      entries.push(
        <div key={key}>
          Index #{key} | has been calculated to {setOfCalculateFib[key]}
        </div>
      );
    }

    return entries;
  };

  const _submitHandler = () => {
    axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  return (
    <div
      className="container"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <form onSubmit={_submitHandler} style={{ width: "20rem" }}>
        <div className="form-group d-flex align-items-center">
          <label
            className="form-label"
            htmlFor="index"
            style={{ marginRight: "2rem" }}
          >
            Index
          </label>
          <input
            type="text"
            className="form-control mr-4"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            style={{ marginRight: "2rem" }}
          />
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </div>
      </form>
      <hr />
      <h3>Indexes have seen</h3>
      {_renderIndexesUI()}
      <hr />
      <h3>Fib calculated</h3>
      {_renderFibUI()}
    </div>
  );
};
