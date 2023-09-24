import { Button, Input, List } from "antd";
import React, { useState } from "react";
import TodoList from "./TodoList/TodoList";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };
  const handleDelete = (index) => {
    const updatedTasks = [...tasks]; 
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks); 
  };
  
  const handelEditTask = (editedTask, index) => {
    const updatedTask = [...tasks];
    updatedTask[index] = editedTask;
    setTasks(updatedTask);
  };
  return (
    <>
      <h1>Todo App</h1>
      <div>
        <Input
          placeholder="enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
        <List
          dataSource={tasks}
          renderItem={(task, index) => {
            return <List.Item>
                <TodoList
                task={task}
                onDelete={handleDelete}
                onEdit={(editedTask)=>handelEditTask(editedTask,index)}
                />

            </List.Item>;
          }}
        />
      </div>
    </>
  );
}
export default TodoApp;
