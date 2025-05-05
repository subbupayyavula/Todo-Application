import React from 'react'

function Todolist({todolist}) {
  return (
    <div>
   {
    todolist.map((todo,index)=>
      <div key={index}>
              <h5>{todo.task}</h5>
        <h5>{ todo.description}</h5>
        <h5>{todo.current}</h5>
        <h5>{todo.Reminders}</h5>
        </div>
    )
   }
    </div>
  )
}

export default Todolist