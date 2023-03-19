import _ from 'lodash'
import { countPagination } from '@/helpers/variables'

export const arrChunk = (arr) => {
  return _.chunk(arr, countPagination)
}
