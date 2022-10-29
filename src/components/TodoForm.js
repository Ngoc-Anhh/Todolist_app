import React, { useState, useEffect, useRef, } from 'react'
function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null)
    const [myDeadline, setMyDeadline] = useState();

    useEffect(() => {
        inputRef.current.focus()
    });


    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleChangeDealine = e => {
        setMyDeadline(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            deadline: myDeadline,
        });
        setInput('');
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="todo-form">
                {props.edit ? (
                    <>
                        <input type="text"
                            placeholder="Edit a todo item"
                            value={input}
                            name="text"
                            className="todo-input edit"
                            onChange={handleChange}
                            ref={inputRef} />
                        <button onSubmit={handleSubmit} className="todo-button">Update</button>

                    </>
                ) :
                    (
                        <>
                            <input type="text"
                                placeholder="Add a todo item"
                                value={input}
                                name="text"
                                className="todo-input"
                                onChange={handleChange}
                                ref={inputRef} />
                            <button onSubmit={handleSubmit} className="todo-button">Add todo</button>
                            <label for="deadline" style={{ color: "white" }}>Deadline: </label>
                            <input type="date"
                                name="deadline"
                                onChange={handleChangeDealine}
                            />
                        </>
                    )

                }


            </form>

        </div>
    );
}

export default TodoForm;