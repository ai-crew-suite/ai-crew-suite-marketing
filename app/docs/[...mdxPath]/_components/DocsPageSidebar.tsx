import Link from "next/link";
import type { DocsSidebarSection } from "@/lib/docsTypes";

type TocItem = {
  depth: number;
  id: string;
  value: string;
};

type DocsPageSidebarProps = {
  currentPath: string;
  navigation: DocsSidebarSection[];
  toc: TocItem[];
};

export function DocsPageSidebar({ currentPath, navigation, toc }: DocsPageSidebarProps) {
  return (
    <aside className="sticky top-24 space-y-8">
      {/* Navigation sections */}
      {navigation.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-semibold text-content-active">Documentation</h3>
          {navigation.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-sm font-medium text-content-active">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                        currentPath === item.href
                          ? "bg-secondary text-content-inverse"
                          : "text-content hover:bg-page-offset"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-content-active">Table of Contents</h3>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors hover:text-secondary ${
                    item.depth === 2 ? "font-medium" : "ml-4"
                  }`}
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export type { DocsSidebarItem, DocsSidebarSection } from "@/lib/docsTypes";