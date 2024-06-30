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
import { UnregisteredUser } from "../../../data/models/User"
import Api from "../../../network/Api"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const RegisterScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [confirmPassword, setConfirmPassword] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')

    const onSignUp = () => {
        if (password !== confirmPassword) {
            return alert('Passwords do not match')
        }

        if (!email || !password || !confirmPassword || !firstName || !lastName || !username) {
            return alert('Please fill in all fields')
        }

        const fixedUsername = username.replace(/[@\s]/g, "")

        const user: UnregisteredUser = {
            email: email.trim(),
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: fixedUsername
        }

        Api.register(user).then(() => {
            alert('Successfully registered')
            navigation.goBack()
        }).catch(err => {
            alert(err.response.data.message)
        })
    }

    const onSignIn = React.useCallback(() => {
        navigation.goBack()
    }, [])
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <Text style={ styles.logoText }>Project T</Text>
                <Text style={ styles.title }>Sign Up</Text>
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
                <View style={{ marginTop: 20 }} />
                <Input
                    label='Confirm Password'
                    placeholder='Confirm your password'
                    value={ confirmPassword }
                    onChange={ setConfirmPassword }
                    secure
                />
                <View style={{ marginTop: 20 }} />
                <Input
                    label='First Name'
                    placeholder='Enter your first name'
                    value={ firstName }
                    capitalizeWords
                    onChange={ setFirstName }
                />
                <View style={{ marginTop: 20 }} />
                <Input
                    label='Last Name'
                    placeholder='Enter your last name'
                    value={ lastName }
                    capitalizeWords
                    onChange={ setLastName }
                />
                <View style={{ marginTop: 20 }} />
                <Input
                    label='Username'
                    placeholder='Enter your username'
                    value={ username }
                    onChange={ setUsername }
                />
                <View style={{ marginTop: 60 }} />
                <View style={{ marginTop: 'auto' }}>
                    <Button
                        text='Sign Up'
                        onPress={ onSignUp } />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
                        <Text style={ styles.bottomFont }>Already have an account?</Text>
                        <Text
                            onPress={ onSignIn } 
                            style={{
                                ...styles.bottomFont,
                                color: theme.colors.primary,
                                marginLeft: 5,
                                fontFamily: 'Inter-Bold'
                            }}
                        >Sign In</Text>
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

export default RegisterScreen
