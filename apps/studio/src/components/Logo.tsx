import Image from "next/image";

import logoWithWordmark from "@/assets/images/logo-with-wordmark.svg";

import styles from "./Logo.module.css";

/**
 * Renders the Digest Engine logo for Sanity Studio chrome.
 */
export function LogoComponent() {
	return (
		<div className={styles.root}>
			<Image
				src={logoWithWordmark}
				alt="Digest Engine"
				priority
				className={styles.image}
			/>
			<span className={styles.badge}>Studio</span>
		</div>
	);
}
