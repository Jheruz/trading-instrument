import Tts from 'react-native-tts'

import CaretUp from '../assets/caret-up.png'
import CaretDown from '../assets/caret-down.png'

function ttsOnFinished(callback) {
  return Tts.addEventListener('tts-finish', callback)
}

function ttsSpeak(text, language) {
  Tts.setDefaultLanguage(language)
  Tts.speak(text)
}

function ttsStop() {
  Tts.stop()
}

function getColorAndIcon(data) {
  let color = undefined
  let icon = undefined

  if (data) {
    const dataToNumber = Number(data)
    const isNegative = dataToNumber < 0
    const isPositive = dataToNumber > 0

    if (isNegative) {
      color = 'red'
      icon = CaretDown
    } else if (isPositive) {
      color = 'green'
      icon = CaretUp
    }
  }

  return { color, icon }
}

export default {
  ttsOnFinished,
  ttsSpeak,
  ttsStop,
  getColorAndIcon,
}
