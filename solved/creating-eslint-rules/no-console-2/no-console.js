const disallowedMethodsEnum = ['log', 'warn', 'info', 'error', 'dir']

export const meta = {
  type: 'problem',
  hasSuggestions: true,
  fixable: true,
  schema: [
    {
      type: 'object',
      properties: {
        allowedMethods: {
          type: 'array',
          minItems: 1,
          uniqueItems: true,
          items: {
            enum: ['log', 'warn', 'info', 'error', 'dir'],
          },
        },
      },
      additionalProperties: false,
    },
  ],
}

function parseAllowedMethodsOptions(options) {
  return options.length ? options[0].allowedMethods : []
}

export function create(context) {
  return {
    'CallExpression > MemberExpression > Identifier[name="console"]'(node) {
      const allowedMethods = parseAllowedMethodsOptions(context.options)
      const disallowedMethods = disallowedMethodsEnum.filter(item => !allowedMethods.includes(item))
      const isConsoleCall = looksLike(node, {
        parent: {
          property: {
            name: value => disallowedMethods.includes(value),
          },
        },
      })

      if (!isConsoleCall) {
        return
      }
      context.report({
        node,
        message: 'Using console is not allowed',
      })
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
