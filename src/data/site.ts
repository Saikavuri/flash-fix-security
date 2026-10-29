import type { LucideIcon } from "lucide-react";
import {
  Wrench,
  Package,
  LifeBuoy,
  RefreshCw,
  ShieldCheck,
  Truck,
  Headset,
  Camera,
  Monitor,
  HardDrive,
  Radio,
} from "lucide-react";

/* ==========================================================================
   Services
   ========================================================================== */

export type Service = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  highlights: string[];
  /** Contextual WhatsApp message for this service. */
  whatsappContext: string;
};

export const services: Service[] = [
  {
    id: "installation",
    index: "01",
    title: "CCTV Installation",
    shortTitle: "Installation",
    summary:
      "End-to-end camera installation for homes, shops, offices and industrial sites — planned, cabled and commissioned on site.",
    description:
      "We survey the property, map camera positions against actual sightlines and lighting, then run concealed cabling, mount and align every unit, and finally configure recording, remote access and mobile viewing so the system is genuinely usable from day one.",
    image: "/images/services/installation.jpg",
    imageAlt: "Technician mounting a security camera on a building facade",
    icon: Wrench,
    highlights: [
      "Site survey and camera placement plan",
      "Concealed cabling and weather-secure mounting",
      "Remote viewing set up on your phone",
    ],
    whatsappContext: "I'd like a CCTV installation quote",
  },
  {
    id: "supply",
    index: "02",
    title: "Product Supply",
    shortTitle: "Supply",
    summary:
      "Genuine cameras, recorders and accessories — matched to your site, not to a shelf.",
    description:
      "Supply only, or supply and install. We help you choose the camera type, lens, channel count and recording capacity that actually fit the property and the footage you need to keep, then deliver and install if you want us to.",
    image: "/images/services/supply.jpg",
    imageAlt: "Shelves of boxed CCTV cameras and recorders in a supply store",
    icon: Package,
    highlights: [
      "Dome, bullet, IP, wireless and PTZ ranges",
      "DVR and NVR systems with accessories",
      "Guidance on channel count and storage",
    ],
    whatsappContext: "I'm interested in CCTV product supply",
  },
  {
    id: "repair",
    index: "03",
    title: "Repair & Troubleshooting",
    shortTitle: "Repair",
    summary:
      "Diagnostics and repair for cameras, recorders and cabling — including systems installed by other vendors.",
    description:
      "No footage, distorted image, dropped recording, storage failure or a camera offline: we diagnose the fault, replace failed components and re-tune the system so it records reliably again. We service third-party installations too.",
    image: "/images/services/repair.jpg",
    imageAlt: "Close-up of a technician servicing a camera wiring loom",
    icon: LifeBuoy,
    highlights: [
      "On-site diagnosis of camera and recorder faults",
      "Cable, power and connector replacement",
      "Systems installed by other vendors serviced",
    ],
    whatsappContext: "I need a CCTV repair visit",
  },
  {
    id: "upgrades",
    index: "04",
    title: "System Upgrades",
    shortTitle: "Upgrades",
    summary:
      "Move an ageing analogue or low-resolution system to a modern IP setup without avoidable disruption.",
    description:
      "We audit what you have today, then design the migration: camera bodies, cabling, NVR or DVR capacity, storage and remote access. You get a clear picture of what changes, what is reused and what it costs before anything is touched.",
    image: "/images/services/upgrades.jpg",
    imageAlt: "Technician replacing an older camera with a modern network camera",
    icon: RefreshCw,
    highlights: [
      "Audit of existing equipment and cabling",
      "Phased migration with minimal disruption",
      "Storage and retention planning",
    ],
    whatsappContext: "I'd like to upgrade my existing CCTV system",
  },
  {
    id: "maintenance",
    index: "05",
    title: "AMC & Maintenance",
    shortTitle: "Maintenance",
    summary:
      "Planned preventive maintenance and annual maintenance contracts that keep recordings clean and systems online.",
    description:
      "Cameras drift, connectors corrode, storage fills, lenses fog and recordings stop without warning. Scheduled maintenance visits clean lenses, check alignment, verify recording and storage health, tighten connections and fault-fix proactively — before a customer or incident needs the footage.",
    image: "/images/services/maintenance.jpg",
    imageAlt: "Engineer cleaning and re-aligning a dome camera during a maintenance visit",
    icon: ShieldCheck,
    highlights: [
      "Scheduled preventive maintenance visits",
      "Recording, storage and backup health checks",
      "Priority response under AMC terms",
    ],
    whatsappContext: "I'd like to discuss an AMC / maintenance plan",
  },
];

