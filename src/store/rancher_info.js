// import ES6Lib from '../lib/es6_obj'

export const ServerConfigData = {
  // CPU: {
  //   unit: {'zh-cn': '核', 'en-us': 'core(s)'},
  //   paramVals: {1: '1', 2: '2', 3: '3', 4: '4', 6: '6', 8: '8', 16: '16', 32: '32'}
  // },
  CPU: {
    paramVals: {
      'zh-cn': {1: '1核', 2: '2核', 3: '3核', 4: '4核', 6: '6核', 8: '8核', 16: '16核', 32: '32核'},
      'en-us': {1: '1 core(s)', 2: '2 core(s)', 3: '3 core(s)', 4: '4 core(s)', 6: '6 core(s)', 8: '8 core(s)', 16: '16 core(s)', 32: '32 core(s)'}
    }
  },
  Mem: {
    paramVals: {'128': '128MB', '256': '256MB', '512': '512MB', '1': '1GB', '2': '2GB', '4': '4GB', '8': '8GB', '16': '16GB'}
  },
  HD: {
    paramVals: {'32': '32GB', '64': '64GB', '128': '128GB', '256': '256GB', '512': '512GB', '1': '1TB', '2': '2TB', '4': '4TB'}
  },
  Network: {
    paramVals: {'0.5': '0.5Mbps', '1': '1Mbps', '2': '2Mbps', '3': '3Mbps', '4': '4Mbps', '6': '6Mbps', '8': '8Mbps', '10': '10Mbps'}
  }
}

// export const AddUnit = (type, lang) => {
//
//
//     const tmpData = ES6Lib.objectClone(ServerConfigData[type])
//     const unitStr = tmpData['unit'][lang]
//
//     let pvaluepairs = tmpData.paramVals
//     const  paramkeys = Object.keys(pvaluepairs)
//     paramkeys.map( key => {
//         pvaluepairs[key] += unitStr
//         console.log('2222', pvaluepairs[key])
//   })
//     console.log('nakx', pvaluepairs)
//     return pvaluepairs
// }

export const WrapDropDownData = (param) => {
  let dropdownData = []
  const paramkeys = Object.keys(param)
  paramkeys.map(key => {
    const itemData = {
        value: key,
        label: param[key]
    }
    dropdownData.push(itemData)
  })

  return dropdownData
}
