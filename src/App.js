import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchJobs = () => {
    setLoading(true);
    axios
      .get(url)
      .then((jobs) => {
        setJobs(jobs.data);
        setLoading(false);
        console.log(jobs.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <main>
        <section className="section">
          <h1 className="loading">Loading...</h1>
        </section>
      </main>
    );
  }
  const { company, dates, duties, title } = jobs[index];

  return (
    <main>
      <section className="section">
        <header className="title">
          <h2>experience</h2>
          <div className="underline"></div>
        </header>
        <section className="jobs-center">
          <article className="btn-container">
            {jobs.map((job, i) => {
              return (
                <button
                  className={`job-btn ${i === index && "active-btn"}`}
                  key={job.id}
                  onClick={() => setIndex(i)}
                >
                  {job.company}
                </button>
              );
            })}
          </article>
          <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {duties.map((duty, i) => {
              return (
                <div className="job-desc" key={i}>
                  <FaAngleDoubleRight className="job-icon" />
                  <p>{duty}</p>
                </div>
              );
            })}
            <button className="btn">more info</button>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
