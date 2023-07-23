import { combineReducers, createStore } from 'redux'
// import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { CounterReducer, VehicleReducer } from './features'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  vehicles: VehicleReducer
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
