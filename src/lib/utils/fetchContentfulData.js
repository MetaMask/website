import axios from 'axios'
import mapValues from 'lodash/mapValues'
import flatMap from 'lodash/flatMap'

import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW_API_KEY,
  CONTENTFUL_PREVIEW_HOST,
} from '../config'

export const fetchContentfulData = dataType => (
  id,
  host = CONTENTFUL_PREVIEW_HOST
) => {
  if (dataType !== 'module' && dataType !== 'asset') {
    return {
      error: {
        message:
          'Can only retrieve `module` and `asset` data types from Contentful',
      },
    }
  }

  if (!id || typeof id !== 'string') {
    return {
      error: {
        message: `No ${dataType} ID provided to retrieve Contenful data : ${id}`,
      },
    }
  }

  // construct API url based on resource and env vars
  const resource = dataType === 'module' ? 'entries' : 'assets'
  const resource_url =
    `/spaces/${CONTENTFUL_SPACE_ID}` +
    `/environments/${CONTENTFUL_ENVIRONMENT}` +
    `/${resource}/${id}?access_token=${CONTENTFUL_PREVIEW_API_KEY}`

  return axios
    .get('https://' + host + resource_url)
    .then(result => {
      if (result.error || !result.data) {
        return {
          error: result.error || {
            message:
              `No data returned for Contentful ${dataType} with id: ` + id,
          },
        }
      }

      //  If requesting Modules (Custom Content Models)
      if (dataType === 'module') {
        return handleModuleResponse(result)
      }

      //  If requesting Assets (Images)
      if (dataType === 'asset') {
        return handleAssetResponse(result)
      }
    })
    .catch(error => {
      throw error
    })
}

export const fetchContentfulModule = fetchContentfulData('module')
export const fetchContentfulAsset = fetchContentfulData('asset')

const handleModuleResponse = response => {
  if (!response.data) {
    return {
      error: {
        message: 'Could not parse Module response',
      },
    }
  }

  const {
    data: {
      fields: moduleConfig,
      sys: {
        id: contentful_id,
        contentType: {
          sys: { id: type },
        },
      },
    },
  } = response

  // format module type to mimic what is returned by GraphQL for our component mapping
  const internal = {
    type: `Contentful${type.charAt(0).toUpperCase() + type.slice(1)}`,
  }
  const nestedModules = getNestedModules(moduleConfig)
  const allModuleRequests = resolveModuleRequests(nestedModules)

  return Promise.all(allModuleRequests)
    .then(result => {
      const resolvedModules = result.reduce((acc, key, i) => {
        // update module config to replace resolved promises
        // with normal objects with module data to be used in component rendering
        if (typeof key === 'string') {
          return { ...acc, [key]: result[i + 1] }
        } else {
          return acc
        }
      }, moduleConfig)
      return {
        ...resolvedModules,
        internal,
        contentful_id,
      }
    })
    .catch(error => error)
}

const handleAssetResponse = response => {
  if (!response.data) {
    return {
      error: {
        message: 'Could not parse Asset response',
      },
    }
  }

  const {
    data: {
      fields: { file },
    },
  } = response

  if (!file) return

  const { url, contentType } = file
  // Contentful returns a same protocol uri starting with '//' which is improperly handled by Gatsby
  const assetUrl = `https://${url.slice(2, url.length)}`

  return {
    assetUrl,
    contentType,
  }
}

const getNestedModules = moduleConfig => {
  if (moduleConfig) {
    const resolvedModuleFields = mapValues(moduleConfig, (field, i) => {
      // Assume that anything in an array is another module (ModuleContainer or Page)
      // Coerce module into correct format to work with next mapValues call
      if (Array.isArray(field))
        return field.map(mod => getNestedModules({ mod }))

      // if field contains Contentful metadata then retrieve module/asset ID and call API again
      if (!field.sys) {
        return field
      } else {
        const {
          sys: { linkType, id },
        } = field
        return linkType === 'Asset'
          ? fetchContentfulAsset(id)
          : fetchContentfulModule(id)
      }
    })
    return { ...resolvedModuleFields }
  } else {
    return false
  }
}

const resolveModuleRequests = modules => {
  return flatMap(modules, (mod, key) => {
    // Check if module is a Promise API request to get more module data
    // return to array to await all module data before rendering
    // https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise/38339199#38339199
    if (Array.isArray(mod)) {
      const promiseList = mod.map(e => e.mod)
      return [key, Promise.all(promiseList)]
    }
    return Promise.resolve(mod) === mod ? [key, mod] : null
  }).filter(mod => !!mod)
}
