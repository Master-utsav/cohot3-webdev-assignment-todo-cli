const fs = require('fs')
const { Command } = require('commander')
const program = new Command()

program.name('Todo_CLI').description('CLI to do Todo tasks').version('1.0.0')

function readTodo () {
  const data = fs.readFileSync('./todo.json', 'utf8');
  if (data.trim() === '') {
    return [];
  }
  else{
      return JSON.parse(data);
  }
} 


function writeTodo (todos) {
  const data = JSON.stringify(todos, null, 2)
  fs.writeFileSync('./todo.json', data)
}

program
  .command('add <todo>')
  .description('add the new task in a todo.json')
  .action(todo => {
    const todos = readTodo()
    todos.push({todo, completed: false})
    writeTodo(todos)
  })

program
  .command('ls')
  .description('list all the tasks in a todo.json')
  .action(() => {
    const todos = readTodo()
    console.log(todos)
  })

program
  .command('done <taskNumber>')
  .description('Mark a task as completed')
  .action(taskNumber => {
    const todos = readTodo()
    const index = taskNumber - 1
    if (index >= 0 && index < todos.length) {
      todos[index].completed = true
      writeTodo(todos)
      console.log(`Task "${todos[index].todo}" marked as completed.`)
    } else {
      console.log('Task number is invalid.')
    }
  })

program
  .command('rm <taskNumber>')
  .description('Remove a task from the todo list')
  .action(taskNumber => {
    const todos = readTodo()
    const index = taskNumber - 1
    if (index >= 0 && index < todos.length) {
      const removed = todos.splice(index, 1)
      writeTodo(todos)
      console.log(`Removed task: "${removed[0].task}"`)
    } else {
      console.log('Task number is invalid.')
    }
  })

program.parse(process.argv)
