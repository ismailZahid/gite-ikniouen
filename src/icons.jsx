export function IconYaz({className}) {
    // Accurate Yaz: top arc curves down, bottom arc curves up, central spine
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 11 Q32 38 49 22"></path>
                <path d="M10 46 Q32 26 54 50"></path>
                <path d="M32 8 V56"/>
            </g>
        </svg>
    );
}

export function IconTagine({className}) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
            <path d="M24 18c0-4 4-8 8-8s8 4 8 8l6 10H18l6-10Z" fill="currentColor" opacity=".2"/>
            <path d="M10 44h44l-8-14H18L10 44Zm14-26c0-4 4-8 8-8s8 4 8 8" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

export function IconPalm({className}) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
            <path d="M32 24c10-10 20-8 24 0-10-2-18 2-24 8-6-6-14-10-24-8 4-8 14-10 24 0Z" fill="currentColor"
                  opacity=".2"/>
            <path d="M32 60V32m0 0c6-6 14-10 24-8M32 32C22 26 14 24 8 24" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

export function IconDunes({className}) {
    // Full-bleed Anti-Atlas ridges
    return (
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className={className} aria-hidden>
            <path
                d="M0 80 L60 60 L120 75 L180 58 L240 72 L300 50 L360 74 L420 56 L480 76 L540 62 L600 70 L660 60 L720 74 L780 66 L840 72 L900 64 L1000 70 V120 H0 Z"
                fill="currentColor" opacity="0.55"/>
            <path
                d="M0 96 L50 76 L100 90 L150 72 L200 92 L260 70 L320 94 L380 74 L440 96 L500 78 L560 92 L620 76 L680 94 L740 84 L800 92 L860 82 L920 90 L1000 96 V120 H0 Z"
                fill="currentColor"/>
        </svg>
    );
}

export function IconGuests(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" fill="currentColor" opacity="0.2"/>
            <path d="M3 21a7 7 0 0 1 14 0M16 10a3 3 0 1 0 0-6" stroke="currentColor" strokeWidth="1.5" fill="none"
                  strokeLinecap="round"/>
        </svg>
    );
}

export function IconBed(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <rect x="2" y="11" width="20" height="7" rx="1.5" fill="currentColor" opacity="0.2"/>
            <path d="M3 18V7m18 11V9a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2" stroke="currentColor" strokeWidth="1.5"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

export function IconLeaf(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <path d="M20 4C12 4 7 9 7 16c0 3 2 5 5 5 7 0 12-5 12-13 0-2-1-3-4-4Z" fill="currentColor" opacity="0.2"/>
            <path d="M20 4C12 4 7 9 7 16c0 3 2 5 5 5M7 16c4-3 8-5 13-6" stroke="currentColor" strokeWidth="1.5"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

export function IconSteam({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M7 18c2-2 0-3 2-5 2-2 0-3 2-5" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
            <path d="M12 18c2-2 0-3 2-5 2-2 0-3 2-5" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
        </svg>
    );
}

export function IconHike({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M3 18c4-3 8-5 13-6M12 11l2 3 3 2" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
            <circle cx="15.5" cy="5.5" r="1.5" fill="currentColor"/>
            <path d="M11 9l-3 3 1 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
    );
}

export function IconStars5({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M6 8l1.2 2.7L10 12l-2.2 1.3L6 16l-1.3-2.7L2 12l2.7-1.3L6 8Z" fill="currentColor" opacity=".9"/>
            <path d="M12 4l1.4 3.2L17 8l-3.1 1.8L12 13l-1.9-3.2L7 8l3.6-.8L12 4Z" fill="currentColor" opacity=".7"/>
            <path d="M15.5 10.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2Z" fill="currentColor" opacity=".6"/>
        </svg>
    );
}

export function IconPottery({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M9 4h6c0 2 1 3 2 4-1 5-2 7-5 7s-4-2-5-7c1-1 2-2 2-4Z" fill="currentColor" opacity=".85"/>
            <path d="M6 20h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
    );
}

export function IconNights({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export function IconDinner({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M4 3h16M4 9h16M10 21v-6m4 6v-6" />
        </svg>
    );
}

export function IconHammam({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M12 3v2m0 4v2m0 4v2m-6 4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
        </svg>
    );
}

export function IconCook({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="12" cy="5" r="2"/>
            <path d="M10 22v-6h4v6M5 22h14" />
        </svg>
    );
}
