import {Link} from 'react-router-dom';

export function ContactUsPage(){
  return <div className="mx-auto max-w-4xl px-4 py-8">
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">For companies</p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">Contact Tech Lah</h1>
      <p className="mt-3 max-w-2xl text-sm text-neutral-600">
        We work with brands, founders, and teams on sponsorships, editorial partnerships,
        product launches, and business enquiries.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="text-base font-semibold text-ink">Promotions & partnerships</h2>
          <p className="mt-2 text-sm text-neutral-600">
            For sponsored content, campaign collaborations, brand visibility, and media partnerships.
          </p>
          <a href="mailto:newstechlah@gmail.com" className="mt-4 inline-block text-sm font-medium text-coral">
            newstechlah@gmail.com
          </a>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="text-base font-semibold text-ink">General enquiries</h2>
          <p className="mt-2 text-sm text-neutral-600">
            For press, product, community, and broader business questions.
          </p>
          <a href="mailto:newstechlah@gmail.com" className="mt-4 inline-block text-sm font-medium text-coral">
            newstechlah@gmail.com
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-neutral-100 p-4 text-sm text-neutral-600">
        <p>Typical response time: 1–2 business days.</p>
        <Link to="/" className="mt-3 inline-block font-medium text-ink">Back home</Link>
      </div>
    </div>
  </div>;
}
