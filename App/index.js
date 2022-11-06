import 'react-native-gesture-handler'
import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Routes from './routes/index'
import store from './redux/store'

const queryClient = new QueryClient()
let persistor = persistStore(store)

LogBox.ignoreLogs(['new NativeEventEmitter'])

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
