import { NavigationProp } from "@react-navigation/native"
import React, { useCallback, useEffect, useMemo } from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet, ScrollView, LayoutChangeEvent } from "react-native"
import Theme from "../../../data/models/Theme"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../shared/inputs/Input"
import User, { UserPreview } from "../../../data/models/User"
import { dimensions, placeholders } from "../../../utils/Constants"
import Header from "../../shared/Header"
import Api from "../../../network/Api"
import AppStore from "../../../data/models/AppStore"
import UserPreviewItem from "./components/UserPreviewItem"
import { insertRecentSearchedUser } from "../../../redux/slices/search"
import LottieView from "lottie-react-native"
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const SearchScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const loadingAnim = require('../../../../assets/animations/loading.json')

    const user = useSelector<AppStore, User>(store => store.user.user)
    const jwt = useSelector<AppStore, string>(store => store.authTokens.jwt)
    const recentSearchedUsers = useSelector<AppStore, UserPreview[]>(store => store.search.recentUsers)
    const recentSearches = useSelector<AppStore, string[]>(store => store.search.recentSearches)
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const [query, setQuery] = React.useState<string>("")
    const [userResults, setUserResults] = React.useState<UserPreview[]>([])
    const [canDisplayLoadingIndicator, setDisplayLoadingIndicator] = React.useState<boolean>(false)
    const [canDisplayNoResults, setDisplayNoResults] = React.useState<boolean>(false)
    const [headerHeight, setHeaderHeight] = React.useState<number>(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (query.trimStart().trimEnd().length >= 3) {
            setDisplayLoadingIndicator(true)
        }
        else {
            setUserResults([])
            setDisplayNoResults(false)
        }
        const timeout = setTimeout(() => {
            if (query.trimStart().trimEnd().length < 3) return
            
            Api.search(query.trimStart().trimEnd(), 0, jwt).then(users => {
                setDisplayLoadingIndicator(false)
                setUserResults(users)
                setDisplayNoResults(users.length == 0)
            }).catch(error => {
                setDisplayLoadingIndicator(false)
                console.log('SearchScreen: search: error ->', error)
            })
        }, 1000)

        return () => clearTimeout(timeout)
    }, [query])

    const onSearchUserPress = useCallback((userId: number) => {
        const user = userResults.find(user => user.id === userId)
                
        if (!user) return
        
        openUserProfile(userId)

        setQuery('')
        setUserResults([])

        dispatch(insertRecentSearchedUser(user))
    }, [userResults])

    const onRecentUserPress = useCallback((userId: number) => {
        openUserProfile(userId)
    }, [])

    const openUserProfile = useCallback((userId: number) => {
        // TODO: implement
    }, [])

    const noRecentSearchedUsers = useMemo(() => recentSearchedUsers.length === 0, [recentSearchedUsers])

    const noRecentSearches = useMemo(() => recentSearches.length === 0, [recentSearches])

    const hideRecent = useMemo(() => query.trimStart().trimEnd().length > 2, [query])

    const computeViewHeight = useCallback((e: LayoutChangeEvent) => {
        setHeaderHeight(e.nativeEvent.layout.height)
    }, [])

    return (
        <View style={ styles.container }>
            {/* <Header
                title="Search"
            /> */}
            <LinearGradient
                colors={[theme.colors.background, theme.colors.background + '00']}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    padding: 20
                }} onLayout={ computeViewHeight }>
                <Input
                    placeholder='Search'
                    onChange={setQuery}
                    label="Search"
                    noLabel
                    capitalizeSentences
                    value={query}
                    keyboardType="twitter"
                />
            </LinearGradient>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: headerHeight - 20 }} showsVerticalScrollIndicator={ false }>
            {
                hideRecent ?
                <View>
                {
                    canDisplayLoadingIndicator ?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={ loadingAnim }
                            style={ styles.animation }
                            loop={ true }
                            autoPlay={ true }/>
                    </View>
                    :
                    null
                }
                {
                    userResults.map((user, index) => (
                        <View key={ user.id } style={{ marginTop: 20, marginBottom: index == userResults.length - 1 ? 8 : undefined }}>
                                <UserPreviewItem
                                user={user}
                                onPress={ onSearchUserPress }
                            />
                        </View>

                    ))
                }
                {
                    canDisplayNoResults ?
                    <Text style={{
                        ...styles.fontSubtitle,
                        marginTop: 20,
                    }}>No users found</Text>
                    :
                    null
                }
                </View>
                :
                <View>
                    <View style={{ marginTop: dimensions.MARGIN }} />
                    <Text style={ styles.fontTitle }>Recent Users</Text>
                    <View style={{ marginTop: 12 }} />
                    {
                        noRecentSearchedUsers ?
                        <Text style={ styles.fontSubtitle }>{ placeholders.NO_RECENT_SEARCHED_USERS }</Text>
                        : recentSearchedUsers.map(user => (
                            <View key={ user.id } style={{ marginBottom: 4 }}>
                                <UserPreviewItem
                                    user={user}
                                    onPress={ onRecentUserPress }
                                />
                            </View>
                        ))
                    }
                    <View style={{ marginTop: 12 }} />
                    <Text style={ styles.fontTitle }>Recent Searches</Text>
                    {
                        noRecentSearches ?
                        <Text style={ styles.fontSubtitle }>{ placeholders.NO_RECENT_SEARCHES }</Text>
                        :
                        null
                    }
                </View>
            }
            </ScrollView>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: dimensions.MARGIN
    },

    fontTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: theme.colors.onBackground,
        letterSpacing: dimensions.LETTER_SPACING,
        lineHeight: dimensions.LINE_HEIGHT
    },

    fontSubtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Light',
        color: theme.colors.onBackground,
        letterSpacing: dimensions.LETTER_SPACING,
        lineHeight: dimensions.LINE_HEIGHT,
        marginTop: 4
    },

    animation: {
        width: dimensions.WIDTH / 5,
        height: dimensions.WIDTH / 5,
    },

    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        padding: 10,
    },
})

export default SearchScreen
