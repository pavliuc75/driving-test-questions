import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    header: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    }
});

const genericStyles = StyleSheet.create({
    fontWeight600: {
        fontWeight: "600"
    },
    fontSize15: {
        fontSize: 15
    },
    lineHeight20: {
        lineHeight: 20
    }
});

export {
    styles, genericStyles
}