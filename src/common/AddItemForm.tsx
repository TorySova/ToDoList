import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {TextField, IconButton} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	console.log('AddItemForm is called')
	let [title, setTitle] = useState<string>("");
	let [error, setError] = useState<string | null>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if(error !== null){
			setError(null)
		}
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
			<TextField
				color="primary"
				variant="outlined"
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
				label="Please enter text"
				size="small"
			/>
			<IconButton color="inherit" size="medium" onClick={addTask}>
				<PostAddIcon/>
			</IconButton>
		</div>
	)
});

export default AddItemForm;
