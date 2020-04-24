import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, ListItem, Left, View, Body, Text, Right, Item, Separator, Picker, Label, Row, Col, List } from 'native-base'
import SettingHeaderBar from './SettingHeaderBar'

// set setting
import {SetCategoryOnWidget, GetCategoryOnWidget} from '../helper/SettingValues'
// redux
import { useSelector } from 'react-redux'
import { RootState } from '../modules';

// interface
import ICategory from '../interfaces/ICategory'

export default function Settings({ navigation }: any) {

  const allCategories: ICategory[] = useSelector((state: RootState) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  React.useEffect(() => {
    init();
  }, [])

  const init = async ()=>{
    const curSelectedCategory = await GetCategoryOnWidget();
    var c = allCategories.find(v=>v.categoryName === curSelectedCategory)
    setSelectedCategory(curSelectedCategory);
  }

  const selectCategory = (value: string) => {
    setSelectedCategory(value)
    SetCategoryOnWidget(value);
  }

  return (
    <Container>
      <SettingHeaderBar />
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>
              Widget
          </Text>
          </ListItem>
          <ListItem avatar style={{marginLeft:-10}}>
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
              <Text note style={{marginTop:-10}}> Displayed category on Widget</Text>

            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}