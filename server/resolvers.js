import { getCompany } from './db/companies.js';
import { getJobs } from './db/jobs.js'

export const resolvers = {
    Query: {
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