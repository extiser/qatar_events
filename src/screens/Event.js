import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Segment,
    Footer,

} from 'native-base'
import styles from "../styles/common"
import { Dimensions, View, ActivityIndicator, Linking } from "react-native"
import EventDetails from 'components/EventDetails'
import I18n from "../locale"
import HeaderRight from 'components/HeaderRight'
import { PRIMARY_COLOR, YELLOW_COLOR, YELLOW_HOVER_COLOR } from "../sources/constants/colors"
import share from 'sources/utils/share'
import Button from 'components/Button'
import { shadeColor } from "../sources/utils/controlColor"
import API from 'API'
import formatDate from 'sources/utils/formatDate'
import { BROWSER, EVENT_CONTACTS_ROUTE } from "../sources/constants/routes";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import constants from 'sources/constants/common'
import { connect } from "react-redux";

class Event extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            data: {},
            error: null,
        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        const { params } = state;

        this.getEvent(params.id);
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        const { params = {} } = navigation.state;
        const { title, message, url, isFavourite = undefined, onFavourite, bgColor = PRIMARY_COLOR } = params;

        const classString = isFavourite ? '' : '-outline';

        const actions = [
            {
                ios: "ios-share-outline",
                android: 'md-share',
                callback: () => {
                    share({title, message, url},
                        (res) => {
                            console.log('success',res);
                        },
                        (err) => {
                            console.log('err', err);
                        }
                    )
                }
            }
        ];

        if (isFavourite !== undefined) {
            actions.unshift({
                ios: `ios-heart${classString}`,
                android: `md-heart${classString}`,
                callback: () => onFavourite()
            })
        }

        return {
            title: t('event:title'),
            headerRight: (
                <HeaderRight
                    actions={actions}
                />
            ),
            headerStyle: { backgroundColor: bgColor },
        }
    };

    getEvent(id) {
        const { navigation, userId, types } = this.props;
        const { setParams, state } = navigation;

        this.setState({
            loading: true
        });

        API.getEvent(id).then(res => {
            const data = res.data;

            this.setState({
                data,
                loading: false,
                error: null,
            }, () => {
                let params = {
                    title: data.title,
                    message: '',
                    url: data.url,
                    bgColor: types.colors[data.category]
                };

                if (userId !== undefined) {
                    params = {
                        ...params,
                        isFavourite: data.isFavourite,
                        onFavourite: () => this.onFavourite()
                    }
                }


                setParams(params);
            })
        }).catch(error => {
            this.setState({
                error,
                loading: false
            })
        });
    }

    onFavourite = () => {
        const { setParams, state } = this.props.navigation;
        const { params = {} } = state;

        let callback;

        if (params.isFavourite) {
            callback = API.unfavourite;
        } else {
            callback = API.favourite;
        }

        callback(this.state.data.id).then(res => {
            if (res.data.success) setParams({isFavourite: !params.isFavourite});
        }).catch(err => {
            alert(err.response.data.error.message)
        })
    };

    addToCalendar = () => {
        const { data } = this.state;

        if (!data) return;

        const UTC_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

        AddCalendarEvent.presentNewCalendarEventDialog({
            title: '',
            location: data.location.addressLine1 || '',
            notes: '',
            startDate: formatDate(data.startDate.date, UTC_FORMAT),
            endDate: formatDate(data.endDate.date, UTC_FORMAT),
        })
        .then(eventId => {
            console.log(eventId)
        })
        .catch(error => {
            alert(error)
        });
    };

    getContacts = () => {
        const { data } = this.state;

        if (!data) return;

        const { navigate, state } = this.props.navigation;
        const { bgColor } = state.params;

        navigate(
            EVENT_CONTACTS_ROUTE,
            {
                contacts: data.contacts,
                bgColor
            }
        )
    };

    getDirections = () => {
        const { data } = this.state;
        const { navigate } = this.props.navigation;

        if (!data) return;

        const { latitude, longitude } = data.location;

        if (latitude && longitude) navigate(BROWSER, {uri: `http://www.google.com/maps/place/${latitude},${longitude}`});
    };

    goToTheEvent = () => {
        const { state } = this.props.navigation;
        const { params } = state;

        share(
            {
                message: `I\'m going to ${params.url}, join me!`,
                url: params.url
            },
            (res) => {
                console.log('success',res);
            },
            (err) => {
                console.log('err', err);
            }
        )
    };

    render() {
        const { width, height } = Dimensions.get('window');
        const { navigation, userId, types } = this.props;

        const { params } = navigation.state;
        const { loading, data } = this.state;
        const bgColor = params && params.bgColor;

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    {
                        loading ?
                            <View style={{ flex: 1, padding: 20 }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <EventDetails
                                types={types}
                                width={width}
                                height={height}
                                event={data}
                                addToCalendar={this.addToCalendar}
                                getContacts={this.getContacts}
                                getDirections={this.getDirections}
                                navigate={navigation.navigate}
                            />
                    }
                </Content>

                {
                    !loading && userId &&
                    <Footer style={{
                        backgroundColor: shadeColor(bgColor || PRIMARY_COLOR, -0.2),
                        shadowOpacity: 0,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 65,
                    }}>
                        <View style={{
                            marginTop: 0,
                            paddingTop: 10,
                            width: '80%'
                        }}>
                            <Button
                                block
                                rounded
                                color={bgColor || PRIMARY_COLOR}
                                textStyle={{textAlign: 'center'}}
                                onPress={() => this.goToTheEvent()}
                            >
                                I'm going!
                            </Button>
                        </View>
                    </Footer>
                }
            </Container>
        );
    }
}

function mapStateToProps (state) {
    const types = {
        colors: state.types.colors,
        names: state.types.names
    };

    return {
        userId: state.user.data.id,
        types
    }
}

export default connect(mapStateToProps, null)(Event)

