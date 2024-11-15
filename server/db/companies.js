import { connection } from './connection.js';
import DataLoader from 'dataloader'
const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

export const companyDataLoader = new DataLoader(async (ids) => {
  console.log('[CompanyLoader] Ids:', ids);
  const companies = await getCompanyTable().select().whereIn('id', ids);
  return ids.map((id) => companies.find((company) => company.id === id));
})