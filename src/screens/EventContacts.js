import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    List,
    ListItem,
    Right,
    Icon,
    Body
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { StyleSheet, Linking } from 'react-native'
import Communications from 'react-native-communications';
import { PRIMARY_COLOR } from "../sources/constants/colors";
import { BROWSER } from "../sources/constants/routes";

export default class EventContacts extends Component {

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();
        const { params = {} } = navigation.state;
        const { bgColor } = params;

        return {
            title: t('main:contactInformation'),
            headerStyle: { backgroundColor: bgColor || PRIMARY_COLOR },
        }
    };


    render() {
        const { screenProps, navigation } = this.props;

        const { params = {} } = navigation.state;
        const { contacts } = params;

        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        const CONTACT_TYPE = {
            telephone: t('eventContacts:telephone'),
            email: t('eventContacts:email'),
            website: t('eventContacts:website'),
        };

        function processUrl(url) {
            if (url.indexOf('http') === -1) return `http://${url}`;

            return url;
        }

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    {
                        contacts && contacts.map((contact, i) =>
                            <List key={i} style={style.list}>
                                {
                                    contact.telephone ?
                                    <ListItem style={style.listItem}
                                              onPress={() => Communications.phonecall(contact.telephone, true)}>
                                        <Body>
                                            <Text style={style.text}>{CONTACT_TYPE.telephone} - {contact.telephone}</Text>
                                        </Body>
                                    </ListItem> : false
                                }
                                {
                                    contact.email ?
                                    <ListItem
                                        style={style.listItem}
                                        onPress={() => Communications.email(contact.email, null, null, null, null)}
                                    >
                                        <Body>
                                            <Text style={style.text}>{CONTACT_TYPE.email} - {contact.email}</Text>
                                        </Body>
                                    </ListItem> : false
                                }
                                {
                                    contact.website ?
                                    <ListItem style={style.listItem}
                                              onPress={() => navigation.navigate(BROWSER, {uri: processUrl(contact.website)})}>
                                        <Body>
                                            <Text style={style.text}>{CONTACT_TYPE.website} - {contact.website}</Text>
                                        </Body>
                                    </ListItem> : false
                                }
                            </List>
                        )
                    }
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    list: {
        marginTop: 10
    },
    listItem: {
        ...styles.listItem,
        ...styles.darkBg
    },
    text: {
        ...styles.colorWhite
    }
});
