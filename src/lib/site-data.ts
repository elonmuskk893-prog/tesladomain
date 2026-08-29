import model3Asset from "@/assets/model3.jpg.asset.json";
import modelyAsset from "@/assets/modely.jpg.asset.json";
import modelsAsset from "@/assets/models.jpg.asset.json";
import modelxAsset from "@/assets/modelx.jpg.asset.json";
import cybertruckAsset from "@/assets/cybertruck.jpg.asset.json";
import roadsterAsset from "@/assets/roadster.jpg.asset.json";

const model3 = model3Asset.url;
const modely = modelyAsset.url;
const models = modelsAsset.url;
const modelx = modelxAsset.url;
const cybertruck = cybertruckAsset.url;
const roadster = roadsterAsset.url;

export type CarTheme =
  | "navy"
  | "blue"
  | "maroon"
  | "forest"
  | "violet"
  | "charcoal"
  | "teal"
  | "indigo";

export type Car = {
  id: string;
  name: string;
  kicker: string;
  year: string;
  image: string;
  power: string;
  range: string;
  delivery: string;
  fee: number;
  badge: string;
  badgeTone: "gold" | "blue" | "purple" | "green" | "amber" | "cyan" | "pink";
  theme: CarTheme;
  category: string;
};

export const CARS: Car[] = [
  { id: "model-3", name: "Tesla Model 3", kicker: "Performance Sedan", year: "2025 Model", image: model3, power: "510 hp Dual Motor", range: "358 mi Range", delivery: "7–10 Business Days", fee: 299, badge: "🏆 Most Popular", badgeTone: "gold", theme: "navy", category: "Electric Sedan" },
  { id: "model-y", name: "Tesla Model Y", kicker: "Premium SUV", year: "2025 Model", image: modely, power: "384 hp Electric", range: "330 mi Range", delivery: "5–7 Business Days", fee: 349, badge: "⚡ Express Delivery", badgeTone: "blue", theme: "blue", category: "Electric SUV" },
  { id: "model-s", name: "Tesla Model S", kicker: "Luxury Flagship", year: "2025 Model", image: models, power: "670 hp Tri Motor", range: "405 mi Range", delivery: "3–5 Business Days", fee: 399, badge: "💎 Premium", badgeTone: "purple", theme: "maroon", category: "Luxury Sedan" },
  { id: "model-x", name: "Tesla Model X", kicker: "Luxury SUV", year: "2025 Model", image: modelx, power: "670 hp Tri Motor", range: "348 mi Range", delivery: "10–14 Business Days", fee: 249, badge: "💚 Best Value", badgeTone: "green", theme: "forest", category: "Luxury SUV" },
  { id: "cybertruck", name: "Tesla Cybertruck", kicker: "Electric Truck", year: "2025 Model", image: cybertruck, power: "845 hp Tri Motor", range: "340 mi Range", delivery: "5–8 Business Days", fee: 379, badge: "🔥 New Arrival", badgeTone: "amber", theme: "violet", category: "Electric Truck" },
  { id: "roadster", name: "Tesla Roadster", kicker: "Ultra Performance", year: "2025 Model", image: roadster, power: "1000+ hp Electric", range: "620 mi Range", delivery: "3–5 Business Days", fee: 499, badge: "👑 Ultra Luxury", badgeTone: "gold", theme: "charcoal", category: "Sports Car" },
  { id: "model-3-sr", name: "Tesla Model 3 SR", kicker: "Standard Range", year: "2025 Model", image: model3, power: "283 hp RWD", range: "272 mi Range", delivery: "10–14 Business Days", fee: 199, badge: "🏙 City Special", badgeTone: "cyan", theme: "teal", category: "Electric Sedan" },
  { id: "model-y-lr", name: "Tesla Model Y LR", kicker: "Long Range SUV", year: "2025 Model", image: modely, power: "384 hp AWD", range: "330 mi Range", delivery: "7–10 Business Days", fee: 329, badge: "👨‍👩‍👧 Family Pick", badgeTone: "pink", theme: "indigo", category: "Electric SUV" },
  { id: "model-s-plaid", name: "Tesla Model S Plaid", kicker: "Performance Sedan", year: "2025 Model", image: models, power: "1020 hp Tri Motor", range: "396 mi Range", delivery: "5–7 Business Days", fee: 359, badge: "⭐ Top Rated", badgeTone: "amber", theme: "charcoal", category: "Luxury Sedan" },
];

export type DeliveryOption = { id: string; name: string; price: number; blurb: string; eta: string };

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", name: "Standard Delivery", price: 0, blurb: "Standard international shipping & customs clearance", eta: "10–14 business days" },
  { id: "express", name: "Express Delivery", price: 50, blurb: "Priority shipping with real-time tracking updates", eta: "5–7 business days" },
  { id: "premium", name: "Premium Delivery", price: 100, blurb: "Fastest dispatch, white-glove doorstep delivery", eta: "3–5 business days" },
];

