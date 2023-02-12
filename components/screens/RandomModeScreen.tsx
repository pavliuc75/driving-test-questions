import {Button, Text, View} from "react-native";

type Props = {
    navigation: any
}
const RandomModeScreen = ({navigation}: Props) => {
    return (
        <View>
            <Text>Random Mode</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default RandomModeScreen;