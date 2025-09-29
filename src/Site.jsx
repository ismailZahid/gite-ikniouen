import {useEffect, useMemo, useState} from "react";
import {GALLERY} from "./gallery";
import {SUITES} from "./suites.js";
import restauHero from "./assets/restau.png";

/* =========================
   CONFIG: update these 2!
   ========================= */
const PHONE = "2126XXXXXXXX"; // WhatsApp phone without '+'
const GMAPS_LINK = "https://maps.app.goo.gl/XXXXXXXX"; // your share link
const GMAPS_EMBED_SRC =
    "https://www.google.com/maps?q=31.0000,-5.0000&z=14&output=embed"; // put your lat,lng

/*******************
 * STARFIELD (dark)
 *******************/
function StarField({className, count = 200, skyHeight = 60}) {
    const stars = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: Math.random() * 1000,
                y: Math.random() * skyHeight,
                s: 0.9 + Math.random() * 1.6,
                rot: Math.random() * 360,
                d: 3 + Math.random() * 4,
                delay: Math.random() * 5,
            });
        }
        return arr;
    }, [count, skyHeight]);

    return (
        <svg
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className={className}
            aria-hidden
            style={{filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))"}}
        >
            <defs>
                {/* 5-point star centered at (0,0) */}
                <path
                    id="sf-star-5"
                    d="
            M 0 -1
            L 0.2245 -0.3090
            L 0.9511 -0.3090
            L 0.3633 0.1180
            L 0.5878 0.8090
            L 0 0.38197
            L -0.5878 0.8090
            L -0.3633 0.1180
            L -0.9511 -0.3090
            L -0.2245 -0.3090
            Z
          "
                />
            </defs>
            {stars.map((s, i) => (
                <use
                    key={i}
                    href="#sf-star-5"
                    xlinkHref="#sf-star-5"
                    fill="currentColor"
                    opacity="0.95"
                    transform={`translate(${s.x} ${s.y}) rotate(${s.rot}) scale(${s.s})`}
                >
                    <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur={`${s.d}s`}
                        begin={`${s.delay}s`}
                        repeatCount="indefinite"
                    />
                </use>
            ))}
        </svg>
    );
}

/*******************
 * PALETTE
 *******************/
const PALETTE = {
    sky: "#9EE5FF",
    earth: "#9A8B67",
    rock: "#5E5433",
    oasis: "#2C581F",
    oasisLight: "#5C9E2B",
    night: "#14181A",
};


/* ==== RATES & PACKS (from your tarifications PDF) ==== */
const SEASONS = {
    low: {key: "low", label: "Low", months: "Dec–mid-Feb, Jul–Aug"},
    shoulder: {key: "shoulder", label: "Shoulder", months: "Feb, Jun, Sep"},
    high: {key: "high", label: "High", months: "Mar–May, Oct–mid-Nov + holidays"},
};

const BAR = {low: 550, shoulder: 620, high: 750}; // MAD / suite / night (BB)

/* Simple rules shown under the grid */
const RATE_RULES = [
    {k: "3rd adult (rollaway)", v: "+120 MAD / night"},
    {k: "Single occupancy", v: "−80 MAD / night"},
    {k: "Weekend Fri/Sat (shoulder/high)", v: "+50 MAD / night"},
    {k: "Long stay ≥5 nights (direct)", v: "−10%"},
    {k: "Non-refundable vs flexible", v: "−10% (flex free cancel to D-7)"},
    {k: "High season", v: "min. 2 nights when needed"},
];

/* Upsells / services & activities */
const UPSELLS = [
    {t: "Dinner terroir (set menu)", p: "130 MAD / person"},
    {t: "Lunch / picnic", p: "80 MAD / person"},
    {t: "Cooking workshop + meal (2h)", p: "150 MAD / person (min. 2)"},
    {t: "Hammam beldi", p: "80 MAD / person"},
    {t: "Hammam duo", p: "160 MAD / 2 persons"},
    {t: "Pool day-pass (optional)", p: "100 MAD / person"},
    {t: "Sunset walk 1h30", p: "80 MAD / person (min. 2)"},
    {t: "Guided hike ½-day", p: "350–450 MAD / person (min. 2)"},
    {t: "Guided hike full day", p: "600–800 MAD / person (min. 2)"},
    {t: "Pottery / clay 1h30", p: "120 MAD / person (min. 2)"},
    {t: "Transfer Tinghir ⇄ Gîte", p: "250–350 MAD / way (from)"},
    {t: "Transfer Ouarzazate airport", p: "900–1 200 MAD / way (from)"},
];

