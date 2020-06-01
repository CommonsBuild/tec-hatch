import {
  ready,
  computeConstants,
  computeValues,
  computePresale,
  computeCollaterals,
  computeBondedToken,
  computeOrders,
} from './utils'

/**
 * Reduces the backgorund script state to an intelligible one for the frontend
 * @param {Object} state - the background script state
 * @returns {Object} a reduced state, easier to interact with on the frontend
 */
const appStateReducer = state => {
  // don't reduce not yet populated state
  const isReady = ready(state)
  if (isReady) {
    const { constants, values, presale, contributions, collaterals, bondedToken, orders } = state
    const computedConstants = computeConstants(constants)
    const computedValues = computeValues(values)
    const computedPresale = computePresale(presale, computedConstants.PPM)
    const computedCollaterals = computeCollaterals(collaterals)
    const computedBondedToken = computeBondedToken(bondedToken, computedCollaterals)
    const computedOrders = computeOrders(orders)
    return {
      ...state,
      isReady,
      constants: computedConstants,
      values: computedValues,
      presale: computedPresale,
      // we don't compute BigNumbers on contributions, since it's only necessary if the presale state is refund
      // we will compute the BigNumbers on the newRefund panel
      contributions,
      collaterals: computedCollaterals,
      bondedToken: computedBondedToken,
      orders: computedOrders,
    }
  } else {
    return {
      ...state,
      isReady,
    }
  }
}

export default appStateReducer
