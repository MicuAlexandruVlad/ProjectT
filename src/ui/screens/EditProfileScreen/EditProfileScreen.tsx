import { NavigationProp } from "@react-navigation/native"
import React, { useCallback } from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet } from "react-native"
import Theme from "../../../data/models/Theme"
import { useDispatch, useSelector } from "react-redux"
import ThemeUtils from "../../../utils/ThemeUtils"
import Button from "../../shared/Button"
import AsyncStorageUtils from "../../../utils/AsyncStorageUtils"
import { dimensions } from "../../../utils/Constants"
import AppStore from "../../../data/models/AppStore"
import User from "../../../data/models/User"
import Input from "../../shared/inputs/Input"
import Header from "../../shared/Header"
import { setUser } from "../../../redux/slices/user"
import Api from "../../../network/Api"
import { setLoading } from "../../../redux/slices/uiController"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const EditProfileScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const user = useSelector<AppStore, User>(store => store.user.user)
    const jwt = useSelector<AppStore, string>(store => store.authTokens.jwt)
    const theme = ThemeUtils.getTheme(useSelector)

    const [firstName, setFirstName] = React.useState<string>(user.firstName)
    const [lastName, setLastName] = React.useState<string>(user.lastName)

    const dispatch = useDispatch()

    const styles = styleSheet(theme)

    const onSave = useCallback(() => {
        const oldUser = { ...user }
        const updatedUser = { ...user, firstName, lastName }
        const areUsersEqual = JSON.stringify(user) === JSON.stringify(updatedUser)

        if (areUsersEqual) {
            return alert('No changes were made')
        }

        dispatch(setLoading(true))
        AsyncStorageUtils.setActiveUser(updatedUser)
        dispatch(setUser(updatedUser))

        Api.updateUser(updatedUser, jwt).then(() => {
            dispatch(setLoading(false))
            navigation.goBack()
        }).catch(() => {
            dispatch(setUser(oldUser))
            dispatch(setLoading(false))
            alert('Failed to update profile')
        })
        
    }, [user, firstName, lastName])

    return (
        <View style={ styles.container }>
            <Header
                title='Edit Profile'
            />
            <View style={{ marginTop: 20 }} />
            <Input
                label='First Name'
                placeholder='Enter your first name'
                value={ firstName }
                onChange={ setFirstName }
            />
            <View style={{ marginTop: 20 }} />
            <Input
                label='Last Name'
                placeholder='Enter your last name'
                value={ lastName }
                onChange={ setLastName }
            />
            <View style={{ marginTop: 'auto' }}>
                <Button
                    text='Save'
                    onPress={ onSave }/>
            </View>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        margin: dimensions.MARGIN,
    }
})

export default EditProfileScreen
