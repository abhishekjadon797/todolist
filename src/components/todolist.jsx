

import { useState } from "react";

export default function ToDoList() {
  let [tasks, setTasks] = useState([]);

  function onaddtask(task) {
    setTasks([...tasks, task]);
  }

  function removetask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  function handletoggletask(id) {
    setTasks(tasks => tasks.map(task => task.id === id ? { ...task, isdone: !task.isdone } : task));
  }

  return (
    <>
      <Form addtask={onaddtask} />
      <TaskList tasks={tasks} ondeletetask={removetask} oncheck={handletoggletask} />
      <Stats tasks={tasks} />
    </>
  );
}

function Form({ addtask }) {
  const [task, setTask] = useState("");

  function issubmit(e) {
    e.preventDefault();
    if (task === "") { return; }

    let newobj = {
      id: Math.trunc(Math.random() * 10), 
      task: task,
      isdone: false,
    };
    addtask(newobj);
    setTask('');
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <h2>Todolist</h2>
              </div>
              <div className="card-body">
                <form onSubmit={issubmit}>
                  <input type="text" placeholder="enter Tasks" value={task} onChange={(e) => setTask(e.target.value)} />
                   <br/><input type="submit" className="btn btn-danger mt-2" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TaskList({ tasks, ondeletetask, oncheck }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <ul className="list-group">
                  {tasks.map((task) => (
                    <Task task={task} key={task.id} ondeletetask={ondeletetask} oncheck={oncheck} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Task({ task, ondeletetask, oncheck }) {
  return (
    <>
      <li className="list-group-item">
      <input type="checkbox" className="form-check-input" onChange={() => oncheck(task.id)} checked={task.isdone} />
        <span>{task.task}</span>
        <button className="btn float-end" onClick={() => ondeletetask(task.id)}>❌</button>
      </li>
    </>
  );
}

function Stats({ tasks }) {
  let Totaltask = tasks.length;
  if (Totaltask === 0) {
    return <h1>your tasklist is empty , please add some task</h1>;
  }

  let completedtask = tasks.filter(task => task.isdone).length;
  let percentage = Math.trunc((completedtask / Totaltask) * 100);

  return (
    <>
      {percentage === 100 ?
        <h1 className="text-success">congratulation you have completed your all task😊</h1> :
        <h1>you have {Totaltask} item in your tasklist, Then you have completed {completedtask} Tasks.({percentage}%)</h1>
      }
    </>
  );
}

