import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Segment,
    Spinner,
    Toast
} from 'native-base';
import styles from "../styles/common"
import { View, Dimensions } from "react-native"
import I18n from "../locale"
import { setFilters } from 'actions/filters'
import { getUser } from 'actions/user'
import API from 'API'
import FeedbackForm from 'components/FeedbackForm'

class TechnicalSupport extends Component {
    constructor() {
        super();

        this.state = {
            message: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:technicalSupport'),
        }
    };

    submit = () => {
        let data = new FormData();

        data.append('bodyText', this.state.message);

        API.technicalSupport(data).then(res => {
            if (res.data.success) {
                this.setState({message: ''}, () => {
                    Toast.show({
                        text: 'Sended',
                        position: 'bottom',
                        duration: 3000,
                        type: 'success',
                        buttonText: 'OK'
                    });
                });
            }
        }).catch(err => {
            let errorMessage = err.response.data || 'Error';

            Toast.show({
                text: errorMessage,
                position: 'bottom',
                duration: 3000,
                type: 'danger',
                buttonText: 'OK'
            });
        })
    };

    onChange = (message) => {
        this.setState({message})
    };

    render() {
        const { screenProps } = this.props;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        const { height } = Dimensions.get('window');

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    <View style={[styles.wrapper, {marginVertical: 20}]}>
                        <FeedbackForm
                            height={height}
                            text={t('technicalSupport:text')}
                            onSubmit={this.submit}
                            onChange={this.onChange}
                            buttonDisabled={!this.state.message}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

export default TechnicalSupport


