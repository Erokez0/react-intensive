import type { IProgressBadge } from "./progress-badge";
import styles from './progress-badge.module.css'

export function ProgressBadge({ icon, label, value }: IProgressBadge) {
  return (
    <section className={styles.badge}>
      <img src={icon} alt="" className={styles['badge-icon']} />
      <span className={styles["badge-label"]}>{label}</span>
      <span className={styles["badge-value"]}>{value + " items"}</span>
    </section>
  );
}