export const TRUST_ITEMS = [
  { icon: "🛡", label: "Verified Official Event" },
  { icon: "🔒", label: "256-bit SSL Secured" },
  { icon: "⚡", label: "Smart Contract Powered" },
  { icon: "✅", label: "10,000+ Paid Out" },
];

export const TOAST_PEOPLE = [
  { name: "Sara F.", flag: "🇩🇰", country: "Denmark", car: "Tesla Roadster", fee: 499 },
  { name: "James O.", flag: "🇺🇸", country: "USA", car: "Tesla Model 3", fee: 299 },
  { name: "Lars E.", flag: "🇸🇪", country: "Sweden", car: "Tesla Cybertruck", fee: 379 },
  { name: "Carlos R.", flag: "🇲🇽", country: "Mexico", car: "Tesla Model S", fee: 399 },
  { name: "Olga P.", flag: "🇵🇱", country: "Poland", car: "Tesla Model X", fee: 249 },
  { name: "Raj P.", flag: "🇮🇳", country: "India", car: "Tesla Model Y", fee: 349 },
  { name: "Thomas B.", flag: "🇧🇪", country: "Belgium", car: "Tesla Model S Plaid", fee: 359 },
  { name: "Kevin O.", flag: "🇰🇪", country: "Kenya", car: "Tesla Model X", fee: 249 },
  { name: "Mei L.", flag: "🇸🇬", country: "Singapore", car: "Tesla Model Y", fee: 349 },
  { name: "Ingrid H.", flag: "🇳🇴", country: "Norway", car: "Tesla Model Y LR", fee: 329 },
];

export const COMMENTS = [
  { initials: "MJ", tone: "bg-info", name: "Mike Johnson", flag: "🇺🇸", ago: "2 days ago", pinned: true, text: "Just received my Tesla Model 3 2025! I paid the delivery fee and within 9 days the car was at my door. This is REAL! 🚗⚡", likes: "48.2K" },
  { initials: "SW", tone: "bg-brand", name: "Sarah Williams", flag: "🇬🇧", ago: "1 day ago", text: "I received my Tesla Model Y 2025 after paying the delivery fee. I cried when I saw the car parked outside! 🙏", likes: "32.4K" },
  { initials: "CM", tone: "bg-success", name: "Carlos Mendez", flag: "🇲🇽", ago: "3 days ago", text: "From Mexico! I received my Tesla Model 3 2025 after paying the delivery fee. This giveaway is 100% real.", likes: "29.2K" },
  { initials: "DC", tone: "bg-model-violet", name: "David Chen", flag: "🇨🇳", ago: "2 days ago", text: "I was skeptical at first but I paid the delivery fee and received my Tesla Model S 2025. So real!", likes: "26.1K" },
  { initials: "AO", tone: "bg-warning", name: "Amara Osei", flag: "🇬🇭", ago: "1 day ago", text: "From Ghana 🇬🇭 I paid the delivery fee and received my Tesla Model 3 2025! God bless Tesla!", likes: "24K" },
  { initials: "RM", tone: "bg-brand-strong", name: "Ryan Mitchell", flag: "🇺🇸", ago: "12 hours ago", text: "Texas represent! 🇺🇸 Tesla Model 3 delivered to my doorstep. This is legit people!", likes: "15.7K" },
  { initials: "EP", tone: "bg-info", name: "Elena Popova", flag: "🇷🇺", ago: "1 day ago", text: "Russia 🇷🇺 Got my Tesla Model 3 yesterday! The quality is amazing. Thank you Tesla! ❤️", likes: "12.3K" },
  { initials: "AH", tone: "bg-success", name: "Ahmed Hassan", flag: "🇪🇬", ago: "3 hours ago", text: "Egypt 🇪🇬 I couldn't believe it but my Tesla Model S is here! Paid delivery and it came fast!", likes: "9.9K" },
  { initials: "MS", tone: "bg-model-indigo", name: "Maria Santos", flag: "🇧🇷", ago: "6 hours ago", text: "Brazil 🇧🇷 Recebi meu Tesla Model 3! Paguei a taxa e chegou em 5 dias. É real! 🚗", likes: "8.5K" },
  { initials: "KT", tone: "bg-model-teal", name: "Kenji Tanaka", flag: "🇯🇵", ago: "2 days ago", text: "Japan 🇯🇵 Tesla Model 3 2025 delivered! The electric range is incredible. Best giveaway ever!", likes: "7.2K" },
];

