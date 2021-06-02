import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native'
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Body,
    Thumbnail
} from "native-base";
import I18n from "../locale";
import styles from 'styles/common'
import Image from 'react-native-remote-svg'
import { BORDER_COLOR, GREY_COLOR } from "../sources/constants/colors";
import {
    ABOUT_APP_ROUTE, ACCOUNT_SETTINGS_ROUTE, ADD_CHANNELS_ROUTE, APP_SETTINGS_ROUTE, CHANNEL_ROUTE, FAVORITES_ROUTE,
    GET_IN_TOUCH_ROUTE, MY_CHANNELS_ROUTE, MY_EVENTS_ROUTE, PROFILE_ROUTE, SUBMIT_EVENT_ROUTE, TECHNICAL_SUPPORT_ROUTE
} from "../sources/constants/routes";
import { connect } from 'react-redux'
import API from 'API'
import { removeUser } from 'actions/user'
import { removeAllChannels } from 'actions/userChannels'
import { DEFAULT_USER_AVATAR_URL } from "../sources/constants/user";
import { Image as RNImage } from 'react-native'
import share from 'sources/utils/share'

class SideBar extends Component {
    logout = () => {
        const { navigation, removeUser, removeAllUserChannels } = this.props;
        const { navigate } = navigation;

        API.logout().then(res => {
            if (res.data.success) {
                removeUser();
                removeAllUserChannels();
                navigate('mainStack');
            }
        });
    };

    login = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;

