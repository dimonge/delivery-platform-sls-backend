import { Task } from "../../type"
import { TASK_ID } from "../../type/Task"
import { getDB } from "../../utils"

async function deleteTask(taskId: number): Promise<Task | null> {
  try {
    const db = await getDB()
    return await db.task.update({where: {id: taskId }, data: { deleted_at: new Date(), deleted_by: TASK_ID }})  
  } catch(error) {
    console.log("delete Task failed with error: ", error)
    return null
  }
}

export default deleteTask