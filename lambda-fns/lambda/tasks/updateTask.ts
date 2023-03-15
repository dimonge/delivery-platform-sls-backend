import { dbClient, getDB } from "../../utils";

import { Task } from "../../type"

type updateTaskType = {
  task_id: number;
  task: Task
}

async function updateTask({task_id, task}: updateTaskType): Promise<Task | null | undefined> {
  try {
    const db = await getDB()    
    return await db.task.update({where: { id: task_id }, data: task });
  } catch(error) {
    console.log("updateTask failed with error: ", error)
    return null
  }
}
export default updateTask;