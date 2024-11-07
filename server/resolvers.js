import { getJobs } from './db/jobs.js'

export const resolvers = {
    Query: {
        jobs: () => getJobs()
    },

    Job: {
        date: (job) => dateFormatter(job.createdAt)
    }
};

function dateFormatter(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}