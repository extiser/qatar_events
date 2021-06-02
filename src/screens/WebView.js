import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    Footer,
    Header,
    List,
    ListItem,
    Right,
    Left,
    Button,
    Icon,
    Body,
    Title
} from 'native-base';
import { TouchableOpacity, WebView, StyleSheet, Linking, ActivityIndicator } from 'react-native'

const WEBVIEW_REF = 'WEBVIEW_REF';
const activeColor = '#007aff';
const disabledColor = '#ccc';

export default class extends Component {
    state = {
        canGoBack: false,
        canGoForward: false,
        loading: false
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    onNavigationStateChange = (navState) => this.setState(navState);

    onBack = () => {
        this.refs[WEBVIEW_REF].goBack();
    };

    onForward = () => {
        this.refs[WEBVIEW_REF].goForward();
    };

    openURL = () => {
        const { params = {} } = this.props.navigation.state;
        const { uri } = params;

        return Linking.openURL(this.state.uri || uri)
    };

    render() {
        const { navigation } = this.props;

        const { params = {} } = navigation.state;
        const { uri, title } = params;

        return (
            <Container>
                <Header style={{backgroundColor: 'white'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigation.goBack()}
                        >
                            <Icon
                                ios='ios-close'
                                android='md-close'
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.loading ? 'Loading...' : (this.state.title || title)}</Title>
                    </Body>
                    <Right />
                </Header>

                <WebView
                    ref={WEBVIEW_REF}
                    source={{uri}}
                    onNavigationStateChange={this.onNavigationStateChange}
                />

                <Footer style={{backgroundColor: 'white'}}>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={[style.historyButton, {marginRight: 30}]}
                            disabled={!this.state.canGoBack}
                            onPress={this.onBack}
                        >
                            <Icon
                                ios='ios-arrow-back'
                                android='md-arrow-back'
                                style={{color: this.state.canGoBack ? activeColor : disabledColor}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.historyButton}
                            disabled={!this.state.canGoForward}
                            onPress={this.onForward}
                        >
                            <Icon
                                ios='ios-arrow-forward'
                                android='md-arrow-forward'
                                style={{color: this.state.canGoForward ? activeColor : disabledColor}}
                            />
                        </TouchableOpacity>
                    </Left>

                    <Right>
                        <Button
                            transparent
                            onPress={this.openURL}
                        >
                            <Icon
                                ios='ios-open-outline'
                                android='md-open'
                            />
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    historyButton: {
        marginHorizontal: 15
    }
});