/* Packs with seasonal prices */
const PACKS = [
    {
        title: "Détente Beldi — 2 nights (2 pax)",
        inc: "2N BB + hammam duo + 1 dinner",
        low: 1300,
        shoulder: 1450,
        high: 1700
    },
    {
        title: "Rando & Hammam — 3 nights (2 pax)",
        inc: "3N BB + ½-day hike + hammam duo + 1 dinner",
        low: 2050,
        shoulder: 2350,
        high: 2750
    },
    {
        title: "Famille Potager — 2 nights (2A + 1–2C)",
        inc: "2N BB + kids’ cooking workshop + picnic",
        low: 1600,
        shoulder: 1780,
        high: 2050
    },
    {
        title: "Semaine Slow — 6=7 nights (2 pax)",
        inc: "7N BB (pay 6) + 2 dinners + hammam duo",
        low: 3300,
        shoulder: 3720,
        high: 4500
    },
    {
        title: "Small groups (6–10 pax) — 2 nights",
        inc: "2N BB + dinner + ½-day hike + reserved lounge",
        low: "from 950 / person",
        shoulder: "—",
        high: "~1 100 / person (high)"
    },
];

/* Policies / extras */
const POLICIES = [
    "Check-in/out: 15:00 / 11:00 — Late check-out (if available): 150 MAD",
    "Baby cot: free (on request) — Pets: on request (+80 MAD final cleaning)",
    "Payment: cash / card (TPE) / bank transfer; 30% deposit for packs & groups",
];


/*******************
 * I18N
 *******************/
const LANG = {
    en: {
        nav: {
            suites: "Suites",
            experiences: "Experiences",
            gallery: "Gallery",
            location: "Location",
            book: "Book",
            rates: "Rates"
        },
        hero: {
            title: "Gite Ikniouen",
            subtitle: "Berber rural lodge between Dadès & Drâa valleys — adobe walls, palm-shaded patios, and star-bright nights.",
            ctaPrimary: "Check availability",
            ctaSecondary: "WhatsApp us",
        },
        suites: {title: "Suites & Rates", note: "Early opening rates — breakfast included"},
        experiences: {
            title: "Experiences",
            items: [
                {title: "Hammam beldi", text: "Warm tadelakt walls, eucalyptus steam, slow rituals."},
                {title: "Garden-to-table cuisine", text: "Seasonal vegetables, local bread, tajines and couscous."},
                {title: "Atlas hikes & oases", text: "Half-day to multi-day treks with certified local guides."},
                {title: "Stargazing nights", text: "Dark sky, milky way, and tea by the fire."},
                {title: "Craft workshops", text: "Pottery, weaving and bread-making with neighbors."},
            ],
        },
        gallery: {
            title: "Gallery (preview)",
            note: "Replace with your photos: garden, patio, rooms, hammam, night sky."
        },
        location: {
            title: "Where we are",
            body: "Ikniouen sits between the Dadès and Drâa valleys. 40min from Tinghir / 1h from Drâa valley. After booking we share exact directions and a pin.",
            openMaps: "Open in Maps",
        },
        booking: {
            title: "Book your stay",
            lead: "Send us your dates and we'll confirm within hours.",
            name: "Name",
            email: "Email",
            checkin: "Check-in",
            checkout: "Check-out",
            guests: "Guests",
            message: "Message (optional)",
            submit: "Send request",
            alt: "Or write to us on WhatsApp",
        },
        footer: {rights: "All rights reserved.", made: "Made with ❤ in Ikniouen"},
    },
    fr: {
        nav: {
            suites: "Suites",
            experiences: "Expériences",
            gallery: "Galerie",
            location: "Localisation",
            book: "Réserver",
            rates: "Tarifs"
        },
        hero: {
            title: "Gîte Ikniouen",
            subtitle: "Maison d’hôtes berbère entre Dadès et Drâa — murs en terre, patios ombragés de palmiers et nuits étoilées.",
            ctaPrimary: "Voir les disponibilités",
            ctaSecondary: "WhatsApp",
        },
        suites: {title: "Suites & Tarifs", note: "Tarifs d’ouverture — petit-déjeuner inclus"},
        experiences: {
            title: "Expériences",
            items: [
                {title: "Hammam beldi", text: "Murs en tadelakt, vapeur à l’eucalyptus, rituels lents."},
                {title: "Cuisine du potager", text: "Légumes de saison, pain au feu, tajines et couscous."},
                {title: "Randonnées Atlas & oasis", text: "De la demi-journée au trek avec guides agréés."},
                {title: "Nuits d’astronomie", text: "Ciel noir, voie lactée et thé au feu de bois."},
                {title: "Ateliers d’artisanat", text: "Poterie, tissage et pain avec le voisinage."},
            ],
        },
        gallery: {
            title: "Galerie (aperçu)",
            note: "Remplacez par vos photos : jardin, patio, chambres, hammam, ciel nocturne."
        },
        location: {
            title: "Nous trouver",
            body: "Ikniouen entre Dadès et Drâa. 1h30 de Tinghir / 2h de Zagora.",
            openMaps: "Ouvrir dans Maps"
        },
        booking: {
            title: "Réserver",
            lead: "Envoyez vos dates, réponse sous quelques heures.",
            name: "Nom",
            email: "Email",
            checkin: "Arrivée",
            checkout: "Départ",
            guests: "Voyageurs",
            message: "Message (optionnel)",
            submit: "Envoyer",
            alt: "Ou via WhatsApp",
        },
        footer: {rights: "Tous droits réservés.", made: "Fait avec ❤ à Ikniouen"},
    },
    es: {
        nav: {
            suites: "Suites",
            experiences: "Experiencias",
            gallery: "Galería",
            location: "Ubicación",
            book: "Reservar",
            rates: "Tarifas"
        },
        hero: {
            title: "Gîte Ikniouen",
            subtitle: "Alojamiento rural bereber entre los valles Dadès y Drâa — muros de adobe, patios con palmeras y cielos estrellados.",
            ctaPrimary: "Ver disponibilidad",
            ctaSecondary: "WhatsApp",
        },
        suites: {title: "Suites y precios", note: "Tarifas de apertura — desayuno incluido"},
        experiences: {
            title: "Experiencias",
            items: [
                {title: "Hammam beldi", text: "Vapor con eucalipto, muros cálidos, rituales lentos."},
                {title: "Cocina del huerto", text: "Verduras de temporada, pan al fuego, tajines y cuscús."},
                {title: "Rutas por el Atlas", text: "De medio día a varios días con guías acreditados."},
                {title: "Cielo estrellado", text: "Cielo negro y vía láctea con té al fuego."},
                {title: "Talleres artesanos", text: "Alfarería, tejido y pan con vecinos."},
            ],
        },
        gallery: {
            title: "Galería (vista previa)",
            note: "Reemplaza con tus fotos: jardín, patio, habitaciones, hammam, cielo nocturno."
        },
        location: {
            title: "Dónde estamos",
            body: "Ikniouen entre Dadès y Drâa. 1h30 de Tinghir / 2h de Zagora.",
            openMaps: "Abrir en Maps"
        },
        booking: {
            title: "Reservar",
            lead: "Envíanos tus fechas y confirmamos en pocas horas.",
            name: "Nombre",
            email: "Email",
            checkin: "Llegada",
            checkout: "Salida",
            guests: "Huéspedes",
            message: "Mensaje (opcional)",
            submit: "Enviar solicitud",
            alt: "O por WhatsApp",
        },
        footer: {rights: "Todos los derechos reservados.", made: "Hecho con ❤ en Ikniouen"},
    },
};

