// import ES6Lib from '../lib/es6_obj'

export const ServerConfigData = {
  CPU: {
    paramVals: { 1: '1', 2: '2', 3: '3', 4: '4', 6: '6', 8: '8', 16: '16', 32: '32' },
    units: {
      'zh-cn': '核',
      'en-us': ' core(s)'
    }
  },
  Mem: {
    paramVals: {'512': '512MB', '1024': '1GB', '2048': '2GB', '4096': '4GB', '8192': '8GB', '16384': '16GB', '32768': '32GB', '65536': '64GB', '131072': '128GB'}
  },
  HD: {
    paramVals: {'32': '32GB', '64': '64GB', '128': '128GB', '256': '256GB', '512': '512GB', '1024': '1TB', '2048': '2TB', '4096': '4TB'}
  },
  Network: {
    paramVals: {'0.5': '0.5Mbps', '1': '1Mbps', '2': '2Mbps', '3': '3Mbps', '4': '4Mbps', '6': '6Mbps', '8': '8Mbps', '10': '10Mbps'}
  },
  NetworkInnerOuter: {
    paramVals: {'inner': 'Intranet', 'outer': 'Extranet'}
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
//   })
//     return pvaluepairs
// }

export const WrapDropDownData = (param, lang) => {
  let dropdownData = []
  const paramkeys = Object.keys(param.paramVals)
  paramkeys.map(key => {
    const itemData = {
      value: key,
      label: param.paramVals[key],
      unit: param.units ? param.units[lang] : null
    }
    dropdownData.push(itemData)
  })

  return dropdownData
}
