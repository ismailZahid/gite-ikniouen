export const PACKS = {
    en: [
        {
            id: "detente-beldi",
            title: "Détente Beldi — 2 nights (2 pax)",
            details: "2N BB + hammam duo + 1 dinner",
            rates: { low: 1300, shoulder: 1450, high: 1700 },
            note: null,
        },
        {
            id: "rando-hammam",
            title: "Rando & Hammam — 3 nights (2 pax)",
            details: "3N BB + ½-day hike + hammam duo + 1 dinner",
            rates: { low: 2050, shoulder: 2350, high: 2750 },
            note: null,
        },
        {
            id: "famille-potager",
            title: "Famille Potager — 2 nights (2A + 1–2C)",
            details: "2N BB + kids’ cooking workshop + picnic",
            rates: { low: 1600, shoulder: 1780, high: 2050 },
            note: "Extra child: +60 MAD/night (BB), meals –50%",
        },
        {
            id: "semaine-slow",
            title: "Semaine Slow — 6=7 nights (2 pax)",
            details: "7N BB (pay 6) + 2 dinners + hammam duo",
            rates: { low: 3300, shoulder: 3720, high: 4500 },
            note: null,
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
        },
    ],

    fr: [
        {
            id: "detente-beldi",
            title: "Détente Beldi — 2 nuits (2 pers.)",
            details: "2N BB + hammam duo + 1 dîner terroir",
            rates: { low: 1300, shoulder: 1450, high: 1700 },
            note: null,
        },
        {
            id: "rando-hammam",
            title: "Rando & Hammam — 3 nuits (2 pers.)",
            details: "3N BB + rando ½ journée + hammam duo + 1 dîner",
            rates: { low: 2050, shoulder: 2350, high: 2750 },
            note: null,
        },
        {
            id: "famille-potager",
            title: "Famille Potager — 2 nuits (2A + 1–2E)",
            details: "2N BB en suite familiale + atelier cuisine enfants + pique-nique",
            rates: { low: 1600, shoulder: 1780, high: 2050 },
            note: "Enfant supp. : +60 MAD/nuit (BB), repas –50%",
        },
        {
            id: "semaine-slow",
            title: "Semaine Slow — 6=7 nuits (2 pers.)",
            details: "7N BB (paye 6) + 2 dîners terroir + hammam duo",
            rates: { low: 3300, shoulder: 3720, high: 4500 },
            note: null,
        },
        {
            id: "groupes",
            title: "Petits groupes (6–10 pers.) — 2 nuits",
            details: "2N BB + dîner + rando ½ journée + espace commun réservé",
            group: true,
            rates: {
                low: "à partir de 950 MAD / pers.",
                shoulder: "à partir de 950 MAD / pers.",
                high: "à partir de 1100 MAD / pers.",
            },
            note: "Guide & logistique inclus • 1 gratuité pour 9 payants (organisateur)",
        },
    ],

    es: [
        {
            id: "detente-beldi",
            title: "Détente Beldi — 2 noches (2 pax)",
            details: "2N BB + hammam dúo + 1 cena",
            rates: { low: 1300, shoulder: 1450, high: 1700 },
            note: null,
        },
        {
            id: "rando-hammam",
            title: "Rando & Hammam — 3 noches (2 pax)",
            details: "3N BB + excursión ½ día + hammam dúo + 1 cena",
            rates: { low: 2050, shoulder: 2350, high: 2750 },
            note: null,
        },
        {
            id: "famille-potager",
            title: "Familia Huerto — 2 noches (2A + 1–2N)",
            details: "2N BB + taller de cocina infantil + picnic",
            rates: { low: 1600, shoulder: 1780, high: 2050 },
            note: "Niño adicional: +60 MAD/noche (BB), comidas –50%",
        },
        {
            id: "semaine-slow",
            title: "Semana Slow — 6=7 noches (2 pax)",
            details: "7N BB (paga 6) + 2 cenas + hammam dúo",
            rates: { low: 3300, shoulder: 3720, high: 4500 },
            note: null,
        },
        {
            id: "groupes",
            title: "Pequeños grupos (6–10 pax) — 2 noches",
            details: "2N BB + cena + excursión ½ día + sala reservada",
            group: true,
            rates: {
                low: "desde 950 MAD / pers.",
                shoulder: "desde 950 MAD / pers.",
                high: "desde 1100 MAD / pers.",
            },
            note: "Guía y logística incluidos • 1 gratis por cada 9 pagos (organizador)",
        },
    ],
};


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
