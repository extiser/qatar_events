import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Text,
    Segment,
    Spinner,
} from 'native-base';
import EventsList from 'components/EventsList'
import { connect } from 'react-redux'
import styles from "../styles/common"
import { View } from "react-native"
import I18n from "../locale"
import { setFilters } from 'actions/filters'
import { getUser } from 'actions/user'
import API from 'API'

class Favorites extends Component {
    constructor() {
        super();

        this.state = {}
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:favorites'),
        }
    };

    componentDidMount() {

    }

    render() {
        const { navigation, typeColors } = this.props;
        const { navigate } = navigation;

        return (
            <View style={{flex: 1, paddingTop: 10, ...styles.darkBg}}>
                <EventsList
                    navigate={navigate}
                    typeColors={typeColors}
                    getData={API.getFavouriteEvents}
                />
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        typeColors: state.types.colors,
    }
}

export default connect(mapStateToProps, null)(Favorites)


