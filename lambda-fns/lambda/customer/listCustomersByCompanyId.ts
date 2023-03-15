import { Customer } from "../../type";
import { getDB } from "../../utils";

async function listCustomersByCompanyId(company_id: number): Promise<Customer[] | [] | null> {
  const db = await getDB()
  try {
    return await db.customer.findMany({where: {company_id: company_id}});
  }catch(error) {
    console.log("listCustomersByCompanyId failed: ", error)
    return null
  }
}

export default listCustomersByCompanyId;