const React = require("react")
import { OSANO_CUSTOMER_ID, OSANO_CCID_ID } from './src/lib/config'

const headComponents = [
  <script key="osano" src={`https://cmp.osano.com/${OSANO_CUSTOMER_ID}/${OSANO_CCID_ID}/osano.js`}></script>,
]

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(headComponents)
}