        navigate('loginStack')
    };

    openChannel = (id) => {
        const { navigation } = this.props;
        const { navigate } = navigation;

        navigate(
            CHANNEL_ROUTE,
            {
                id
            }
        )
    };

    spreadTheWord = () => {
        let url = '';

        if (Platform.OS === 'ios') {
            url = 'https://itunes.apple.com/us/app/qatar-events-app/id1350228281?ls=1&mt=8'
        } else if (Platform === 'android') {
            url = 'https://play.google.com/store/apps/details?id=com.qatarevents'
        }

        share({url},
            (res) => {
                console.log('success', res)
            },
            (err) => {
                alert('err',err)
            }
        )
    };

    renderItem = (item, i = 0) => {
        return (
            <ListItem key={i} style={style.listItem} onPress={item.action}>
                <Image
                    source={item.icon[Platform.OS]}
                    style={style.icon}
                />
                <Body>
                <Text style={style.listItemText}>{item.title}</Text>
                </Body>
            </ListItem>
        )
    };

    renderChannels = () => {
        let displayChannels = this.props.userChannels.slice(0, 3);

        return displayChannels.map((channel, i) =>
            <ListItem key={i} style={style.listItem} onPress={() => this.openChannel(channel.id)}>
                {
                    channel.photo ?
                        <View style={style.channelImageBlock}>
                            <RNImage
                                style={style.channelImage}
                                source={{uri: channel.photo}}
                                resizeMode={"cover"}
                            />
                        </View>
                        :
                        <View style={style.channelIcon} />
                }

                <Body>
                <Text style={style.listItemText}>{channel.firstName} {channel.lastName}</Text>
                </Body>
            </ListItem>
        )
    };

    render() {
        const t = I18n.getFixedT();
        const { navigation, user, userChannels } = this.props;
        const { navigate } = navigation;

        const isAuthorized = !!user.id;

        const ITEMS = {
            events: [
                {
                    title: t('sidebar:favorites'),
                    icon: {
                        ios: require('/static/icons/fav.svg'),
                        android: require('/static/icons/fav-android.png')
                    },
                    action: () => navigate(FAVORITES_ROUTE)
                },
                // {
                //     title: t('sidebar:imGoing'),
                //     icon: {
                //         ios: require('/static/icons/going.svg'),
                //         android: require('/static/icons/going-android.png')
                //     },
                //     action: () => {}
                // },
                // {
                //     title: t('sidebar:myEvents'),
                //     icon: {
                //         ios: require('/static/icons/me.svg'),
                //         android: require('/static/icons/me-android.png')
                //     },
                //     action: () => navigate(MY_EVENTS_ROUTE)
                // },
                {
                    title: t('sidebar:submitEvent'),
                    icon: {
                        ios: require('/static/icons/sub.svg'),
                        android: require('/static/icons/sub-android.png')
                    },
                    action: () => navigate(SUBMIT_EVENT_ROUTE)
                },
            ],
            channels: [
                {
                    title: t('sidebar:addChannels'),
                    icon: {
                        ios: require('/static/icons/add.svg'),
                        android: require('/static/icons/add-android.png')
                    },
                    action: () => navigate(ADD_CHANNELS_ROUTE)
                },
            ],
            settings: [
                {
                    title: t('sidebar:editProfile'),
                    icon: {
                        ios: require('/static/icons/edit.svg'),
                        android: require('/static/icons/edit-android.png')
                    },
                    action: () => navigate(PROFILE_ROUTE),
                    auth: true
                },
                {
                    title: t('sidebar:accountSettings'),
                    icon: {
                        ios: require('/static/icons/acc.svg'),
                        android: require('/static/icons/acc-android.png')
                    },
                    action: () => navigate(ACCOUNT_SETTINGS_ROUTE),
                    auth: true
                },
                {
                    title: t('sidebar:appSettings'),
                    icon: {
                        ios: require('/static/icons/app.svg'),
                        android: require('/static/icons/app-android.png')
                    },
                    action: () => navigate(APP_SETTINGS_ROUTE),
                    auth: false
                }
            ],
            feedback: [
                {
                    title: t('sidebar:spreadTheWord'),
                    icon: {
                        ios: require('/static/icons/word.svg'),
                        android: require('/static/icons/word-android.png')
                    },
                    action: this.spreadTheWord,
                },
                {
                    title: t('sidebar:technicalSupport'),
                    icon: {
                        ios: require('/static/icons/sup.svg'),
                        android: require('/static/icons/sup-android.png')
                    },
                    action: () => navigate(TECHNICAL_SUPPORT_ROUTE),
                },
                {
                    title: t('sidebar:getInTouch'),
                    icon: {
                        ios: require('/static/icons/cont.svg'),
                        android: require('/static/icons/cont-android.png')
                    },
                    action: () => navigate(GET_IN_TOUCH_ROUTE),
                }
            ],
            app: [
                {
                    title: t('sidebar:aboutApp'),
                    icon: {
                        ios: require('/static/icons/about.svg'),
                        android: require('/static/icons/about-android.png')
                    },
                    action: () => navigate(ABOUT_APP_ROUTE),
                    auth: false
                }
            ],
            auth: [
                {
                    title: t('sidebar:login'),
                    icon: {
                        ios: require('/static/icons/enter-arrow.svg'),
                        android: require('/static/icons/enter-arrow-android.png')
                    },
                    action: () => this.login(),
                    auth: false
                },
                {
                    title: t('sidebar:signOut'),
                    icon: {
                        ios: require('/static/icons/out.svg'),
                        android: require('/static/icons/out-android.png')
                    },
                    action: () => this.logout(),
                    auth: true
                }
            ]
        };

        if (userChannels.length) {
            ITEMS.channels.unshift({
                    title: t('sidebar:seeMore'),
                    icon: {
                        ios: require('/static/icons/more.svg'),
                        android: require('/static/icons/more-android.png')
                    },
                    action: () => navigate(MY_CHANNELS_ROUTE)
            })
        }

        return (
            <Content style={style.content}>
                {
                    isAuthorized ?
                        <View style={style.avatarBlock}>
                            <View style={style.avatar}>
                                <Thumbnail large source={{uri: user.photo || DEFAULT_USER_AVATAR_URL}} />
                            </View>
                            <View style={style.nickname}>
                                <Text style={style.nicknameText}>{user.firstName}</Text>
                                <Text style={style.nicknameText}>{user.lastName}</Text>
                            </View>
                        </View> : false
                }

                <View style={{marginBottom: 50, marginLeft: 20}}>
                    {
                        isAuthorized &&
                            <View>
                                <List style={style.list}>
                                    <ListItem itemHeader style={style.listItemHeader}>
                                        <Text style={style.listHeaderText}>{t('sidebar:events')}</Text>
                                    </ListItem>

                                    {
                                        ITEMS.events.map((item, i) =>
                                            <ListItem key={i} style={style.listItem} onPress={item.action}>
                                                <Image
                                                    source={item.icon[Platform.OS]}
                                                    style={style.icon}
                                                />
                                                <Body>
                                                <Text style={style.listItemText}>{item.title}</Text>
                                                </Body>
                                            </ListItem>
                                        )
                                    }
                                </List>

                                <List style={style.list}>
                                    <ListItem itemHeader style={style.listItemHeader}>
                                        <Text style={style.listHeaderText}>{t('sidebar:myChannels')}</Text>
                                    </ListItem>
                                    {
                                        this.renderChannels()
                                    }

                                    {
                                        ITEMS.channels.map((item, i) => this.renderItem(item, i))
                                    }
                                </List>
                            </View>
                    }

                    <List style={style.list}>
                        <ListItem itemHeader style={style.listItemHeader}>
                            <Text style={style.listHeaderText}>{t('sidebar:settings')}</Text>
                        </ListItem>

                        {
                            ITEMS.settings.map((item, i) => {
                                const node = this.renderItem(item, i);

                                if (item.auth) {
                                    return isAuthorized && node
                                } else {
                                    return node
                                }
                            })
                        }
                    </List>

                    <List style={style.list}>
                        <ListItem itemHeader style={style.listItemHeader}>
                            <Text style={style.listHeaderText}>{t('sidebar:feedback')}</Text>
                        </ListItem>

                        {
                            ITEMS.feedback.map((item, i) =>
                                <ListItem key={i} style={style.listItem} onPress={item.action}>
                                    <Image
                                        source={item.icon[Platform.OS]}
                                        style={style.icon}
                                    />
                                    <Body>
                                    <Text style={style.listItemText}>{item.title}</Text>
                                    </Body>
                                </ListItem>
                            )
                        }
                    </List>

                    <List style={[style.list, {marginTop: 20}]}>
                        {
                            this.renderItem(ITEMS.app[0])
                        }
                        {
                            ITEMS.auth.map((item, i) => {
                                const node = this.renderItem(item, i);

                                if (item.auth) {
                                    return isAuthorized && node
                                } else {
                                    return !isAuthorized && node
                                }
                            })
                        }
                    </List>
                </View>
            </Content>
        );
    }
}

