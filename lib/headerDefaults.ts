export type HeaderComponentContent = {
  navigationItems: Array<{
    href: string;
    label: string;
  }>;
  loginButtonText: string;
};

export const defaultHeaderComponentContent: HeaderComponentContent = {
  navigationItems: [
    { href: "/tour", label: "How It Works" },
    { href: "/docs", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
  ],
  loginButtonText: "Sign Up",
};

export async function getHeaderComponentContent(): Promise<HeaderComponentContent> {
  return defaultHeaderComponentContent;
}