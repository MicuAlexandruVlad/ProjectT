import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../../../data/models/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { dimensions } from '../../../utils/Constants'
import AnimatedLottieView from "lottie-react-native"
import { NavigationProp } from '@react-navigation/native'
import RootStackParamList from '../../../navigation/RootStackParamList'
import ThemeUtils from '../../../utils/ThemeUtils'

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const SplashScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const dispatch = useDispatch()
    
    const loadingAnim = require('../../../../assets/animations/loading.json')
    
    const styles = styleSheet(theme)
    
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={ styles.titleHolder }>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    {/* <Image
                        source={ logo }
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                            marginBottom: -2
                        }}
                    /> */}
                    <Text style={ styles.text }>Project T</Text>
                </View>
                <AnimatedLottieView
                    source={ loadingAnim }
                    style={ styles.animation }
                    loop={ true }
                    autoPlay={ true }/>
            </View>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    titleHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.onBackground,
        fontSize: 24,
        // fontWeight: 'bold',
        marginLeft: 8,
        fontFamily: 'Inter-Bold',
        letterSpacing: dimensions.LETTER_SPACING + 1
    },
    animation: {
        width: dimensions.WIDTH / 3.5,
        height: dimensions.WIDTH / 3.5,
    },
})

export default SplashScreen
