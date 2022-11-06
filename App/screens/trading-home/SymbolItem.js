import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { useQuery } from 'react-query'

import Config from '../../config'
import Button from '../../components/Button'
import Service from '../../service'
import tradingApi from '../../service/api/trading'
import themeStyle from '../../theme/styles'

function SymbolItem({ item, onPress }) {
  const _fetchDetails = async () => await tradingApi.getSymbolDetails(item.symbol)
  const { data, isLoading } = useQuery(`tick_${item.symbol}`, _fetchDetails, { refetchInterval: Config.REFRESH_RATE, removeAfterUnmount: true }) // prettier-ignore
  const colorAndIcon = Service.getColorAndIcon(data?.priceChange)

  return (
    <Button onPress={onPress} plain>
      <View
        style={[
          themeStyle.pageVerticalSpacing,
          themeStyle.pageHorizontalSpacing,
          themeStyle.flexRowCenter,
        ]}
      >
        <View style={themeStyle.flex1}>
          <Text>{item.symbol}</Text>
        </View>

        <View style={themeStyle.flex1}>
          <Text>{Number(item.price)}</Text>
        </View>

        <View style={[themeStyle.flex1, themeStyle.alignItemsEnd]}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: colorAndIcon.color }}>
              {data.priceChange ? data.priceChange : '--'}
            </Text>
          )}
        </View>

        <View style={[themeStyle.flex1, themeStyle.alignItemsEnd]}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={themeStyle.flexRowCenter}>
              <Text style={{ color: colorAndIcon.color }}>
                {data.priceChangePercent ? `${data.priceChangePercent}%` : '--'}
              </Text>
              {!!colorAndIcon.icon && (
                <Image
                  style={[themeStyle.spacingLeftSmall, { width: 15, height: 15 }]}
                  source={colorAndIcon.icon}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </Button>
  )
}

export default SymbolItem
