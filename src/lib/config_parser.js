
export function appConfigParser(configData) {
    /// grouped data
  let paramTreeTmp = {}
  configData.map(param => {
    if (!paramTreeTmp.hasOwnProperty(param.group)) {
      paramTreeTmp[param.group] = []
    }
    paramTreeTmp[param.group].push(param)
  })

    /// convert struct phase 2
  let paramTree = []
  const groups = Object.keys(paramTreeTmp)
  groups.map(group => {
    let newgroup = []
    const curgroup = paramTreeTmp[group]

    curgroup.map(param => {
      const rebranchnode = param.showIf
                ? param.showIf.endsWith('.enabled=true')
                : null
            // move node to the branch its belong
      if (!rebranchnode) {
        newgroup.push(param)
      } else {
        newgroup.find(paramup => {
          if (param.showIf === paramup.variable + '=true') {
            if (!paramup.subquestions) {
              paramup.subquestions = []
            }
            paramup.subquestions.push(param)
          }
                    // TODO : node on false branch to attach paramup
        })
      }
            // TODO :  level 3 trans_struct
            // if(param.hasOwnProperty('subquestions')){
            //
            // }
    })
    const groupData = {}
    groupData[group] = newgroup
    paramTree.push(groupData)
  })
    
  return paramTree
}
