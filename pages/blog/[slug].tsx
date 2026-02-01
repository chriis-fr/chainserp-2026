import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import path from 'path';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Container from 'components/Container';
import MDXRichText from 'components/MDXRichText';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getReadTime } from 'utils/readTime';
import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead';
import ShareWidget from 'views/SingleArticlePage/ShareWidget';
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageUrl: string;
  author?: string | null;
}

export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    calculateReadTime();
    lazyLoadPrismTheme();

    function calculateReadTime() {
      const currentContent = contentRef.current;
      if (currentContent) {
        setReadTime(getReadTime(currentContent.textContent || ''));
      }
    }

    function lazyLoadPrismTheme() {
      const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');

      if (!prismThemeLinkEl) {
        const headEl = document.querySelector('head');
        if (headEl) {
          const newEl = document.createElement('link');
          newEl.setAttribute('data-id', 'prism-theme');
          newEl.setAttribute('rel', 'stylesheet');
          newEl.setAttribute('href', '/prism-theme.css');
          newEl.setAttribute('media', 'print');
          newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
          headEl.appendChild(newEl);
        }
      }
    }
  }, []);

  const { slug, mdxSource, meta } = props;

  if (!meta || !mdxSource) {
    return null;
  }
  const { title, description, date, tags, imageUrl } = meta;
  const formattedDate = formatDate(new Date(date));
  const absoluteImageUrl = imageUrl.replace(/\/+/, '/');
  return (
    <>
      <Head>
        <noscript>
          <link rel="stylesheet" href="/prism-theme.css" />
        </noscript>
      </Head>
      <OpenGraphHead slug={slug} title={title} description={description} date={date} tags={Array.isArray(tags) ? tags.join(', ') : String(tags)} author={meta.author ?? ''} />
      <StructuredDataHead slug={slug} title={title} description={description} date={date} tags={Array.isArray(tags) ? tags.join(', ') : String(tags)} author={meta.author ?? ''} />
      <MetadataHead title={title} description={description} author={meta.author ?? ''} />
      <CustomContainer id="content" ref={contentRef}>
        <ShareWidget title={title} slug={slug} />
        <Header title={title} formattedDate={formattedDate} imageUrl={absoluteImageUrl} readTime={readTime} />
        <MDXRichText content={mdxSource} />
      </CustomContainer>
    </>
  );
}

export async function getStaticPaths() {
  if (!fs.existsSync(POSTS_DIR)) {
    return { paths: [], fallback: false };
  }
  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
  return {
    paths: filenames.map((filename) => ({
      params: { slug: filename.replace(/\.mdx$/, '') },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params as { slug: string };
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content);
  const meta: PostMeta = {
    title: frontmatter.title ?? '',
    description: frontmatter.description ?? '',
    date: frontmatter.date ?? '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    imageUrl: frontmatter.imageUrl ?? '',
    author: frontmatter.author ?? null,
  };
  return {
    props: { slug, mdxSource, meta },
  };
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 10rem auto;

  ${media('<=tablet')} {
    margin: 5rem auto;
  }
`;
