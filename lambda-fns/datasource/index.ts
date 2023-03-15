
import { createTask, listTasksByCompanyId, listTasksAssignedToFleetByCompanyIdAndType, updateTask, deleteTask } from "../lambda"
import { createCompany, deleteCompany, getCompanyById, updateCompany } from "../lambda/company"
import postCustomer from "../lambda/customer/createCustomer"
import listCustomersByCompanyId from "../lambda/customer/listCustomersByCompanyId"
import updateCustomer from "../lambda/customer/updateCustomer"
import { Company, Customer, Task } from "../type"

type TaskSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    type: string;
    
    fleet_id: number;

    task: Task;
    task_id: number;

    company: Company;
    company_id: number;

    customer: Customer;
    customer_id: number;
  }
}

/**
 * The lambda function for handling tasks graphql APIs
 * @param event
 */

type AppSyncProps = Promise<Record<string, unknown>[] | Record<any, any> | Task | Company | Customer | string | null | undefined> 
exports.handler = async (event: TaskSyncEvent, context: any): AppSyncProps => {
  context.callbackWaitsForEmptyEventLoop = false
  
  switch(event.info.fieldName) {

    // tasks API
    /*case "createTask":
    return await createTask({
      task: event.arguments.task, 
      customer: event.arguments.customer
    })*/
    case "listTasksByCompanyId":
      return await listTasksByCompanyId(event.arguments.company_id)
    case "listTasksAssignedToFleetByCompanyIdAndType":
      return await listTasksAssignedToFleetByCompanyIdAndType({
        fleet_id: event.arguments.fleet_id, 
        company_id: event.arguments.company_id, 
        type: event.arguments.type
      })
    case "updateTask":
      return await updateTask({
        task_id: event.arguments.task_id, 
        task: event.arguments.task
      })
    case "deleteTask":
      return await deleteTask(event.arguments.task_id)
    
    // companies API
    case "createCompany":
      return await createCompany(event.arguments.company)
    case "deleteCompany":
      return await deleteCompany(event.arguments.company_id)
    case "getCompanyById":
      return await getCompanyById(event.arguments.company_id)
    case "updateCompany":
      return await updateCompany(event.arguments.company_id, event.arguments.company)

    // customer API
    case "createCustomer":
      return await postCustomer(event.arguments.customer)
    case "updateCustomer": 
      return await updateCustomer(event.arguments.customer_id, event.arguments.customer)
    case "listCustomersByCompanyId":
      return await listCustomersByCompanyId(event.arguments.company_id)

    default:
      return null;
  }
}