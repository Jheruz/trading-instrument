import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import lodashFilter from 'lodash/filter'

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
  const [searchValue, setSearch] = useState('')
  const pageLimit = 10

  const _fetchList = async () => await tradingApi.getSymbolList()
  const _itemSeparator = () => <View style={styles.separator} />
  const _keyExtractor = (item, index) => index.toString()
  const _onSymbolPress = (symbol) => () => {
    navigation.navigate(routeList.TRADING_DETAILS, symbol)
  }

  const { data = [], isLoading } = useQuery('ticks', _fetchList, { removeAfterUnmount: true }) // prettier-ignore
  let mutatedData = JSON.parse(JSON.stringify(data))
  if (searchValue) {
    mutatedData = lodashFilter(mutatedData, (s) => {
      return s.symbol.toLowerCase().includes(searchValue)
    })
  }
  const paginatedData = Array.isArray(mutatedData) ? mutatedData.slice((page - 1) * pageLimit, page * pageLimit) : [] // prettier-ignore

  return (
    <View style={[themeStyle.flex1, themeStyle.pageVerticalSpacing]}>
      {/* Search */}
      <View style={themeStyle.pageHorizontalSpacing}>
        <Search placeholder="Search Symbol" onSearch={setSearch} debounce />
      </View>

      {/* Loader and List */}
      <View style={[themeStyle.flex1, themeStyle.spacingTop]}>
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
              <SymbolItem index={index} item={item} onPress={_onSymbolPress(item)} />
            )}
            ItemSeparatorComponent={_itemSeparator}
            keyExtractor={_keyExtractor}
            persistentScrollbar
          />
        )}
      </View>

      <View style={themeStyle.pageHorizontalSpacing}>
        <Pagination
          showing={(() => {
            if (mutatedData.length < 10) {
              return mutatedData.length
            } else if (page === 1) {
              return pageLimit
            } else {
              return `${pageLimit * (page - 1)} - ${pageLimit * page}`
            }
          })()}
          total={mutatedData.length}
          disablePrev={page <= 1}
          disableNext={page >= mutatedData.length / pageLimit}
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
