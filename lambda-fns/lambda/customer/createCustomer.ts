import { Customer } from "../../type";
import { createCustomer } from "../../type/Customer";
import { getDB } from "../../utils";

async function postCustomer(data: Customer): Promise<Customer | null> {
  try {
    const db = await getDB()
    const customerAsync = createCustomer(db)
    let cust = await customerAsync(data);
    return null;
  } catch(error) {
    console.log("Create Customer failed: ", error)
    return null;
  }
}

export default postCustomer;