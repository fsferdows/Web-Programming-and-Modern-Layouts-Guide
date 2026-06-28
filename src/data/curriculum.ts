import { CodeSnippet, QuizQuestion, Flashcard } from "../types";

export const CURRICULUM_SECTIONS = [
  {
    id: "infrastructure",
    number: 1,
    title: "Web Infrastructure & Inclusive Design Paradigm",
    shortTitle: "1. Infrastructure & A11y",
    description: "Learn how human-readable URLs are resolved to server IP addresses and how inclusive design provides competitive advantages through the curb-cut effect.",
    icon: "Globe"
  },
  {
    id: "selectors",
    number: 2,
    title: "Precision Targeting: CSS Selectors and Syntax",
    shortTitle: "2. CSS Selectors",
    description: "Master CSS specificity and targeting strategies to write maintainable code and avoid CSS selector conflicts.",
    icon: "Target"
  },
  {
    id: "html-elements",
    number: 3,
    title: "HTML Structural Elements and Display Mechanics",
    shortTitle: "3. Display Mechanics",
    description: "Understand page layout flow, display properties (block, inline, inline-block), accessibility, and semantic table structures.",
    icon: "Columns4"
  },
  {
    id: "responsive-design",
    number: 4,
    title: "The Architecture of Responsive Design",
    shortTitle: "4. Responsive Design",
    description: "Discover fluid layout techniques, relative units, and the foundational Viewport meta tag for mobile device compatibility.",
    icon: "Smartphone"
  },
  {
    id: "layout-strategy",
    number: 5,
    title: "Advanced Layout Strategy: Positioning, Flexbox & Grid",
    shortTitle: "5. Positioning & Layouts",
    description: "Deep dive into CSS position rules (relative, absolute, fixed, sticky) and evaluate the strategic advantages of Flexbox vs. CSS Grid.",
    icon: "Layout"
  }
];

