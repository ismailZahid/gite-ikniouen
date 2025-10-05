import { useMemo } from "react";
import restauBg from "../assets/restau.png"; // adjust path if needed
import { IconTagine, IconLeaf, IconPalm } from "../icons";

export default function RestaurantSection({ lang = "en" }) {
    const texts = useMemo(() => ({
        en: {
            title: "Amazigh Terroir Cuisine",
            subtitle: "Slow-cooked meals, garden produce, and authentic mountain flavors.",
            sections: {
                starters: "Starters",
                mains: "Main Courses",
                sides: "Sides",
                desserts: "Desserts",
                drinks: "Drinks",
                menus: "Menus & Combos"
            },
            reserve: "Reserve a Table",
        },
        fr: {
            title: "Cuisine du Terroir Amazigh",
            subtitle: "Plats mijotés, produits du jardin et saveurs authentiques de l’Anti-Atlas.",
            sections: {
                starters: "Entrées",
                mains: "Plats principaux",
                sides: "Accompagnements",
                desserts: "Desserts",
                drinks: "Boissons",
                menus: "Menus & Formules"
            },
            reserve: "Réserver une Table",
        },
        es: {
            title: "Cocina del Terruño Amazigh",
            subtitle: "Comidas a fuego lento, productos del huerto y sabores auténticos del Anti-Atlas.",
            sections: {
                starters: "Entrantes",
                mains: "Platos principales",
                sides: "Acompañamientos",
                desserts: "Postres",
                drinks: "Bebidas",
                menus: "Menús y Combos"
            },
            reserve: "Reservar Mesa",
        },
    })[lang], [lang]);

    const menu = [
        {
            id: "starters",
            icon: <IconLeaf className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Salade du potager (selon saison)", en: "Garden salad (seasonal greens)", es: "Ensalada del huerto (según la temporada)", price: "45 MAD" },
                { fr: "Zaalouk (aubergines grillées)", en: "Roasted eggplant dip", es: "Zaalouk (berenjena asada)", price: "45 MAD" },
                { fr: "Harira traditionnelle", en: "Traditional Moroccan soup", es: "Harira tradicional", price: "40 MAD" },
                { fr: "Pain beldi au feu de bois & huile d’olive", en: "Wood-fired bread & local olive oil", es: "Pan bereber al horno de leña y aceite de oliva local", price: "25 MAD" },
            ]
        },
        {
            id: "mains",
            icon: <IconTagine className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Tajine d’agneau aux pruneaux", en: "Lamb tagine with prunes", es: "Tajine de cordero con ciruelas", price: "110 MAD" },
                { fr: "Tajine de poulet au citron confit et olives", en: "Chicken tagine with preserved lemon & olives", es: "Tajine de pollo con limón confitado y aceitunas", price: "95 MAD" },
                { fr: "Couscous végétarien du potager", en: "Garden vegetable couscous", es: "Cuscús vegetariano del huerto", price: "85 MAD" },
                { fr: "Brochettes du jour, salade et pain beldi", en: "Daily grilled skewers with salad & bread", es: "Pinchos del día con ensalada y pan bereber", price: "100 MAD" },
                { fr: "Omelette berbère à la tomate", en: "Amazigh tomato omelet", es: "Tortilla bereber con tomate", price: "60 MAD" },
            ]
        },
        {
            id: "sides",
            icon: <IconPalm className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Pain beldi maison", en: "Homemade rustic bread", es: "Pan bereber casero", price: "10 MAD" },
                { fr: "Légumes grillés", en: "Grilled vegetables", es: "Verduras a la parrilla", price: "25 MAD" },
                { fr: "Olives du verger", en: "Olives from our orchard", es: "Aceitunas del huerto", price: "15 MAD" },
            ]
        },
        {
            id: "desserts",
            icon: <IconLeaf className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Oranges à la cannelle", en: "Oranges with cinnamon", es: "Naranjas con canela", price: "30 MAD" },
                { fr: "Pâtisseries marocaines assorties", en: "Moroccan pastries selection", es: "Dulces marroquíes variados", price: "40 MAD" },
                { fr: "Yaourt au miel et amandes", en: "Yogurt with honey & almonds", es: "Yogur con miel y almendras", price: "35 MAD" },
                { fr: "Fruits de saison du jardin", en: "Seasonal fruits from the garden", es: "Frutas de temporada del jardín", price: "25 MAD" },
            ]
        },
        {
            id: "drinks",
            icon: <IconPalm className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Thé à la menthe", en: "Moroccan mint tea", es: "Té con menta", price: "20 MAD" },
                { fr: "Café berbère", en: "Amazigh coffee", es: "Café bereber", price: "20 MAD" },
                { fr: "Jus d’orange frais", en: "Fresh orange juice", es: "Zumo de naranja natural", price: "25 MAD" },
                { fr: "Eau minérale", en: "Mineral water", es: "Agua mineral", price: "15 MAD" },
            ]
        },
        {
            id: "menus",
            icon: <IconTagine className="h-5 w-5 text-amber-700 dark:text-emerald-300" />,
            items: [
                { fr: "Menu complet (Entrée + Plat + Dessert)", en: "Full menu (Starter + Main + Dessert)", es: "Menú completo (Entrada + Plato + Postre)", price: "130 MAD / pers." },
                { fr: "Menu enfant (–12 ans)", en: "Child menu (–12 yrs)", es: "Menú infantil (–12 años)", price: "65 MAD / niño" },
                { fr: "Dîner “à la carte” selon saison", en: "À la carte dinner (seasonal)", es: "Cena “a la carta” según la temporada", price: "—" },
            ]
        },
    ];

    return (
        <section id="restaurant" className="relative py-20 text-slate-900 dark:text-slate-100">
            {/* Background image */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <img
                    src={restauBg}
                    alt="Gîte Ikniouen restaurant background"
                    className="w-full h-full object-cover object-center"
                    style={{ filter: "brightness(0.8) contrast(1.05) saturate(1.1)" }}
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/90 dark:from-black/70 dark:via-black/40 dark:to-black/70" />
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-sm">{texts.title}</h2>
                    <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">{texts.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 backdrop-blur-sm bg-white/50 dark:bg-black/30 p-6 rounded-2xl shadow-md">
                    {menu.map((section) => (
                        <div key={section.id}>
                            <div className="flex items-center gap-2 mb-3">
                                {section.icon}
                                <h3 className="text-xl font-bold">{texts.sections[section.id]}</h3>
                            </div>
                            <ul className="space-y-2">
                                {section.items.map((it, i) => (
                                    <li key={i} className="flex justify-between border-b border-amber-200 dark:border-emerald-900 pb-1">
                                        <span className="text-slate-800 dark:text-slate-100">{it[lang]}</span>
                                        <span className="text-amber-700 dark:text-emerald-300 font-semibold">{it.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://wa.me/YOUR_PHONE_NUMBER"
                        target="_blank"
                        className="inline-flex items-center rounded-xl bg-amber-700 text-white px-6 py-3 font-semibold shadow hover:bg-amber-800"
                    >
                        🍲 {texts.reserve}
                    </a>
                </div>
            </div>
        </section>
    );
}
