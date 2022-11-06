import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import lodashDebounce from 'lodash/debounce'

function Search({ onSearch, ...otherProps }) {
  const _debounceCallback = lodashDebounce((text) => onSearch(text), 1000)

  return (
    <View style={styles.wrapper}>
      <TextInput {...otherProps} onChangeText={_debounceCallback} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  input: {
    paddingHorizontal: 15,
  },
})

export default Search
