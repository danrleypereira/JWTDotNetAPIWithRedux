import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux'
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { CounterReducer, VehicleReducer, UserReducer } from './features'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  vehicles: VehicleReducer,
  user: UserReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
  // other store enhancers if any
)

const store = createStore(rootReducer, /* preloadedState, */ composedEnhancer)

export default store
