import React from 'react';
import {action} from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0';
import EditableSpan from './EditableSpan';

export default {
	title: 'EditableSpan Component',
	component: EditableSpan,
} as Meta;

export const EditableSpanBaseExample = () => {
	return (
		<EditableSpan value={'StartValue'} changeValue={action('value changed')}/>
	)
}