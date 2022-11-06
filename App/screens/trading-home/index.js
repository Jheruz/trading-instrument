import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'

import CaretUp from '../../assets/caret-up.png'
import CaretDown from '../../assets/caret-down.png'
import Search from '../../components/Search'
import routeList from '../../routes/list'
import tradingApi from '../../service/api/trading'
import themeStyle from '../../theme/styles'

import Pagination from './Pagination'
import SymbolItem from './SymbolItem'

function TradingHome({ navigation }) {
  const [page, setPage] = useState(1)
  const pageLimit = 10

  const _fetchList = async () => await tradingApi.getSymbolList()
  const _itemSeparator = () => <View style={styles.separator} />
  const _keyExtractor = (item, index) => index.toString()
  const _getColorAndIcon = (data) => {
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
  const _onSymbolPress = (symbol) => () => {
    console.log('symbol', symbol)
  }

  const { data = [], isLoading } = useQuery('ticks', _fetchList, { removeAfterUnmount: true }) // prettier-ignore
  const paginatedData = Array.isArray(data) ? data.slice((page - 1) * pageLimit, page * pageLimit) : [] // prettier-ignore

  return (
    <View style={[themeStyle.flex1, themeStyle.pageVerticalSpacing]}>
      {/* Search */}
      <View style={themeStyle.pageHorizontalSpacing}>
        <Search placeholder="Search instrument" />
      </View>

      {/* Loader and List */}
      <View style={[themeStyle.flex1, themeStyle.pageVerticalSpacing]}>
        {isLoading ? (
          <View
            style={[themeStyle.flex1, themeStyle.alignItemsCenter, themeStyle.justifyContentCenter]}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={paginatedData}
            renderItem={({ index, item }) => (
              <SymbolItem
                index={index}
                item={item}
                getColorAndIcon={_getColorAndIcon}
                onPress={_onSymbolPress(item)}
              />
            )}
            ItemSeparatorComponent={_itemSeparator}
            keyExtractor={_keyExtractor}
            persistentScrollbar
          />
        )}
      </View>

      <View style={themeStyle.pageHorizontalSpacing}>
        <Pagination
          showing={page === 1 ? pageLimit : `${pageLimit * (page - 1)} - ${pageLimit * page}`}
          total={data.length}
          disablePrev={page <= 1}
          disableNext={page >= data.length / pageLimit}
          onPrevPress={() => setPage(page - 1)}
          onNextPress={() => setPage(page + 1)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
})

export default TradingHome
