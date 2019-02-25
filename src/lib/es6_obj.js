const deepClone=(obj) => {
  const proto=Object.getPrototypeOf(obj)
  return Object.assign({}, Object.create(proto), obj)
}

const objectClone=(obj) => {
    // const proto=Object.getPrototypeOf(obj);
  return Object.assign({}, obj)
}

const mergeObject=(obj1, obj2) => {
  return obj = Object.assign(obj1, obj2)
}

const ObjectLib = {
  deepClone: deepClone,
  objectClone: objectClone
}

module.exports = ObjectLib
