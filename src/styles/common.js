import { GREY_COLOR, INPUT_COLOR, WHITE_COLOR } from "../sources/constants/colors";

export default {
    container: {
        backgroundColor: '#FFF'
    },
    content: {
        margin: 15
    },
    absCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        marginHorizontal: 30,
    },
    padding20: {
        padding: 20
    },
    RTL: {
        textAlign: 'right'
    },
    backgroundImage: {
        backgroundColor: '#ccc',
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    backgroundContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    centerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorWhite: {
        color: WHITE_COLOR
    },
    label: {
        textAlign: 'left'
    },
    center: {
        flex: 1,
        justifyContent: 'center'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    darkBg: {
        backgroundColor: '#252525'
    },
    greyBg: {
        backgroundColor: GREY_COLOR
    },
    transparentBg: {
        backgroundColor: 'transparent'
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row'
    },
    flexColumn: {
        flex: 1,
        flexDirection: 'column'
    },
    headerTransparent: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    listItem: {
        marginLeft: 0,
        paddingRight: 0,
    },
    avatarText: {
        color: 'white',
        fontSize: 20,
        marginTop: 15,
    },
    field: {
        marginBottom: 20
    },
    textarea: {
        backgroundColor: INPUT_COLOR,
        padding: 10,
        paddingTop: 10,
        fontSize: 17,
    },
    webView: {
        div: {
            color: 'white',
            fontSize: 16,
            fontFamily: 'Mada',
        },
        a: {
            color: 'white',
        }
    },
    imageLoadSpinner: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: '40%'
    },
    channels: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 10
    }
};
