import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
	value: string
	changeValue: (value: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
	let [editMode, setEditMode] = useState(false);
	let [title, setTitle] = useState(props.value)

	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const activatedEditMode = () => {
		setEditMode(true)
	}

	const deActivatedEditMode = () => {
		setEditMode(false);
		if(title.trim()){
			props.changeValue(title)
		}
	}

	return editMode
		? <TextField variant="standard" value={title} onBlur={deActivatedEditMode} autoFocus={true} onChange={onChangeTitle} />
		: <span onDoubleClick={activatedEditMode}> {props.value} </span>
};

export default EditableSpan;
