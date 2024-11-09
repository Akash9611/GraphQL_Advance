import { GraphQLError } from 'graphql'
import { getCompany } from './db/companies.js';
import { getJob, getJobs, getJobsByCompany } from './db/jobs.js'

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