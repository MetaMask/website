import theme from '../theme'

const palette = Object.values(theme.colors)
const mapColorToListItems = (list = []) => item =>
  palette[list.indexOf(item)] || theme.black

const mapSectorToColor = mapColorToListItems([
  /* Core Infrastructure Category */
  'core-infrastructure',
  'scalability',
  'privacy',
  'interoperability',
  'consensus-mechanisms',
  'storage',
  'data',
  /* Layer 2 */
  'layer-2',
  /* Dev Tools & Core UX */
  'dev-tools-core-ux',
  'browser',
  'wallet',
  'key-management',
  'identity',
  'governance',
  'oracles',
  'security',
  'fiat-onramp',
  'regulatory-tech',
  'developer-tools',
  /* Applications & Services */
  'applications-services',
  'gaming',
  'centralized-financial-service',
  'supply-chain',
  'insurance-risk',
  'decentralized-finance',
  'analytics',
  'other',
  'media',
  'ad-tech',
  'mar-tech',
  'future-of-work',
])

const mapCategoryToColor = mapColorToListItems([
  'crypto-economics',
  // TODO fill in with list from SEO or Content
])

export const getSpokeSectorBadgeColor = sector => mapSectorToColor(sector)
export const getCategoryBadgeColor = category => mapCategoryToColor(category)
