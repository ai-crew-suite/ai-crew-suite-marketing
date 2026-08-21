import { createElement } from "react";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@digestengine/sanity-schema";
import { LogoComponent } from "./src/components/Logo";
import { StudioNavbar } from "./src/components/StudioNavbar";
import { studioTheme } from "./src/studioTheme";

const singletonItems = [
  { type: "homePage", title: "Home Page" },
  { type: "brandSettings", title: "Brand Settings" },
  { type: "headerComponent", title: "Header" },
  { type: "footerComponent", title: "Footer" },
  { type: "globalErrorPage", title: "Global Error Page" },
  { type: "consentComponent", title: "Consent Banner" },
  { type: "pricingPage", title: "Pricing Page" },
  { type: "pricingComponent", title: "Pricing Plans" },
  { type: "signupPage", title: "Signup Page" },
  { type: "tourPage", title: "Tour Page" },
  { type: "docsPage", title: "Docs Landing Page" },
  { type: "blogPage", title: "Blog Landing Page" },
  { type: "compliancePage", title: "Compliance Page" },
  { type: "privacyPage", title: "Privacy Page" },
  { type: "termsPage", title: "Terms Page" },
  { type: "cookiesPage", title: "Cookies Page" },
] as const;

const collectionItems = [
  { type: "docsContentPage", title: "Docs Articles" },
  { type: "blogContentPage", title: "Blog Articles" },
] as const;

const orderedTypeNames = new Set<string>([
  ...singletonItems.map((item) => item.type),
  ...collectionItems.map((item) => item.type),
]);

export default defineConfig({
  projectId: "wiokyeq0",
  dataset: "production",
  title: "Digest Engine Marketing Studio",
  icon: LogoComponent,
  basePath: "/",
  theme: studioTheme,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website Content")
          .items([
            S.listItem()
              .title("Core Experience")
              .child(
                S.list()
                  .title("Core Experience")
                  .items([
                    S.documentTypeListItem("homePage").title("Home Page"),
                    S.documentTypeListItem("brandSettings").title("Brand Settings"),
                    S.documentTypeListItem("headerComponent").title("Header"),
                    S.documentTypeListItem("footerComponent").title("Footer"),
                    S.documentTypeListItem("globalErrorPage").title("Global Error Page"),
                    S.documentTypeListItem("consentComponent").title("Consent Banner"),
                  ]),
              ),
            S.listItem()
              .title("Marketing Funnel")
              .child(
                S.list()
                  .title("Marketing Funnel")
                  .items([
                    S.documentTypeListItem("pricingPage").title("Pricing Page"),
                    S.documentTypeListItem("pricingComponent").title("Pricing Plans"),
                    S.documentTypeListItem("signupPage").title("Signup Page"),
                    S.documentTypeListItem("tourPage").title("Tour Page"),
                  ]),
              ),
            S.listItem()
              .title("Resources")
              .child(
                S.list()
                  .title("Resources")
                  .items([
                    S.documentTypeListItem("docsPage").title("Docs Landing Page"),
                    S.documentTypeListItem("docsContentPage").title("Docs Articles"),
                    S.documentTypeListItem("blogPage").title("Blog Landing Page"),
                    S.documentTypeListItem("blogContentPage").title("Blog Articles"),
                  ]),
              ),
            S.listItem()
              .title("Legal")
              .child(
                S.list()
                  .title("Legal")
                  .items([
                    S.documentTypeListItem("compliancePage").title("Compliance Page"),
                    S.documentTypeListItem("privacyPage").title("Privacy Page"),
                    S.documentTypeListItem("termsPage").title("Terms Page"),
                    S.documentTypeListItem("cookiesPage").title("Cookies Page"),
                  ]),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !orderedTypeNames.has(listItem.getId() ?? ""),
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      head: () => (
        createElement('link', {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        })
      ),
      logo: LogoComponent,
      navbar: StudioNavbar,
    },
  },
});