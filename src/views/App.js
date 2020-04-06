import React, { useState, useEffect } from 'react';

import '../styles/global.css';
import './App.css';
import api from '../services/api';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('tasks', {}).then(response => {
        setTasks(response.data);
    })
}, []);


function handleReset(){
  setTitle('')
  setDescription('')
  setTag('')
}

  async function handleSubmit(e){
    e.preventDefault();

    const data = {
      title,
      description,
      tag
    };

    try {
      await api.post('tasks', data);
      handleReset();
      document.location.reload();
    } catch(err) {
      return alert("something wrong inst right")
    }
  }

  async function handleDelete(id){
    try {
      await api.delete(`tasks/${id}`)
      setTasks(tasks.filter(task => task.id !== id))
    } catch(err) {
      console.log(err)
      return alert('mano, nao conseguimos apagar, tenta outra vez')
    }
  }

  return (
    <div className="application">
      <h1>Welcome to Task Maker</h1>
      <p>Here you can create your own tasks</p>
      <section className="form-and-list">
        <fieldset>
          <legend>Lista de tasks</legend>
          <ul>
            {tasks.map(task => (
              <li>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <span>{task.tag}</span>
                <button type="button" onClick={() => handleDelete(task.id)}>Apagar</button>
            </li>
            ))}
          </ul>
        </fieldset>
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Cadastre sua task</legend>
              <input 
                type="text" 
                placeholder="Digite o título" 
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input 
                placeholder="tag"
                value={tag}
                onChange={e => setTag(e.target.value)}
              />
              <button type="submit">Cadastrar</button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
