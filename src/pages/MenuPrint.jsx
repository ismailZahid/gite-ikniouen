import React, { useState } from "react";
import restauBg from "../assets/restau.png";
import { QRCodeCanvas } from "qrcode.react";


// ⵣ Amazigh symbol as inline SVG
function IconYazWatermark() {
    return (
        <svg viewBox="0 0 64 64" className="w-64 h-64 opacity-5 text-amber-700 absolute inset-0 m-auto">
            <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 11 Q32 38 49 22" />
                <path d="M10 46 Q32 26 54 50" />
                <path d="M32 8 V56" />
            </g>
        </svg>
    );
}

export default function MenuPrint() {
    const [lang, setLang] = useState("fr");

    const TEXTS = {
        fr: {
            title: "Cuisine du Terroir Amazigh",
            subtitle: "Plats mijotés, produits du jardin et saveurs authentiques de l’Anti-Atlas.",
            sections: {
                starters: "🫖 Entrées",
                mains: "🍲 Plats principaux",
                desserts: "🍮 Desserts",
                drinks: "☕ Boissons",
                menus: "💚 Menus & Formules",
            },
            footer: "© Gîte Ikniouen — Ikniouen, Tinghir • www.gite-ikniouen.com",
        },
        en: {
            title: "Amazigh Terroir Cuisine",
            subtitle: "Slow-cooked meals, garden produce, and authentic mountain flavors.",
            sections: {
                starters: "🫖 Starters",
                mains: "🍲 Main Courses",
                desserts: "🍮 Desserts",
                drinks: "☕ Drinks",
                menus: "💚 Menus & Combos",
            },
            footer: "© Gîte Ikniouen — Ikniouen, Tinghir • www.gite-ikniouen.com",
        },
        es: {
            title: "Cocina del Terruño Amazigh",
            subtitle: "Comidas a fuego lento, productos del huerto y sabores auténticos del Anti-Atlas.",
            sections: {
                starters: "🫖 Entrantes",
                mains: "🍲 Platos principales",
                desserts: "🍮 Postres",
                drinks: "☕ Bebidas",
                menus: "💚 Menús y Combos",
            },
            footer: "© Gîte Ikniouen — Ikniouen, Tinghir • www.gite-ikniouen.com",
        },
    };

    const menu = [
        {
            key: "starters",
            items: [
                ["Salade du potager", "Garden salad", "Ensalada del huerto", "45 MAD"],
                ["Zaalouk (aubergines grillées)", "Roasted eggplant dip", "Zaalouk (berenjena asada)", "45 MAD"],
                ["Harira traditionnelle", "Traditional Moroccan soup", "Harira tradicional", "40 MAD"],
                ["Pain beldi au feu de bois & huile d’olive", "Wood-fired bread & local olive oil", "Pan bereber al horno de leña y aceite de oliva local", "25 MAD"],
            ],
        },
        {
            key: "mains",
            items: [
                ["Tajine d’agneau aux pruneaux", "Lamb tagine with prunes", "Tajine de cordero con ciruelas", "110 MAD"],
                ["Tajine de poulet au citron confit et olives", "Chicken tagine with preserved lemon & olives", "Tajine de pollo con limón confitado y aceitunas", "95 MAD"],
                ["Couscous végétarien du potager", "Garden vegetable couscous", "Cuscús vegetariano del huerto", "85 MAD"],
                ["Brochettes du jour, salade et pain beldi", "Daily grilled skewers with salad & bread", "Pinchos del día con ensalada y pan bereber", "100 MAD"],
                ["Omelette berbère à la tomate", "Amazigh tomato omelet", "Tortilla bereber con tomate", "60 MAD"],
            ],
        },
        {
            key: "desserts",
            items: [
                ["Oranges à la cannelle", "Oranges with cinnamon", "Naranjas con canela", "30 MAD"],
                ["Pâtisseries marocaines assorties", "Moroccan pastries selection", "Dulces marroquíes variados", "40 MAD"],
                ["Yaourt au miel et amandes", "Yogurt with honey & almonds", "Yogur con miel y almendras", "35 MAD"],
                ["Fruits de saison du jardin", "Seasonal fruits from the garden", "Frutas de temporada del jardín", "25 MAD"],
            ],
        },
        {
            key: "drinks",
            items: [
                ["Thé à la menthe", "Moroccan mint tea", "Té con menta", "20 MAD"],
                ["Café berbère", "Amazigh coffee", "Café bereber", "20 MAD"],
                ["Jus d’orange frais", "Fresh orange juice", "Zumo de naranja natural", "25 MAD"],
                ["Eau minérale", "Mineral water", "Agua mineral", "15 MAD"],
            ],
        },
        {
            key: "menus",
            items: [
                ["Menu complet (Entrée + Plat + Dessert)", "Full menu (Starter + Main + Dessert)", "Menú completo (Entrada + Plato + Postre)", "130 MAD / pers."],
                ["Menu enfant (–12 ans)", "Child menu (–12 yrs)", "Menú infantil (–12 años)", "65 MAD / niño"],
            ],
        },
    ];

    const getItemText = (item) =>
        lang === "fr" ? item[0] : lang === "en" ? item[1] : item[2];

    return (
        <div
            className="relative font-serif text-slate-900 bg-white min-h-screen p-10 overflow-hidden"
            style={{
                backgroundImage: `url(${restauBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(255,255,255,0.9)",
            }}
        >
            {/* Watermark */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <IconYazWatermark />
            </div>

            {/* Language Selector */}
            <div className="text-right mb-6">
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="border border-amber-400 rounded-lg px-3 py-1 text-sm bg-white shadow-sm"
                >
                    <option value="fr">🇫🇷 FR</option>
                    <option value="en">🇬🇧 EN</option>
                    <option value="es">🇪🇸 ES</option>
                </select>
            </div>

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-10 relative z-10">
                <h1 className="text-4xl font-extrabold mb-2 text-amber-800">Gîte Ikniouen</h1>
                <h2 className="text-2xl font-semibold text-amber-700">{TEXTS[lang].title}</h2>
                <p className="mt-3 italic text-slate-600">{TEXTS[lang].subtitle}</p>
            </div>

            {/* Menu Sections */}
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                {menu.map((section) => (
                    <section key={section.key}>
                        <h3 className="text-xl font-bold text-amber-700 border-b border-amber-300 mb-2">
                            {TEXTS[lang].sections[section.key]}
                        </h3>
                        <ul className="space-y-1 text-lg">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{getItemText(item)}</span>
                                    <span className="font-semibold text-amber-700">{item[3]}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            {/* QR Code + Footer */}
            <footer className="text-center text-sm text-slate-700 mt-12 relative z-10">
                <div className="flex justify-center mb-2">
                    <QRCodeCanvas
                        value="https://ismailzahid.github.io/gite-ikniouen"
                        size={100}
                        bgColor="transparent"
                        fgColor="#92400E"
                    />
                </div>
                <p>{TEXTS[lang].footer}</p>
            </footer>
        </div>
    );
}
