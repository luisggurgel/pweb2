import React, { useState } from 'react';

export default function TodoList() {
  // declaracao dos estados para tarefas, input do formulario e filtro
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // funcao para lidar com a adicao de novas tarefas
  const handleAddTask = (e) => {
    // previne o comportamento padrao de recarregar a pagina no submit
    e.preventDefault();
    
    // verifica se o input nao esta vazio antes de adicionar
    if (input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false
      };
      // atualiza o estado com a nova tarefa e limpa o campo de input
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  // funcao para alternar o status de conclusao da tarefa
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // funcao para remover uma tarefa da lista
  const handleRemoveTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  };

  // logica de renderizacao condicional para o filtro atual
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // retorna todas por padrao se o filtro for 'all'
  });

  return (
    <div>
      {/* formulario com evento onsubmit e input com onchange */}
      <form onSubmit={handleAddTask}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="digite uma nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* botoes de filtro com indicacao visual de selecao em negrito */}
      <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', gap: '5px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          Todas
        </button>
        <button 
          onClick={() => setFilter('pending')}
          style={{ fontWeight: filter === 'pending' ? 'bold' : 'normal' }}
        >
          Pendentes
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
        >
          Concluídas
        </button>
      </div>

      {/* lista de tarefas mapeada e renderizada dinamicamente */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            {/* checkbox para marcar/desmarcar a tarefa */}
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggleTask(task.id)} 
            />
            
            {/* renderizacao condicional do estilo para texto riscado */}
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              marginLeft: '8px',
              marginRight: '8px'
            }}>
              {task.text}
            </span>
            
            {/* botao de deletar com evento onclick */}
            <button onClick={() => handleRemoveTask(task.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}