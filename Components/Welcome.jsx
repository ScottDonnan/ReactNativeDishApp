import {Text, Button} from "react-native"

function Welcome({setWelcome, lists}) {
    return(
        <>
            <Text>Welcome Page!</Text>
            <Button title="New List" onPress={() => setWelcome('create-list')}></Button>
            <Text>Lists Holder</Text>
            {lists.map(list => <Text>{list.name}</Text>)}
            
        </>

    )
}

export default Welcome