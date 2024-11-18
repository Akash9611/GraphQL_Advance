import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';

const SET_PER_PAGE_LIMIT = 5

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs(SET_PER_PAGE_LIMIT, (currentPage - 1) * SET_PER_PAGE_LIMIT);
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className=''>Not Found</div>
  }

  // const [jobs, setJobs] = useState([]);
  // useEffect(() => {
  //   // getJobs().then((job) => setJobs(job));
  //   // OR clean code writing 
  //   getJobs().then(setJobs)
  // }, [])

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span style={{ 'padding': 10 }}>{currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default HomePage;
