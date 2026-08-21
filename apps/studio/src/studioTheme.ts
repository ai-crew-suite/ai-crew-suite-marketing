import { buildLegacyTheme } from "sanity";

/**
 * Shared Sanity Studio theme tuned to the Digest Engine marketing palette.
 */
export const studioTheme = buildLegacyTheme({
  "--black": "#1b222e",
  "--white": "#f4f6f8",
  "--gray": "#63718e",
  "--gray-base": "#4b5563",
  "--component-bg": "#eff2f7",
  "--component-text-color": "#1b222e",
  "--brand-primary": "#3e4d6b",
  "--default-button-color": "#4b5563",
  "--default-button-primary-color": "#3e4d6b",
  "--default-button-success-color": "#738d79",
  "--default-button-warning-color": "#b38f47",
  "--default-button-danger-color": "#ac5d50",
  "--state-info-color": "#3e4d6b",
  "--state-success-color": "#738d79",
  "--state-warning-color": "#b38f47",
  "--state-danger-color": "#ac5d50",
  "--main-navigation-color": "#2d384d",
  "--main-navigation-color--inverted": "#f4f6f8",
  "--focus-color": "#cfb466",
});