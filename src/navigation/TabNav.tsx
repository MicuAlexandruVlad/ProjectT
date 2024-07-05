import React, { memo, useMemo } from 'react'
import CustomTabNav from './CustomTabNav'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../ui/screens/HomeScreen/HomeScreen'
import NotificationScreen from '../ui/screens/NotificationScreen/NotificationScreen'
import UserScreen from '../ui/screens/UserScreen/UserScreen'
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
        <Tab.Navigator initialRouteName='home' backBehavior='initialRoute' tabBar={ props => <CustomTabNav { ...props } /> }>
            { memoizedHomeScreen }
            <Tab.Screen name='search' component={ SearchScreen } options={{
                headerShown: false
            }} />
            <Tab.Screen name='notification' component={ NotificationScreen } options={{
                headerShown: false
            }} />
            <Tab.Screen name='user' component={ UserScreen } options={{
                headerShown: false,
                lazy: false
            }}/>
        </Tab.Navigator>
    )
}

export default memo(TabNav)