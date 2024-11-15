import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});

// connection.on('query', (data) => { //* the query object defined here is sql query object not graphql object. The data represent the queries run by the apis on database

//   console.log('[db]: ' , data); //* data basically contains main key context values named sql and binding. Where sql- are the queries run on database and binding - contains the ids or find by column information
// })

//! In following code we are only extracting necessary context values from `data`- that are {sql, binding}
connection.on('query', ({ sql, bindings }) => {
  const query = connection.raw(sql, bindings).toQuery(); //toQuery is for converting it to string
  console.log('[db]: ', query)
}) // This logic we are implementing for looking at how many time the sql queries are running and how to resolve N+1 problem by using the dataLoader package.