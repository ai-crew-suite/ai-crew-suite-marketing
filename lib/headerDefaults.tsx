import { HeaderComponentContent } from "./headerTypes";

export const defaultHeaderComponentContent: HeaderComponentContent = {
  loginButtonText: "Sign up",
  navigationItems: [
    { href: "/tour", label: "Tour" },
    { href: "/docs", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/compliance", label: "Security" },
  ],
};