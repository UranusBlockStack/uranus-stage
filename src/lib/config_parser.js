export function appConfigParser(configData) {
  // /--- grouped data  （phase1）
  let paramTreeTmp = {}
  configData.map(param => {
    if (!paramTreeTmp.hasOwnProperty(param.group)) {
      paramTreeTmp[param.group] = []
    }
    paramTreeTmp[param.group].push(param)
  })

  // /--- convert struct of group（phase 2）
  let paramTree = []
  const groups = Object.keys(paramTreeTmp)
  groups.map(group => {
    let newgroup = []
    const curgroup = paramTreeTmp[group]

    curgroup.map(param => {
      // branched node Level 2 (switch item) , and add False branch to branch node
      if (param.hasOwnProperty('showSubquestionIf')) {
        if (param.showSubquestionIf === 'false') {
          param.subquestionsFalse = param.subquestions
          param.subquestions = []
          console.log(param)
        }
      }

      // reposition sibling node to sub node， move node to the branch its belong
      if (!param.showIf) {
        newgroup.push(param)
      } else if (param.showIf.endsWith('.enabled=true')) {
        newgroup.find(paramup => {
          if (param.showIf === paramup.variable + '=true') {
            if (!paramup.subquestions) {
              paramup.subquestions = []
            }
            paramup.subquestions.push(param)
          }
        })
      } else if (param.showIf.endsWith('.enabled=false')) {
        newgroup.find(paramup => {
          if (param.showIf === paramup.variable + '=false') {
            if (!paramup.subquestionsFalse) {
              paramup.subquestionsFalse = []
            }
            paramup.subquestionsFalse.push(param)
          }
        })
      }
      // TODO :  level 3 trans_struct   ,  auto ed ??
    })
    const groupData = {}
    groupData[group] = newgroup
    paramTree.push(groupData)
  })

  console.log('questions', paramTree)
  return paramTree
}

export function appConfigParserExpand(configData) {
    // /--- grouped data  （phase1）
  let paramTreeTmp = {}
  configData.map(param => {
    if (!paramTreeTmp.hasOwnProperty(param.group)) {
      paramTreeTmp[param.group] = []
    }
    paramTreeTmp[param.group].push(param)
  })

  //  console.log(paramTreeTmp); return
    // /--- convert struct of group（phase 2）
  let paramTree = []
  const groups = Object.keys(paramTreeTmp)
  groups.map(group => {
    let newgroup = []
    const curgroup = paramTreeTmp[group]

    // branched node Level 2 (switch item) , and add False branch to branch node
    curgroup.map(param => {
      if (param.hasOwnProperty('showSubquestionIf')) {
        if (param.showSubquestionIf === 'false') {
          param.subquestionsFalse = param.subquestions
          param.subquestions = []
          console.log(param)
        }
      }

      // reposition sibling node to sub node， move node to the branch its belong
      if (!param.showIf) {
        newgroup.push(param)
      }

      configData.find(paramup => {
        if (param.showIf === paramup.variable + '=true') {
          if (!paramup.subquestions) {
            paramup.subquestions = []
          }
          paramup.subquestions.push(param)
        }
      })

      configData.find(paramup => {
        if (param.showIf === paramup.variable + '=false') {
          if (!paramup.subquestionsFalse) {
            paramup.subquestionsFalse = []
          }
          paramup.subquestionsFalse.push(param)
        }
      })
    })

    const groupData = {}
    groupData[group] = newgroup
    paramTree.push(groupData)
  })

  console.log('questions', paramTree)
  return paramTree
}
