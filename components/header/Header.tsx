import React from 'react'
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'

const EditIcon = (style) => (
    <Icon {...style} name='edit'/>
);

const EditAction = (props) => (
    <TopNavigationAction {...props} icon={EditIcon}/>
);

const MenuIcon = (style) => (
    <Icon {...style} name='more-vertical'/>
);

const MenuAction = (props) => (
    <TopNavigationAction {...props} icon={MenuIcon}/>
);

export default function Header() {

    const renderRightControls = () => [
        <EditAction/>,
        <MenuAction/>,
      ];

    return(
        <TopNavigation title="Todo" rightControls={renderRightControls()}/>
    )
}