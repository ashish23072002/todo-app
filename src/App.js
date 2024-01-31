//Continue the prject from left-over .. from this point - Deleting the data entry by clicking on delete icon
//   https://www.youtube.com/watch?v=cusrV--_6nc&list=PLg8h8Ej1e8l3YF-GTW1gxmDISO-qt_RSk&ab_channel=CodersArts
import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {

  const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);


  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };
    // console.log (newToDoObj);
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newToDoObj);
    // console.log (updatedTodoArr);
    setAllTodos (updatedTodoArr);
    localStorage.setItem (' ', JSON.stringify (updatedTodoArr));
    setNewDescription ('');
    setNewTodoTitle ('');
  };
  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    if (savedTodos) {
      setAllTodos (savedTodos);
    }

  }, []);
  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index,1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setAllTodos (reducedTodos);
  };


  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className="todo-input-item">
            <label>Title: </label>
            <input type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle (e.target.value)}
             placeholder="What's the title of your To Do? "></input>
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"              
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              onClick={handleAddNewToDo}
             className="primary-btn"type="button">Add</button>
          </div>
        </div>

        <div className="btn-area">
            <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} 
            onClick={() => setIsCompletedScreen (false)}
            >To Do
            </button>
            <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
            >Completed</button>
          </div>

          <div className="todo-list">
          {allTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  

                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete (index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
          
                  />
                </div>
              </div>
            )) }       
          </div>
      </div>
    </div>
  );
}

export default App;
