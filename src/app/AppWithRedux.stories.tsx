import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import AppWithRedux from './App';
import { ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator';


export default {
	title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

export const AppWithReduxBaseExample = (props: any) => {
	return (<AppWithRedux />)
}