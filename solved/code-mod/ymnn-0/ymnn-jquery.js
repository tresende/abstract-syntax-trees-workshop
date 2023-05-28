export default function(babel) {
  const {template} = babel

  return {
    name: 'ymnn-jquery',
    visitor: {
      CallExpression(path) {
        const isJqueryCall = looksLike(path, {
          node: {
            callee: {name: '$'},
          },
          parentPath: {
            node: {
              property: {
                name: 'hide',
              },
            },
          },
        })
        
        if (!isJqueryCall) {
          return
        }
        const overallPath = path.parentPath.parentPath
        
        const [el] = path.node.arguments
        const templateString = `ELEMENT.style.display = 'none';`
        const assignment = template(templateString)({
          ELEMENT: el,
        })
        overallPath.replaceWith(assignment)
      },
    },
  }
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
