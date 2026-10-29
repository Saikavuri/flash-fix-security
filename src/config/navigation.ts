export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

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
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Dome Cameras", href: "/products#dome" },
      { label: "Bullet Cameras", href: "/products#bullet" },
      { label: "IP Cameras", href: "/products#ip" },
      { label: "Wireless Cameras", href: "/products#wireless" },
      { label: "PTZ Cameras", href: "/products#ptz" },
      { label: "DVR & NVR", href: "/products#recorder" },
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
