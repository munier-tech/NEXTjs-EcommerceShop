import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {postType} from './postType'
import {authorType} from './authorType'
import { categoryType } from './categoryType'
import { addressType } from './addressType'
import { blogCategoryType } from './blogCategoryType'
import { blogType } from './blogType'
import { brandType } from './BrandType'
import { productType } from './productType'
import { orderType } from './orderType'
import customerOrder from './customerOrder'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, customerOrder, orderType, productType, categoryType, blogCategoryType, blogType , brandType , postType, authorType, addressType],
}
