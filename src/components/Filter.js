import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native'
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
    Thumbnail,
    H3
} from "native-base";
import I18n from "../locale";
import styles from 'styles/common'
import Image from 'react-native-remote-svg'
import { BORDER_COLOR, GREY_COLOR } from "../sources/constants/colors"
import DatePicker from 'components/DatePicker'
import Button from "components/Button"
import MultiSlider from "components/MultiSlider"
import moment from 'moment'
import { DATE_FORMAT } from "../sources/constants/date";

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        const { filters } = nextProps;

        if (filters) {
            let newState = {...filters};

            if (filters.typeIds) {
                newState.types = filters.typeIds;
            } else {
                newState.types = [];
            }

            this.setState({
                filters: newState
            })
        }
    }

    renderCircle  = ({color, active}) => {
        const size = active ? 20 : 30;

        return (
            <View style={[style.circle, {
                backgroundColor: color,
                width: size,
                height: size,
                marginLeft: active ? 10 : 0,
            }]} />
        )
    };

    renderCategory = ({type}) => {
        const t = I18n.getFixedT();

        const active = this.state.filters.types && this.state.filters.types.filter(id => id == type.id)[0];
        const buttonTextPadding = active ? 43 : 15;

        return (
            <View key={type.id} style={[style.categoryBlock, {
                flexDirection: `row${ active ? '-reverse' : ''}`,
                justifyContent: `flex${ active ? '-end' : '-start'}`
            }]}>
                <TouchableHighlight onPress={() => {
                    this.toggleType(type.id)
                }}>
                    {this.renderCircle({color: type.color, active})}
                </TouchableHighlight>

                <Button
                    style={style.button}
                    rounded={!!active}
                    transparent={!active}
                    color={type.color}
                    textStyle={{
                        fontSize: 18,
                        paddingLeft: buttonTextPadding,
                        paddingRight: buttonTextPadding
                    }}
                    onPress={() => {
                        this.toggleType(type.id)
                    }}
                >
                    {t(`filter:${type.handle}`)}
                </Button>
            </View>
        )
    };

    toggleType = (id) => {
        let newTypesState =  [...this.state.filters.types];

        if (newTypesState.indexOf(id) === -1) {
            newTypesState.push(id)
        } else {
            newTypesState = newTypesState.filter(typeID => typeID != id);
        }

        this.setState({
            filters: {
                ...this.state.filters,
                types: newTypesState
            }
        })
    };

    setFilters = (filters) => {
        const { submitFilters } = this.props;

        this.setState({
            filters: {}
        }, () => {
            submitFilters(filters);
        });
    };

    submit = () => {
        const { filters } = this.state;

        let params = {
            typeIds: filters.types
        };

        if (filters.startDate) params.startDate = filters.startDate;
        if (filters.endDate) params.endDate = filters.endDate;

        this.setFilters(params);
    };

    reset = () => {
        this.setFilters({});
    };

    setDate = (type, date) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [type]: date
            }
        })
    };

    render() {
        const t = I18n.getFixedT();

        const { types } = this.props;

        let orderedTypes = [];

        if (types) {
            const order = ['entertainment', 'artsCulture', 'sports', 'foodDining', 'other', 'community', 'night'];
            const ordered = [];
            const rest = [];

            types.forEach(type => {
                let index = order.indexOf(type.handle);

                if (index === -1) {
                    rest.push(type)
                } else {
                    ordered[index] = type;
                }
            });

            orderedTypes = [...ordered, ...rest]
        }

        return (
            <Content style={style.content}>
                <View style={{marginBottom: 20}}>
                    {/*<List>*/}
                        {/*<ListItem first style={style.listItem}>*/}
                            {/*<Image*/}
                                {/*source={require('/static/icons/nearby.svg')}*/}
                                {/*style={style.icon}*/}
                            {/*/>*/}
                            {/*<Body>*/}
                            {/*<Text style={style.listItemText}>Nearby Events</Text>*/}
                            {/*</Body>*/}
                        {/*</ListItem>*/}
                    {/*</List>*/}
                    {/*<List>*/}
                        {/*<ListItem style={style.listItem}>*/}
                            {/*<Image*/}
                                {/*source={require('/static/icons/free.svg')}*/}
                                {/*style={style.icon}*/}
                            {/*/>*/}
                            {/*<Body>*/}
                            {/*<Text style={style.listItemText}>Free Events</Text>*/}
                            {/*</Body>*/}
                        {/*</ListItem>*/}
                    {/*</List>*/}

                    {/*<View style={[style.block, {*/}
                        {/*flex: 1,*/}
                        {/*flexDirection: 'row',*/}
                        {/*justifyContent: 'space-between',*/}
                        {/*alignItems: 'center',*/}
                    {/*}]}>*/}
                        {/*<View style={style.titleHR} />*/}

                        {/*<View style={style.title}>*/}
                            {/*<Text style={style.titleText}>OR FILTER BY</Text>*/}
                        {/*</View>*/}

                        {/*<View style={style.titleHR} />*/}
                    {/*</View>*/}

                    <View style={[style.block]}>
                        <H3 style={[style.heading, styles.colorWhite]}>{t('filter:date')}</H3>

                        <DatePicker
                            placeholder={t('filter:from')}
                            date={this.state.filters.startDate}
                            onDateChange={(date) => {
                                this.setDate('startDate', date)
                            }}
                        />

                        <DatePicker
                            placeholder={t('filter:to')}
                            date={this.state.filters.endDate}
                            onDateChange={(date) => {
                                this.setDate('endDate', date)
                            }}
                        />
                    </View>

                    {/*<View style={[style.block]}>*/}
                        {/*<H3 style={[style.heading, styles.colorWhite]}>PRICE RANGE</H3>*/}

                        {/*<View style={{marginTop: 10}}>*/}
                            {/*<MultiSlider*/}
                                {/*values={[300,700]}*/}
                                {/*min={0}*/}
                                {/*max={1000}*/}
                                {/*step={10}*/}
                            {/*/>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    {
                        types ?
                            <View style={[style.block]}>
                                <H3 style={[style.heading, styles.colorWhite]}>CATEGORIES</H3>

                                {
                                    orderedTypes ? orderedTypes.map(type => this.renderCategory({type})) : false
                                }
                            </View> : false
                    }

                    <View style={[style.block]}>
                        <Button
                            rounded
                            block
                            color={'#441160'}
                            onPress={this.submit}
                            style={{marginBottom: 10}}
                        >
                            Yalla!
                        </Button>

                        <Button
                            rounded
                            block
                            secondary
                            onPress={this.reset}
                        >
                            {t('main:resetFilters')}
                        </Button>
                    </View>
                </View>
            </Content>
        );
    }
}

const style = StyleSheet.create({
    content: {backgroundColor: GREY_COLOR, paddingTop: 10},
    block: {marginHorizontal: 15, marginTop: 30},
    listItem: {...styles.transparentBg, borderBottomColor: BORDER_COLOR},
    icon: {width: 22, height: 22},
    listItemText: {...styles.colorWhite, fontSize: 22},
    title: {
        width: '33%',
        marginHorizontal: 5
    },
    titleText: {
        textAlign: 'center',
        ...styles.colorWhite
    },
    titleHR: {
        width: '33%',
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1
    },
    heading: {fontSize: 18, marginBottom: 10},
    button: {
        height: 30
    },
    circle: {
        borderRadius: 100/2,
    },
    categoryBlock: {flex: 1, alignItems: 'center', marginBottom: 10}
});


