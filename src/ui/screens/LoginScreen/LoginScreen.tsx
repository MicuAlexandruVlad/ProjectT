import { NavigationProp } from "@react-navigation/native"
import React from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import Theme from "../../../data/models/Theme"
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from "react-native"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useSelector } from "react-redux"
import { dimensions } from "../../../utils/Constants"
import Input from "../../shared/inputs/Input"
import Button from "../../shared/Button"
import Routes from "../../../navigation/Routes"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const LoginScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const onSignIn = React.useCallback(() => {
        
    }, [])

    const onSignUp = React.useCallback(() => {
        navigation.navigate(Routes.REGISTER_SCREEN)
    }, [])
    
    return (
        <ScrollView style={ styles.container } contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Text style={ styles.logoText }>Project T</Text>
                <Text style={ styles.title }>Sign In</Text>
                <View style={{ marginTop: 40 }} />
                <Input
                    label='Email'
                    placeholder='Enter your email'
                    value={ email }
                    onChange={ setEmail }
                    keyboardType='email-address'
                />
                <View style={{ marginTop: 20 }} />
                <Input
                    label='Password'
                    placeholder='Enter your password'
                    value={ password }
                    onChange={ setPassword }
                    secure
                />
                <View style={{ marginTop: 60 }} />
                <View style={{ marginTop: 'auto' }}>
                    <Button
                        text='Sign In'
                        onPress={ onSignIn } />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={ styles.bottomFont }>Don't have an account?</Text>
                        <Text
                            onPress={ onSignUp } 
                            style={{
                                ...styles.bottomFont,
                                color: theme.colors.primary,
                                marginLeft: 5,
                                fontFamily: 'Inter-Bold'
                            }}
                        >Sign Up</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
    },

    logoText: {
        fontSize: 30,
        fontFamily: 'Inter-Bold',
        color: theme.colors.onBackground,
        letterSpacing: dimensions.LETTER_SPACING + 1,
        marginHorizontal: 'auto',
        marginTop: 40
    },

    title: {
        fontSize: 24,
        fontFamily: 'Inter-Medium',
        color: theme.colors.primary,
        letterSpacing: dimensions.LETTER_SPACING,
        marginTop: dimensions.HEIGHT * 0.14
    },

    bottomFont: {
        color: theme.colors.onBackground,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        letterSpacing: dimensions.LETTER_SPACING
    }
})

export default LoginScreen
