import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';
import { useEffect, useState } from 'react';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  // const [company, setCompany] = useState();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false
  });

  useEffect(() => {
    // getCompany(companyId).then(setCompany);
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({ company, loading: false, error: false });
      } catch {
        setState({ company, loading: false, error: true });
      }
    })();

  }, [companyId])

  const { company, loading, error } = state;
  console.log('[CompanyPage] Company: ', state);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className=''>Not Found</div>
  }
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

      <h2 className='title is-5'>Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div >
  );
}

export default CompanyPage;
