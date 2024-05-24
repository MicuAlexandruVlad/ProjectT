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

const queryClient = new QueryClient()

export default function App() {
	const dispatch = store.dispatch

	useEffect(() => {
		dispatch(setTheme(Appearance.getColorScheme() === 'dark'))

		if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
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
