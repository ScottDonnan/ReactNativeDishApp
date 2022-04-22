import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import List from './Components/List';
import Welcome from './Components/Welcome';
import CreateList from './Components/CreateList';
import React, { useState } from 'react';

export default function App() {
  const [welcome, setWelcome] = useState('welcome');
  const [lists, setLists] = useState([])
  const [lastSelectedList, setLastSelectedList] = useState([]);
  let display;

  if(welcome === 'welcome') {
    display = <Welcome setWelcome={setWelcome} lists={lists} setLists={setLists} setLastSelectedList={setLastSelectedList}/>        
  } else if(welcome === 'create-list') {
    display = <CreateList setWelcome={setWelcome} setLists={setLists} setLastSelectedList={setLastSelectedList}/>
  } else if(welcome === 'list') {
    display = <List lastSelectedList={lastSelectedList} setWelcome={setWelcome} lists={lists} setLists={setLists}/>
                
  }
 
  return (
    <View style={styles.container}>
      {display}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 80,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000'
  },
  dishes: {
    flex: 1,
  }
});