import { StyleSheet, Text, View, Button, ScrollView } from "react-native"

function DishList({list, removeDish}) {

    const dishes = list.map((dish, indx) => {
        return (<View key={indx} style={dishStyles.dish}>
                    <Text>{dish.name}:</Text>
                    <ScrollView>
                        {dish.ingredients.map(food => <Text key={food}>{food}</Text>)}
                    </ScrollView>
                    <Button title="X" onPress={() => removeDish(dish)}></Button>
                </View>)
    })

    return(
        <View style={dishStyles.list}>
            <Text>My Dish List!</Text>
            {dishes}
        </View>

    )
}

export default DishList

const dishStyles = StyleSheet.create({
    dish: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        width: 150
    },
    list: {
        paddingTop: 30,
    }
})