import './Badge.css';

export default function Badge({ type, label, icon }) {
    return (
        <span className={`badge badge-${type}`}>
            {icon && <span className="badge-icon">{icon}</span>}
            {label}
        </span>
    );
}