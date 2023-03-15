import { Task } from "../../type"
import { dbClient, getDB } from "../../utils"


type listTasksAssignedToFleetByCompanyIdAndTypeProps = {
  company_id: number;
  fleet_id: number;
  type: string;
}

async function listTasksAssignedToFleetByCompanyIdAndType({company_id, fleet_id, type}: 
    listTasksAssignedToFleetByCompanyIdAndTypeProps): Promise<Task[] | [] | null> {
  try {
    const db = await getDB();
    return await db.task.findMany({where: {company_id, fleet_id, type}})
  }catch(error) {
    console.log("Get listTasksAssignedToFleetByCompanyIdAndType failed with error: ", error)
    return null;
  }
}

export default listTasksAssignedToFleetByCompanyIdAndType