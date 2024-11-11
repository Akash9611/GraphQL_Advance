import { GraphQLClient, gql } from 'graphql-request'
import { getAccessToken } from '../auth';

const client = new GraphQLClient('http://localhost:9000/graphql', {
  headers: () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return { 'Authorization': `Bearer ${accessToken}` };
    }
    return {};
  }
});

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!){
      # createJob(input:$input){ ## return result with object keyValue "createJob":{object data}  
      job: createJob(input:$input){ # renaming the result object keyValue "createJob" to "job" 
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: { title, description }
  });
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs{
            id
            date
            title
        }
      }  
    }
    `;

  const { company } = await client.request(query, { id });
  return company;
}

export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
        job(id: $id) {
            id
            title
            date
            description
            company {
              id
              name
            }
        }
    }
    `;

  // const data = await client.request(query, { id })
  // return data.job;
  //OR directly extract the job object from the data
  const { job } = await client.request(query, { id })
  return job;
}

export async function getJobs() {
  const query = gql`
    query{
        jobs {
          id
          title
          date
          company {
            id
            name
          }
        }
      }
      `;

  const { jobs } = await client.request(query);
  return jobs;
}
