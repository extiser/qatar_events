import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Icon, Spinner } from 'native-base';
import styles from 'styles/common'
import { PRIMARY_COLOR } from "../sources/constants/colors";
import PhotoUpload from 'libs/photo-upload'

class Avatar extends Component {
    state = {
        loading: false,
        isSetImage: false
    };

    render() {
        const { title, setAvatar, imgSrc } = this.props;
        return (
            <View style={styles.absCenter}>

                {
                    this.state.loading &&
                    <View style={[styles.circle, style.avatarLoading, styles.absCenter]}>
                        <Spinner color={'white'}/>
                    </View>
                }

                <PhotoUpload
                    pickerTitle={title}
                    onStart={() => {
                        this.setState({loading: true});
                    }}
                    onPhotoSelect={response => {
                        if (response) {
                            this.setState({
                                loading: false,
                                isSetImage: true
                            }, () => {
                                setAvatar(response)
                            });
                        }
                    }}
                    onCancel={() => {
                        this.setState({loading: false});
                    }}
                >
                    {
                        this.state.isSetImage || (imgSrc != null) ?
                            <Image
                                style={styles.circle}
                                resizeMode='cover'
                                source={{
                                    uri: imgSrc
                                }}
                            />
                            :
                            <View style={[styles.circle, styles.absCenter, {backgroundColor: PRIMARY_COLOR}]}>
                                <Icon style={style.icon} name='camera' />
                            </View>
                    }
                </PhotoUpload>
            </View>
        )
    }
}

const style = StyleSheet.create({
    iconContainer: {
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    icon: {
        ...styles.colorWhite,
        backgroundColor: 'transparent',
        fontSize: 50,
    },
    avatarLoading: {
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        zIndex: 1,
    }
});

export default Avatar