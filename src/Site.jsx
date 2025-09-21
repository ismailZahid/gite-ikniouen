import {useEffect, useMemo, useState} from "react";
import {GALLERY} from './gallery';
import {ABOUT_CARDS} from './about-cards.js';
import {SUITES} from './suites.js';
import restauHero from './assets/restau.png';

// Five-point stars with twinkle (SMIL), optimized via <defs>/<use>
function StarField({className, count = 220, skyHeight = 60}) {
    const stars = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x: Math.random() * 1000,          // viewBox width
                y: Math.random() * skyHeight,     // only in the sky band (0..skyHeight)
                s: 0.9 + Math.random() * 1.6,     // scale (outer radius)
                rot: Math.random() * 360,         // random rotation
                d: 3 + Math.random() * 4,         // twinkle duration
                delay: Math.random() * 5,         // twinkle delay
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
            // subtle glow so tiny stars pop
            style={{filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))"}}
        >
            <defs>
                {/* Unit 5-point star centered at (0,0), outer radius 1, inner ~0.38 (nice proportions) */}
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
                    xlinkHref="#sf-star-5"    /* wider compatibility */
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
 * THEME + PALETTE *
 *******************/

const PALETTE = {
    sky: "#9ee5ff", // bright Anti-Atlas sky
    earth: "#9A8B67", // sunlit soil/terrace
    rock: "#5E5433", // warm mountain rock
    oasis: "#2C581F", // deep orchard green
    oasisLight: "#5C9E2B", // lighter leaf accent
    night: "#14181A"  // deep shade
};

/*******************
 * LOCALIZED STRINGS
 *******************/
const LANG = {
    en: {
        nav: {
            about: "About",
            suites: "Suites",
            experiences: "Experiences",
            gallery: "Gallery",
            location: "Location",
            book: "Book"
        },
        hero: {
            kicker: "ⵣ Amazigh hospitality in the Anti‑Atlas",
            title: "Gite Ikniouen",
            subtitle: "Berber rural lodge between Dadès & Drâa valleys — adobe walls, palm‑shaded patios, and star‑bright nights.",
            ctaPrimary: "Check availability",
            ctaSecondary: "WhatsApp us",
        },
        about: {
            title: "Authentic. Quiet. Low‑impact.",
            body:
                "Stone and earth architecture (tameghra), patios shaded with tamarisk, solar hot water and a garden‑to‑table kitchen. A small 5‑suite lodge for slow travel and stargazing.",
            bullets: [
                "5 suites • up to 15 guests",
                "Home‑made cuisine from our garden",
                "Solar energy • grey‑water for the orchard",
            ],
        },
        suites: {title: "Suites & Rates", note: "Early opening rates — breakfast included"},
        experiences: {
            title: "Experiences",
            items: [
                {title: "Hammam beldi", text: "Warm tadelakt walls, eucalyptus steam, slow rituals."},
                {title: "Garden‑to‑table cuisine", text: "Seasonal vegetables, local bread, tajines and couscous."},
                {title: "Atlas hikes & oases", text: "Half‑day to multi‑day treks with certified local guides."},
                {title: "Stargazing nights", text: "Dark sky, milky way, and tea by the fire."},
                {title: "Craft workshops", text: "Pottery, weaving and bread‑making with neighbors."},
            ],
        },
        gallery: {
            title: "Gallery (preview)",
            note: "Replace with your photos: garden, patio, rooms, hammam, night sky."
        },
        location: {
            title: "Where we are",
            body: "Ikniouen sits between the Dadès and Drâa valleys. 40min from Tinghir / 1h from Dra valley. After booking we share exact directions and a pin.",
            openMaps: "Open in Maps",
        },
        booking: {
            title: "Book your stay",
            lead: "Send us your dates and we'll confirm within hours.",
            name: "Name",
            email: "Email",
            checkin: "Check‑in",
            checkout: "Check‑out",
            guests: "Guests",
            message: "Message (optional)",
            submit: "Send request",
            alt: "Or write to us on WhatsApp",
        },
        footer: {rights: "All rights reserved.", made: "Made with ❤ in Ikniouen"},
    },
    fr: {
        nav: {
            about: "À propos",
            suites: "Suites",
            experiences: "Expériences",
            gallery: "Galerie",
            location: "Localisation",
            book: "Réserver"
        },
        hero: {
            kicker: "ⵣ Hospitalité amazighe dans l’Anti‑Atlas",
            title: "Gîte Ikniouen",
            subtitle: "Maison d’hôtes berbère entre Dadès et Drâa — murs en terre, patios ombragés de palmiers et nuits étoilées.",
            ctaPrimary: "Voir les disponibilités",
            ctaSecondary: "WhatsApp",
        },
        about: {
            title: "Authentique. Calme. À faible impact.",
            body:
                "Architecture en pierre et terre (tameghra), patios en tamaris, eau chaude solaire et cuisine du potager. Un petit gîte de 5 suites pour le slow‑tourisme.",
            bullets: [
                "5 suites • jusqu’à 15 personnes",
                "Cuisine maison du jardin",
                "Énergie solaire • eaux grises pour le verger",
            ],
        },
        suites: {title: "Suites & Tarifs", note: "Tarifs d’ouverture — petit‑déjeuner inclus"},
        experiences: {
            title: "Expériences",
            items: [
                {title: "Hammam beldi", text: "Murs en tadelakt, vapeur à l’eucalyptus, rituels lents."},
                {title: "Cuisine du potager", text: "Légumes de saison, pain au feu, tajines et couscous."},
                {title: "Randonnées Atlas & oasis", text: "De la demi‑journée au trek avec guides agréés."},
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
            about: "Acerca de",
            suites: "Suites",
            experiences: "Experiencias",
            gallery: "Galería",
            location: "Ubicación",
            book: "Reservar"
        },
        hero: {
            kicker: "ⵣ Hospitalidad amazigh en el Anti‑Atlas",
            title: "Gîte Ikniouen",
            subtitle: "Alojamiento rural bereber entre los valles Dadès y Drâa — muros de adobe, patios con palmeras y cielos estrellados.",
            ctaPrimary: "Ver disponibilidad",
            ctaSecondary: "WhatsApp",
        },
        about: {
            title: "Auténtico. Tranquilo. De bajo impacto.",
            body:
                "Arquitectura de piedra y tierra (tameghra), patios con tamariscos, agua caliente solar y cocina del huerto. Pequeño lodge con 5 suites para viajar despacio.",
            bullets: [
                "5 suites • hasta 15 huéspedes",
                "Cocina casera del huerto",
                "Energía solar • aguas grises para el huerto",
            ],
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
 * ICONS (inline SVG)
 *******************/
// Amazigh "ⵣ" (Yaz) — stroke version
function IconYaz({className}) {
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

function IconStar({className}) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <path d="M12 2l2.8 6h6.2l-5 3.8 1.9 6.2L12 15l-5.9 3 1.9-6.2-5-3.8h6.2L12 2z" fill="currentColor"/>
        </svg>
    );
}

// Replace your IconDunes with this mountains version
function IconDunes({className}) {
    return (
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className={className} aria-hidden>
            {/* back ridge */}
            <path
                d="M0 80 L60 60 L120 75 L180 58 L240 72 L300 50 L360 74 L420 56 L480 76 L540 62 L600 70 L660 60 L720 74 L780 66 L840 72 L900 64 L1000 70 V120 H0 Z"
                fill="currentColor"
            />
            {/* front ridge */}
            <path
                d="M0 96 L50 76 L100 90 L150 72 L200 92 L260 70 L320 94 L380 74 L440 96 L500 78 L560 92 L620 76 L680 94 L740 84 L800 92 L860 82 L920 90 L1000 96 V120 H0 Z"
                fill="currentColor"
            />
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
                className="uppercase tracking-widest text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">{kicker}</div>}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">{subtitle}</p>}
        </div>
    );
}

export default function Site() {
    /*******************
     * LANGUAGE
     *******************/
    const [lang, setLang] = useState("en");
    const t = useMemo(() => LANG[lang], [lang]);

    /*******************
     * THEME (fixes dark/light)
     *******************/
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });
    useEffect(() => {
        const root = document.documentElement; // apply to <html> for consistent Tailwind dark mode
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    /*******************
     * BOOKING FORM
     *******************/
    const [form, setForm] = useState({name: "", email: "", in: "", out: "", guests: 2, message: ""});

    function submitBooking(e) {
        e.preventDefault();
        const phone = "YOUR_PHONE_NUMBER"; // e.g. 2126XXXXXXXX (no +)
        const msg = `Booking request — ${form.name}
Email: ${form.email}
Check‑in: ${form.in}
Check‑out: ${form.out}
Guests: ${form.guests}
Message: ${form.message}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    }

    const suites = SUITES;

    return (
        <div>
            <div
                className="min-h-screen text-slate-900 dark:text-slate-100 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.7),rgba(246,231,216,0))] dark:bg-[radial-gradient(ellipse_at_top,rgba(11,16,32,1),rgba(15,118,110,0.25))]">
                {/* TOP DECOR — sky (light) / stars (dark) + full-bleed mountains */}
                <div className="pointer-events-none select-none relative overflow-hidden">
                    {/* reserve height */}
                    <div className="h-16 md:h-20 lg:h-24"/>

                    {/* Light-mode sky gradient (subtle blue) */}
                    <div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-0 block dark:hidden  bg-gradient-to-b from-[#D9F0FF] via-[#ECF7FF] to-transparent"
                    />

                    {/* Dark-mode stars */}
                    <StarField
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-10 hidden dark:block text-[#DDEBFF]"
                        count={60}
                    />

                    {/* Mountains on top */}
                    <IconDunes
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-16 md:h-20 lg:h-24 z-20 text-[#917E64]/70 dark:text-[#455799]/70"
                    />
                </div>

                {/* NAV */}
                <header
                    className="sticky top-0 z-50 backdrop-blur border-b border-amber-200/60 dark:border-emerald-900/60 bg-white/70 dark:bg-black/30">
                    <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                        <a href="#top" className="flex items-center gap-2 font-bold text-xl">
                            <IconYaz className="h-6 w-6 text-amber-700 dark:text-emerald-300"/> Gite Ikniouen
                        </a>
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <a href="#about"
                               className="hover:text-amber-700 dark:hover:text-emerald-300">{t.nav.about}</a>
                            <a href="#suites"
                               className="hover:text-amber-700 dark:hover:text-emerald-300">{t.nav.suites}</a>
                            <a href="#experiences"
                               className="hover:text-amber-700 dark:hover:text-emerald-300">{t.nav.experiences}</a>
                            <a href="#gallery"
                               className="hover:text-amber-700 dark:hover:text-emerald-300">{t.nav.gallery}</a>
                            <a href="#location"
                               className="hover:text-amber-700 dark:hover:text-emerald-300">{t.nav.location}</a>
                            <a href="#book"
                               className="hover:text-amber-700 dark:hover:text-emerald-300 font-semibold">{t.nav.book}</a>
                        </nav>
                        <div className="flex items-center gap-2">
                            <select
                                className="rounded-lg border border-amber-300 dark:border-emerald-700 bg-transparent px-2 py-1 text-sm"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                aria-label="Select language"
                            >
                                <option value="en">EN</option>
                                <option value="fr">FR</option>
                                <option value="es">ES</option>
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
                            className="h-full w-full object-cover kb-kenburns object-[center_35%]" // focus higher if needed
                            style={{filter: "brightness(1.15) contrast(1.08) saturate(1.12)"}}
                        />
                        {/* Overlays to keep text readable in light & dark */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Lighter global scrim */}
                            <div
                                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent dark:from-black/40 dark:via-black/25 dark:to-black/10"/>
                            {/* Radial scrim behind text (left/top area) for legibility */}
                            <div
                                className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,rgba(0,0,0,0.22),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_20%_30%,rgba(0,0,0,0.33),transparent_70%)]"/>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
                        <div className="max-w-3xl px-5 py-1 pb-6 pr-0 bg-[#fff4eb5c] rounded-2xl dark:bg-[#001f1d00]">
                            <h1
                                className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight"
                                style={{textShadow: "0 2px 8px rgba(0,0,0,0.35)"}}
                            >
                                {t.hero.title}
                            </h1>
                            <p className="mt-3 text-lg md:text-xl text-slate-700 dark:text-slate-300">{t.hero.subtitle}</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a href="#book"
                                   className="inline-flex items-center rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800">
                                    {t.hero.ctaPrimary}
                                </a>
                                <a
                                    href="https://wa.me/YOUR_PHONE_NUMBER"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-xl border border-amber-700 text-amber-700 dark:text-emerald-300 dark:border-emerald-300 px-5 py-3 font-semibold hover:bg-amber-50/60 dark:hover:bg-emerald-900/20"
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

                {/* ABOUT */}
                <section id="about" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionTitle title={t.about.title} subtitle={t.about.body}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {ABOUT_CARDS.map((it, i) => (
                                <figure
                                    key={i}
                                    className="group relative overflow-hidden rounded-2xl border border-amber-200 dark:border-emerald-900 aspect-[4/3] bg-amber-50 dark:bg-slate-900"
                                >
                                    {/* Photo */}
                                    <img
                                        src={it.src}
                                        alt={it.label}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    {/* Soft highlight overlay (optional, like before) */}
                                    <div
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.35),transparent_60%)] mix-blend-soft-light pointer-events-none"/>

                                    {/* Caption on hover */}
                                    <figcaption
                                        className="absolute bottom-0 left-0 right-0 p-3 text-sm bg-white/70 dark:bg-black/30 backdrop-blur opacity-0 group-hover:opacity-100 transition">
                                        {it.label}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SUITES */}
                <section id="suites" className="py-20 bg-amber-50/60 dark:bg-black/40">
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle kicker="Rooms" title={t.suites.title} subtitle={t.suites.note}/>
                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {suites.map((s) => (
                                <article key={s.id}
                                         className="rounded-2xl border border-amber-200 dark:border-emerald-900 bg-white/80 dark:bg-black/40 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
                                    <div className="aspect-[4/3] overflow-hidden rounded-xl">
                                        <img
                                            src={s.img}
                                            alt={s.alt}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold">{s.name}</h3>
                                    <div
                                        className="mt-2 flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <IconGuests className="h-4 w-4"/> {s.pax}
                                        <span>•</span>
                                        <IconBed className="h-4 w-4"/> {s.size} m²
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-xl font-extrabold">{s.rate} {CURRENCY}<span
                                            className="text-sm font-medium text-slate-500"> / night</span></div>
                                        <a href="#book"
                                           className="text-amber-700 dark:text-emerald-300 font-semibold hover:underline">{LANG[lang].nav.book}</a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCES */}
                <section id="experiences" className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <SectionTitle title={t.experiences.title}/>
                        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {t.experiences.items.map((it, i) => (
                                <div key={i}
                                     className="rounded-2xl border border-amber-200 dark:border-emerald-900 p-6 bg-white/80 dark:bg-black/40">
                                    <div className="flex items-center gap-3">
                                        <IconTagine className="h-5 w-5 text-amber-700 dark:text-emerald-300"/>
                                        <h3 className="font-bold">{it.title}</h3>
                                    </div>
                                    <p className="mt-2 text-slate-700 dark:text-slate-300">{it.text}</p>
                                </div>
                            ))}
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
                                    <img src={img.src} alt={img.alt} loading="lazy"
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
                                    href="MAP_LINK_HERE"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800"
                                >
                                    <IconPalm className="h-4 w-4"/> {t.location.openMaps}
                                </a>
                                <a href="#book"
                                   className="inline-flex items-center rounded-xl border border-amber-700 text-amber-700 dark:text-emerald-300 dark:border-emerald-300 px-5 py-3 font-semibold hover:bg-amber-50/60 dark:hover:bg-emerald-900/20">
                                    {LANG[lang].nav.book}
                                </a>
                            </div>
                        </div>
                        <div
                            className="rounded-2xl border border-amber-200 dark:border-emerald-900 aspect-[4/3] bg-gradient-to-tr from-amber-100 to-amber-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-500">
                            Map preview
                        </div>
                    </div>
                </section>

                {/* BOOKING */}
                <section id="book" className="py-20 bg-amber-50/60 dark:bg-black/40">
                    <div className="max-w-3xl mx-auto px-4">
                        <SectionTitle title={t.booking.title} subtitle={t.booking.lead}/>
                        <form onSubmit={submitBooking} className="mt-10 grid sm:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.name}</span>
                                <input required value={form.name}
                                       onChange={(e) => setForm({...form, name: e.target.value})}
                                       className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.email}</span>
                                <input type="email" required value={form.email}
                                       onChange={(e) => setForm({...form, email: e.target.value})}
                                       className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.checkin}</span>
                                <input type="date" required value={form.in}
                                       onChange={(e) => setForm({...form, in: e.target.value})}
                                       className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.checkout}</span>
                                <input type="date" required value={form.out}
                                       onChange={(e) => setForm({...form, out: e.target.value})}
                                       className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <label className="block">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.guests}</span>
                                <input type="number" min={1} max={6} value={form.guests}
                                       onChange={(e) => setForm({...form, guests: Number(e.target.value)})}
                                       className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <label className="block sm:col-span-2">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{t.booking.message}</span>
                                <textarea rows={4} value={form.message}
                                          onChange={(e) => setForm({...form, message: e.target.value})}
                                          className="mt-1 w-full rounded-xl border border-amber-300 dark:border-emerald-700 bg-white/80 dark:bg-black/40 px-3 py-2"/>
                            </label>
                            <div className="sm:col-span-2 flex items-center gap-3">
                                <button type="submit"
                                        className="rounded-xl bg-amber-700 text-white px-5 py-3 font-semibold shadow hover:bg-amber-800">{t.booking.submit}</button>
                                <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank"
                                   className="text-amber-700 dark:text-emerald-300 font-semibold hover:underline">{t.booking.alt}</a>
                            </div>
                        </form>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-10">
                    <div
                        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-700 dark:text-slate-400">© {new Date().getFullYear()} Gite
                            Ikniouen. {LANG[lang].footer.rights}</div>
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-400">
                            <IconYaz className="h-4 w-4 text-amber-700 dark:text-emerald-300"/> {LANG[lang].footer.made}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
