import { Customer } from "../../type";
import { getDB } from "../../utils";

async function updateCustomer(customer_id: number, customer: Customer): Promise<Customer | null> {
  try {
    const db = await getDB()
    return await db.customer.update({where: {id: customer_id}, data: customer})
  } catch(error) {
    console.log("Update customer failed: ", error)
    return null;
  } 
}

export default updateCustomer;