/* ==========================================================================
   Service pillars (short, for the trust strip)
   ========================================================================== */

export const servicePillars = [
  {
    icon: Truck,
    title: "Supply & Install",
    copy: "Equipment and installation handled by one team — one point of responsibility.",
  },
  {
    icon: Camera,
    title: "Every Camera Type",
    copy: "Dome, bullet, IP, wireless and PTZ, matched to the location.",
  },
  {
    icon: Headset,
    title: "Single Point of Contact",
    copy: "One number for new installations, repairs and maintenance.",
  },
];

/* ==========================================================================
   Products
   ========================================================================== */

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export type ProductCategory =
  | "cameras"
  | "ip"
  | "wireless"
  | "ptz"
  | "recorder";

export const productCategories: {
  id: ProductCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "cameras", label: "Dome & Bullet" },
  { id: "ip", label: "IP / Network" },
  { id: "wireless", label: "Wireless" },
  { id: "ptz", label: "PTZ" },
  { id: "recorder", label: "DVR & NVR" },
];

export const products: Product[] = [
  {
    id: "dome-camera",
    name: "Dome Cameras",
    category: "cameras",
    tagline: "Discreet indoor coverage",
    description:
      "Ceiling and wall-mounted dome units for corridors, offices, shops and lobbies where a visible camera should still look unobtrusive.",
    image: "/images/products/dome.jpg",
    imageAlt: "White dome security camera mounted on a ceiling",
    icon: Camera,
  },
  {
    id: "bullet-camera",
    name: "Bullet Cameras",
    category: "cameras",
    tagline: "Long-range, weather-ready",
    description:
      "Long-bodied outdoor cameras for perimeter walls, gates, corridors and open yards, built to read at distance and hold up in weather.",
    image: "/images/products/bullet.jpg",
    imageAlt: "Bullet-style outdoor security camera on a bracket",
    icon: Camera,
  },
  {
    id: "ip-camera",
    name: "IP / Network Cameras",
    category: "ip",
    tagline: "One cable, one network",
    description:
      "Network cameras that carry power and data over a single run, giving higher detail and direct NVR or network recording.",
    image: "/images/products/ip.jpg",
    imageAlt: "Network dome camera with a wired connection into a recorder",
    icon: Radio,
  },
  {
    id: "wireless-camera",
    name: "Wireless Cameras",
    category: "wireless",
    tagline: "Retrofit without rewiring",
    description:
      "Wi-Fi cameras suited to finished interiors and heritage façades where running new cable is impractical.",
    image: "/images/products/wireless.jpg",
    imageAlt: "Compact wireless security camera on a shelf",
    icon: Radio,
  },
  {
    id: "ptz-camera",
    name: "PTZ Cameras",
    category: "ptz",
    tagline: "Pan, tilt, and track",
    description:
      "Pan-tilt-zoom units for car parks, lobbies and large halls, where one controllable camera covers a wide area.",
    image: "/images/products/ptz.jpg",
    imageAlt: "PTZ dome camera in a dark lobby",
    icon: Camera,
  },
  {
    id: "dvr",
    name: "DVR Systems",
    category: "recorder",
    tagline: "Analogue recording, simplified",
    description:
      "Digital video recorders for standard camera sets, with straightforward channel management and local storage.",
    image: "/images/products/dvr.jpg",
    imageAlt: "Digital video recorder with hard drive bays",
    icon: HardDrive,
  },
  {
    id: "nvr",
    name: "NVR Systems",
    category: "recorder",
    tagline: "Network-first recording",
    description:
      "Network video recorders for IP camera sets, supporting remote viewing and centralised, higher-capacity storage.",
    image: "/images/products/nvr.jpg",
    imageAlt: "Network video recorder unit with connected network cameras",
    icon: Monitor,
  },
  {
    id: "accessories",
    name: "Storage & Accessories",
    category: "recorder",
    tagline: "Capacity, power and mounting",
    description:
      "Surveillance hard drives, power supplies, brackets, junction boxes and cabling to complete a reliable installation.",
    image: "/images/products/accessories.jpg",
    imageAlt: "Surveillance hard drive and mounting accessories laid out",
    icon: HardDrive,
  },
];

/* ==========================================================================
   Solutions by property type
   ========================================================================== */

