import { getCompany } from './db/companies.js';
import { getJob, getJobs } from './db/jobs.js'

export const resolvers = {
    Query: {
        company: (_root, { id }) => getCompany(id),
        // job: (_root, args) => {console.log(args) },
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs()
    },

    Job: {
        company: (job) => getCompany(job.companyId), // Resolver function for Object Association
        date: (job) => dateFormatter(job.createdAt)  // Field Conversion. To show date in different format
    }
};

function dateFormatter(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}