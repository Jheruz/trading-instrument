import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native'

import themeColor from '../theme/colors'
import themeStyle, { globalSpacing } from '../theme/styles'

function Button({ children, type, noColor, rightIcon, small, ...buttonProps }) {
  const isCircle = type === 'circle'
  let wrapperStyle = isCircle ? styles.circleWrapper : styles.wrapper

  if (noColor) {
    wrapperStyle = styles.button
  }

  return (
    <TouchableOpacity {...buttonProps} style={{ opacity: buttonProps.disabled ? 0.5 : 1 }}>
      <View style={[wrapperStyle, isCircle && small && styles.circleWrapperSmall]}>
        {children}

        {!!rightIcon && (
          <Image source={rightIcon} style={[styles.buttonIcon]} resizeMode="contain" />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...themeStyle.flexRowCenter,
    backgroundColor: themeColor.gray,
    paddingVertical: globalSpacing / 2,
    paddingHorizontal: globalSpacing * 2,
  },
  circleWrapper: {
    backgroundColor: themeColor.gray,
    padding: 20,
    borderRadius: 50,
  },
  circleWrapperSmall: {
    padding: 10,
  },
  button: {
    ...themeStyle.flexRowCenter,
    paddingVertical: globalSpacing / 2,
    paddingHorizontal: globalSpacing * 2,
  },
  buttonIcon: {
    ...themeStyle.spacingLeftMedium,
    ...themeStyle.icon,
  },
})

export default Button
