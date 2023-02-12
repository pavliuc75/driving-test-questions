import {Text} from "react-native";
import {genericStyles} from "../assets/css/styles";

type Props = {
    text: string
}

const Question = (props: Props) => {
    return (<>
        <Text
            style={[genericStyles.fontSize15, genericStyles.fontWeight600, genericStyles.lineHeight20]}>{props.text}</Text>
    </>);
}

export default Question;
