import React, { component, Component } from 'react';
import { Image } from 'react-native';

const TabBarItem = ({
    focused, tintColor, selectedImage, normalImage
}) => (
    <Image
        style={{ tintColor, width: 25, height: 25 }}
        source={focused ? selectedImage : normalImage}
    />
);
export default TabBarItem;
