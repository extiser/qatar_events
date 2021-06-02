import { Share } from "react-native";
import constants from 'sources/constants/common'

export default function share(content = {title: '', message: '', url: constants.URL}, successCallback, errorCallback) {
    Share.share({
        ...content
    }, {
        // Android only:
        dialogTitle: 'Share',

        // iOS only:
        excludedActivityTypes: [
            // Приложения, которые должны быть исключены
            //'com.apple.UIKit.activity.PostToTwitter'
        ]
    }).then(res => {
        successCallback(res)
    }).catch(err => {
        errorCallback(err)
    })
}

