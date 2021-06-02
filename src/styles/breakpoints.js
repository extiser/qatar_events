import { Dimensions } from 'react-native'


const { height, width } = Dimensions.get('window');

export const HEIGHT = height;
export const WIDTH = width;

export const HEIGHT_720 = 720;
export const HEIGHT_480 = 480;

export const isSmallHeight = (HEIGHT <= HEIGHT_480);