import { WebView } from 'react-native-webview';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

type Props = {
    size?: number;
};

const DEFAULT_SIZE = 96;

export const LoadingGlowWebView: React.FC<Props> = ({ size = DEFAULT_SIZE }) => {
    const html = useMemo(() => {
        const cssSize = `${size}px`;

        return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .container {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        height: ${cssSize};
        width: ${cssSize};
        animation: rotate_3922 1.2s linear infinite;
        background-color: #9b59b6;
        background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
      }

      .container span {
        position: absolute;
        border-radius: 50%;
        height: 100%;
        width: 100%;
        background-color: #9b59b6;
        background-image: linear-gradient(#9b59b6, #84cdfa, #5ad1cd);
      }

      .container span:nth-of-type(1) { filter: blur(5px); }
      .container span:nth-of-type(2) { filter: blur(10px); }
      .container span:nth-of-type(3) { filter: blur(25px); }
      .container span:nth-of-type(4) { filter: blur(50px); }

      .container::after {
        content: "";
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        background-color: #fff;
        border: solid 5px #ffffff;
        border-radius: 50%;
      }

      @keyframes rotate_3922 {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </body>
</html>`;
    }, [size]);

    return (
        <View style={[styles.container, { width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3 }]}>
            <WebView
                javaScriptEnabled={false}
                originWhitelist={['*']}
                source={{ html }}
                style={styles.webview}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={false}
                domStorageEnabled={false}
                showsHorizontalScrollIndicator={false}
                setSupportMultipleWindows={false}
                showsVerticalScrollIndicator={false}
                mixedContentMode="always"
                contentMode="mobile"
                bounces={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
