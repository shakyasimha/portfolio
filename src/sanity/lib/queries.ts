import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  mainImage: SanityImageSource
  mainImageAlt: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      mainImage,
      "mainImageAlt": mainImage.alt
    }
  `)
}