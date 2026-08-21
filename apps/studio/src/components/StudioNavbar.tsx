import type { NavbarProps } from "sanity";
import { useWorkspace } from "sanity";

type ShortcutLink = {
  href: string;
  label: string;
};

function buildShortcutLinks(siteUrl: string, previewUrl?: string): ShortcutLink[] {
  const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
  const shortcuts: ShortcutLink[] = [
    {
      href: normalizedSiteUrl,
      label: "Open marketing site",
    },
    {
      href: `${normalizedSiteUrl}/docs`,
      label: "Read docs",
    },
  ];

  if (previewUrl) {
    shortcuts.push({
      href: previewUrl,
      label: "Open preview",
    });
  }

  return shortcuts;
}

/**
 * Adds brand context and external shortcuts above the default Sanity Studio navbar.
 */
export function StudioNavbar(props: NavbarProps) {
  const workspace = useWorkspace();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digestengine.io";
  const previewUrl = process.env.NEXT_PUBLIC_MARKETING_PREVIEW_URL;
  const shortcuts = buildShortcutLinks(siteUrl, previewUrl);

  return (
    <div className="studio-navbar-shell">
      <div className="studio-navbar-shell__notice">
        <div className="studio-navbar-shell__context">
          <span className="studio-navbar-shell__badge">{workspace.dataset}</span>
          <p className="studio-navbar-shell__summary">
            Editing the <strong>{workspace.title}</strong> workspace for project <strong>{workspace.projectId}</strong>.
          </p>
        </div>

        <div className="studio-navbar-shell__actions" aria-label="Studio shortcuts">
          {shortcuts.map((shortcut) => (
            <a
              key={shortcut.label}
              href={shortcut.href}
              target="_blank"
              rel="noreferrer"
              className="studio-navbar-shell__action"
            >
              {shortcut.label}
            </a>
          ))}
        </div>
      </div>

      {props.renderDefault(props)}
    </div>
  );
}

export { buildShortcutLinks };