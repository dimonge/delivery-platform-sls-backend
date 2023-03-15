type CommandEvent = {
  info: {
    fieldName: string;
  },
  arguments: {
    data: any
  }
}

export const handler = async (event: CommandEvent, context: any): Promise<any> => {  
  switch (event.info.fieldName) {
    case "createTask":        
      return null
    case "deleteTask": 
      return null
    case "updateTask": 
      return null;  
    default:
      return null;
  }
}