import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {postType} from './postType'
import {authorType} from './authorType'
import { categoryType } from './categoryType'
import { addressType } from './addressType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType , addressType],
}
