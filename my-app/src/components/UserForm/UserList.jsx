import { Button, Input } from 'antd'
import React, { useState } from 'react'

 const  UserList=({task,onDelete,onEdit})=> {
    const [isEditing,setEditing]=useState(false)
    const [editingTask,setEditingTask]=useState(task)
    const handleSave=()=>{
        onEdit(editingTask)
        setEditing(false)
    }
  return (
    <>
    <div>
        {isEditing ?(
            <div>
                <Input 
                value={editingTask}
                onChange={(e)=>setEditingTask(e.target.value)} 
                />
                <Button type='primary' onClick={handleSave}>Save</Button>               
            </div>
            

        ):(
            <div>
                <span>{task}</span>
                <Button onClick={()=>onDelete(task)}>Delete</Button>
                <Button onClick={()=>setEditing(true)}>Edit</Button>
            </div>
        )
    }
    </div>
    
    
    </>
  )
}
export default UserList
