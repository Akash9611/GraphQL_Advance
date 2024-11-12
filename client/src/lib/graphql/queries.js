import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink, gql } from '@apollo/client'
// import { GraphQLClient, gql } from 'graphql-request' // // with gql 
// import { GraphQLClient } from 'graphql-request' ////without gql
import { getAccessToken } from '../auth';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { 'Authorization': `Bearer ${accessToken}` };
//     }
//     return {};
//   }
// });

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
  }
  return forward(operation);
})

const apolloClient = new ApolloClient({
  // uri: 'http://localhost:9000/graphql',
  link: concat(authLink, httpLink), //concat used to combine multiple links
  cache: new InMemoryCache(),

  // To Use the Fresh API call or latest data on every page visit by calling the API [Because by default it store the data in cache and won't make any api call util the page reloads. Every time you visit the same page it will show you the same data on it[it only calls the API once when you visit the page and stores the data in cache and next time you visit the same page it won't give any call to api, instead it will show the data that is available in cache] To handle API call on every time use following login for every API]
  // defaultOptions: {
  //   query:{
  //     fetchPolicy: 'network-only'
  //   },
  //   watchQuery: 'network-only'
  // }
})

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!){
      # createJob(input:$input){ ## return result with object keyValue "createJob":{object data}  
      job: createJob(input:$input){ # renaming the result object keyValue "createJob" to "job" 
        id
      }
    }
  `;
  //* With GraphQLClient form graphql-request package
  // const { job } = await client.request(mutation, {
  //   input: { title, description }
  // });
  // return job;

  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } }
  });
  return data.job;
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

  //* With GraphQLClient form graphql-request package
  // const { company } = await client.request(query, { id });
  // return company;

  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company;
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

  // With GraphQLClient form graphql-request package
  // const data = await client.request(query, { id })
  // return data.job;
  //OR directly extract the job object from the data
  // const { job } = await client.request(query, { id })
  // return job;

  // const result = await apolloClient.query({ query, variables: { id } });
  // return result.data.job;
  //OR with destructuring
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.job;
}

export async function getJobs() {
  const query = gql`
    query Jobs{
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
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: 'network-only'
  });
  return data.jobs;
}