export type Solution = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  points: string[];
  /** Layout weight — drives the asymmetric grid. */
  span: "wide" | "tall" | "standard";
};

export const solutions: Solution[] = [
  {
    id: "homes",
    title: "Homes",
    description:
      "Coverage of entry points, gates and boundary walls without intruding on the home, with a single app for the family.",
    image: "/images/solutions/home.jpg",
    imageAlt: "Modern residential house exterior at dusk",
    points: ["Gate and entry coverage", "Living-area monitoring", "App access for the family"],
    span: "tall",
  },
  {
    id: "apartments",
    title: "Apartments",
    description:
      "Compact systems for flats and high-rises — lobby, corridor and parking coverage that respect shared walls and access controls.",
    image: "/images/solutions/apartment.jpg",
    imageAlt: "Contemporary apartment building lobby",
    points: ["Lobby and corridor cameras", "Parking and ramp coverage", "Minimal cabling footprint"],
    span: "standard",
  },
  {
    id: "shops",
    title: "Shops & Retail",
    description:
      "Counter, entrance and stockroom coverage that helps settle disputes and keeps an eye on high-traffic hours.",
    image: "/images/solutions/shop.jpg",
    imageAlt: "Retail shop interior with a counter and shelving",
    points: ["Counter and till coverage", "Entrance and queue monitoring", "Stockroom and staff areas"],
    span: "standard",
  },
  {
    id: "offices",
    title: "Offices",
    description:
      "Workstations, meeting rooms and entry points monitored with the restraint that professional environments require.",
    image: "/images/solutions/office.jpg",
    imageAlt: "Modern open-plan office interior",
    points: ["Entry and visitor management", "Workstation coverage", "Meeting room monitoring"],
    span: "standard",
  },
  {
    id: "warehouses",
    title: "Warehouses",
    description:
      "Wide-area coverage of racking aisles and loading bays, with retention sized for stock movement and disputes.",
    image: "/images/solutions/warehouse.jpg",
    imageAlt: "Warehouse racking aisles under industrial lighting",
    points: ["Aisle and racking coverage", "Loading bay monitoring", "Long-retention storage"],
    span: "wide",
  },
  {
    id: "commercial",
    title: "Commercial Buildings",
    description:
      "Multi-floor, multi-entry coverage for business premises, with a single recorder tying every floor together.",
    image: "/images/solutions/commercial.jpg",
    imageAlt: "Commercial office tower facade at night",
    points: ["Perimeter and ground coverage", "Floor-by-floor deployment", "Centralised recording"],
    span: "standard",
  },
  {
    id: "factories",
    title: "Factories & Sites",
    description:
      "Production lines, machinery areas and site gates monitored with cameras suited to dust, vibration and long runs.",
    image: "/images/solutions/factory.jpg",
    imageAlt: "Industrial factory floor with machinery",
    points: ["Production and machine areas", "Site entry and gate coverage", "Hardened outdoor units"],
    span: "standard",
  },
  {
    id: "apartments-society",
    title: "Gated Communities",
    description:
      "Perimeter, gate and common-area coverage that gives residents and the managing committee a shared, clear picture.",
    image: "/images/solutions/community.jpg",
    imageAlt: "Gated residential community entrance at night",
    points: ["Gate and boom barrier", "Perimeter wall coverage", "Common area and parking"],
    span: "standard",
  },
];

/* ==========================================================================
   Process
   ========================================================================== */

export const processSteps = [
  {
    index: "01",
    title: "Enquiry",
    copy: "Tell us about the property and what you need covered — by call, WhatsApp or the enquiry form.",
  },
  {
    index: "02",
    title: "Site Assessment",
    copy: "We walk the site, check lighting and sightlines, and mark a camera layout that actually covers the space.",
  },
  {
    index: "03",
    title: "Quotation",
    copy: "A clear written quote covering equipment, cabling, installation and support — before any work begins.",
  },
  {
    index: "04",
    title: "Installation",
    copy: "Cabling, mounting, alignment, and network and recorder configuration, finished and handed over in person.",
  },
  {
    index: "05",
    title: "Ongoing Support",
    copy: "Post-installation service, repairs and maintenance whenever you need it — or a planned AMC.",
  },
];

