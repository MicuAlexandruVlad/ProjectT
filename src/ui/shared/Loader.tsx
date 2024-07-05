import AnimatedLottieView from "lottie-react-native"
import React from "react"
import { Modal, StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { dimensions } from "../../utils/Constants"
import UIController from "../../data/models/UIController"
import darkTheme from "../theme/DarkTheme"
import lightTheme from "../theme/LightTheme"
import AppStore from "../../data/models/AppStore"

type Props = {
    loading: boolean
}

const Loader: React.FC<Props> = ({ loading }) => {
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme
    
    const loadingAnim = require('../../../assets/animations/loading.json')
    
    return (
        <Modal
            visible={ loading }
            animationType='fade'
            transparent>
            <View
                style={{
                    flex: 1,
                    backgroundColor: `${theme.colors.background}00`,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <AnimatedLottieView
                    source={ loadingAnim }
                    style={ styles.animation }
                    loop={ true }
                    autoPlay={ true }/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    animation: {
        width: dimensions.WIDTH / 3.5,
        height: dimensions.WIDTH / 3.5,
    },
})

export default Loader
