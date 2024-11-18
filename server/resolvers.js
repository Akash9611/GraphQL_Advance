import { GraphQLError } from 'graphql'
import { getCompany } from './db/companies.js';
import { createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from './db/jobs.js'

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
                throw notFoundError('Company Not Found with id ' + id)
            }
            return company;
        },
        // job: (_root, args) => {console.log(args) },
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
                throw notFoundError('Job not found with id ' + id);
            }
            return job;
        },
        // jobs: () => getJobs()
        // Setting Limit for pagination
        jobs: (_args, { limit, offset }) => getJobs(limit, offset)
    },

    Mutation: {
        //!  Approach 1 for create Mutation
        // createJob: (_root, { title, description }) => {
        //     const companyId = 'FjcJCHJALA4i' // constant companyId for testing
        //     return createJob({ companyId, title, description })
        // }

        //! OR Approach 2 for create Mutation - by using input for mutation to create job
        createJob: (_root, { input: { title, description } }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing User Authentication');
            }
            // console.log('[CreateJob] user: ', user)
            return createJob({ companyId: user.companyId, title, description }) // The job is get created with the companyId that belongs to the USER who creating the job
        },

        updateJob: async (_root, { input: { id, title, description } }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing User Authentication');
            }

            const job = await updateJob({ id, title, description, companyId: user.companyId });
            if (!job) {
                throw notFoundError('Job not found with job id: ' + id)
            }
            return job;
        },

        deleteJob: async (_root, { id }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing User Authentication');
            }

            const job = await deleteJob(id, user.companyId);
            if (!job) {
                throw notFoundError('Job not found with job id: ' + id)
            }
            return job;
        },
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id)
    },

    Job: {
        // Without dataLoader package logic
        // company: (job) => getCompany(job.companyId), // Resolver function for Object Association
        // //! With dataLoader package logic [with global dataLoader function and with constant cache storing]
        // company: (job) => companyDataLoader.load(job.companyId), // Resolver function for Object Association

        //! DataLoader package logic [with context dataLoader function] Per-Request Cache
        company: (job, _args, { companyLoader }) => {
            return companyLoader.load(job.companyId);
        },

        date: (job) => dateFormatter(job.createdAt)  // Field Conversion. To show date in different format
    }
};

function notFoundError(message) {
    throw new GraphQLError(message, { extensions: { code: 'Not_Found', status: 404 } });
}

function unauthorizedError(message) {
    throw new GraphQLError(message, { extensions: { code: 'UNAUTHORIZED' } })
}
function dateFormatter(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}