import { useParams } from 'react-router';
import { companyByIdQuery } from '../lib/graphql/queries';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';

function CompanyPage() {
  const { companyId } = useParams();

  // const result = useQuery(companyByIdQuery, {
  //   variables: { id: companyId }
  // })
  // console.log('[CompanyPage] Data: ', result) 
  //? useQuery Hook from apolloClient to fetch data. without needing the useState and useEffect Hooks from react
  //! Destructuring the result [extracting the data object from result]
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: companyId }
  })
  console.log('[CompanyPage] Data: ', data, loading, error)
  // const { company } = data; //extracting or destructing the required data. [Note the graphQL useQuery Hook also provides loading and error with data]

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
        {data.company.name}
      </h1>
      <div className="box">
        {data.company.description}
      </div>

      <h2 className='title is-5'>Jobs at {data.company.name}</h2>
      <JobList jobs={data.company.jobs} />
    </div >
  );
}

export default CompanyPage;
