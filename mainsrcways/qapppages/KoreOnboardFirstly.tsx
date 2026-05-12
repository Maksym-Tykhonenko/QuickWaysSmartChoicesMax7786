// @ts-nocheck
// @ts-nocheck
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    NativeSyntheticEvent,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    useWindowDimensions,
    StatusBar,
    Image,
    NativeScrollEvent,
} from 'react-native';
import { IMAGES } from '../aysAseisst';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { laefontsems } from '../laefontsems';

const STORAGE_KEY_ONBOARD = 'hasSeenOnboarding';

const COLORS = {
    text: '#111111',
    subtitle: 'rgba(17, 17, 17, 0.78)',
    progressActive: 'rgba(255, 255, 255, 0.92)',
    progressInactive: 'rgba(255, 255, 255, 0.26)',
    buttonBg: '#CCFF00',
    buttonText: '#111111',
    overlayTop: 'rgba(255, 255, 255, 0.05)',
    overlayBottom: 'rgba(91, 18, 181, 0.12)',
};

const SIZE = {
    progressGap: 8,
    progressHeight: 4,
    buttonHeight: 48,
    buttonRadius: 16,
    horizontalPadding: 24,
    titleSize: 30,
    subtitleSize: 16,
    imageHeight: 264,
    imageMaxWidth: 240,
};

const slides = [
    {
        title: 'Quick Situations',
        description: 'Choose options in different scenarios and see how you react.',
        image: IMAGES.onboardingCards.router,
        button: 'Good',
    },
    {
        title: 'Reactions and Approaches',
        description: 'Get quick ideas on how to act in different moments.',
        image: IMAGES.onboardingCards.message,
        button: 'Okay',
    },
    {
        title: 'Stories and Thoughts',
        description: 'Read scenarios and short phrases for reflection.',
        image: IMAGES.onboardingCards.book,
        button: 'Nice',
    },
    {
        title: 'Save what\'s important',
        description: 'Capture what resonates and come back to it later.',
        image: IMAGES.onboardingCards.bookmark,
        button: 'Continue',
    },
];

export default function KoreOnboardFirstly() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0);

    const onDone = async () => {
        await AsyncStorage.setItem(STORAGE_KEY_ONBOARD, 'true');
        navigation.replace('MainApp');
    };

    const onNext = () => {
        const isLast = index === slides.length - 1;
        if (isLast) {
            onDone();
            return;
        }
        scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    };

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextIndex = Math.round(e.nativeEvent.contentOffset.x / width);
        setIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
    };

    return (
        <View style={styles.root}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <ScrollView
                style={styles.scroller}
                ref={scrollRef}
                onMomentumScrollEnd={onMomentumEnd}
                overScrollMode="never"
                horizontal
                decelerationRate="fast"
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
            >
                {slides.map((slide) => (
                    <ImageBackground
                        key={slide.title}
                        source={IMAGES.background}
                        style={{ width, height: height * 1.0111 }}
                        resizeMode="cover"
                    >
                        <View style={styles.overlay} /> 
                        <View
                            style={[
                                styles.slideContainer,
                                {
                                    paddingTop: Math.max(insets.top + 12, 34),
                                    paddingBottom: Math.max(insets.bottom + 20, 28),
                                },
                            ]}
                        >
                            <View style={styles.headerBlock}>
                                <Text style={styles.slideTitle} numberOfLines={1} adjustsFontSizeToFit>{slide.title}</Text>
                                <Text style={styles.description}>{slide.description}</Text>
                            </View>

                            <View style={styles.imageBlock}>
                                <Image source={slide.image} style={styles.image} resizeMode="contain" />
                            </View>

                            <TouchableOpacity activeOpacity={0.88} onPress={onNext} style={styles.button}>
                                <Text style={styles.buttonText}>{slide.button}</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#B46FE3',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.overlayTop,
    },
    scroller: {
        flex: 1,
    },
    slideContainer: {
        flex: 1,
        paddingHorizontal: SIZE.horizontalPadding,
        justifyContent: 'space-between',
    },
    progressContainer: {
        flexDirection: 'row',
        gap: SIZE.progressGap,
    },
    progressBar: {
        flex: 1,
        height: SIZE.progressHeight,
        borderRadius: SIZE.progressHeight / 2,
        backgroundColor: COLORS.progressInactive,
    },
    progressBarActive: {
        backgroundColor: COLORS.progressActive,
        opacity: 1,
    },
    progressBarInactive: {
        opacity: 1,
    },
    headerBlock: {
        alignItems: 'center',
        gap: 10,
        paddingTop: 10,
    },
    slideTitle: {
        fontFamily: laefontsems.primary,
        fontSize: SIZE.titleSize,
        letterSpacing: -0.2,
        color: COLORS.text,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 36,
    },
    description: {
        fontWeight: '500',
        maxWidth: '92%',
        fontFamily: laefontsems.primary,
        fontSize: SIZE.subtitleSize,
        lineHeight: 22,
        textAlign: 'center',
        color: COLORS.subtitle,
    },
    imageBlock: {
        flex: 1,
        minHeight: SIZE.imageHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        maxWidth: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        resizeMode: 'contain',
    },
    button: {
        shadowOpacity: 0.12,
        width: '68%',
        maxWidth: 220,
        minWidth: 160,
        borderRadius: SIZE.buttonRadius,
        alignSelf: 'center',
        height: SIZE.buttonHeight,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        backgroundColor: COLORS.buttonBg,
        shadowRadius: 10,
        elevation: 6,
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: '700',
        color: COLORS.buttonText,
        fontFamily: laefontsems.primary,
        fontSize: 18,
    },
});
