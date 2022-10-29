import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Modal from 'react-modal';
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { RiCalendarTodoLine, RiCheckboxFill } from 'react-icons/ri';

const TODO_APP_STORAGE_KEY = "TODO_APP";

function TodoList() {
    const [todos, setTodos] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
        if (storagedTodoList) {
            setTodos(JSON.parse(storagedTodoList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = todo => {
        const newTodos = [todo, ...todos]

        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        if (newTodos.length !== 0) {
            var i = 1
            while (i < newTodos.length) {
                if (newTodos[i].text === todo.text) {
                    setModalIsOpen(true);
                }
                i++;
            }
        }
        setTodos(newTodos)
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? { ...item, text: newValue.text } : item)));
    };

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h2>What is your plan?</h2>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo}
                removeTodo={removeTodo} updateTodo={updateTodo} />
            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Ooops!</h2>
                <p>It's look like you already add this task...</p>
                <button onClick={() => setModalIsOpen(false)}>I Know</button>
            </Modal>
            <div>
                <h2>Timeline</h2>
                <VerticalTimeline>
                    {todos.map((todo) => {
                        return (
                            <VerticalTimelineElement
                                key={todo.id}
                                date={todo.deadline}
                                className="vertical-timeline-element--work"
                                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                                contentStyle={{ color: "white", background: "#6495ed" }}
                                contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                                icon={!todo.isCompleted ? <RiCalendarTodoLine /> : <RiCheckboxFill />}
                            >
                                <h3 className="vertical-timeline-element-title">
                                    {todo.text}
                                </h3>

                                {!todo.isComplete && (
                                    <button onClick={() => completeTodo(todo.id)} style={{ padding: 9, margin: 3, backgroundColor: '#ADFF2F', color: 'black', borderRadius: 5 }} >
                                        complete
                                    </button>
                                )}
                            </VerticalTimelineElement>
                        )
                    })}
                </VerticalTimeline>
            </div>
        </div>

    );
}

export default TodoList;
