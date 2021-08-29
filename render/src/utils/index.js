import cloneDeep from 'lodash/cloneDeep'

/**
 * 格式化schema中的placeholder提示信息
 * @param {object} schema - formily 用到的json schema，为每一个表单项添加默认 placeholder 和 挂载结点
 * @return {object} 格式化之后的schema
 */
export const formatFormSchema = schema => {
  const newSchema = cloneDeep(schema)
  Object.keys(newSchema).forEach(key => {
    const item = newSchema[key]
    if (
      ['string', 'xm-string', 'xm-number', 'xm-textarea'].includes(item.type)
    ) {
      if (!Reflect.has(item, 'x-props')) {
        item['x-props'] = {}
      }

      if (!Reflect.has(item['x-props'], 'placeholder')) {
        if (Array.isArray(item.enum)) {
          item['x-props'].placeholder = '请选择'
          item['x-props'].getPopupContainer = (node) => node.parentNode
          if (!Reflect.has(item['x-props'], 'allowClear')) {
            item['x-props'].allowClear = true
          }
        } else {
          item['x-props'].placeholder = '请输入'
        }
      }
    }
  })
  return newSchema
}

/**
 * 清理对象参数值，过滤不合法参数
 * @params {object} params - 待清理的对象
 * @params {array} filters - 清理的值信息，默认当值为[null, undefined, NaN, '']中的任意值时，该字段被清理掉
 * @returns {object} 清理之后的独显
 *
 * @example
 * const params = {
 *  name: '',
 *  age: 10,
 *  desc: null
 * }
 * clearObject(params) ==> { age: 10 }
 */
export const clearObject = (
  params = {},
  filters = [null, undefined, NaN, ''],
) => {
  if (params instanceof Object) {
    const newParams = {}
    Object.keys(params).forEach((key) => {
      // 注：这里只对对象字段进行过滤，对数组不做任何处理
      if (
        typeof params[key] === 'object'
        && params[key].constructor === Object
      ) {
        newParams[key] = clearObject(params[key], filters)
      } else if (!filters.includes(params[key])) {
        newParams[key] = params[key]
      }
    })
    return newParams
  }
  return params
}
