export const getLocalStorage = name => {
  let localStorage
  try {
    // eslint-disable-next-line prefer-destructuring
    localStorage = window.localStorage
  } catch (e) {
    localStorage = null
  }

  if (null !== localStorage) {
    const data = localStorage.getItem(name)
    return data
  }
  return null
}

export const setLocalStorage = (name, value) => {
  let localStorage
  try {
    // eslint-disable-next-line prefer-destructuring
    localStorage = window.localStorage
  } catch (e) {
    localStorage = null
  }

  if (null !== localStorage) {
    localStorage.setItem(name, value)
  }

  return
}

export const persistDeveloper = () => {
  setLocalStorage('isDeveloper', true)
}
