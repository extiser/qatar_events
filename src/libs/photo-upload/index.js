import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import RNFS from 'react-native-fs'

export default class PhotoUpload extends React.Component {
  state = {
    height: this.props.height || 300,
    width: this.props.width || 300,
    format: this.props.format || 'JPEG',
    quality: this.props.quality || 80
  };

  options = {
    title: this.props.pickerTitle || 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  openImagePicker = () => {
    // get image from image picker
    ImagePicker.showImagePicker(this.options, async response => {
      console.log('Response = ', response);

      if (this.props.onStart) this.props.onStart();

      if (response.didCancel) {
        console.log('User cancelled image picker');
        if (this.props.onCancel) this.props.onCancel();
        return
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        return
      }

      let { height, width, quality, format } = this.state;

      // resize image
      const resizedImageUri = await ImageResizer.createResizedImage(
        `data:image/jpeg;base64,${response.data}`,
        height,
        width,
        format,
        quality
      );

      const filePath = Platform.OS === 'android' && resizedImageUri.uri.replace
        ? resizedImageUri.uri.replace('file:/data', '/data')
        : resizedImageUri.uri;

      // convert image back to base64 string
      const photoData = await RNFS.readFile(filePath, 'base64');
      let source = { uri: resizedImageUri.uri };
      this.setState({
        avatarSource: source
      });

      // handle photo in props functions as data string
      if (this.props.onPhotoSelect) {
        this.props.onPhotoSelect(response)
      }
    })
  };

  renderChildren = props => {
    return React.Children.map(props.children, child => {
      if (child.type === Image && this.state.avatarSource) {
        return React.cloneElement(child, {
          source: this.state.avatarSource
        })
      } else return child
    })
  };

  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={this.openImagePicker}>
          {this.renderChildren(this.props)}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