export const PLAYGROUND_PRESETS: CodeSnippet[] = [
  {
    id: "descendant-selector",
    title: "Descendant Selector Practice",
    description: "Target only paragraphs nested inside a specific container while ignoring other sibling paragraphs.",
    category: "selectors",
    html: `<div class="container">
  <p>This paragraph is styled because it is a descendant of the .container div.</p>
</div>

<p>This paragraph is in the root flow and will not receive the custom styled rule.</p>`,
    css: `/* Custom fonts and container padding */
body {
  font-family: 'Inter', sans-serif;
  color: #334155;
  padding: 1rem;
}

.container {
  background-color: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

/* Targets only paragraphs inside a div */
div p {
  color: #1e3a8a;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}`
  },
  {
    id: "table-colspan-rowspan",
    title: "Product Stock Table (Data Normalization)",
    description: "Create structured tables with merged header cells horizontally using colspan, and rows vertically using rowspan.",
    category: "display",
    html: `<table class="inventory-table">
  <caption>Warehouse Inventory Status</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col" colspan="2">Stock / Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="font-medium">Keyboard</td>
      <td>$50</td>
      <td>Yes</td>
      <td class="status-active" rowspan="2">In-Stock Group A</td>
    </tr>
    <tr>
      <td class="font-medium">Mouse</td>
      <td>$25</td>
      <td>No</td>
    </tr>
  </tbody>
</table>`,
    css: `body {
  font-family: 'Inter', sans-serif;
  padding: 1.5rem;
  background-color: #ffffff;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.inventory-table caption {
  font-weight: 700;
  font-size: 1.2rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
  text-align: left;
}

.inventory-table th {
  background-color: #f1f5f9;
  color: #475569;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
}

.inventory-table td {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  color: #334155;
}

.inventory-table tr:hover {
  background-color: #f8fafc;
}

.font-medium {
  font-weight: 500;
}

.status-active {
  background-color: #f0fdf4;
  color: #166534;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
}`
  },
  {
    id: "sticky-header-absolute",
    title: "Sticky Header with Absolute Child",
    description: "Observe sticky scrolling with a header and position an absolute icon precisely inside it by establishing a relative reference.",
    category: "positioning",
    html: `<div class="scroll-container">
  <header class="sticky-header">
    <span class="nav-brand">Main Navigation</span>
    <span class="absolute-icon">🔔</span>
  </header>
  
  <main class="content-body">
    <h3>Scroll Down To Test Stickiness</h3>
    <p>This is a simulated page content to demonstrate how the sticky header remains pinned to the top of its scrolling ancestor viewport frame.</p>
    <div class="spacer-block"></div>
    <p>The bell notification icon is positioned using position: absolute inside a sticky header. Because the header is a positioned container, the absolute child aligns precisely 10px from the top and 10px from the right of the header instead of the entire page layout viewport!</p>
    <div class="spacer-block"></div>
    <p>Keep scrolling down or up to observe the boundary sticking mechanics.</p>
  </main>
</div>`,
    css: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}

.scroll-container {
  height: 250px;
  overflow-y: auto;
  border: 2px solid #cbd5e1;
  border-radius: 0.5rem;
  background-color: #ffffff;
}

.sticky-header {
  position: sticky;
  top: 0;
  height: 50px;
  background-color: #1e293b;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand {
  font-weight: 600;
}

.absolute-icon {
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
  background-color: #334155;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.85rem;
}

.content-body {
  padding: 1.25rem;
}

.spacer-block {
  height: 150px;
  background: linear-gradient(#e2e8f0, #ffffff);
  border-radius: 0.25rem;
  margin: 1rem 0;
}`
  },
  {
    id: "flexbox-dashboard-row",
    title: "1D Flexbox Dashboard Stats Row",
    description: "Align items in a one-dimensional row using CSS Flexbox. Notice how stat items shrink and grow based on content size.",
    category: "flex-grid",
    html: `<div class="dashboard-container">
  <header class="db-header">Dashboard Header</header>
  
  <div class="stat-row">
    <div class="box">
      <h4>Users</h4>
      <p class="value">1,240</p>
    </div>
    <div class="box">
      <h4>Revenue</h4>
      <p class="value">$12,450</p>
    </div>
    <div class="box">
      <h4>Conversion</h4>
      <p class="value">2.4%</p>
    </div>
    <div class="box">
      <h4>Bounce Rate</h4>
      <p class="value">42.1%</p>
    </div>
  </div>
  
  <footer class="db-footer">Dashboard Footer</footer>
</div>`,
    css: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 1rem;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.db-header {
  background-color: #f1f5f9;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  text-align: center;
  color: #475569;
}

/* Flexbox solution focusing on the row alignment */
.stat-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.box {
  flex: 1; /* Distribute space equally */
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(59,130,246,0.2);
}

.box h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 500;
  font-size: 0.85rem;
  opacity: 0.9;
}

.box .value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.db-footer {
  background-color: #f1f5f9;
  padding: 0.75rem;
  font-size: 0.85rem;
  text-align: center;
  color: #64748b;
  border-radius: 0.375rem;
}`
  },
  {
    id: "grid-dashboard-row",
    title: "2D CSS Grid Dashboard Layout",
    description: "Structure columns explicitly using CSS Grid with repeat(4, 1fr) for bulletproof alignments across responsive columns.",
    category: "flex-grid",
    html: `<div class="dashboard-container">
  <header class="db-header">Dashboard Header</header>
  
  <div class="stat-row">
    <div class="box">
      <h4>Users</h4>
      <p class="value">1,240</p>
    </div>
    <div class="box font-mono">
      <h4>Revenue</h4>
      <p class="value">$12,450</p>
    </div>
    <div class="box">
      <h4>Conversion</h4>
      <p class="value">2.4%</p>
    </div>
    <div class="box">
      <h4>Bounce Rate</h4>
      <p class="value">42.1%</p>
    </div>
  </div>
  
  <footer class="db-footer">Dashboard Footer</footer>
</div>`,
    css: `body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 1rem;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.db-header {
  background-color: #f1f5f9;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  text-align: center;
  color: #475569;
}

/* CSS Grid solution focusing on layout rows */
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.box {
  background-color: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(16,185,129,0.2);
}

.box h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 500;
  font-size: 0.85rem;
  opacity: 0.9;
}

.box .value {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.db-footer {
  background-color: #f1f5f9;
  padding: 0.75rem;
  font-size: 0.85rem;
  text-align: center;
  color: #64748b;
  border-radius: 0.375rem;
}`
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Section 1
  {
    id: "q_dns_1",
    question: "Which of the following describes the first step in the DNS lookup process when you request a URL like www.example.com?",
    options: [
      "The OS resolver queries the Top-Level-Domain (TLD) servers for directory listings.",
      "The browser checks its internal cache to see if the mapping is already stored locally.",
      "The resolver initiates an encrypted connection with the root name server directly.",
      "The authoritative nameserver resolves the domain name into an IP and returns it to the client."
    ],
    correctAnswerIndex: 1,
    explanation: "The first step is always checking the browser's local memory cache. This prevents redundant network requests for recently visited domain names.",
    sectionId: "infrastructure"
  },
  {
    id: "q_dns_2",
    question: "In the DNS lookup sequence, which authoritative unit is queried directly after the Root Server?",
    options: [
      "The OS local hosts lookup file.",
      "The ISP's central routing router.",
      "The Top-Level-Domain (TLD) server (e.g., .com, .org).",
      "The domain-specific authoritative name server."
    ],
    correctAnswerIndex: 2,
    explanation: "The Root server directs the DNS resolver to the TLD (Top-Level-Domain) servers corresponding to suffixes like .com, .org, or .edu.",
    sectionId: "infrastructure"
  },
  {
    id: "q_curb_cut",
    question: "What is the strategic definition of the 'curb-cut effect' in Web Accessibility?",
    options: [
      "Replacing interactive elements with static content for faster low-bandwidth rendering.",
      "Enforcing dark themes universally across all devices to reduce hardware energy footprint.",
      "The phenomenon where accessibility accommodations designed for disabled individuals end up significantly benefiting all users.",
      "Using CSS overrides to clip text block elements when they exceed screen bounding frames."
    ],
    correctAnswerIndex: 2,
    explanation: "The 'curb-cut effect' represents universal design: features like subtitles, clear typography, and alt-text provide broad advantages for SEO, multitasking, and noisy environment browsing for all visitors.",
    sectionId: "infrastructure"
  },
  // Section 2
  {
    id: "q_selectors_1",
    question: "How is a descendant selector represented in standard CSS syntax to style paragraphs nested inside divs?",
    options: [
      "div > p { }",
      "div + p { }",
      "div p { }",
      "div.p { }"
    ],
    correctAnswerIndex: 2,
    explanation: "A space character between two elements in a CSS selector constitutes a descendant selector, matching any target element located anywhere inside the ancestor, regardless of nesting levels.",
    sectionId: "selectors"
  },
  {
    id: "q_selectors_2",
    question: "Which of the following selectors has the highest specificity weight in CSS calculation?",
    options: [
      "Universal selector (*)",
      "ID selector (#main)",
      "Class selector (.note)",
      "Element selector (p)"
    ],
    correctAnswerIndex: 1,
    explanation: "IDs have the highest specificity weight among standard selectors (1-0-0 in base-10 specificity vectors), easily overriding classes (0-1-0) and elements (0-0-1). The universal selector has zero specificity (0-0-0).",
    sectionId: "selectors"
  },
  // Section 3
  {
    id: "q_display_1",
    question: "If an image (<img>) is nested inside a link (<a>), what is the accessibility and connectivity benefit of including the 'alt' attribute?",
    options: [
      "It speeds up image decoding times in Chromium browsers.",
      "If the image fails to load, the alt text appears in its place so users understand the target link destination, while also acting as crucial description for screen readers.",
      "It automatically forces the parent link element to stretch into a block layout.",
      "It registers the image in the browser cache across persistent tabs."
    ],
    correctAnswerIndex: 1,
    explanation: "The alt attribute is mandatory for screen readers, and serves as a vital fallback in poor connectivity conditions, showing what the interactive image represented.",
    sectionId: "html-elements"
  },
  {
    id: "q_display_2",
    question: "Which CSS display value sits in-line with the text flow but still allows you to specify custom widths and heights?",
    options: [
      "display: inline",
      "display: block",
      "display: inline-block",
      "display: contents"
    ],
    correctAnswerIndex: 2,
    explanation: "display: inline-block flows with normal text stream, but allows custom widths, heights, margins, and paddings (unlike display: inline which ignores geometric block properties).",
    sectionId: "html-elements"
  },
  {
    id: "q_colspan",
    question: "In HTML tables, which attributes are used to merge cells horizontally across columns and vertically down rows respectively?",
    options: [
      "colspan and rowspan",
      "colmerge and rowmerge",
      "widthspan and heightspan",
      "col-span and row-span"
    ],
    correctAnswerIndex: 0,
    explanation: "colspan expands a cell horizontally across multiple columns, while rowspan extends a cell vertically down across multiple table rows.",
    sectionId: "html-elements"
  },
  // Section 4
  {
    id: "q_responsive_1",
    question: "Is it possible to build a fluid layout that scales across screen sizes without writing media queries?",
    options: [
      "No, media queries are the only way to adapt layouts to mobile screens.",
      "Yes, by using relative units (%, vw, rem) and responsive auto-wrapping layouts like Flexbox wraps or CSS Grid auto-fit / auto-fill.",
      "Yes, but only if you use JS window event listeners to inject stylesheet overrides.",
      "No, because mobile viewports do not recognize relative percentages without media queries."
    ],
    correctAnswerIndex: 1,
    explanation: "By combining fluid widths, viewport percentages, and CSS systems like flex-wrap or auto-fit grid layouts, content reflows natively across devices without explicit media query breakpoints.",
    sectionId: "responsive-design"
  },
  {
    id: "q_responsive_2",
    question: "What is the strategic purpose of the Viewport Meta Tag <meta name='viewport' content='width=device-width, initial-scale=1.0'>?",
    options: [
      "It configures web applications to render on Apple Safari web apps only.",
      "It tells the browser's rendering engine to match the screen's layout width with device-independent pixels at a 1:1 scale, preventing mobile browsers from zooming out.",
      "It forces the browser to disable horizontal pinch-to-zoom on touch devices.",
      "It compresses image payloads before displaying on mobile cellular signals."
    ],
    correctAnswerIndex: 1,
    explanation: "Without the viewport tag, mobile devices render pages at desktop width (often 980px) and scale down the content to fit the screen, making text illegibly small. The viewport tag scales the page layout 1:1 with the actual physical screen dimensions.",
    sectionId: "responsive-design"
  },
  // Section 5
  {
    id: "q_layout_1",
    question: "Which of the following positioning values removes an element entirely from the normal page document flow, aligning it relative to its nearest positioned ancestor?",
    options: [
      "position: relative",
      "position: absolute",
      "position: fixed",
      "position: sticky"
    ],
    correctAnswerIndex: 1,
    explanation: "position: absolute removes the element completely from document flow. It is aligned with respect to the closest ancestor that has a non-static position (like relative, sticky, absolute).",
    sectionId: "layout-strategy"
  },
  {
    id: "q_layout_2",
    question: "Under what specific condition is CSS Grid generally superior to Flexbox?",
    options: [
      "When styling a simple list of inline navigation links in a header.",
      "When you need to construct a robust two-dimensional layout (simultaneously managing both rows and columns in a structure).",
      "When the sizing of items is completely content-driven and fluid.",
      "When you are targeting older browsers that do not support modern layout models."
    ],
    correctAnswerIndex: 1,
    explanation: "CSS Grid is layout-driven and manages two-dimensional structures (rows AND columns) perfectly. Flexbox is content-driven and designed primarily for one-dimensional layouts (a single row or column).",
    sectionId: "layout-strategy"
  },
  {
    id: "q_layout_3",
    question: "How does 'position: sticky' behave in standard web flow?",
    options: [
      "It remains absolutely static under all scroll depths.",
      "It is always locked to the device viewport regardless of its parent container scroll context.",
      "It acts as relative in normal document flow until it reaches a specified scroll threshold, where it then stays fixed at that offset within its parent container's box boundaries.",
      "It floats over pages and cannot be customized with top or bottom coordinates."
    ],
    correctAnswerIndex: 2,
    explanation: "Sticky elements behave like position: relative until the scroll position crosses a specified point (like top: 0). They then stick to that point like fixed elements, but are bound to their parent container's visual height.",
    sectionId: "layout-strategy"
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: "fc_1",
    front: "What is the primary role of the root server in a DNS query?",
    back: "It points the DNS resolver to the appropriate Top-Level-Domain (TLD) server (e.g. .com, .org) based on the domain suffix.",
    category: "Infrastructure"
  },
  {
    id: "fc_2",
    front: "What is the specific CSS specificity vector score of a single ID selector?",
    back: "1-0-0 (which is 100 on standard specificity weight models, easily overriding class selectors rated at 0-1-0 or elements at 0-0-1).",
    category: "CSS Selectors"
  },
  {
    id: "fc_3",
    front: "Why does 'display: inline' ignore custom CSS width or height properties?",
    back: "Because inline elements flow strictly along the text baseline, meaning their dimensions are bound solely to the line-height and text font size metrics.",
    category: "Display Mechanics"
  },
  {
    id: "fc_4",
    front: "Explain the main difference between % (percent) and vw/vh relative units.",
    back: "% calculates size relative to the immediate parent element's dimensions, whereas vw/vh calculates size relative to the total width/height of the browser viewport.",
    category: "Responsive Design"
  },
  {
    id: "fc_5",
    front: "What happens to a 'position: absolute' element if none of its parent ancestors have a CSS position declared?",
    back: "It is positioned relative to the initial containing block (usually the <html> document boundary canvas).",
    category: "Layout Strategy"
  },
  {
    id: "fc_6",
    front: "What is the primary visual difference between Flexbox and Grid?",
    back: "Flexbox aligns items in one direction (either horizontal row OR vertical column). Grid structures items in two directions (rows AND columns simultaneously).",
    category: "Layout Strategy"
  }
];
