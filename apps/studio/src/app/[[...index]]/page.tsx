import { LogoComponent } from "@/components/Logo";

import AdminStudio from "./AdminStudio";

export default function StudioPage() {
  return (
    <main className="studio-page">
      <section className="studio-page__masthead" aria-labelledby="studio-page-title">
        <div className="studio-page__masthead-top">
          <LogoComponent />
          <div className="studio-page__meta" aria-label="Studio metadata">
            <span className="studio-page__pill">Production dataset</span>
            <span className="studio-page__pill">Marketing content system</span>
          </div>
        </div>

        <div className="studio-page__brand">
          <p className="studio-page__eyebrow">Content Operations</p>
          <h1 className="studio-page__title" id="studio-page-title">
            Digest Engine Studio
          </h1>
          <p className="studio-page__description">
            Manage landing pages, navigation, error states, legal content, and editorial resources
            from a Studio shell that matches the public brand more closely.
          </p>
        </div>
      </section>

      <section className="studio-page__frame" aria-label="Sanity Studio canvas">
        <div className="studio-page__canvas">
          <AdminStudio />
        </div>
      </section>
    </main>
  );
}