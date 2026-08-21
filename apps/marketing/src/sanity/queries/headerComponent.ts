import { createClient, groq } from "next-sanity";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});

export interface HeaderNavigationItem {
  href: string;
  label: string;
}

export interface HeaderComponentContent {
  navigationItems: HeaderNavigationItem[];
  loginButtonText: string;
}

export const defaultHeaderComponentContent: HeaderComponentContent = {
  navigationItems: [
    { href: "/tour", label: "How It Works" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/signup", label: "Sign Up" },
  ],
  loginButtonText: "Login",
};

const headerComponentQuery = groq`
  *[_type == "headerComponent" && _id == "headerComponent"][0] {
    navigationItems,
    loginButtonText
  }
`;

export async function getHeaderComponentContent(): Promise<HeaderComponentContent> {
  try {
    const content = await client.fetch<HeaderComponentContent | null>(headerComponentQuery);

    return content ?? defaultHeaderComponentContent;
  } catch {
    return defaultHeaderComponentContent;
  }
}