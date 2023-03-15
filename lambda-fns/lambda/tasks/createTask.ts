import { Prisma, Task } from "@prisma/client";
import { createCustomer, getId } from "../../type/Customer";
import { getDB } from "../../utils"

/**
 * Create task function is used to create new tasks that can be dispatched. 
 * @param data takes task and customer data 
 *  CUSTOMER 
 *    IF customer has id, THEN validate the customer is present in the database
 *    ELSEIF it's a new customer, THEN create new customer.
 *  TASK
 *    CREATE NEW TASK
 * @returns new tasks.
 */

interface CreateTaskProps {
  //task: Prisma.TaskCreateInput;
  customer: Prisma.CustomerCreateInput | Prisma.CustomerFindUniqueArgs;
}
async function createTask({ customer }: CreateTaskProps): Promise<CreateTaskProps | null> {
  try {
    const db = await getDB();
    return null
  } catch(error) {
    console.log("createTask failed with error: ", error)
    return null
  }
}

export default createTask;