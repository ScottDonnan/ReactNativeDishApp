import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native"
import { useState } from 'react';
import { unstable_setLogListeners } from "react-native/Libraries/Utilities/differ/deepDiffer";

function List({lastSelectedList, setWelcome, lists, setLists}) {

    const [items, setItems] = useState(lastSelectedList.listItems)
    const [searchVal, setSearchVal] = useState('')
    const [ingrediantVal, setIngrediantVAl] = useState('')
    const [ingrediantS, setIngredientS] = useState('')
    const [canMake, setCanMake] = useState([])

    function addDish() {
        const ingredientArr = ingrediantVal.toLowerCase().split(' ')
        
        let exists = items.filter(item => item.name.toLowerCase() === searchVal.toLowerCase()).length !== 0;
        if (!exists && searchVal !== '') {
            setItems([...items, {'name': searchVal, 'ingredients': ingredientArr}])
          //need to change to setList
            let indx;
            lists.forEach((list, index) => {
                if(list.listName === lastSelectedList.listName) {
                    indx = index;
                }
            })

            let temp = [...lists];
            temp[indx].listItems = [...items, {'name': searchVal, 'ingredients': ingredientArr}]
            setLists([...temp])
        }
      }
    
      function removeDish(val) {
        let newList = items.filter(dish => !dish.name.includes(val.name))
        setItems(newList)
      }
    
      function handleSearch() {
        //have array of required ingredients and array of have ingredients
        //only add item if all required ingredients are in have ingredients
        
        let ingSearchArr = ingrediantS.toLowerCase().split(' ')
        let y = [];
        
        if(ingrediantS === '') {
          setCanMake(y)
        } else {
          items.forEach(dish => {
            let tracker = true;
            dish.ingredients.forEach(ingredient => {
              if(!ingSearchArr.includes(ingredient)) {
                tracker = false;
              }
            })
    
            if(tracker) {
              y.push(dish)
            }
          })
    
          setCanMake(y)
        }
      }

    const dishes = items.map((dish, indx) => {
        return (<View key={indx} style={dishStyles.dish}>
                    <Text>{dish.name}:</Text>
                    <ScrollView>
                        {dish.ingredients.map(food => <Text key={food}>{food},</Text>)}
                    </ScrollView>
                    <Button title="X" onPress={() => removeDish(dish)}></Button>
                </View>)
    })

    return(

        <>
            <View>
                <View style={dishStyles.inline}>
                    <Text>{lastSelectedList.listName}:</Text>
                    <TextInput style={dishStyles.input} value={searchVal} onChangeText={setSearchVal} onSubmitEditing={addDish}></TextInput>
                </View>
                <View style={dishStyles.inline}>
                    <Text>Details:</Text>
                    <TextInput style={dishStyles.input} value={ingrediantVal} onChangeText={setIngrediantVAl}></TextInput>
                </View>
                <Button title={`Add ${lastSelectedList.listName}!`} onPress={addDish}></Button>
            </View>

            <Text>My {lastSelectedList.listName} List!</Text>
            {dishes}
            

            <TextInput style={dishStyles.input} value={ingrediantS} onChangeText={setIngredientS}></TextInput>
            <Button title='search' onPress={handleSearch}></Button>
            {canMake.map(dish => <Text key={dish.name}>{dish.name}</Text>)}
            <Button title='home' onPress={() => setWelcome('welcome')}></Button>
              
        </>
    )
}

export default List

const dishStyles = StyleSheet.create({
    dish: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        width: 200,
    },
    list: {
        paddingTop: 30,
        paddingBottom: 30
    },
    inline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    input: {
        width: 80,
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000000'
    }
})