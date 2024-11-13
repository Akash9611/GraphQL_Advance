import { useParams } from 'react-router';
import { companyByIdQuery } from '../lib/graphql/queries';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';
import { useCompany } from '../lib/graphql/hooks';

function CompanyPage() {
  const { companyId } = useParams();
  //! React custom hook with useQuery hook
  const { company, loading, error } = useCompany(companyId);
  console.log('[CompanyPage] Data: ', company, loading, error)


  // //? useQuery Hook from apolloClient to fetch data. without needing the useState and useEffect Hooks from react
  // // const result = useQuery(companyByIdQuery, {
  // //   variables: { id: companyId }
  // // })
  // // console.log('[CompanyPage] Data: ', result) 
  // //! Destructuring the result [extracting the data object from result]
  // const { data, loading, error } = useQuery(companyByIdQuery, {
  //   variables: { id: companyId }
  // })
  // console.log('[CompanyPage] Data: ', data, loading, error)

  //! Now when we use apolloClient useQuery Hook we don't need to write the following commented code to get the data. 
  // const [state, setState] = useState({
  //   company: null,
  //   loading: true,
  //   error: false
  // });

  // useEffect(() => {
  //   // getCompany(companyId).then(setCompany);
  //   (async () => {
  //     try {
  //       const company = await getCompany(companyId);
  //       setState({ company, loading: false, error: false });
  //     } catch {
  //       setState({ company, loading: false, error: true });
  //     }
  //   })();

  // }, [companyId])

  // console.log('[CompanyPage] Company: ', state);

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
