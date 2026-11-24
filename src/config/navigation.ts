export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Enquiry form anchor — homepage only. */
export const homeQuoteHref = "/#quote";

/** Enquiry form anchor — dedicated contact page. */
export const contactQuoteHref = "/contact#quote";

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "CCTV Installation", href: "/services#installation" },
      { label: "Product Supply", href: "/services#supply" },
      { label: "Repair & Troubleshooting", href: "/services#repair" },
      { label: "System Upgrades", href: "/services#upgrades" },
      { label: "AMC & Maintenance", href: "/services#maintenance" },
      { label: "Biometric", href: "/services#biometric" },
      { label: "Access Control", href: "/services#access-control" },
      { label: "Fire Alarm", href: "/services#fire-alarm" },
      { label: "Smoke Sensors", href: "/services#smoke-sensors" },
      { label: "Panic Switch", href: "/services#panic-switch" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Dome Cameras", href: "/products#dome-camera" },
      { label: "Bullet Cameras", href: "/products#bullet-camera" },
      { label: "IP Cameras", href: "/products#ip-camera" },
      { label: "Wireless Cameras", href: "/products#wireless-camera" },
      { label: "Solar Cameras", href: "/products#solar-camera" },
      { label: "PTZ Cameras", href: "/products#ptz-camera" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Solutions", href: "/solutions" },
      {label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
