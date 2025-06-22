import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {poem} from './documents/poem'
import {poemTag} from './documents/poemTag'
import {simplePage} from './documents/simplePage'
import {photo} from './documents/photo'
import {photoCategory} from './documents/photoCategory'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import htmlEmbed from './objects/htmlEmbed'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  poem,
  poemTag,
  simplePage,
  person,
  photo,
  photoCategory,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  htmlEmbed,
]
