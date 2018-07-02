// @flow

import type {
  ComponentType,
  Element as ReactElement
} from 'react'

type DataStoreType = {
  init: (value?: Object) => void,
  save: (id: number, value: any) => void,
  nextId: () => number,
  getById: (id: number) => any,
  get: () => Object
}

type State = {
  isLoading: boolean,
  error: Error | null,
  data: any
}

type Props = $Shape<{
  id: string | number,
  match: Object,
  location: Object,
  isLoading: boolean,
  error: Error | null
}>

/**
 * Function that returns Promise with props for `withData` wrapped component.
 * First argument is **Object** with `isClient`, `isServer` flags, parent component props and context from `getAppInitialData`.
 *
 * If returned value is `false`, `null` or `undefined`, component will use previous data in state, also
 * in `getAppInitialData` `false` value will prevent requesting data inside that element tree.
 *
 * @example
 *
 * const getData = ({ isClient, isServer, ...parentProps }, prevData) => Promise.resolve({
 *   message: isServer ? 'server' : 'client'
 * })
 *
 * @example
 *
 * const getData = (contextProps, prevData) =>
 *   prevData
 *     ? Promise.resolve(null) // data in state will not update
 *     : Promise.resolve({ message: 'ok' })
 */

type GetDataFn = (context: Object, prevData: Object) => Promise<Object | boolean | null>

type WrappedComponentType = {
  getData?: GetDataFn
} & $Subtype<ComponentType<any>>

type HOC = (WrappedComponentType) => ComponentType<any>

export type {
  ComponentType,
  ReactElement,
  GetDataFn,
  DataStoreType,
  HOC,
  State,
  Props,
  WrappedComponentType
}
