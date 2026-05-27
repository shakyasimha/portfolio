// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, urlFor } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic"; 

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) notFound();

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 1. Only generate the URL if mainImage actually exists in Sanity
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(750).url() 
    : null;

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-32">
      {/* Back to items navigation */}
      <div className="mx-auto max-w-3xl px-4 mb-10">
        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to items
        </Link>
      </div>

      <article className="mx-auto max-w-3xl px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl md:leading-[1.15] font-serif">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-serif leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author / Meta Information Row */}
        <div className="mt-8 mb-10 flex items-center gap-3 border-y border-slate-100 dark:border-slate-800/60 py-4">
          <div className="h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden relative">
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold bg-slate-100 dark:bg-slate-800">
              SS
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium text-slate-900 dark:text-white">Sushovan Shakya</div>
            <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
              <span>{formattedDate}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>

        {/* 🛠️ CONDITIONAL LAYOUT STEP: 
            We look to see if imageUrl exists. If it does, we render the layout block. 
            If it is null, JavaScript skips this entire section completely. */}
        {imageUrl && (
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800 mb-12">
            <Image
              src={imageUrl}
              alt={post.mainImageAlt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Blog Post Core Content Body */}
        <div className="
          prose prose-slate dark:prose-invert max-w-none 
          font-serif text-lg md:text-xl leading-relaxed text-slate-800 dark:text-slate-200
          prose-p:text-justify font-normal
          prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-p:mb-12 prose-p:leading-[1.65]
          prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:underline-offset-4
        ">
          {post.body ? (
              <PortableText value={post.body} />
          ) : (
              <p className="italic text-slate-400">This post has no body text written yet.</p>
          )}
        </div>
      </article>
    </main>
  );
}