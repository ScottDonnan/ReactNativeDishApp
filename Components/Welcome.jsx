import {Text, Button, StyleSheet, View} from "react-native"

function Welcome({setWelcome, lists, setLists, setLastSelectedList}) {
    
    function handlePress(list) {
        setWelcome('list')
        setLastSelectedList(list)
    }

    function handleRemoveList(list) {
        const temp = lists.filter(val => val.listName !== list.listName)
        setLists(temp)
    }

    const displayLists = lists.map((list, indx) => {
        return (
            <View key={indx} style={styleing.list}>
                <Button title={list.listName} onPress={() => handlePress(list)}></Button>
                <Button title="X" onPress={() => handleRemoveList(list)}></Button>
            </View>
        )
    })
    
    return(
        <>
            <Text>Welcome Page!</Text>
            <Button title="New List" onPress={() => setWelcome('create-list')}></Button>
            <Text>My Lists</Text>
            {displayLists}            
        </>

    )
}

export default Welcome

const styleing = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150
    }
})