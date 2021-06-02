import { Text, Title, Label, H3 } from 'native-base'
import addStylesToProps from 'sources/utils/addStylesToProps'
import { Platform } from 'react-native'

const textElems = [Text, Label, Title, H3];

const styles = Platform.select({
    ios: {
        fontFamily: "Mada",
    },
    android: {
        fontFamily: "Mada-Regular",
    },
});

export default function setGlobalStyles() {
    textElems.forEach(el => {
        addStylesToProps(el, 'style', styles)
    });
}
