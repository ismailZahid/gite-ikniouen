export const Packs = [
    {
        id: "detente-beldi",
        title: "Détente Beldi — 2 nights (2 pax)",
        details: "2N BB + hammam duo + 1 dinner",
        rates: { low: 1300, shoulder: 1450, high: 1700 },
        icons: [<IconNights className="h-4 w-4" />, <IconHammam className="h-4 w-4" />, <IconDinner className="h-4 w-4" />],
    },
    {
        id: "rando-hammam",
        title: "Rando & Hammam — 3 nights (2 pax)",
        details: "3N BB + ½-day hike + hammam duo + 1 dinner",
        rates: { low: 2050, shoulder: 2350, high: 2750 },
        icons: [<IconNights className="h-4 w-4" />, <IconHike className="h-4 w-4" />, <IconHammam className="h-4 w-4" />, <IconDinner className="h-4 w-4" />],
    },
    {
        id: "famille-potager",
        title: "Famille Potager — 2 nights (2A + 1–2C)",
        details: "2N BB + kids’ cooking workshop + picnic",
        rates: { low: 1600, shoulder: 1780, high: 2050 },
        note: "Extra child: +60 MAD/night (BB), meals –50%",
        icons: [<IconNights className="h-4 w-4" />, <IconCook className="h-4 w-4" />],
    },
    {
        id: "semaine-slow",
        title: "Semaine Slow — 6=7 nights (2 pax)",
        details: "7N BB (pay 6) + 2 dinners + hammam duo",
        rates: { low: 3300, shoulder: 3720, high: 4500 },
        icons: [<IconNights className="h-4 w-4" />, <IconDinner className="h-4 w-4" />, <IconHammam className="h-4 w-4" />],
    },
    {
        id: "groupes",
        title: "Small groups (6–10 pax) — 2 nights",
        details: "2N BB + dinner + ½-day hike + reserved lounge",
        group: true,
        rates: {
            low: "from 950 MAD / pers.",
            shoulder: "from 950 MAD / pers.",
            high: "from 1100 MAD / pers.",
        },
        note: "Guide & logistics included • 1 free for 9 paying (organizer)",
        icons: [<IconNights className="h-4 w-4" />, <IconDinner className="h-4 w-4" />, <IconHike className="h-4 w-4" />],
    },
];



function IconNights({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

function IconDinner({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M4 3h16M4 9h16M10 21v-6m4 6v-6" />
        </svg>
    );
}

function IconHammam({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M12 3v2m0 4v2m0 4v2m-6 4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
        </svg>
    );
}

function IconHike({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M12 2l3 7H9l3-7zm0 7v13m-6-6l6-7 6 7" />
        </svg>
    );
}

function IconCook({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="12" cy="5" r="2"/>
            <path d="M10 22v-6h4v6M5 22h14" />
        </svg>
    );
}
