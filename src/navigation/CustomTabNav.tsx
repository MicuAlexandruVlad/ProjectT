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
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme

    const getIcon = (label: string, isFocused: boolean) => {
        switch(label.toLowerCase()) {
            case 'home': 
                return (
                    <Entypo name="home" size={22} color={ isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant } />
                )
            case 'search': 
                return (
                    <Entypo name="magnifying-glass" size={22} color={ isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant } />
                )
            case 'explore':
                return (
                    <Entypo name="compass" size={22} color={ isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant } />
                )
            case 'settings':
                return (
                    <Entypo name="cog" size={22} color={ isFocused ? theme.colors.secondary : theme.colors.onSurfaceVariant } />
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
