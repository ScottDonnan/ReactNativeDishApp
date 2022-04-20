import { Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

function CreateList({setWelcome, setLists, setLastSelectedList}) {
    const [input, setInput] = useState('')

    function handleNewList(newListName) {
        if(newListName !== '') {
            setWelcome('list')
    
            const newList = {
                'listName': newListName,
                'listItems': []
            }
    
            setLastSelectedList(newList);
    
            setLists(prev => [...prev, newList])
        }
    }
    
    return(
        <>
            <Text>Create List Page</Text>
            <Text>List Name:</Text>
            <TextInput style={styles.input} value={input} onChangeText={setInput}></TextInput>
            <Button title='create list' onPress={() => handleNewList(input)}></Button>
        </>
    )
}

export default CreateList;

const styles = StyleSheet.create({
    input: {
      width: 80,
      textAlign: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000'
  }
});