import React from 'react';
import {action} from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0';
import AddItemForm from './AddItemForm';

export default {
	title: 'AddItemForm Component',
	component: AddItemForm,
} as Meta;

export const AddItemFormBaseExample = (props: any) => {
	return (<AddItemForm
		addItem={action('Batton inside from clicked')}
	/>
	)
}