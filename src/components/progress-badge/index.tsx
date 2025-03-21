import type { IProgressBadge } from "./progress-badge";

export function ProgressBadge({icon, label, value}: IProgressBadge) {
    return <section className="badge">
        <img src={icon} alt="" className="badge-icon" />
        <span className="badge-label">{ label }</span>
        <span className="badge-value">{ value +" items" }</span>
    </section>
}