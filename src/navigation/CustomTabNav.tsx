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

type Props = {
    state: any
    descriptors: any
    navigation: any
}

const CustomTabNav: React.FC<Props> = ({ state, descriptors, navigation }) => {
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme

    const home = require('../../assets/images/home.png')
    const search = require('../../assets/images/search.png')
    const explore = require('../../assets/images/explore.png')
    const settings = require('../../assets/images/settings.png')

    const getIcon = (label: string) => {
        switch(label.toLowerCase()) {
            case 'home': 
                return home
            case 'search': 
                return search
            case 'explore':
                return explore
            case 'settings':
                return settings
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
                                    <Image 
                                        source={ getIcon(label) } 
                                        style={{
                                            ...styles.icon,
                                            tintColor: isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant
                                        }} />
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
