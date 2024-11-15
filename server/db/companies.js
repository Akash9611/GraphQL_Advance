import { connection } from './connection.js';
import DataLoader from 'dataloader'
const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

//! Global DataLoader for constant cache storing [with this global dataLoader definition if we make call or query the database it will store the data in the cache and next time we call api it won't query the database instead it will give us the data stored in the cache] 
// export const companyDataLoader = new DataLoader(async (ids) => {
//   console.log('[CompanyLoader] Ids:', ids);
//   const companies = await getCompanyTable().select().whereIn('id', ids);
//   return ids.map((id) => companies.find((company) => company.id === id));
// })

//! local or context DataLoader definition for resolving problem of constant cache and make or to make call ro query the database every time to retrieve the latest data. [This function will use in server.js file] Also we can call it as "Per-Request Cache".
export function createCompanyDataLoader() {
  return new DataLoader(async (ids) => {
    console.log('[CompanyLoader] Ids:', ids);
    const companies = await getCompanyTable().select().whereIn('id', ids);
    return ids.map((id) => companies.find((company) => company.id === id));
  })
}