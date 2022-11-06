import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useQuery } from 'react-query'

import Config from '../../config'
import Service from '../../service'
import tradingApi from '../../service/api/trading'
import themeStyle from '../../theme/styles'

function TradingDetails({ route }) {
  const { symbol } = route.params
  const _fetchDetails = async () => await tradingApi.getSymbolDetails(symbol)
  const _fetchDetails24hours = async () => await tradingApi.getSymbolDetails24hours(symbol)
  const { data: latestData, isLoading: latestLoading } = useQuery(`tick_${symbol}`, _fetchDetails, { refetchInterval: Config.REFRESH_RATE, removeAfterUnmount: true }) // prettier-ignore
  const { data: last24HoursData, isLoading: last24HoursLoading } = useQuery(`tick_${symbol}_24`, _fetchDetails24hours, { removeAfterUnmount: true }) // prettier-ignore
  const isLoading = latestLoading || last24HoursLoading
  const latestColorAndIcon = Service.getColorAndIcon(latestData?.priceChange)
  const last24HoursColorAndIcon = Service.getColorAndIcon(last24HoursData?.priceChange)

  return (
    <View
      style={[themeStyle.flex1, themeStyle.pageVerticalSpacing, themeStyle.pageHorizontalSpacing]}
    >
      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Symbol</Text>
        </View>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.body}>: {symbol}</Text>
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Description</Text>
        </View>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.body} numberOfLines={1} adjustsFontSizeToFit>
            : N/A (on binance API)
          </Text>
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Digits</Text>
        </View>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.body} numberOfLines={1} adjustsFontSizeToFit>
            : N/A (on binance API)
          </Text>
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Ask</Text>
        </View>
        <View style={themeStyle.flex1}>
          {isLoading ? (
            <View style={themeStyle.flexRowCenter}>
              <Text>: </Text>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={themeStyle.body}>: {last24HoursData.askPrice}</Text>
          )}
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Bid</Text>
        </View>
        <View style={themeStyle.flex1}>
          {isLoading ? (
            <View style={themeStyle.flexRowCenter}>
              <Text>: </Text>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={themeStyle.body}>: {last24HoursData?.bidPrice}</Text>
          )}
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Change</Text>
        </View>
        <View style={themeStyle.flex1}>
          {isLoading ? (
            <View style={themeStyle.flexRowCenter}>
              <Text>: </Text>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={[themeStyle.body, { color: latestColorAndIcon.color }]}>
              : {latestData?.priceChangePercent}%
            </Text>
          )}
        </View>
      </View>

      <View style={themeStyle.flexRowCenter}>
        <View style={themeStyle.flex1}>
          <Text style={themeStyle.label}>Change 24h</Text>
        </View>
        <View style={themeStyle.flex1}>
          {isLoading ? (
            <View style={themeStyle.flexRowCenter}>
              <Text>: </Text>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={[themeStyle.body, { color: last24HoursColorAndIcon.color }]}>
              : {last24HoursData?.priceChangePercent}%
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default TradingDetails
