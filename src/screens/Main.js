import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Text,
    Segment,
    Spinner,
    Drawer as FilterDrawer
} from 'native-base';
import EventsList from 'components/EventsList'
import { connect } from 'react-redux'
import styles from "../styles/common";
import TabBar from 'components/TabBar'
import { View } from "react-native";
import I18n from "../locale";
import HeaderRight from 'components/HeaderRight'
import HeaderLeft from 'components/HeaderLeft'
import Filter from "../components/Filter"
import { setFilters } from 'actions/filters'
import constants from 'sources/constants/common'
import { toggleAddChannelsModal, toggleSignInModal } from "../actions/modals";
import API from 'API'
import SignInModal from 'components/SignInModal'
import AddChannelsModal from 'components/AddChannelsModal'

const DEFAULT_TAB = 'today';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            filterDrawerIsOpen: false,
            tabIndex: 0,
            tabKey: DEFAULT_TAB,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        const t = I18n.getFixedT();
        const action = {
            icon: "options",
            rotate: 90,
            callback: () => {
                params.toggleFilterDrawer()
            }
        };

        return {
            title: t('main:title'),
            headerLeft: (
                <HeaderLeft
                    iconName='menu'
                    onPress={() => {
                        navigation.navigate('DrawerOpen');
                    }}
                />
            ),
            headerRight: (
                <HeaderRight
                    actions={action}
                />
            ),
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({
            toggleFilterDrawer: this.toggleFilterDrawer
        });
    }

    onTabChange = (tabKey, index) => {
        this.setState({tabIndex: index, tabKey});
    };

    toggleFilterDrawer = () => {
        this.state.filterDrawerIsOpen ? this.closeFilterDrawer() : this.openFilterDrawer()
    };

    closeFilterDrawer = () => {
        this.setState({filterDrawerIsOpen: false}, this.filterDrawer._root.close);
    };

    openFilterDrawer = () => {
        this.setState({filterDrawerIsOpen: true}, this.filterDrawer._root.open);
    };

    submitFilters = (filters) => {
        this.closeFilterDrawer();

        this.props.setFilters(filters)
    };

    render() {
        const { screenProps, navigation, types, typeColors, filters, modals, toggleAddChannelsModal, toggleSignInModal } = this.props;
        const { navigate } = navigation;
        const { tabIndex } = this.state;

        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        const tabs = [
            {key: 'today', title: t('main:today')},
            {key: 'week', title: t('main:week')},
            {key: 'month', title: t('main:later')}
        ];

        return (
            <FilterDrawer
                ref={(ref) => { this.filterDrawer = ref; }}
                content={
                    <Filter
                        submitFilters={this.submitFilters}
                        resetFilters={this.resetFilters}
                        types={types}
                        filters={filters}
                    />
                }
                type={'displace'}
                side={'right'}
                openDrawerOffset={constants.openDrawerOffset}
                tapToClose
            >

                <AddChannelsModal
                    isOpen={modals.addChannelsModalIsOpen}
                    onToggle={toggleAddChannelsModal}
                    navigate={navigate}
                />

                <SignInModal
                    isOpen={modals.signInModalIsOpen}
                    onToggle={toggleSignInModal}
                    navigate={navigate}
                />

                <View style={[styles.darkBg, {flex: 1, paddingBottom: 50}]}>
                    <TabBar
                        tabIndex={tabIndex}
                        tabs={tabs}
                        onChange={this.onTabChange}
                    >
                        {
                            tabs.map((tab, i) =>
                                <EventsList
                                    key={i}
                                    range={tab.key}
                                    title={tab.title}
                                    navigate={navigate}
                                    typeColors={typeColors}
                                    getData={API.getEvents}
                                />
                            )
                        }
                    </TabBar>
                </View>
            </FilterDrawer>
        )
    }
}

function mapStateToProps (state) {
    return {
        types: state.types.data,
        typeColors: state.types.colors,
        filters: state.filters,
        modals: state.modals,
        userChannels: state.userChannels,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFilters(filters) {
            dispatch(setFilters(filters))
        },
        toggleAddChannelsModal() {
            dispatch(toggleAddChannelsModal())
        },
        toggleSignInModal() {
            dispatch(toggleSignInModal())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)


