import { Company } from "../../type";
import { getDB } from "../../utils";

async function deleteCompany(company_id: number): Promise<Company | null> {
  try {
    const db = await getDB()
    return await db.company.delete({ where: { id: company_id }})
  }catch(error) {
    console.log("Get company by id failed: ", error)
    return null;
  }
} 

export default deleteCompany;