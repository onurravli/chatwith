import styles from "@/styles/Logo.module.css";
import logo from "/public/chatwith.svg";
import Image from "next/image";

export default function Logo() {
	return (
		<>
			<div className={styles.container}>
				<Image className={styles.logo} src={logo} alt="ChatWith Logo" />
			</div>
		</>
	);
}
