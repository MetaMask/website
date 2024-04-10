const axios = require('axios')

async function fetchDevChangeLog(token) {
  const convertDate = dateString => {
    if (!dateString) return
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    let date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const changeLogData = Promise.allSettled([
    axios.get(
      'https://api.github.com/repos/MetaMask/snaps/releases/latest'
    ),
    axios.get(
      'https://raw.githubusercontent.com/Consensys/doc.zk-evm/main/docs/build-on-linea/linea-version/index.mdx'
    ),
    axios.get(
      'https://raw.githubusercontent.com/Consensys/infura-sdk/main/CHANGELOG.md'
    )
  ]).then(response => {
    const data = []
    const siteData = [
      {
        title: 'MetaMask Snaps',
        type: 'metamask',
        url: 'https://github.com/MetaMask/snaps/releases'
      },
      {
        title: 'Linea',
        type: 'linea',
        url: 'https://docs.linea.build/build-on-linea/linea-version'
      },
      {
        title: 'Infura SDK',
        type: 'infura-sdk',
        url: 'https://github.com/Consensys/infura-sdk/blob/main/CHANGELOG.md'
      }
    ]
    response.forEach((site, index) => {
      if (site.status === 'fulfilled' && site.value?.status === 200) {
        switch (index) {
          case 0:
            data.push({
              title: siteData[index].title,
              version: site.value.data.tag_name,
              content: site.value.data.body,
              date: convertDate(site.value.data.created_at),
              type: siteData[index].type,
              url: siteData[index].url
            })
            break;
          case 1:
            const text2 = site.value.data
            const match2 = text2?.match(/## Linea([\s\S]+?)## Linea/)
            if (match2 && match2[1]) {
              data.push({
                title: siteData[index].title,
                content: match2[1],
                type: siteData[index].type,
                url: siteData[index].url
              })
            }
            break;
          case 2:
            const text = site.value.data
            const match = text?.match(/####([\s\S]+?)####/)
            if (match && match[0]) {
              data.push({
                title: siteData[index].title,
                content: match[0],
                type: siteData[index].type,
                url: siteData[index].url
              })
            }
            break;
          default:
            break;
        }
      }
    })
    return data;
  })
  return changeLogData;
}

module.exports.fetchDevChangeLog = fetchDevChangeLog