const iconSize = {width: 18, height: 18};

const style = StyleSheet.create({
    content: {backgroundColor: GREY_COLOR, paddingTop: 30},
    text: {textAlign: 'left'},
    avatarBlock: {flex: 1, flexDirection: 'row', justifyContent: 'center', marginVertical: 10},
    avatar: {marginRight: 10},
    nickname: {flexDirection: 'column', justifyContent: 'center'},
    nicknameText: {fontSize: 20, fontWeight: '600', ...styles.colorWhite},
    list: {marginRight: 15},
    listItem: {...styles.listItem, backgroundColor: GREY_COLOR, paddingTop: 5, paddingBottom: 5, borderBottomColor: BORDER_COLOR},
    listItemHeader: {paddingTop: 20, paddingLeft: 0, paddingBottom: 5, marginLeft: 15, borderBottomColor: '#494848',...styles.transparentBg},
    listHeaderText: {fontSize: 20, fontWeight: '600', ...styles.colorWhite},
    listItemText: {...styles.colorWhite, fontSize: 16},
    icon: {...iconSize},
    channelIcon: {backgroundColor: 'black', ...iconSize, borderRadius: 100/2},
    channelImageBlock: {
        flex: .075,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    channelImage: {
        ...iconSize,
        borderRadius: iconSize.width/2
    }
});

function mapStateToProps (state) {
    return {
        user: state.user.data,
        userChannels: state.userChannels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeUser(filters) {
            dispatch(removeUser(filters))
        },
        removeAllUserChannels() {
            dispatch(removeAllChannels())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)