import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, Text, View } from 'react-native'

import ArrowLeft from '../../assets/arrow-left.png'
import ArrowRight from '../../assets/arrow-right.png'
import Button from '../../components/Button'
import themeStyle from '../../theme/styles'

function Pagination({ showing, total, disablePrev, disableNext, onPrevPress, onNextPress }) {
  return (
    <View style={themeStyle.flexRowCenterSpaceBetween}>
      {/* Previous */}
      <Button onPress={onPrevPress} disabled={disablePrev} small>
        <Image source={ArrowLeft} style={styles.arrowIcon} resizeMode="contain" />
      </Button>

      {/* Pagination info */}
      <Text style={[themeStyle.body, themeStyle.pageHorizontalSpacingMedium]} adjustsFontSizeToFit>
        {showing} of {total}
      </Text>

      {/* Next */}
      <Button onPress={onNextPress} disabled={disableNext} small>
        <Image source={ArrowRight} style={styles.arrowIcon} resizeMode="contain" />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  arrowIcon: {
    width: 20,
    height: 20,
  },
})

Pagination.propTypes = {
  showing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.number,
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool,
  onPrevPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired,
}

export default Pagination
