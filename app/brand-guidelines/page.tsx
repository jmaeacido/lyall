import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Guidelines | Steve Lyall Tree Care",
  description:
    "Lyall Property Care one-page brand guidelines — colors, typography, and mark guidance viewed in place.",
};

const PDF_SRC = "/brand-guidelines.pdf";
const PDF_EMBED = `${PDF_SRC}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

export default function BrandGuidelinesPage() {
  return (
    <main className="guide">
      <nav className="nav wrap">
        <a className="logo" href="/">
          <i>SL</i>
          <b>
            Steve Lyall<small>Tree Care</small>
          </b>
        </a>
        <div>
          <a href="/#designs">Explore designs</a>
          <a href="/brand-guidelines" aria-current="page">
            Brand Guidelines
          </a>
          <a href="/#about">About the project</a>
        </div>
        <a className="navCta" href={PDF_SRC} download>
          Download PDF ↓
        </a>
      </nav>

      <header className="guideHero wrap">
        <div>
          <div className="eyebrow">Lyall Property Care · Brand system</div>
          <h1>
            One page.
            <br />
            <em>Clear brand.</em>
          </h1>
        </div>
        <div className="guideLead">
          <p>
            The official one-page brand guidelines for Lyall Property Care —
            mark, color, and type — presented here so the team can review them
            without leaving the collection.
          </p>
          <div className="guideActions">
            <a className="guidePrimary" href={PDF_SRC} download>
              Download PDF
            </a>
            <a
              className="guideGhost"
              href={PDF_SRC}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in new tab ↗
            </a>
          </div>
        </div>
      </header>

      <section className="guideStage wrap" aria-label="Brand guidelines document">
        <div className="guideFrame">
          <div className="guideBar">
            <span />
            <span />
            <span />
            <b>Lyall Property Care — One Page Brand Guidelines</b>
          </div>
          <div className="guideViewport">
            <div className="guideLoading" aria-hidden="true">
              Loading guidelines…
            </div>
            <iframe
              src={PDF_EMBED}
              title="Lyall Property Care One Page Brand Guidelines"
            />
          </div>
        </div>
        <p className="guideNote">
          Tip on mobile: use Download or Open in new tab if the preview doesn’t
          appear.
        </p>
      </section>

      <footer className="footer wrap">
        <a className="logo" href="/">
          <i>SL</i>
          <b>
            Steve Lyall<small>Tree Care</small>
          </b>
        </a>
        <p>
          Brand guidelines housed with the
          <br />
          website design collection.
        </p>
        <small>© 2026 Steve Lyall Tree Care · Design showcase</small>
      </footer>
    </main>
  );
}
