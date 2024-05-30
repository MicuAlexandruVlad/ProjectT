import React, { memo, useMemo } from 'react'
import CustomTabNav from './CustomTabNav'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../ui/screens/HomeScreen/HomeScreen'
import ExploreScreen from '../ui/screens/ExploreScreen/ExploreScreen'
import SettingsScreen from '../ui/screens/SettingsScreen/SettingsScreen'
import SearchScreen from '../ui/screens/SearchScreen/SearchScreen'


const Tab = createBottomTabNavigator()

const TabNav = () => {

    const memoizedHomeScreen = useMemo(() => {
        return <Tab.Screen name='home' component={ HomeScreen } options={{
                    headerShown: false,
                    lazy: false
                }} />
    }, [])
    
    return (
        // TODO: bottom bar goes up when opening keyboard. Should be fixed but not a priority
        <Tab.Navigator initialRouteName='home' backBehavior='initialRoute' tabBar={ props => <CustomTabNav { ...props } /> }>
            { memoizedHomeScreen }
            <Tab.Screen name='search' component={ SearchScreen } options={{
                headerShown: false
            }} />
            <Tab.Screen name='explore' component={ ExploreScreen } options={{
                headerShown: false
            }} />
            <Tab.Screen name='settings' component={ SettingsScreen } options={{
                headerShown: false,
                lazy: false
            }}/>
        </Tab.Navigator>
    )
}

export default memo(TabNav)