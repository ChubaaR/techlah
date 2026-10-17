
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useAsync } from '../hooks/useAsync';
import {
  featuredPublished,
  latestPublished,
} from '../services/articleService';

import {
  Card,
  Img,
  Meta,
  Tag,
} from '../components/news/NewsCard';
import { Compact } from '../components/news/CompactNewsItem';
import { Heading } from '../components/news/SectionHeading';
import { Msg } from '../components/ui/LoadingState';

import { formatDate } from '../utils/formatDate';

const creators = [
  'Mira Tan',
  'Aiman Yusof',
  'Sam Ortiz',
  'Lena Wu',
];

export default function HomePage() {
  const { data, loading, error } = useAsync(async () => {
    const [featured, latest] = await Promise.all([
      featuredPublished(5),
      latestPublished(30),
    ]);

    return {
      featured,
      latest,
    };
  }, []);

  const articles = data?.latest ?? [];
  const featuredArticles = data?.featured ?? [];

  const heroArticles = featuredArticles.length
    ? featuredArticles
    : articles;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle loading and error states.
  if (error) {
    return <Msg error={error} />;
  }

  if (loading && !data) {
    return <Msg loading />;
  }

  if (!articles.length) {
    return (
      <p className="py-20 text-center text-sm text-neutral-500">
        No published articles yet. Publish one from the admin dashboard.
      </p>
    );
  }

  // Select the featured article.
  const hero =
    heroArticles[currentIndex % heroArticles.length];

  const remainingArticles = articles.filter(
    (article) => article.id !== hero.id
  );

  // Navigate between featured articles.
  const step = (direction: number) => {
    setCurrentIndex(
      (index) =>
        (index + direction + heroArticles.length) %
        heroArticles.length
    );
  };

  return (
    <>
      {/* Featured article and latest headlines */}
      <section className="grid gap-4 lg:grid-cols-[1fr_230px]">
        <div className="relative">
          <img
            src={hero.image}
            alt={hero.alt}
            className="h-64 w-full rounded-lg sm:h-[340px] sm:pl-0"
          />

          <div className="relative mx-3 -mt-8 rounded-lg bg-white/95 p-4 shadow sm:absolute sm:left-0 sm:top-12 sm:m-0 sm:w-[300px] sm:-translate-x-4 sm:bg-neutral-50/95">
            <p className="text-xs">
              <b>{hero.publisher}</b> • {hero.author}
            </p>

            <h1 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
              {hero.title}
            </h1>

            <p className="mt-2 text-[11px] text-neutral-500">
              {hero.summary}{' '}
              <Link
                className="font-semibold text-ink"
                to={`/article/${hero.slug}`}
              >
                Read More
              </Link>
            </p>

            <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500">
              <span>{formatDate(hero.date)}</span>

              <span className="flex gap-2">
                <button
                  aria-label="Previous story"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  aria-label="Next story"
                  onClick={() => step(1)}
                >
                  <ChevronRight size={14} />
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {remainingArticles.slice(0, 4).map((article) => (
            <Compact key={article.id} a={article} />
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="mt-12">
        <Heading t="Latest News" to="/search" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {remainingArticles.slice(4, 7).map((article) => (
            <Card key={article.id} a={article} />
          ))}
        </div>
      </section>

      {/* Must-read articles */}
      <section className="mt-12">
        <Heading t="Must Read" to="/search" />

        {remainingArticles[7] && (
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Img
                a={remainingArticles[7]}
                cls="aspect-[2/1]"
              />

              <div className="mt-2 space-y-1">
                <Meta a={remainingArticles[7]} />

                <Link
                  to={`/article/${remainingArticles[7].slug}`}
                  className="block text-lg font-semibold"
                >
                  {remainingArticles[7].title}
                </Link>

                <p className="text-xs text-neutral-500">
                  {remainingArticles[7].summary}
                </p>

                <Tag a={remainingArticles[7]} />
              </div>
            </div>

            <div className="space-y-4">
              {remainingArticles.slice(8, 11).map((article) => (
                <Compact key={article.id} a={article} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Weekly highlights */}
      <section className="mt-12">
        <Heading t="Weekly Highlight" to="/search" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {remainingArticles.slice(11, 15).map((article) => (
            <Card
              key={article.id}
              a={article}
              ratio="aspect-[4/5]"
            />
          ))}
        </div>
      </section>

      {/* Top creators */}
      <section className="mt-12">
        <Heading t="Top Creator" />

        {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {creators.map((name) => (
            <Link
              key={name}
              to={`/search?q=${encodeURIComponent(name)}`}
              className="flex items-center gap-3"
            >
              <img
                alt=""
                src={`https://i.pravatar.cc/80?u=${encodeURIComponent(name)}`}
                className="h-10 w-10 rounded-full"
              />

              <span className="text-xs">
                <b className="block">{name}</b>
                <span className="text-coral">Tech Lah</span>
              </span>
            </Link>
          ))}
        </div> */}
      </section>
    </>
  );
}
