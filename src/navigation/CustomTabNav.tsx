import React, { memo } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { dimensions } from '../utils/Constants'
import { useSelector } from 'react-redux'
import AppStore from '../data/models/AppStore'
import UIController from '../data/models/UIController'
import darkTheme from '../ui/theme/DarkTheme'
import lightTheme from '../ui/theme/LightTheme'
import Theme from '../data/models/Theme'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'

type Props = {
    state: any
    descriptors: any
    navigation: any
}

const CustomTabNav: React.FC<Props> = ({ state, descriptors, navigation }) => {
    const homeIcon = require('../../assets/images/home.png')
    const homeFilledIcon = require('../../assets/images/home_filled.png')
    const searchIcon = require('../../assets/images/search.png')
    const searchFilledIcon = require('../../assets/images/search_filled.png')
    const notificationIcon = require('../../assets/images/notification.png')
    const notificationFilledIcon = require('../../assets/images/notification_filled.png')
    const userIcon = require('../../assets/images/user.png')
    const userFilledIcon = require('../../assets/images/user_filled.png')
    
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme

    const getIcon = (label: string, isFocused: boolean) => {
        switch(label.toLowerCase()) {
            case 'home': 
                return (
                    <Image source={ isFocused ? homeFilledIcon : homeIcon } style={{
                        ...styles.icon,
                        tintColor: isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant
                    }} />
                )
            case 'search': 
                return (
                    <Image source={ isFocused ? searchFilledIcon : searchIcon } style={{
                        ...styles.icon,
                        width: 20,
                        height: 20,
                        tintColor: isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant
                    }} />
                )
            case 'notification':
                return (
                    <Image source={ isFocused ? notificationFilledIcon : notificationIcon } style={{
                        ...styles.icon,
                        tintColor: isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant
                    }} />
                )
            case 'user':
                return (
                    <Image source={ isFocused ? userFilledIcon : userIcon } style={{
                        ...styles.icon,
                        width: 21,
                        height: 21,
                        tintColor: isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant
                    }} />
                )
        }
    }

    const styles = styleSheet(theme)

    return (
        <View style={ styles.body }>
            {
                state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key]
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name
                            
                    const isFocused = state.index === index

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            ype: 'tabLongPress',
                            target: route.key,
                        })
                    }


                    return (
                        <View key={ index } style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            flex: 1,
                        }}>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                accessibilityRole='button'
                                accessibilityState={ isFocused ? { selected: true } : {} }
                                accessibilityLabel={ options.tabBarAccessibilityLabel }
                                onPress={ onPress }
                                onLongPress={ onLongPress }
                            >
                                <View>
                                    { getIcon(label, isFocused) }
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'row',
        width: dimensions.WIDTH,
        justifyContent: 'space-around',
        backgroundColor: theme.colors.surfaceContainerLowest,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
})

export default memo(CustomTabNav)
