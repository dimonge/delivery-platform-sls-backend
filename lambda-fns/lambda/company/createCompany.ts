import { Company } from "../../type";
import { getDB } from "../../utils";

async function createCompany(data: Company): Promise<Company | null> {
  try {
    const db = await getDB();
    return await db.company.create({data})
  } catch(error) {
    return null;
  }
}

export default createCompany