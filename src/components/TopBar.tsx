import styles from "@/styles/TopBar.module.css";
import Logo from "./Logo";
import { AiFillSetting } from "react-icons/ai";

export default function TopBar() {
	return (
		<>
			<div className={styles.topbar}>
				<Logo />
				<button className={styles.settingsButton}>
					<AiFillSetting className={styles.settingsIcon} />
				</button>
			</div>
		</>
	);
}
