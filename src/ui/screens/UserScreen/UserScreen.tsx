import { NavigationProp } from "@react-navigation/native"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import Theme from "../../../data/models/Theme"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useSelector } from "react-redux"
import { dimensions, getViewSwitcherOptions } from "../../../utils/Constants"
import AppStore from "../../../data/models/AppStore"
import CustomCard from "../../shared/CustomCard"
import HeaderButton from "../../shared/HeaderButton"
import Routes from "../../../navigation/Routes"
import ViewSwitcher from "./components/ViewSwitcher"
import PostItem from "../../shared/PostItem"
import { examplePost } from "../../../data/models/Post"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const UserScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const settingsIcon = require('../../../../assets/images/settings.png')
    const editIcon = require('../../../../assets/images/edit.png')
    
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)
    
    const user = useSelector((state: AppStore) => state.user.user)

    const [viewSwitcherOptions, setViewSwitcherOptions] = useState([ ...getViewSwitcherOptions() ])

    const fullUserName = useMemo(() => {
        return `${user.firstName} ${user.lastName}`
    }, [user.firstName, user.lastName])

    const imagePlaceholder = useMemo(() => {
        return user.firstName.charAt(0).toUpperCase()
    }, [user.firstName])

    const onViewSwitcherOptionChanged = useCallback((index: number) => {
        const newOptions = viewSwitcherOptions.map((option, i) => {
            option.selected = i === index
            return option
        })

        setViewSwitcherOptions(newOptions)
    }, [])

    const onSettingsPress = useCallback(() => {
        navigation.navigate(Routes.SETTINGS_SCREEN)
    }, [])

    const onEditPress = useCallback(() => {
        navigation.navigate(Routes.EDIT_SCREEN)
    }, [])

    const canDisplayPosts = useMemo(() => {
        return viewSwitcherOptions.find(option => option.title === 'Posts')?.selected ?? false
    }, [viewSwitcherOptions])

    const canDisplayMedia = useMemo(() => {
        return viewSwitcherOptions.find(option => option.title === 'Media')?.selected ?? false
    }, [viewSwitcherOptions])

    const canDisplayReposts = useMemo(() => {
        return viewSwitcherOptions.find(option => option.title === 'Reposts')?.selected ?? false
    }, [viewSwitcherOptions])

    const canDisplayLikes = useMemo(() => {
        return viewSwitcherOptions.find(option => option.title === 'Likes')?.selected ?? false
    }, [viewSwitcherOptions])

    return (
        <ScrollView contentContainerStyle={ styles.container }>
            <HeaderButton
                onPress={ onSettingsPress }
                iconSource={ settingsIcon }
            />
            <View style={ styles.header }>
                <View style={ styles.imageHolder }>
                    <HeaderButton
                        onPress={ onEditPress }
                        iconSource={ editIcon }
                        bodyStyle={{
                            position: 'absolute',
                            right: -6,
                            top: -6,
                            zIndex: 100,
                            width: 30,
                            height: 30,
                        }}
                    />
                    <Text style={ styles.defaultImageFont }>{ imagePlaceholder }</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text numberOfLines={ 1 }  ellipsizeMode="tail" style={ styles.fullName }>{ fullUserName }</Text>
                    <Text numberOfLines={ 1 }  ellipsizeMode="tail" style={ styles.username }>@{ user.username }</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }} />
            <CustomCard>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={ styles.infoLabel }>Followers</Text>
                        <Text style={ styles.infoValue }>21k</Text>
                    </View>
                    <View>
                        <Text style={ styles.infoLabel }>Following</Text>
                        <Text style={ styles.infoValue }>1.2k</Text>
                    </View>
                    <View>
                        <Text style={ styles.infoLabel }>Posts</Text>
                        <Text style={ styles.infoValue }>42</Text>
                    </View>
                </View>
            </CustomCard>
            <ViewSwitcher options={ viewSwitcherOptions } onOptionPress={ onViewSwitcherOptionChanged } />
            <View style={{ marginTop: 20 }} />
            {
                canDisplayPosts && Array.from({ length: 8 }).map((_, index) => (
                    <View key={ index } style={{ marginTop: index > 0 ? 16 : 0 }}>
                        <PostItem
                            post={ examplePost }
                            onPress={ () => {} }
                            onLike={ () => {} }
                            onRepost={ () => {} }
                            onUserPress={ () => {} }
                            disableButtons
                        />
                    </View>
                ))
            }
        </ScrollView>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        padding: dimensions.MARGIN
    },

    header: {
        marginVertical: 20,
        alignItems: 'center'
    },

    imageHolder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.secondaryFixed,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },

    defaultImageFont: {
        fontFamily: 'Inter-Bold',
        fontSize: 34,
        color: theme.colors.onSecondaryFixedVariant
    },

    fullName: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: theme.colors.onBackground,
        letterSpacing: dimensions.LETTER_SPACING,
        flexWrap: 'wrap'
    },

    username: {
        color: theme.colors.onBackground,
        fontFamily: 'Inter-Light',
        fontSize: 14,
        marginTop: 4,
        letterSpacing: dimensions.LETTER_SPACING,
        flexWrap: 'nowrap'
    },

    infoLabel: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.onBackground,
        marginBottom: 4
    },

    infoValue: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: theme.colors.onBackground
    }
})

export default UserScreen
