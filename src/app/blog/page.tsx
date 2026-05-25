"use client";

import { useEffect, useRef, useState } from "react";
import ShortNavbar from "@/components/ShortNavbar";
import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";
import type { BlogPost } from "@/sanity/lib/queries";

const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    mainImage,
    "mainImageAlt": mainImage.alt
  }
`;

export default function BlogPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    client
      .fetch<BlogPost[]>(POSTS_QUERY)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  // Scroll observer
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNavbar(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ShortNavbar slides in once Blogs header scrolls out */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ShortNavbar title="Sushovan Shakya" />
      </div>

      <main className="min-h-screen bg-white dark:bg-slate-900">
        {/* Blogs header — UPDATED FOR CENTER ALIGNMENT */}
        <div ref={headerRef} className="px-6 pt-16 pb-10 md:px-12 lg:px-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Blogs
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Thoughts and write-ups worth sharing.
          </p>
        </div>

        {/* Cards grid */}
        <section className="px-6 pb-24 md:px-12 lg:px-20">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-slate-400 text-center">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}