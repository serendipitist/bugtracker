
import { useState } from 'react';
import './App.css';
import { v4 as uuid } from "uuid";
import BugTable from './buglistTable';

function App() {
  const [newBugDescription, setNewBugDescription] = useState("");
  const [newBugPriority, setNewBugPriority] = useState("Medium");
  const [bugList, setBugList] = useState([]);

  const addBug = (event) => {
    event.preventDefault();
    const newBug = {
      id: uuid(),
      description: newBugDescription,
      priority: newBugPriority,
    }

    setBugList(
      [
        ...bugList,
        newBug,
      ]
    );

    setNewBugDescription('');
    setNewBugPriority('Medium');
    console.log(bugList);
  };


  const deleteBug =(id)=>{
    const bugs = bugList.filter(bug => bug.id !== id);
    setBugList(bugs);
  };
  return (
    <div className="app">
      <h1> 🐞 Bug Tracker</h1>
      <form className="add-new-bug-form" onSubmit={addBug}>
        <label htmlFor='newBugDescription'>
         New Bug Description
        </label>
        <input type="text" id="newBugDescription" onChange={event=> setNewBugDescription(event.target.value)} value={newBugDescription}>
        </input>
        <select onChange={event => setNewBugPriority(event.target.value)} value={newBugPriority}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button data-testid="add-bug" type="submit" >Add New Bug</button>
      </form>
      <BugTable bugs={bugList} onDeleteBug={(id) => deleteBug(id)}></BugTable>
    </div>
  );
}

export default App;
