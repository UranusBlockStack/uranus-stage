// Filter certain apps, those app need system namespace or administrate right
export const preventApplist=[
  'portworx', 'kubernetes-dashboard'
]

export const flatListToDropdownData = (listData) => {
  let ddData = []
  listData.map(itemdata => {
    ddData.push({
      value: itemdata,
      label: itemdata || '[All]'
    })
  })
  return ddData
}
