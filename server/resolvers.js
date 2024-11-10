import { GraphQLError } from 'graphql'
import { getCompany } from './db/companies.js';
import { createJob, deleteJob, getJob, getJobs, getJobsByCompany } from './db/jobs.js'

export const resolvers = {
    Query: {
        company: async (_root, { id }) => {
            const company = await getCompany(id);
            // if (!company) {
            //     throw new GraphQLError('Company Not Found with id ' + id, {
            //         extensions: { code: 'Not Found' }
            //     })
            // }
            //OR create utility function and use it as follows
            if (!company) {
                throw NotFoundError('Company Not Found with id ' + id)
            }
            return company;
        },
        // job: (_root, args) => {console.log(args) },
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
                throw NotFoundError('Job not found with id ' + id);
            }
            return job;
        },
        jobs: () => getJobs()
    },

    Mutation: {
        //!  Approach 1 for create Mutation
        // createJob: (_root, { title, description }) => {
        //     const companyId = 'FjcJCHJALA4i' // constant companyId for testing
        //     return createJob({ companyId, title, description })
        // }

        //! OR Approach 2 for create Mutation - by using input for mutation to create job
        createJob: (_root, { input: { title, description } }) => {
            const companyId = 'FjcJCHJALA4i' // constant companyId for testing //todo: set company id by logged in user
            return createJob({ companyId, title, description })
        },

        deleteJob: (_root, { id }) => deleteJob(id)
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id)
    },

    Job: {
        company: (job) => getCompany(job.companyId), // Resolver function for Object Association
        date: (job) => dateFormatter(job.createdAt)  // Field Conversion. To show date in different format
    }
};

function NotFoundError(message) {
    throw new GraphQLError(message, { extensions: { code: 'Not_Found', status: 401 } });
}

function dateFormatter(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}