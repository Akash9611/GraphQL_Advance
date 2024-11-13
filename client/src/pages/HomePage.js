import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';


function HomePage() {
  const { jobs, loading, error } = useJobs();
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
    </div>
  );
}

export default HomePage;
