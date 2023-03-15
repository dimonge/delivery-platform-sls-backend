import { Company } from "../../type";
import { getDB } from "../../utils";

async function getCompanyById(company_id: number): Promise<Company | null> {
  try {
    const db = await getDB()
    return await db.company.findUnique({ where: { id: company_id }})
  }catch(error) {
    console.log("Get company by id failed: ", error)
    return null;
  }
} 

export default getCompanyById;