const CURRENCY = "MAD";

/*******************
 * ICONS
 *******************/
function IconYaz({className}) {
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

function IconTagine({className}) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
            <path d="M24 18c0-4 4-8 8-8s8 4 8 8l6 10H18l6-10Z" fill="currentColor" opacity=".2"/>
            <path d="M10 44h44l-8-14H18L10 44Zm14-26c0-4 4-8 8-8s8 4 8 8" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

function IconPalm({className}) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
            <path d="M32 24c10-10 20-8 24 0-10-2-18 2-24 8-6-6-14-10-24-8 4-8 14-10 24 0Z" fill="currentColor"
                  opacity=".2"/>
            <path d="M32 60V32m0 0c6-6 14-10 24-8M32 32C22 26 14 24 8 24" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

function IconDunes({className}) {
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

function IconGuests(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" fill="currentColor" opacity="0.2"/>
            <path d="M3 21a7 7 0 0 1 14 0M16 10a3 3 0 1 0 0-6" stroke="currentColor" strokeWidth="1.5" fill="none"
                  strokeLinecap="round"/>
        </svg>
    );
}

function IconBed(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <rect x="2" y="11" width="20" height="7" rx="1.5" fill="currentColor" opacity="0.2"/>
            <path d="M3 18V7m18 11V9a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2" stroke="currentColor" strokeWidth="1.5"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

function IconLeaf(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden className={props.className}>
            <path d="M20 4C12 4 7 9 7 16c0 3 2 5 5 5 7 0 12-5 12-13 0-2-1-3-4-4Z" fill="currentColor" opacity="0.2"/>
            <path d="M20 4C12 4 7 9 7 16c0 3 2 5 5 5M7 16c4-3 8-5 13-6" stroke="currentColor" strokeWidth="1.5"
                  fill="none" strokeLinecap="round"/>
        </svg>
    );
}

function Stat({icon, label, value}) {
    return (
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
                <div className="font-semibold">{value}</div>
            </div>
        </div>
    );
}


function Chip({children, tone = "emerald"}) {
// Chip tone="gold" → make it “earth”
    const toneCls =
        tone === "gold"
            ? "bg-[#E7E0CF] text-[#5E5433] border-[#D7CCB0] dark:bg-[#1C2C19]/40 dark:text-[#C9C39E] dark:border-[#1C2C19]"
            : "bg-[#E0F1DA] text-[#2C581F] border-[#B9D6AE] dark:bg-[#1C2C19]/40 dark:text-[#5C9E2B] dark:border-[#1C2C19]";
    return <span className={`px-2 py-1 text-xs rounded-full border ${toneCls}`}>{children}</span>;
}


function SectionTitle({kicker, title, subtitle}) {
    return (
        <div className="max-w-3xl mx-auto text-center">
            {kicker && <div
                className="uppercase tracking-widest text-amber-700 dark:text-emerald-300 text-xs font-semibold mb-2">{kicker}</div>}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">{subtitle}</p>}
        </div>
    );
}

/* ---------- small helpers ---------- */
function fmtMAD(v) {
    return typeof v === "number" ? `${v.toLocaleString("en-US")} MAD` : v;
}

/* ---------- extra inline icons for Experiences ---------- */
function IconSteam({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M7 18c2-2 0-3 2-5 2-2 0-3 2-5" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
            <path d="M12 18c2-2 0-3 2-5 2-2 0-3 2-5" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
        </svg>
    );
}

function IconHike({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M3 18c4-3 8-5 13-6M12 11l2 3 3 2" stroke="currentColor" strokeWidth="1.6" fill="none"
                  strokeLinecap="round"/>
            <circle cx="15.5" cy="5.5" r="1.5" fill="currentColor"/>
            <path d="M11 9l-3 3 1 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
    );
}

function IconStars5({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M6 8l1.2 2.7L10 12l-2.2 1.3L6 16l-1.3-2.7L2 12l2.7-1.3L6 8Z" fill="currentColor" opacity=".9"/>
            <path d="M12 4l1.4 3.2L17 8l-3.1 1.8L12 13l-1.9-3.2L7 8l3.6-.8L12 4Z" fill="currentColor" opacity=".7"/>
            <path d="M15.5 10.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2Z" fill="currentColor" opacity=".6"/>
        </svg>
    );
}

function IconPottery({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M9 4h6c0 2 1 3 2 4-1 5-2 7-5 7s-4-2-5-7c1-1 2-2 2-4Z" fill="currentColor" opacity=".85"/>
            <path d="M6 20h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
    );
}

const DIRECT_BONUS = "Book direct = hammam offered (80 MAD/person value)";

export default function Site() {

    const [menuOpen, setMenuOpen] = useState(false);

    /*******************
     * LANGUAGE
     *******************/
    const [lang, setLang] = useState("en");
    const t = useMemo(() => LANG[lang], [lang]);

    const [season, setSeason] = useState("shoulder"); // default middle season
    const seasonKeys = ["low", "shoulder", "high"];
    /*******************
     * THEME
     *******************/
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    /*******************
     * BOOKING FORM
     *******************/
    const [form, setForm] = useState({
        name: "", email: "", in: "", out: "", guests: 2, message: "", website: "", challenge: ""
    });
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -50% 0px", // triggers when section is ~center
                threshold: 0,
            }
        );
        sections.forEach((sec) => observer.observe(sec));
        return () => sections.forEach((sec) => observer.unobserve(sec));
    }, []);

    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 300) setShowTop(true);
            else setShowTop(false);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    function submitBooking(e) {
        e.preventDefault();

        // Honeypot check
        if (form.website) {
            console.warn("Bot submission blocked.");
            return;
        }

        // Challenge check
        if (form.challenge.trim().toLowerCase() !== "ikniouen") {
            alert("Please type Ikniouen to confirm you are human.");
            return;
        }

        const phone = PHONE;
        const msg = `Booking request — ${form.name}
Email: ${form.email}
Check-in: ${form.in}
Check-out: ${form.out}
Guests: ${form.guests}
Message: ${form.message}`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    }


    return (
        <div>
            <div
                className="min-h-screen text-slate-900 dark:text-slate-100 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.7),rgba(246,231,216,0))] dark:bg-[radial-gradient(ellipse_at_top,rgba(11,16,32,1),rgba(15,118,110,0.25))]">
                {/* TOP DECOR — sky (light) / stars (dark) + full-bleed mountains */}
                <div className="pointer-events-none select-none relative overflow-hidden">
                    <div className="h-16 md:h-20 lg:h-24"/>
                    {/* Light-mode sky */}
                    <div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-0 block dark:hidden bg-gradient-to-b from-[#D9F0FF] via-[#ECF7FF] to-transparent"/>
                    {/* Dark-mode stars */}
                    <StarField
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-10 hidden dark:block text-[#DDEBFF]"
                        count={200}/>
                    {/* Mountains */}
                    <IconDunes
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-20 text-[#917E64]/70 dark:text-[#5E5433]/70"/>
                </div>

                {/* NAV */}
                <header
                    className="sticky top-0 z-50 backdrop-blur border-b border-amber-200/60 dark:border-emerald-900/60 bg-white/70 dark:bg-black/30">
                    <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                        {/* Logo */}
                        <a href="#top" className="flex items-center gap-2 font-bold text-xl">
                            <IconYaz className="h-6 w-6 text-amber-700 dark:text-emerald-300"/> Gite Ikniouen
                        </a>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            {[
                                {id: "suites", label: t.nav.suites},
                                {id: "experiences", label: t.nav.experiences},
                                {id: "gallery", label: t.nav.gallery},
                                {id: "location", label: t.nav.location},
                                {id: "book", label: t.nav.book},
                                {id: "rates", label: t.nav.rates},
                            ].map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={`hover:text-amber-700 dark:hover:text-emerald-300 ${
                                        activeSection === link.id ? "font-semibold text-amber-700 dark:text-emerald-300" : ""
                                    }`}
                                    onClick={() => setMenuOpen(false)} // also close menu if clicked
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* Language + Theme */}
                        <div className="hidden md:flex items-center gap-2">
                            <select
                                className="rounded-lg border border-amber-300 dark:border-emerald-700 bg-transparent px-2 py-1 text-sm"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                aria-label="Select language"
                            >
                                <option value="en" className="dark:text-zinc-800">EN</option>
                                <option value="fr" className="dark:text-zinc-800">FR</option>
                                <option value="es" className="dark:text-zinc-800">ES</option>
                            </select>
                            <button
                                aria-label="Toggle theme"
                                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                                className="rounded-lg border border-amber-300 dark:border-emerald-700 px-2 py-1 text-xs"
                                title="Toggle light/dark"
                            >
                                {theme === "dark" ? "☾" : "☀"}
                            </button>
                        </div>

                        {/* Mobile burger */}
                        <button
                            className="md:hidden relative w-8 h-8 flex flex-col justify-between items-center p-1"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle menu"
                        >
                          <span
                              className={`block h-0.5 w-6 bg-current rounded transition-transform duration-300 ${
                                  menuOpen ? "rotate-45 translate-y-[0.84rem]" : ""
                              }`}
                          ></span>
                            <span
                                className={`block h-0.5 w-6 bg-current rounded transition-opacity duration-300 ${
                                    menuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-6 bg-current rounded transition-transform duration-300 ${
                                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                                }`}
                            ></span>
                        </button>

                    </div>

                    {/* Mobile menu panel */}
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out 
    ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
  `}
                    >
                        <div
                            className="bg-white/90 dark:bg-black/90 backdrop-blur border-t border-amber-200/60 dark:border-emerald-900/60 px-4 py-4 space-y-4">
                            {[
                                {id: "suites", label: t.nav.suites},
                                {id: "experiences", label: t.nav.experiences},
                                {id: "gallery", label: t.nav.gallery},
                                {id: "location", label: t.nav.location},
                                {id: "book", label: t.nav.book},
                                {id: "rates", label: t.nav.rates},
                            ].map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={`block text-sm ${
                                        activeSection === link.id
                                            ? "font-semibold text-amber-700 dark:text-emerald-300"
                                            : "text-slate-700 dark:text-slate-300"
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Language + Theme controls */}
                            <div
                                className="flex items-center gap-3 pt-2 border-t border-slate-300/40 dark:border-slate-600/40">
                                <select
                                    className="rounded-lg border border-amber-300 dark:border-emerald-700 bg-transparent px-2 py-1 text-sm flex-1"
                                    value={lang}
                                    onChange={(e) => setLang(e.target.value)}
                                    aria-label="Select language"
                                >
                                    <option value="en" className="dark:text-zinc-800">EN</option>
                                    <option value="fr" className="dark:text-zinc-800">FR</option>
                                    <option value="es" className="dark:text-zinc-800">ES</option>
                                </select>
                                <button
                                    aria-label="Toggle theme"
                                    onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                                    className="rounded-lg border border-amber-300 dark:border-emerald-700 px-2 py-1 text-xs"
                                >
                                    {theme === "dark" ? "☾" : "☀"}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section id="top" className="relative overflow-hidden">
                    {/* Animated background photo */}
                    <div className="absolute inset-0 -z-10">
                        <img
                            src={restauHero}
                            alt=""
                            loading="eager"
                            fetchpriority="high"
                            decoding="async"
                            className="h-full w-full object-cover kb-kenburns object-[center_35%]"
                            style={{filter: "brightness(1.18) contrast(1.1) saturate(1.12)"}}
                        />
                        {/* Overlays to keep text readable in light & dark */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Lighter global scrim */}
                            <div
                                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent dark:from-black/40 dark:via-black/25 dark:to-black/10"/>
                            {/* Radial scrim behind text */}
                            <div
                                className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(0,0,0,0.22),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_20%_30%,rgba(0,0,0,0.33),transparent_70%)]"/>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
                        <div className="max-w-3xl px-5 py-1 pb-6 pr-0 bg-[#fff4eb5c] rounded-2xl dark:bg-transparent">
                            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight"
                                style={{textShadow: "0 2px 8px rgba(0,0,0,0.35)"}}>
                                {t.hero.title}
                            </h1>
                            <p className="mt-3 text-lg md:text-xl text-slate-100/95 dark:text-slate-100">{t.hero.subtitle}</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href="#book"
                                    className="inline-flex items-center rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                                >
                                    {t.hero.ctaPrimary}
                                </a>
                                <a
                                    href={`https://wa.me/${PHONE}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open WhatsApp chat"
                                    className="inline-flex items-center gap-2 rounded-xl border border-amber-700 text-amber-700 dark:text-emerald-300 dark:border-emerald-300 px-5 py-3 font-semibold hover:bg-amber-50/60 dark:hover:bg-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                                >
                                    <IconTagine className="h-4 w-4"/> {t.hero.ctaSecondary}
                                </a>
                            </div>
                            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                                <Stat icon={<IconBed className="h-6 w-6 text-amber-700 dark:text-emerald-300"/>}
                                      label="Suites" value="5"/>
                                <Stat icon={<IconGuests className="h-6 w-6 text-amber-700 dark:text-emerald-300"/>}
                                      label="Guests" value="up to 15"/>
                                <Stat icon={<IconLeaf className="h-6 w-6 text-amber-700 dark:text-emerald-300"/>}
                                      label="Energy" value="Solar hot water"/>
                                <Stat icon={<IconPalm className="h-6 w-6 text-amber-700 dark:text-emerald-300"/>}
                                      label="Garden" value="Oasis orchard"/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SUITES */}
                <section id="suites" className="py-20 bg-amber-50/60 dark:bg-black/40">
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle kicker="Rooms" title={t.suites.title} subtitle={t.suites.note}/>
                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SUITES.map((s) => (
                                <article key={s.id}
                                         className="rounded-2xl border border-amber-200 dark:border-emerald-900 bg-white/80 dark:bg-black/40 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
                                    <div className="aspect-[4/3] overflow-hidden rounded-xl">
                                        <img src={s.img} alt={s.alt} loading="lazy" decoding="async"
                                             className="h-full w-full object-cover"
                                             sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"/>
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                                    <div
                                        className="mt-2 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <IconGuests className="h-4 w-4"/> {s.pax}
                                        <span>•</span>
                                        <IconBed className="h-4 w-4"/> {s.size} m²
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-xl font-extrabold">
                                            from {BAR.low} {CURRENCY}
                                            <span className="text-sm font-medium text-slate-500"> / night BB</span>
                                        </div>
                                        <a href="#rates"
                                           className="text-amber-700 dark:text-emerald-300 font-semibold hover:underline">
                                            See seasonal rates
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCES */}
                <section id="experiences" className="relative py-20">
                    {/* soft background pattern */}
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 opacity-[.65] dark:opacity-40"
                        style={{
                            backgroundImage:
                                "radial-gradient(60% 90% at 70% -10%, #EAF7FF 0%, transparent 60%), radial-gradient(50% 60% at 10% 30%, #FFF7EC 0%, transparent 60%)",
                        }}
                    />
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle title={t.experiences.title}/>

                        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {t.experiences.items.map((it, i) => {
                                const icon =
                                    i === 0 ? <IconSteam className="h-6 w-6"/> :
                                        i === 1 ? <IconTagine className="h-6 w-6"/> :
                                            i === 2 ? <IconHike className="h-6 w-6"/> :
                                                i === 3 ? <IconStars5 className="h-6 w-6"/> :
                                                    <IconPottery className="h-6 w-6"/>;
                                return (
                                    <div
                                        key={i}
                                        className="group rounded-3xl p-[1px] bg-gradient-to-br from-[#9EE5FF33] via-[#E7E0CF55] to-[#5C9E2B33] hover:from-[#9EE5FF66] hover:via-[#E7E0CF88] hover:to-[#5C9E2B66] transition"
                                    >
                                        <div
                                            className="rounded-3xl bg-white/85 dark:bg-slate-900/50 p-6 h-full shadow-sm group-hover:shadow-md transition">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="rounded-xl p-2 text-[#2C581F] dark:text-[#5C9E2B] bg-[#E0F1DA]/70 dark:bg-[#1C2C19]/50 ring-1 ring-[#B9D6AE]/60 dark:ring-[#1C2C19]">
                                                    {icon}
                                                </div>
                                                <h3 className="font-bold">{it.title}</h3>
                                            </div>
                                            <p className="mt-2 text-slate-700 dark:text-slate-300">{it.text}</p>
                                            <div className="mt-4">
                                                <Chip>{/* small tag hint for vibe */}slow travel</Chip>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* GALLERY */}
                <section id="gallery" className="py-20 bg-amber-50/60 dark:bg-black/40">
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle title={t.gallery.title} subtitle={t.gallery.note}/>
                        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {GALLERY.map((img, i) => (
                                <figure key={i}
                                        className="group relative overflow-hidden rounded-2xl border border-amber-200 dark:border-emerald-900 bg-white/70 dark:bg-slate-900/60 aspect-[4/3]">
                                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async"
                                         className="h-full w-full object-cover"/>
                                    <figcaption
                                        className="absolute bottom-0 left-0 right-0 p-3 text-sm bg-white/70 dark:bg-black/30 backdrop-blur opacity-0 group-hover:opacity-100 transition">
                                        {img.alt}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LOCATION */}
                <section id="location" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
                        <div>
                            <SectionTitle title={t.location.title} subtitle={t.location.body}/>
                            <div className="mt-6 flex gap-3">
                                <a
                                    href={GMAPS_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800"
                                >
                                    <IconPalm className="h-4 w-4"/> {t.location.openMaps}
                                </a>
                                <a
                                    href="#book"
                                    className="inline-flex items-center rounded-xl border border-amber-700 text-amber-700 dark:text-emerald-300 dark:border-emerald-300 px-5 py-3 font-semibold hover:bg-amber-50/60 dark:hover:bg-emerald-900/20"
                                >
                                    {LANG[lang].nav.book}
                                </a>
                            </div>
                        </div>
                        {/* Embedded map */}
                        <div
                            className="rounded-2xl border border-amber-200 dark:border-emerald-900 aspect-[4/3] overflow-hidden">
                            <iframe
                                src={GMAPS_EMBED_SRC}
                                title="Ikniouen map"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* BOOKING */}
                <section id="book" className="py-20 bg-amber-50/60 dark:bg-black/40">
                    <div className="max-w-3xl mx-auto px-4">
                        <SectionTitle title={t.booking.title} subtitle={t.booking.lead}/>
                        <form onSubmit={submitBooking} className="mt-10 grid sm:grid-cols-2 gap-4">
                            {/* Honeypot: hidden input for bots */}
                            <input
                                type="text"
                                name="website"
                                tabIndex="-1"
                                autoComplete="off"
                                className="hidden"
                                onChange={(e) => setForm({...form, website: e.target.value})}
                                value={form.website || ""}
                            />

                            {/* Visible fields */}
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.name}</span>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.email}</span>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.checkin}</span>
                                <input
                                    type="date"
                                    required
                                    value={form.in}
                                    onChange={(e) => setForm({...form, in: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.checkout}</span>
                                <input
                                    type="date"
                                    required
                                    value={form.out}
                                    onChange={(e) => setForm({...form, out: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.guests}</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={6}
                                    value={form.guests}
                                    onChange={(e) => setForm({...form, guests: Number(e.target.value)})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>
                            <label className="block sm:col-span-2">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.message}</span>
                                <textarea
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => setForm({...form, message: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>

                            {/* Challenge: human check */}
                            <label className="block sm:col-span-2">
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  To confirm you are human, please type <strong>Ikniouen</strong>
                                </span>
                                <input
                                    type="text"
                                    required
                                    value={form.challenge || ""}
                                    onChange={(e) => setForm({...form, challenge: e.target.value})}
                                    className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 px-3 py-2 dark:text-zinc-900"
                                />
                            </label>

                            <div className="sm:col-span-2 flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800"
                                >
                                    {t.booking.submit}
                                </button>
                                <a
                                    href={"https://wa.me/" + PHONE}
                                    target="_blank"
                                    className="text-amber-700 dark:text-emerald-300 font-semibold hover:underline"
                                >
                                    {t.booking.alt}
                                </a>
                            </div>
                        </form>
                    </div>
                </section>

                {/* RATES & PACKS */}
                <section id="rates" className="relative py-20">
                    {/* zellige-ish background wash */}
                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10"
                        style={{
                            backgroundImage:
                                "radial-gradient(60% 80% at 20% 0%, rgba(92,158,43,0.08), transparent 60%), radial-gradient(60% 80% at 80% 20%, rgba(158,229,255,0.15), transparent 60%)",
                        }}
                    />
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle
                            kicker="Pricing"
                            title="Rates & Packs"
                            subtitle="All room rates include breakfast (BB). Choose a season to preview prices."
                        />

                        {/* season toggle */}
                        <div
                            className="mt-6 inline-flex rounded-2xl border border-amber-200 dark:border-emerald-900 overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur">
                            {seasonKeys.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => setSeason(k)}
                                    className={`px-4 py-2 text-sm font-medium transition
            ${season === k
                                        ? "bg-[#E7E0CF] text-[#5E5433] dark:bg-[#1C2C19]/50 dark:text-[#C9C39E]"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10"}`}
                                >
                                    {SEASONS[k].label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">{SEASONS[season].months}</div>

                        {/* BAR cards */}
                        <div className="mt-8 grid md:grid-cols-3 gap-6">
                            {seasonKeys.map((k) => (
                                <div key={k}
                                     className={`rounded-3xl p-[1px] ${season === k ? "bg-gradient-to-br from-[#9EE5FF66] via-[#E7E0CF99] to-[#5C9E2B66]" : "bg-gradient-to-br from-transparent via-[#E7E0CF55] to-transparent"}`}>
                                    <div className="rounded-3xl bg-white/85 dark:bg-slate-900/50 p-6 h-full">
                                        <div
                                            className="text-sm uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                            {SEASONS[k].label}
                                        </div>
                                        <div
                                            className="mt-1 text-xs text-slate-500 dark:text-slate-400">{SEASONS[k].months}</div>
                                        <div className="mt-5 text-3xl font-extrabold">
                                            {fmtMAD(BAR[k])} <span className="text-sm font-medium text-slate-500">/ night (BB)</span>
                                        </div>
                                        <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">Base rate for 2
                                            guests
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* direct bonus */}
                        <div className="mt-6">
                            <Chip tone="gold">{DIRECT_BONUS}</Chip>
                        </div>

                        {/* rules & policies */}
                        <div className="mt-10 grid md:grid-cols-2 gap-6">
                            <div
                                className="rounded-3xl bg-white/85 dark:bg-slate-900/50 p-6 border border-amber-200 dark:border-emerald-900">
                                <h3 className="font-bold text-lg">Rules</h3>
                                <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                                    {RATE_RULES.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span
                                                className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-emerald-300"></span>
                                            <span><strong>{r.k}:</strong> {r.v}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div
                                className="rounded-3xl bg-white/85 dark:bg-slate-900/50 p-6 border border-amber-200 dark:border-emerald-900">
                                <h3 className="font-bold text-lg">Policies & extras</h3>
                                <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                                    {POLICIES.map((p, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span
                                                className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-emerald-300"></span>
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* packs */}
                        <div className="mt-12">
                            <h3 className="font-bold text-xl mb-4">Packs</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {PACKS.map((p, i) => {
                                    const price = p[season];
                                    return (
                                        <article key={i}
                                                 className="group rounded-3xl p-[1px] bg-gradient-to-br from-[#9EE5FF33] via-[#E7E0CF55] to-[#5C9E2B33] hover:from-[#9EE5FF66] hover:via-[#E7E0CF88] hover:to-[#5C9E2B66] transition">
                                            <div
                                                className="rounded-3xl bg-white/85 dark:bg-slate-900/50 p-6 h-full border border-transparent group-hover:border-white/30 dark:group-hover:border-white/10">
                                                <h4 className="font-bold">{p.title}</h4>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.inc}</p>
                                                <div className="mt-4 flex items-baseline gap-2">
                                                    <div className="text-2xl font-extrabold">{fmtMAD(price)}</div>
                                                    <div
                                                        className="text-xs text-slate-500 dark:text-slate-400">({SEASONS[season].label})
                                                    </div>
                                                </div>
                                                <a href="#book"
                                                   className="mt-4 inline-flex text-amber-700 dark:text-emerald-300 font-semibold hover:underline">
                                                    Ask about this pack
                                                </a>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        {/* upsells */}
                        <div className="mt-12">
                            <h3 className="font-bold text-xl mb-4">Services & activities (à la carte)</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {UPSELLS.map((u, i) => (
                                    <div key={i}
                                         className="flex items-center justify-between rounded-2xl border border-amber-200 dark:border-emerald-900 bg-white/80 dark:bg-black/40 px-4 py-3">
                                        <span className="text-slate-800 dark:text-slate-200">{u.t}</span>
                                        <span
                                            className="font-semibold text-amber-700 dark:text-emerald-300">{u.p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Floating "go to top" button */}
                {showTop && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Go to top"
                        className="fixed bottom-6 right-6 z-50 rounded-full bg-amber-700 text-white shadow-lg p-3
               hover:bg-amber-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </button>
                )}

                {/* FOOTER */}
                <footer className="py-10">
                    <div
                        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-700 dark:text-slate-50">© {new Date().getFullYear()} Gite
                            Ikniouen. {LANG[lang].footer.rights}</div>
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-50">
                            <IconYaz className="h-4 w-4 text-amber-700 dark:text-emerald-300"/> {LANG[lang].footer.made}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
