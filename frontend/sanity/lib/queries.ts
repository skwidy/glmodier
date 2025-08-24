import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage {
    ...,
    asset->
  },
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const poemFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  coverImage {
    ...,
    asset->
  },
  "date": coalesce(date, _updatedAt),
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
`;

const photoCategoryFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  title,
  "slug": slug.current,
  description,
  coverImage {
    ...,
    asset->
  },
  order,
  isPublished,
`;

const photoFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  title,
  image {
    ...,
    asset->
  },
  caption,
  location,
  date,
  "category": category->{title, "slug": slug.current},
  order,
  isPublished,
  tags,
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const allPoemsQuery = defineQuery(`
  *[_type == "poem" && defined(slug.current)] | order(_createdAt desc) {
    ${poemFields}
  }
`);

export const poemQuery = defineQuery(`
  *[_type == "poem" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${poemFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const poemPagesSlugs = defineQuery(`
  *[_type == "poem" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const simplePageQuery = defineQuery(`
  *[_type == "simplePage" && slug.current == $slug][0]{
    _id,
    title,
    content
  }
`);

export const simplePageSlugs = defineQuery(`
  *[_type == "simplePage" && defined(slug.current)]
  {"slug": slug.current}
`);

// Photo Gallery Queries
export const allPhotoCategoriesQuery = defineQuery(`
  *[_type == "photoCategory" && isPublished == true] | order(order asc, title asc) {
    _id,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    title,
    "slug": slug.current,
    description,
    coverImage {
      ...,
      asset->
    },
    order,
    isPublished
  }
`);

export const photoCategoryQuery = defineQuery(`
  *[_type == "photoCategory" && slug.current == $slug][0] {
    _id,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    title,
    "slug": slug.current,
    description,
    coverImage {
      ...,
      asset->
    },
    order,
    isPublished
  }
`);

export const photosByCategoryQuery = defineQuery(`
  *[_type == "photo" && category->slug.current == $categorySlug && isPublished == true] | order(order asc, date desc) {
    ${photoFields}
  }
`);

export const allPhotosQuery = defineQuery(`
  *[_type == "photo" && isPublished == true] | order(date desc) {
    ${photoFields}
  }
`);

export const photoCategorySlugs = defineQuery(`
  *[_type == "photoCategory" && isPublished == true && defined(slug.current)]
  {"slug": slug.current}
`);

export const allPoemTagsQuery = defineQuery(`
  *[_type == "poemTag" && defined(slug.current)]{
    _id,
    name,
    "slug": slug.current,
    "poemCount": count(*[_type == "poem" && references(^._id)])
  } | order(poemCount desc)
`);
