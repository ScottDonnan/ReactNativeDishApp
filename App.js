import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DishList from './Components/DishList';
import React, { useState } from 'react';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';

export default function App() {
  const [dishes, setDishes] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [ingrediantVal, setIngrediantVAl] = useState('')
  const [ingrediantS, setIngredientS] = useState('')
  const [canMake, setCanMake] = useState([])

  // class Dish {
  //   constructor(name, ingredients = null) {
  //     this.name = name;
  //     this.ingredients = [];

  //     for(let i of ingredients) {
  //       ingredients.push(i)
  //     }
  //   }
  // }

  function addDish() {
    const ingredientArr = ingrediantVal.split(' ')
    
    let exists = dishes.filter(dish => dish.name === searchVal).length !== 0;
    if (!exists && searchVal !== '') {
      setDishes([...dishes, {'name': searchVal, 'ingredients': ingredientArr}])
    }
  }

  function removeDish(val) {
    let newList = dishes.filter(dish => !dish.name.includes(val.name))
    setDishes(newList)
  }

  function handleSearch() {
    //have array of required ingredients and array of have ingredients
    //only add item if all required ingredients are in have ingredients
    
    let ingSearchArr = ingrediantS.split(' ')
    let y = [];
    
    if(ingrediantS === '') {
      setCanMake(y)
    } else {
      dishes.forEach(dish => {
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
 
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <TextInput style={styles.input} value={searchVal} onChangeText={setSearchVal} onSubmitEditing={addDish}></TextInput>
        <TextInput value={ingrediantVal} onChangeText={setIngrediantVAl}></TextInput>
        <Button title="Add Dish!" onPress={addDish}></Button>
        <DishList list={dishes} removeDish={removeDish}/>
        <TextInput value={ingrediantS} onChangeText={setIngredientS}></TextInput>
        <Button title='search' onPress={handleSearch}></Button>
        {canMake.map(dish => <Text key={dish.name}>{dish.name}</Text>)}
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
