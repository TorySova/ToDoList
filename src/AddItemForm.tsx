import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
	let [title, setTitle] = useState<string>("");
	let [error, setError] = useState<string | null>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === "Enter") {
			addTask();
		}
	};

	const addTask = () => {
		if (title.trim() !== "") {
			props.addItem(title.trim());
			setTitle("")
		} else {
			setError("error")
		}
	};

	return (
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<button onClick={addTask}>Add</button>
			{error && <div className="error-message">{error}</div>}
		</div>
	)
}

export default AddItemForm;
