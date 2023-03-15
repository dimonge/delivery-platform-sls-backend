import { Company } from "../../type";
import { getDB } from "../../utils";

async function updateCompany(company_id: number, data: Company): Promise<Company | null> {
  try {
    const db = await getDB()
    return await db.company.update({where: { id: company_id }, data })
  }catch(error) {
    console.log("Update company failed: ", error)
    return null;
  }
} 

export default updateCompany;