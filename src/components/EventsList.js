import React, { Component } from 'react';
import {
    Container,
    Button,
    H4,
    Icon,
    Spinner,
    Text
} from "native-base";
import { ActivityIndicator, View, Dimensions, FlatList, ScrollView } from "react-native";
import EventBig from 'components/EventBig'
import EventItem from 'components/EventItem'
import { EVENT_ROUTE } from "../sources/constants/routes";
import { connect } from "react-redux";
import LoadingSpinner from 'components/LoadingSpinner';
import styles from 'styles/common';
import API from 'API';

class EventsList extends Component {
    constructor(props) {
        super();

        this.state = {
            events: [],
            pinnedEvents: [],
            error: null,
            page: 1,
            loading: false,
            isLoadingMore: false,
            refreshing: false,
            meta: {}
        }
    }

    componentDidMount() {
        this.getPinnedEvents();
        this.getEvents();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filters) {
            this.setState({
                page: 1
            }, this.getEvents)
        }
    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.getEvents(() => this.setState({refreshing: false}), false)
        });
    };

    getEvents = (callback, loading = true) => {
        const { page, isLoadingMore } = this.state;
        const { range, filters, getData, authorId } = this.props;

        if (loading) this.setState({loading: true});

        let params = {
            page
        };

        if (authorId) {
            params = {
                ...params,
                authorId
            }
        } else {
            params = {
                ...params,
                range,
                ...filters
            }
        }

        return getData(params).then(res => {
            const data = res.data;

            this.setState({
                events: isLoadingMore ? [...this.state.events, ...data.data] : data.data,
                meta: data.meta,
                loading: false,
            }, () => {
                if (callback) callback();
            })
        }).catch(error => {
            this.setState({
                error,
                loading: false,
            }, () => {
                if (callback) callback();
            })
        })
    };

    getPinnedEvents = (callback, loading = true) => {

        const { getData } = this.props;

        return API.getPinnedEvents().then(res => {
            const data = res.data;

            this.setState({
                pinnedEvents: data.data
            });
        });
    };

    fetchMore = () => {
        const { page, meta } = this.state;

        console.log(page);

        if (page < (meta && meta.pagination.total_pages)) {

            this.setState({
                page: this.state.page + 1,
                isLoadingMore: true
            }, () => {
                this.getEvents(() => {
                    this.setState({isLoadingMore: false});
                }, false);
            });
        }
    };

    openEvent = (data) => {
        const { navigate, typeColors } = this.props;

        navigate(
            EVENT_ROUTE,
            {
                bgColor: typeColors && typeColors[data.category],
                id: data.id
            }
        )
    };

    renderItem = (item) => {
        const { typeColors } = this.props;
        const { width } = Dimensions.get('window');

        if (item.author.isChannel || item.isFeatured || item.isPinnedToTop) {
            return (
                <EventBig
                    width={width}
                    onPress={() => {
                        this.openEvent(item)
                    }}
                    data={item}
                />
            )
        } else {
            return (
                <EventItem
                    width={width}
                    onPress={() => {
                        this.openEvent(item)
                    }}
                    data={item}
                    typeColors={typeColors}
                />
            )
        }
    };

    render() {
        const { loading, events, isLoadingMore, refreshing, pinnedEvents } = this.state;

        if (loading) {
            return <LoadingSpinner />
        } else if (!events.length) {
            return <View style={styles.centerTextContainer}>
                <Text style={styles.colorWhite}>No results found</Text>
            </View>
        } else {
            return (
                <FlatList
                    data={pinnedEvents.concat(events)}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.fetchMore}
                    onEndReachedThreshold={.5}
                    refreshControl={LoadingSpinner}
                    ListFooterComponent={
                        isLoadingMore ?
                            <View style={{ flex: 1, paddingBottom: 35 }}>
                                <ActivityIndicator />
                            </View> : null
                    }
                />
            )
        }
    }
}

function mapStateToProps (state) {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps, null)(EventsList)
