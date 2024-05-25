import { StatusBar } from 'expo-status-bar'
import { Appearance, Platform, SafeAreaView, StyleSheet, Text, UIManager, View } from 'react-native'
import store from './src/redux/store'
import React, { useEffect } from 'react'
import { setTheme } from './src/redux/slices/uiController'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DefaultTheme, NavigationContainer, NavigationState } from '@react-navigation/native'
import { Provider, useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContainer from './AppContainer'
import * as Font from 'expo-font'
import darkTheme from './src/ui/theme/DarkTheme'
import lightTheme from './src/ui/theme/LightTheme'
import ThemeUtils from './src/utils/ThemeUtils'

const queryClient = new QueryClient()

const TAG = 'App:'
export default function App() {
	const dispatch = store.dispatch

	useEffect(() => {
		Font.loadAsync({
			'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
			'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
			'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
			'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
			'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
			'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
			'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
			'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
			'Inter-Black': require('./assets/fonts/Inter-Black.ttf')
		}).then(() => {
			console.log(TAG, 'Fonts loaded')
		})
	}, [])

	useEffect(() => {
		const isDarkTheme = Appearance.getColorScheme() === 'dark'
		const color = isDarkTheme ? darkTheme.colors.background : lightTheme.colors.background

		ThemeUtils.changeNavbarColor(color, isDarkTheme)
		
		dispatch(setTheme(isDarkTheme))

		if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
			const isDarkTheme = colorScheme === 'dark'
			const color = isDarkTheme ? darkTheme.colors.background : lightTheme.colors.background

			ThemeUtils.changeNavbarColor(color, isDarkTheme)

			dispatch(setTheme(isDarkTheme))
        })

        return () => sub.remove()
    }, [])
	
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView>
				<NavigationContainer theme={{
					...DefaultTheme,
					colors: {
						...DefaultTheme.colors,
						background: 'transparent',
					},
				}}>
					<Provider store={ store }>
						<QueryClientProvider client={ queryClient }>
							<AppContainer />
						</QueryClientProvider>
					</Provider>
				</NavigationContainer>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
