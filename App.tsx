import { StatusBar } from 'expo-status-bar'
import { Appearance, Platform, SafeAreaView, StyleSheet, Text, UIManager, View } from 'react-native'
import store from './src/redux/store'
import React, { useCallback, useEffect, useState } from 'react'
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
import Routes from './src/navigation/Routes'

const queryClient = new QueryClient()

const TAG = 'App:'
export default function App() {
	const dispatch = store.dispatch

	const [inMainScreen, setInMainScreen] = useState(false)
	const [fontsLoaded, setFontsLoaded] = useState(false)

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
			setFontsLoaded(true)
		})
	}, [])

	useEffect(() => {
		const isDarkTheme = Appearance.getColorScheme() === 'dark'
		
		dispatch(setTheme(isDarkTheme))

		if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
			const isDarkTheme = colorScheme === 'dark'
			const theme = isDarkTheme ? darkTheme : lightTheme

			if (inMainScreen) {
				ThemeUtils.changeNavbarColor(theme.colors.surfaceContainerLowest, isDarkTheme)
			} else {
				ThemeUtils.changeNavbarColor(theme.colors.background, isDarkTheme)
			}

			dispatch(setTheme(isDarkTheme))
        })

        return () => sub.remove()
    }, [inMainScreen])

	const routeChangeListener = useCallback((state: NavigationState | undefined) => {
		if (state) {
			const theme = ThemeUtils.getThemeFromStore()
			const isDarkTheme = ThemeUtils.isDarkThemeFromStore()
			const isMainScreen = state.routes[state.index].name === Routes.MAIN_SCREEN
			const color = isMainScreen ? theme.colors.surfaceContainerLowest : theme.colors.background

			setInMainScreen(isMainScreen)

			ThemeUtils.changeNavbarColor(color, isDarkTheme, true)
		}
	}, [])
	
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView>
				<NavigationContainer
					theme={{
						...DefaultTheme,
						colors: {
							...DefaultTheme.colors,
							background: 'transparent',
						},
					}}
					onStateChange={ routeChangeListener }
				>
					<Provider store={ store }>
						<QueryClientProvider client={ queryClient }>
						{
							fontsLoaded &&
							<AppContainer />
						}
						</QueryClientProvider>
					</Provider>
				</NavigationContainer>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
