const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const companies = [
  {
    id: 'company1',
    name: 'Company A',
    description: LOREM,
  },
  {
    id: 'company2',
    name: 'Company B',
    description: LOREM,
  },
];

export const jobs = [
  {
    id: 'job1',
    title: 'Job 1',
    date: '2024-01-21',
    company: companies[0],
    description: LOREM,
  },
  {
    id: 'job2',
    title: 'Job 2',
    date: '2024-01-22',
    company: companies[1],
    description: LOREM,
  },
];
