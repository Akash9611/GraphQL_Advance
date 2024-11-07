import { getJobs } from './db/jobs.js'

export const resolvers = {
    Query: {
        job: () => getJobs()
    }
}