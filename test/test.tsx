'use client';

import React, { useState } from 'react';
import styles from './test.module.css';

export default function Test(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<{ text: string; isDone: boolean }[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    // Check if the input value is empty
    if (inputValue.trim() === '') {
      alert('Please enter a to-do item.');
      return;
    }
    setTodos([...todos, { text: inputValue, isDone: false }]);
    // Clear the input field after adding the todo
    setInputValue('');
  };

  // Handle Enter key press to add todo
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const editTodo = (index: number) => {
    const newTodos = todos.map((todo, i) => {
      // Only allow editing if the todo is not done
      if (i === index && !todo.isDone) {
        const newText = prompt('Edit your to-do item:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          return { ...todo, text: newText };
        }
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Toggle the isDone state of the todo item
  const toggleTodo = (index: number) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>
      <h1>To-Do List</h1>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={inputValue}
          placeholder='Enter a new to-do item'
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index}>
            <span className={todo.isDone ? styles.isDone : ''} onClick={() => toggleTodo(index)}>
              {todo.text}
            </span>
            <div className={styles.buttonBox}>
              {!todo.isDone && <button onClick={() => editTodo(index)}>Edit</button>}
              <button
                onClick={() => {
                  const newTodos = todos.filter((_, i) => i !== index);
                  setTodos(newTodos);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
