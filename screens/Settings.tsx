import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, ListItem, Left, View, Body, Text, Right, Item, Separator, Picker, Label, Row, Col, List, Switch } from 'native-base'
import SettingHeaderBar from './SettingHeaderBar'

// set setting
import {SetCategoryOnWidget, GetCategoryOnWidget} from '../helper/SettingValues'
// redux
import { useSelector } from 'react-redux'
import { RootState } from '../modules';

// interface
import ICategory from '../interfaces/ICategory'
import ISettings from '../interfaces/ISettings'


export default function Settings({ navigation }: any) {

  const allCategories: ICategory[] = useSelector((state: RootState) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedNotificationTime, setSelectedNotificationTime] = useState<number>();
  const [showDelayed, setShowDelayed] = useState<boolean>();
  const [enablePushNotification, setEnablePushNotification] = useState<boolean>();

  React.useEffect(() => {
    init();
  }, [])

  const init = async ()=>{
    const s:ISettings = await GetCategoryOnWidget(); // retrieve setting property from sharedpreference
    var c = allCategories.find(v=>v.categoryName === s.selectedCategory)

    if(c != undefined){
      setSelectedCategory(c.categoryName);
    }
    else{
      setSelectedCategory('All');
    }

    setShowDelayed(s.showDelayed);
    setEnablePushNotification(false);
    setSelectedNotificationTime(5);
  }

  const selectCategory = (value: string) => {
    setSelectedCategory(value)
    SetCategoryOnWidget(value, showDelayed);
  }
  
  const selectNotificationTime = (value: number) => {
    setSelectedNotificationTime(value)
    //SetCategoryOnWidget(value, showDelayed);
  }

  const toggleShowDelayed = (value:boolean) =>{
    setShowDelayed(value)
    SetCategoryOnWidget(selectedCategory, value);
  }

  const toggleEnablePushNotification = (value:boolean) =>{
    setEnablePushNotification(value)

  }

  return (
    <Container>
      <SettingHeaderBar />
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>
              Notification
            </Text>
          </ListItem>
          <ListItem avatar style={styles.listItemStyle}>
            <Left>
            </Left>
            <Body>
              <Text style={{paddingLeft:8}}>Enable push notification</Text>
              <Text note style={[styles.noteStyle,{marginTop:5}]}> Enable notification for todos before specified time</Text>
            </Body>
            <Right style={{justifyContent: 'center'}}>
              <Switch value={enablePushNotification} onValueChange={v=>toggleEnablePushNotification(v)}/>
            </Right>
          </ListItem>

          <ListItem avatar style={[styles.pickerListItemStyle]}>
            <Left>
            </Left>
            <Body>
              <Picker
                enabled={enablePushNotification}
                mode="dropdown"
                placeholder="Select Category"
                placeholderStyle={{ color: '#2874F0' }}
                note={false}
                selectedValue={selectedNotificationTime}
                onValueChange={v => selectNotificationTime(v)}>
                <Picker.Item label="5 min" value={5} />
                <Picker.Item label="10 min" value={10} />
                <Picker.Item label="30 min" value={30} />
                <Picker.Item label="60 min" value={60} />
              </Picker>
              <Text note style={[styles.noteStyle,{marginTop:-10}]}> Notify before selected time</Text>
            </Body>
            <Right></Right>
          </ListItem>

          <ListItem itemDivider>
            <Text>
              Widget
          </Text>
          </ListItem>
          <ListItem avatar style={styles.pickerListItemStyle}>
            <Left>
            </Left>
            <Body>
              <Picker
                mode="dropdown"
                placeholder="Select Category"
                placeholderStyle={{ color: '#2874F0' }}
                note={false}
                selectedValue={selectedCategory}
                onValueChange={v => selectCategory(v)}>
                <Picker.Item label="All" value={"All"} />
                {
                  allCategories.map((v, i) => {
                    return (
                      <Picker.Item label={v.categoryName} value={v.categoryName} key={i} />
                    )
                  })
                }
              </Picker>
              <Text note style={[styles.noteStyle,{marginTop:-10}]}> Displayed category on Widget</Text>
            </Body>
            <Right></Right>
          </ListItem>

          <ListItem avatar style={styles.listItemStyle}>
            <Left>
            </Left>
            <Body>
              <Text style={{paddingLeft:8}}>Display delayed Todos</Text>
              <Text note style={[styles.noteStyle,{marginTop:5}]}> Display delayed todos on widget</Text>
            </Body>
            <Right style={{justifyContent: 'center'}}>
              <Switch value={showDelayed} onValueChange={v=>toggleShowDelayed(v)}/>
            </Right>
          </ListItem>

        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  listItemStyle:{
    marginLeft:-10
  },
  pickerListItemStyle:{
    marginLeft:-10,
    marginTop:-10,
  },
  noteStyle:{
    paddingLeft:5
  }
})