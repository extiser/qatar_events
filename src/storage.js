import { AsyncStorage } from "react-native";
import Storage from "react-native-storage";

export default new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
});
