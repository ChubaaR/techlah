
import { jobs, CWC_JOBS_URL } from '../data/jobs';

import { ext } from '../utils/helpers';
import { useAsync } from '../hooks/useAsync';
import { byCategory } from '../services/articleService';

import { Card } from '../components/news/NewsCard';
import { Heading } from '../components/news/SectionHeading';

export function CareersPage() {
  const { data: stories = [] } = useAsync(
    () => byCategory('careers', 3),
    []
  );

  return (
    <>
      {/* Page heading */}
      <h1 className="text-2xl font-semibold">
        Careers
      </h1>

      <p className="mb-4 text-sm text-neutral-500">
        Internships, graduate programmes, entry-level roles and
        competitions from CWC Jobs.
      </p>

      {/* Job listings */}
      {jobs.length > 0 ? (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-lg bg-neutral-100 p-4 text-xs"
            >
              <div>
                <h2 className="text-sm font-semibold">
                  {job.title}
                </h2>

                <p className="text-neutral-500">
                  {job.company} • {job.location} • {job.type}
                </p>
              </div>

              {job.url && (
                <a
                  href={job.url}
                  {...ext}
                  className="bg-coral px-3 py-2 text-white"
                >
                  Apply
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty state when no jobs are configured */
        <div className="rounded-lg bg-neutral-100 p-6 text-sm">
          <p>Browse Codewithchuba Jobs Platforms</p>

          {/* <p className="mt-1 text-neutral-500">
            Add real listings to <code>jobs</code> in{' '}
            <code>src/More.tsx</code>, each with its CWC Jobs URL.
          </p> */}

          {CWC_JOBS_URL ? (
            <a
              href={CWC_JOBS_URL}
              {...ext}
              className="mt-3 inline-block bg-coral px-3 py-2 text-white"
            >
              Browse all on CWC Jobs
            </a>
          ) : (
            <p className="mt-1 text-neutral-500">
              Set <code>VITE_CWC_JOBS_URL</code> in{' '}
              <code>.env</code> to show a link to CWC Jobs.
            </p>
          )}
        </div>
      )}

      {/* Career stories */}
      {stories.length > 0 && (
        <>
          <div className="mt-10">
            <Heading
              t="Career stories"
              to="/category/careers"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {stories.map((article) => (
              <Card
                key={article.id}
                a={article}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
