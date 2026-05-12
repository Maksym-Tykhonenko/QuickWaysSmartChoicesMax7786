// @ts-nocheck
import { LoadingGlowWebView } from '../components/LoadingGlowWebView';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { IMAGES } from '../aysAseisst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar,
     Dimensions,
     View,
     StyleSheet,
     Image, } from 'react-native';

type Props = {
    durationMs?: number;
};

const HAS_SEEN_ONBOARDING_KEY = 'hasSeenOnboarding';

const COLORS = {
    bg: '#050609',
    text: '#F7F6F2',
    muted: 'rgba(247,246,242,0.56)',
    accent: '#E12124',
};

const SIZE = {
    title: 40,
    subtitle: 15,
    spacing: 10,
    dot: 7,
};

const LoadDataOfApplication = ({ durationMs = 1200 }: Props): React.ReactElement => {
    const navigation = useNavigation<any>();

    {/** 
    useEffect(() => {
        let isMounted = true;

        const timeoutId = setTimeout(() => {
            AsyncStorage.getItem(HAS_SEEN_ONBOARDING_KEY)
                .then(value => {
                    if (!isMounted) {
                        return;
                    }

                    const hasSeenOnboarding = value === 'true';
                    navigation.replace(hasSeenOnboarding ? 'MainApp' : 'KoreOnboardFirstly');
                })
                .catch(() => {
                    if (!isMounted) {
                        return;
                    }

                    navigation.replace('KoreOnboardFirstly');
                });
        }, durationMs);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [durationMs, navigation]);
*/}
    return (
        <View style={styles.root}>
            <Image source={IMAGES.background}
                style={{
                    width: Dimensions.get('window').width,


                    position: 'absolute',

                    resizeMode: 'cover',

                    height: Dimensions.get('window').height,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
            <LoadingGlowWebView size={96} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: SIZE.title,
        lineHeight: SIZE.title + 2,
        color: COLORS.text,
    },
    subtitle: {
        marginTop: SIZE.spacing,
        fontSize: SIZE.subtitle,
        color: COLORS.muted,
    },
    dot: {
        marginTop: SIZE.spacing * 2,
        width: SIZE.dot,
        borderRadius: SIZE.dot,
        backgroundColor: COLORS.accent,
        height: SIZE.dot,
    },
});

export default LoadDataOfApplication;
