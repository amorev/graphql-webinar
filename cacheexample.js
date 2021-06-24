let cachedApiInfo = null

async function getApiInfo () {
  if (!cachedApiInfo) {
    cachedApiInfo = await new Promise((r) => {
      console.log('starting request')
      setTimeout(() => {
        r(1)
      }, 2000)
    })
    setTimeout(() => {
      console.log('cache reset')
      cachedApiInfo = null
    }, 3000)
  }

  return cachedApiInfo
}

const info = getApiInfo()
  .then(r => {
    getApiInfo()
      .then(r => {
        console.log(r)
        setTimeout(() => {
          getApiInfo()
        }, 3000)
      })
    console.log(r)
  })
