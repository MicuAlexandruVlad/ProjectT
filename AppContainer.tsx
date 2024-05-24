import React, {  } from "react"
import { StatusBar, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import darkTheme from "./src/ui/theme/DarkTheme"
import lightTheme from "./src/ui/theme/LightTheme"
import AppStore from "./src/data/models/AppStore"
import UIController from "./src/data/models/UIController"
import Loader from "./src/ui/shared/Loader"
import StackNav from "./src/navigation/StackNav"


const AppContainer: React.FC = (): React.JSX.Element => {
	const isLoading = useSelector<AppStore, boolean>((store) => store.uiController.loading)
	const isDarkTheme = useSelector<AppStore, boolean>((store) => store.uiController.isDarkTheme)
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)

	const dispatch = useDispatch()


	const theme = isDarkTheme ? darkTheme : lightTheme
	
	return (
		<View style={{ 
			backgroundColor: theme.colors.background,
			flexGrow: 1,
			height: '100%',
		}}>
			<StatusBar backgroundColor={ theme.colors.background } barStyle={ isDarkTheme ? 'light-content' : 'dark-content' } />
			{/* <StackNav /> */}
			<Loader loading={ isLoading } />
		</View>
	)
}

export default AppContainer
