import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function Search(props) {
  return (
    <View style={styles.wrapper}>
      <TextInput {...props} style={styles.input} />
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
