import { StatusBar } from 'expo-status-bar'
import { Appearance, Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import store from './src/redux/store'
import { useEffect } from 'react'
import { setTheme } from './src/redux/slices/uiController'

export default function App() {
	const dispatch = store.dispatch

	useEffect(() => {
		dispatch(setTheme(Appearance.getColorScheme() === 'dark'))

		if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])
	
	return (
		<View style={ styles.container }>
		
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
