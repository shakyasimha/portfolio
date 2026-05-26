"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  mainImage: SanityImageSource;
  mainImageAlt: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  mainImage,
  mainImageAlt,
}: BlogCardProps) {
  const formatted = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const generatedUrl = mainImage ? urlFor(mainImage).width(800).height(450).url() : null;

  // Ensure that if the generated URL is empty (""), it forces the generic fallback string instead
  const imageUrl = generatedUrl || "/blog-placeholder.png";

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="
        overflow-hidden rounded-2xl border
        bg-white dark:bg-slate-800
        border-slate-200 dark:border-slate-700
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/40
        hover:border-slate-300 dark:hover:border-slate-500
      ">
        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          <Image
            src={imageUrl}
            alt={mainImageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-5">
          <time className="text-xs font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
            {formatted}
          </time>

          <h2 className="
            text-base font-semibold leading-snug line-clamp-2
            text-slate-900 dark:text-white
            group-hover:text-slate-600 dark:group-hover:text-slate-200
            transition-colors
          ">
            {title}
          </h2>

          <p className="text-sm leading-relaxed line-clamp-3 text-slate-500 dark:text-slate-400">
            {excerpt}
          </p>

          <span className="
            mt-1 flex items-center gap-1
            text-xs font-medium
            text-slate-400 dark:text-slate-500
            group-hover:text-slate-700 dark:group-hover:text-white
            transition-colors
          ">
            Read more
            <svg
              className="h-3 w-3 translate-x-0 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}