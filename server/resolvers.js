export const resolvers = {
    Query: {
        job: () => {
            return [
                {
                    id: '1',
                    title: 'Software Developer',
                    description: 'New SWE Dev | role'
                },
                {
                    id: '2',
                    title: 'Software Developer',
                    description: 'New SWE Dev || role'
                },
                
            ]
        }
    }
}