export const TESTIMONIALS = [
  { initial: "Y", name: "Yuki H.", flag: "🇯🇵", country: "Japan", quote: "Tesla Model Y delivered to Tokyo! The autopilot feature is incredible. Best car I've ever owned! テスラ最高！", received: "Tesla Model Y 2025" },
  { initial: "M", name: "Marcus T.", flag: "🇺🇸", country: "USA", quote: "Paid the delivery fee on a Monday, car showed up the following week. Tesla really did this. Unreal experience.", received: "Tesla Model 3 2025" },
  { initial: "A", name: "Aisha M.", flag: "🇦🇪", country: "UAE", quote: "The Model S Plaid arrived in Dubai in perfect condition. Customs was handled entirely by Tesla logistics.", received: "Tesla Model S Plaid 2025" },
  { initial: "P", name: "Pedro G.", flag: "🇧🇷", country: "Brazil", quote: "I only paid the shipping cost. The Cybertruck is now parked in São Paulo. Everyone on my street came to look!", received: "Tesla Cybertruck 2025" },
  { initial: "N", name: "Nadia K.", flag: "🇩🇪", country: "Germany", quote: "Fantastisch! My Model X was delivered in 6 days after payment. The falcon-wing doors are stunning.", received: "Tesla Model X 2025" },
];

export const HOW_STEPS = [
  { n: "01", title: "Enter Your Details", body: "Enter your name, delivery address, and contact information so Tesla can ship your car directly to you." },
  { n: "02", title: "Choose Your Tesla Car", body: "Select your preferred Tesla model: Model 3, Model Y, Model S, or Model X — all brand new!" },
  { n: "03", title: "Pay Delivery Fee", body: "Pay the small one-time delivery fee to cover shipping and logistics. This is the only fee required." },
  { n: "04", title: "Receive Your Tesla Car", body: "Your brand new Tesla electric car will be delivered to your door within 7–14 business days. Enjoy!" },
];

export const LIVE_DELIVERIES = [
  { name: "Ingrid H.", flag: "🇳🇴", country: "Norway", car: "Tesla Model Y LR · Vehicle en route 🚗", fee: 329, ago: "53 min ago" },
  { name: "Amara N.", flag: "🇿🇦", country: "South Africa", car: "Tesla Model 3 · Shipment confirmed ✓", fee: 299, ago: "57 min ago" },
  { name: "Thomas B.", flag: "🇧🇪", country: "Belgium", car: "Tesla Model X · Shipment confirmed ✓", fee: 249, ago: "3 min ago" },
  { name: "Amara N.", flag: "🇿🇦", country: "South Africa", car: "Tesla Model 3 SR · Shipment confirmed ✓", fee: 199, ago: "8 min ago" },
  { name: "Ingrid H.", flag: "🇳🇴", country: "Norway", car: "Tesla Model Y · Vehicle en route 🚗", fee: 349, ago: "14 min ago" },
  { name: "Liam M.", flag: "🇮🇪", country: "Ireland", car: "Tesla Roadster · Delivery confirmed", fee: 499, ago: "20 min ago" },
  { name: "Kenji T.", flag: "🇯🇵", country: "Japan", car: "Tesla Model 3 · Shipment confirmed ✓", fee: 299, ago: "31 min ago" },
];

export const SOCIALS = [
  { name: "Tesla Official", handle: "@Tesla · Official Account", brand: "x" as const, followers: "28.4M followers", label: "Official Tesla X account.", url: "https://x.com/tesla?s=21", accent: "bg-black text-white" },
  { name: "Tesla", handle: "@Tesla", brand: "facebook" as const, followers: "14.2M likes", label: "Official Tesla Facebook page.", url: "https://www.facebook.com/share/1BiupCjt4G/?mibextid=wwXIfr", accent: "bg-[oklch(0.5_0.18_252)] text-white" },
  { name: "Tesla", handle: "@teslamotors", brand: "instagram" as const, followers: "12.8M followers", label: "Official Tesla Instagram.", url: "https://www.instagram.com/teslamotors?igsi=dzRkOHh2Z3ozNDRj", accent: "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 text-white" },
];


export const BADGE_STYLES: Record<Car["badgeTone"], string> = {
  gold: "bg-amber-100 text-amber-800",
  blue: "bg-sky-100 text-sky-800",
  purple: "bg-violet-100 text-violet-800",
  green: "bg-emerald-100 text-emerald-800",
  amber: "bg-orange-100 text-orange-800",
  cyan: "bg-cyan-100 text-cyan-800",
  pink: "bg-pink-100 text-pink-800",
};

export const THEME_STYLES: Record<CarTheme, string> = {
  navy: "bg-model-navy",
  blue: "bg-model-blue",
  maroon: "bg-model-maroon",
  forest: "bg-model-forest",
  violet: "bg-model-violet",
  charcoal: "bg-model-charcoal",
  teal: "bg-model-teal",
  indigo: "bg-model-indigo",
};
