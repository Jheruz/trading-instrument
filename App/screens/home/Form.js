import React from 'react'
import { Text, View } from 'react-native'

import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import TextInput from '../../components/TextInput'
import themeStyle from '../../theme/styles'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
]

function Form({ language, name, onNext, setLanguage, setName }) {
  return (
    <>
      <View style={themeStyle.spacingBottom}>
        <TextInput label="Name" placeholder="Enter your name" value={name} onChangeText={setName} />
      </View>

      <View style={themeStyle.spacingBottom}>
        <Dropdown
          label="Language"
          data={languages}
          value={language}
          placeholder="Select Language"
          labelField="label"
          valueField="value"
          onChange={(item) => setLanguage(item.value)}
        />
      </View>

      <View style={themeStyle.alignItemsEnd}>
        <Button onPress={onNext}>
          <Text style={themeStyle.body}>Next</Text>
        </Button>
      </View>
    </>
  )
}

export default Form