/* ==========================================================================
   Projects
   ==========================================================================
   Images must be approved installation photos. Never include customer names,
   addresses, plate numbers or exact camera placement details in the metadata.
   ========================================================================== */

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "residence-jungle-bells",
    title: "Villa perimeter coverage",
    category: "Residential",
    location: "Hyderabad",
    image: "/images/projects/project-1.jpg",
    imageAlt: "Security cameras covering the perimeter wall of a residential villa",
    featured: true,
  },
  {
    id: "retail-outlet",
    title: "Retail outlet installation",
    category: "Retail",
    location: "Hyderabad",
    image: "/images/projects/project-2.jpg",
    imageAlt: "Camera installed above the entrance of a retail store",
  },
  {
    id: "office-floor",
    title: "Office floor deployment",
    category: "Commercial",
    location: "Hyderabad",
    image: "/images/projects/project-3.jpg",
    imageAlt: "Network camera mounted in a modern office corridor",
  },
  {
    id: "warehouse-yard",
    title: "Warehouse loading bay",
    category: "Industrial",
    location: "Hyderabad",
    image: "/images/projects/project-4.jpg",
    imageAlt: "Outdoor cameras overlooking a warehouse loading bay",
  },
  {
    id: "apartment-lobby",
    title: "Apartment lobby system",
    category: "Residential",
    location: "Hyderabad",
    image: "/images/projects/project-5.jpg",
    imageAlt: "Dome camera fitted in an apartment lobby ceiling",
  },
  {
    id: "factory-floor",
    title: "Factory production floor",
    category: "Industrial",
    location: "Hyderabad",
    image: "/images/projects/project-6.jpg",
    imageAlt: "Cameras covering a factory production area",
  },
  {
    id: "shop-front",
    title: "Shop front & counter",
    category: "Retail",
    location: "Hyderabad",
    image: "/images/projects/project-7.jpg",
    imageAlt: "Two cameras covering the front and counter of a shop",
  },
  {
    id: "community-gate",
    title: "Community entrance gate",
    category: "Gated Community",
    location: "Hyderabad",
    image: "/images/projects/project-8.jpg",
    imageAlt: "Camera covering the boom barrier of a residential community gate",
    featured: true,
  },
];

/* ==========================================================================
   FAQs
   ========================================================================== */

export const faqs = [
  {
    question: "How much does a CCTV installation cost in Hyderabad?",
    answer:
      "Cost depends on camera count, camera type, cable run, recording capacity and whether the property is finished or still under construction. We quote in writing after a site assessment, so the number you receive reflects the site rather than a per-camera guess.",
  },
  {
    question: "Do you supply equipment only, or install as well?",
    answer:
      "Both. You can source cameras and recorders from us and schedule installation separately, or have us handle supply and installation end to end so there is one point of responsibility for the finished system.",
  },
  {
    question: "Can I view my cameras on my phone?",
    answer:
      "Yes. As part of every installation we configure remote viewing so you can check live footage and review recordings from your mobile, once the system is on your network.",
  },
  {
    question: "How long does an installation take?",
    answer:
      "A small single-camera setup is usually completed in a few hours. Larger multi-camera sites with longer cable runs take longer, and we will tell you the expected duration before work starts.",
  },
  {
    question: "Do you repair systems installed by other companies?",
    answer:
      "Yes. We service third-party installations, including diagnosing camera, recorder, power and cabling faults, and replacing failed components where a repair is not viable.",
  },
  {
    question: "What does an AMC include?",
    answer:
      "AMC is a planned maintenance agreement covering scheduled preventive visits, lens cleaning, alignment checks, recording and storage health checks, and priority fault response. Exact inclusions and response times are set out in your agreement.",
  },
  {
    question: "Will my CCTV footage be legally usable?",
    answer:
      "Footage is generally admissible in India when recorded lawfully, with an intact, unedited chain of custody. We install systems that support this by keeping original recordings intact with accurate timestamps, and we advise on retention and export.",
  },
  {
    question: "Which areas of Hyderabad do you service?",
    answer:
      "We cover Hyderabad and the surrounding region. Send us your location through the enquiry form or WhatsApp and we will confirm coverage and arrange a visit.",
  },
];

/* ==========================================================================
   Trust / maintenance pillars
   ========================================================================== */

export const trustPillars = [
  {
    title: "Planned, not reactive",
    copy: "Scheduled maintenance visits catch lens fogging, alignment drift and storage failures before footage is ever needed.",
  },
  {
    title: "One team, start to finish",
    copy: "Supply, installation, repair and maintenance handled by the same team — no handover gaps between vendors.",
  },
  {
    title: "Support that responds",
    copy: "A single WhatsApp number and call line for new installations, breakdowns and maintenance scheduling.",
  },
];
