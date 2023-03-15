import { Task } from "../../type";
import { getDB } from "../../utils";

async function listTasksByCompanyId(company_id: number): Promise<Task[] | [] | null> {
  const db = await getDB()
  try {
    return await db.task.findMany({where: {company_id: company_id}});
  }catch(error) {
    console.log("get listTasksByCompanyId failed with error: ", error)
    return null
  }
}

export default listTasksByCompanyId;