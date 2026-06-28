import React, { useState, useEffect } from "react";
import { 
  Globe, Target, Columns4, Smartphone, Layout, 
  Play, RotateCcw, Check, Sparkles, AlertCircle, HelpCircle, Eye, RefreshCw, CheckCircle2
} from "lucide-react";
import { CURRICULUM_SECTIONS } from "../data/curriculum";
import { motion, AnimatePresence } from "motion/react";

export default function SectionViewer() {
  const [selectedSection, setSelectedSection] = useState("infrastructure");

  // Track completed sections synchronized with the CurriculumTracker
  const [completedList, setCompletedList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fundamentals_completed_sections");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep state synced across tabs
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem("fundamentals_completed_sections");
        setCompletedList(saved ? JSON.parse(saved) : []);
      } catch {}
    };
    window.addEventListener("curriculum_completed_updated", handleSync);
    return () => window.removeEventListener("curriculum_completed_updated", handleSync);
  }, []);

  const toggleCompleted = (id: string) => {
    const isCompleted = completedList.includes(id);
    const nextList = isCompleted 
      ? completedList.filter(item => item !== id)
      : [...completedList, id];
    
    setCompletedList(nextList);
    localStorage.setItem("fundamentals_completed_sections", JSON.stringify(nextList));
    // Trigger update event to keep tracker in sync
    window.dispatchEvent(new Event("curriculum_completed_updated"));
  };

  // Step state for DNS Lookup
  const [dnsStep, setDnsStep] = useState(0);
  const dnsSteps = [
    { name: "Browser Cache", detail: "Browser checks internal memory for recently fetched IP. If found, direct load!" },
    { name: "OS & Resolver", detail: "Browser asks operating system hosts, then passes to ISP's DNS recursive resolver." },
    { name: "Root Servers", detail: "Resolver queries root server ('.'). It redirects to the '.com' TLD Name Server." },
    { name: "TLD Name Servers", detail: "Resolver queries TLD name server ('.com'). It points to the 'example.com' name servers." },
    { name: "Authoritative Nameserver", detail: "Resolver queries example.com's primary nameserver which returns the final IP: '93.184.216.34'." },
    { name: "HTTP Connection & Cache", detail: "Browser receives IP, opens TCP/HTTPS connection to serve content, and caches it." }
  ];

  // Section 1: Accessibility Mode
  const [a11yMode, setA11yMode] = useState<"none" | "screen-reader" | "broken-image">("none");

  // Section 2: Specificity calculator
  const [specId, setSpecId] = useState(0);
  const [specClass, setSpecClass] = useState(0);
  const [specElem, setSpecElem] = useState(0);

  // Section 3: Display Sandbox
  const [boxDisplay, setBoxDisplay] = useState<"block" | "inline" | "inline-block">("block");
  const [boxWidth, setBoxWidth] = useState(120);
  const [boxHeight, setBoxHeight] = useState(60);

  // Section 4: Responsive viewport simulator
  const [simWidth, setSimWidth] = useState(100); // percentage
  const [viewportMeta, setViewportMeta] = useState(true);

  // Section 5: Positioning simulator
  const [boxPosition, setBoxPosition] = useState<"relative" | "absolute" | "fixed" | "sticky">("relative");

  // Icons mapper
  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe className="w-5 h-5" />;
      case "Target": return <Target className="w-5 h-5" />;
      case "Columns4": return <Columns4 className="w-5 h-5" />;
      case "Smartphone": return <Smartphone className="w-5 h-5" />;
      case "Layout": return <Layout className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4" id="section-viewer-container">
      {/* Mobile Chapter Navigation: beautiful horizontal swipeable list */}
      <div className="block lg:hidden w-full bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-850" id="mobile-chapter-selector">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider block mb-2.5">
          Select Study Topic:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
          {CURRICULUM_SECTIONS.map((section) => {
            const isSelected = selectedSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`flex-none snap-center flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border transition-all duration-200 text-xs font-semibold cursor-pointer select-none whitespace-nowrap ${
                  isSelected
                    ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs font-bold"
                    : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className={`p-1 rounded ${isSelected ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                  {getSectionIcon(section.icon)}
                </span>
                <span>{section.shortTitle}</span>
                {completedList.includes(section.id) && (
                  <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="section-viewer-root">
        {/* Sidebar Navigation (Desktop only) */}
        <div className="hidden lg:block lg:col-span-4 space-y-4" id="section-sidebar">
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
          <h2 className="text-xs font-semibold text-slate-500 uppercase font-mono tracking-wider mb-2.5">
            Core Curriculum Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-1 lg:flex lg:flex-col gap-2">
            {CURRICULUM_SECTIONS.map((section) => {
              const isSelected = selectedSection === section.id;
              return (
                <button
                  key={section.id}
                  id={`select-sec-${section.id}`}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-white border-slate-950 shadow-xs text-slate-950 font-medium"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200 text-slate-650"
                  }`}
                >
                  <div className="flex items-center lg:items-start space-x-2.5 sm:space-x-3">
                    <span className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${isSelected ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {getSectionIcon(section.icon)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400 font-mono">
                          0{section.number}
                        </span>
                        {completedList.includes(section.id) && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-650 bg-emerald-50 px-1.5 py-0.5 rounded font-mono uppercase tracking-wide">
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            Done
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold truncate mt-0.5">{section.shortTitle}</h3>
                      <p className="text-[10px] text-slate-405 line-clamp-1 mt-0.5 font-sans hidden lg:block">{section.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4 rounded-xl hidden lg:block">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase font-mono tracking-wider">
                Pro Tip: Interactive Labs
              </h4>
              <p className="text-xs text-amber-850 leading-relaxed mt-1">
                Each curriculum panel below includes a <strong>live interactive simulator</strong> built directly around its corresponding web engineering theory. Experiment with parameters to visualize mechanics in real time!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study/Visual Panel */}
      <div className="lg:col-span-8 space-y-6" id="section-detail-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {selectedSection === "infrastructure" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs" id="sec-panel-infrastructure">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Topic 01 // Fundamental Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
                Web Infrastructure & Inclusive Design Paradigm
              </h2>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed font-normal">
                High-performance digital products sit at the convergence of fast network resolution and universal semantic design. Developers must master the underlying network lookup flow and design with empathy using the "curb-cut effect" to build robust systems.
              </p>
            </div>

            {/* Q&A 1: DNS */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>How does the Domain Name System (DNS) resolve a human-readable URL into a machine-usable IP address?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  The DNS lookup process is a multi-tier, hierarchical, and recursive sequence. When a client requests a URL, it proceeds from local memory caches (to avoid latency) out to global root-level and authoritative servers. This system acts as the "phonebook of the web," mapping human-friendly names to specific TCP/IP server coordinates.
                </p>

                <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800">
                  <div className="text-indigo-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>🔬 Core Network Infrastructure Definitions</span>
                    <span className="text-[10px] text-slate-500 font-normal">RFC 1034 / 1035 Standards</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <strong className="text-amber-400 text-[11px] block">Recursive Resolver (ISP / 1.1.1.1):</strong>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        The workhorse server that intercepts the browser's request. If the mapping isn't cached, the resolver traverses the root, TLD, and authoritative nameservers on behalf of the client.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <strong className="text-amber-400 text-[11px] block">Authoritative Nameserver:</strong>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        The final source of truth for a domain name. Managed by hosting providers or registries, this server holds the master DNS zone files and returns the definitive IP address.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-table: Common DNS Records */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-950 font-mono uppercase tracking-wider">
                    Essential DNS Resource Record Types
                  </h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 font-mono border-b border-slate-200">
                          <th className="p-3 font-semibold">Record Type</th>
                          <th className="p-3 font-semibold">Stands For</th>
                          <th className="p-3 font-semibold">Target Value Type</th>
                          <th className="p-3 font-semibold">Core Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-600 divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-950">A Record</td>
                          <td className="p-3">Address</td>
                          <td className="p-3 font-mono">IPv4 Address (e.g. 192.0.2.1)</td>
                          <td className="p-3">Maps a hostname directly to its corresponding web host's physical IPv4.</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-950">AAAA Record</td>
                          <td className="p-3">IPv6 Address</td>
                          <td className="p-3 font-mono">IPv6 Address (e.g. 2001:db8::1)</td>
                          <td className="p-3">Next-generation routing maps hostnames directly to 128-bit IPv6 systems.</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-950">CNAME</td>
                          <td className="p-3">Canonical Name</td>
                          <td className="p-3 font-mono">Another Domain Name (e.g. ghs.google.com)</td>
                          <td className="p-3">Creates alias records pointing subdomain configurations to host server records.</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-950">TXT Record</td>
                          <td className="p-3">Text</td>
                          <td className="p-3">Arbitrary readable text metadata strings</td>
                          <td className="p-3">Enables third-party safety validation services (e.g., SPF, DKIM email keys).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* DNS STEP BY STEP SIMULATOR */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" /> Interactive DNS Lookup Trace Utility
                  </h4>
                  <button
                    onClick={() => setDnsStep(0)}
                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Sequence
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 space-y-1.5">
                    {dnsSteps.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setDnsStep(idx)}
                        className={`w-full text-left text-xs px-3 py-2.5 rounded-lg transition-all duration-300 font-mono font-medium ${
                          dnsStep === idx
                            ? "bg-slate-950 text-white shadow-sm ring-1 ring-slate-800"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        0{idx + 1}. {s.name}
                      </button>
                    ))}
                  </div>

                  <div className="md:col-span-8 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-indigo-600 font-mono tracking-wider uppercase">
                          Trace Step {dnsStep + 1} of 6
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-full border border-slate-200">
                          {dnsStep === 0 || dnsStep === 5 ? "Local Cache" : "Recursive Network Socket"}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-950 mt-3 text-sm">{dnsSteps[dnsStep].name}</h4>
                      <p className="text-xs text-slate-700 mt-2 leading-relaxed">{dnsSteps[dnsStep].detail}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono">Resolved IP Buffer:</span>
                      <strong className="font-mono text-slate-950 text-xs">
                        {dnsStep === 5 ? "93.184.216.34 (Saved locally)" : dnsStep >= 4 ? "93.184.216.34" : "0.0.0.0 (Unresolved)"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A 2: Curb-cut */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>What is the "curb-cut effect" in Web Accessibility, and how does it provide a competitive advantage?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  The <strong>"curb-cut effect"</strong> describes how accommodations engineered specifically for disabled user profiles end up benefiting the entire spectrum of visitors. In business strategy, building highly accessible, semantic apps isn't just a compliance requirement—it directly enhances user metrics, page weight performance, and organic search engine discovery.
                </p>

                <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-4 text-xs text-amber-900 space-y-2">
                  <span className="font-bold font-mono text-[10px] text-amber-800 uppercase tracking-wider block">🎓 WCAG 2.1 AAA Accessibility Compliance Metrics</span>
                  <p className="leading-relaxed">
                    The World Wide Web Consortium (W3C) establishes three tiers of compatibility standards: <strong>Level A (Minimum)</strong>, <strong>Level AA (Mid/Legal Standard)</strong>, and <strong>Level AAA (Highest Excellence)</strong>. 
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Contrast AAA Ratio:</strong> Requires a minimum color contrast of <strong>7:1</strong> for normal body text and <strong>4.5:1</strong> for large-scale text (AA requires 4.5:1 and 3:1 respectively).</li>
                    <li><strong>Keyboard Outline Focus:</strong> Standardized focus outlines (using CSS <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10.5px]">:focus-visible</code>) are strictly mandated. Disabling outlines completely violates legal web accessibility requirements.</li>
                  </ul>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl mt-3">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono border-b border-slate-200">
                        <th className="p-3 font-semibold">Accessibility Feature</th>
                        <th className="p-3 font-semibold">Primary Disability Support</th>
                        <th className="p-3 font-semibold">Unexpected Competitive Business Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Image Alt Text</td>
                        <td className="p-3">Visual Impairments (Screen-Readers)</td>
                        <td className="p-3 text-slate-700">Enables high-rank search engine image categorization (SEO) and displays if cell signal drops out mid-download.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Captions & Subtitles</td>
                        <td className="p-3">Hearing Impairments (Auditory)</td>
                        <td className="p-3 text-slate-700">Allows general users to view video tutorials in silent offices, public transits, or noisy library settings.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Keyboard Navigation focus</td>
                        <td className="p-3">Motor Impairments (Alternative Input)</td>
                        <td className="p-3 text-slate-700">Dramatically boosts operational speed, accuracy, and workflow automation for keyboard-only power users and developers.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">High Contrast & Scaling</td>
                        <td className="p-3">Low-Vision / Aging Profiles</td>
                        <td className="p-3 text-slate-700">Crucial for users trying to read documentation on compact smartphone viewports under direct, glaring outdoor sunlight.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Live Curb Cut Toggle Lab */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider mb-3">
                    Tactile Lab: Visualizing Alt-Text and Accessibility Modes
                  </h4>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setA11yMode("none")}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        a11yMode === "none" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Normal State
                    </button>
                    <button
                      onClick={() => setA11yMode("broken-image")}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        a11yMode === "broken-image" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Broken Cell Network (Image Fails)
                    </button>
                    <button
                      onClick={() => setA11yMode("screen-reader")}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        a11yMode === "screen-reader" ? "bg-violet-700 text-white border-violet-700" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Screen Reader Simulation
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 border relative overflow-hidden">
                      {a11yMode === "broken-image" ? (
                        <div className="text-[11px] p-2 text-slate-700 font-mono text-center">
                          [Alt: Ergonomic Mechanical Keyboard with keycaps]
                        </div>
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl">
                          ⌨️
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 text-left w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded-full font-mono uppercase">
                          In-Stock
                        </span>
                        {a11yMode === "screen-reader" && (
                          <span className="text-[10px] bg-violet-100 text-violet-800 font-mono px-2 py-0.5 rounded-full font-bold">
                            ARIA-Label active
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">Pro Ergonomic Keycap Set</h5>
                      <p className="text-xs text-slate-600">Premium keycaps for split layouts.</p>

                      {a11yMode === "screen-reader" && (
                        <div className="mt-2.5 p-2 bg-violet-50 border border-violet-100 rounded text-[11px] text-violet-900 font-mono leading-relaxed">
                          🔊 <strong>Screen Reader Speech:</strong> &quot;Link, Graphic: Ergonomic Mechanical Keyboard with keycaps. Heading level 5: Pro Ergonomic Keycap Set. Price: Fifty dollars.&quot;
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Deep-Dive Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    Deep-Dive Specification: Security & Accessibility Auditing
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To build production-grade web systems, infrastructure and accessibility must adhere to strict international standards:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">Network Sec: DNSSEC & Poisoning prevention</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        Standard DNS is vulnerable to spoofing/cache poisoning. <strong>DNSSEC</strong> (Domain Name System Security Extensions) resolves this by signing DNS queries with cryptographic keys, guaranteeing that the IP addresses returned from authoritative servers haven't been altered on the route.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">WCAG 2.1 AAA Contrast Guidelines</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        To comply with strict <strong>WCAG 2.1 AAA</strong> level standards, normal text (under 18pt) requires a visual contrast ratio of at least <strong>7:1</strong> against its background. For larger display headings (above 18pt), a minimum ratio of <strong>4.5:1</strong> is required.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedSection === "selectors" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs" id="sec-panel-selectors">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Topic 02 // Precision Styling
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
                Precision Targeting: CSS Selectors & Specificity Mechanics
              </h2>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed font-normal">
                Applying design systems to semantic markup requires absolute selector mastery. When styling rules overlap, the browser's CSS parser applies strict mathematical vector equations to determine which rules override others.
              </p>
            </div>

            {/* Selector list table */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>What are the primary CSS selector types and combinators used to target HTML elements?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  In production systems, developers avoid simple global styling by utilizing relationship-driven combinators and behavioral selectors. This prevents namespace pollution and maintains component isolation.
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono border-b border-slate-200">
                        <th className="p-3 font-semibold">Selector Category</th>
                        <th className="p-3 font-semibold">CSS Syntax Example</th>
                        <th className="p-3 font-semibold">Target Behavior / Relationship Model</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Element (Tag)</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">p &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Matches all instances of that HTML tag globally across the entire document object model.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Class Selector</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">.btn-primary &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Matches any elements containing the specified class attribute value (reusable utility standard).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">ID Selector</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">#main-navigation &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Matches the single unique element containing the specified ID attribute (strictly singular per page).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Descendant Combinator</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">article p &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Targets any paragraph elements nested <strong>anywhere</strong> inside an article element (arbitrary depth).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Child Combinator</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">ul &gt; li &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Targets list items that are <strong>direct first-level children</strong> of a ul container, ignoring nested lists.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Attribute Selector</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">input[type=&quot;checkbox&quot;] &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Filters elements strictly based on the presence or exact match value of their HTML attributes.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Pseudo-Class</td>
                        <td className="p-3"><code className="bg-slate-100 font-mono px-1.5 py-0.5 rounded text-indigo-600">a:hover, li:nth-child(even) &#123; &#125;</code></td>
                        <td className="p-3 text-slate-700">Targets elements during specific state changes or structural positions in a list sequence.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CSS Specificity Calculator Widget */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>How is CSS Specificity weight calculated? Test it in real time!</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Specificity is calculated by the user agent as a 3-column vector score representing: <code>(IDs, Classes/Pseudo-classes, Elements/Pseudo-elements)</code>. Inline style declarations override standard vectors, while the <code>!important</code> flag is a direct override tool (use with caution in maintainable systems).
                </p>

                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800">
                  <div className="text-indigo-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>📑 Rule Overriding Priority Order (Highest to Lowest)</span>
                    <span className="text-[10px] text-slate-500 font-normal">W3C Cascading Spec</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                    <li><strong className="text-rose-400">!important Declarations</strong> — Force overrides everything (not a selector, but a rule modifier).</li>
                    <li><strong className="text-amber-400">Inline Styles</strong> — Injected directly into the element style attribute (1-0-0-0 equivalent).</li>
                    <li><strong className="text-indigo-400">ID Selectors (#example)</strong> — Weighs 1-0-0 (overrides any number of class selectors).</li>
                    <li><strong className="text-sky-400">Class Selectors / Attribute Selectors / Pseudo-classes (.item)</strong> — Weighs 0-1-0.</li>
                    <li><strong className="text-emerald-400">Element Selectors / Pseudo-elements (div, ::before)</strong> — Weighs 0-0-1.</li>
                    <li><strong className="text-slate-400">Universal Selector (*) / Inherited Values</strong> — Weighs 0-0-0 (lowest priority).</li>
                  </ol>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider mb-4">
                    Interactive Specificity Vector Builder
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center shadow-2xs">
                      <span className="text-xs font-bold text-red-600 font-mono uppercase tracking-wider">IDs (A)</span>
                      <span className="text-3xl font-extrabold text-slate-950 mt-1">{specId}</span>
                      <div className="flex gap-1.5 mt-3">
                        <button onClick={() => setSpecId(Math.max(0, specId - 1))} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors border border-slate-200">-</button>
                        <button onClick={() => setSpecId(specId + 1)} className="bg-slate-950 text-white hover:bg-slate-800 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">e.g., #header</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center shadow-2xs">
                      <span className="text-xs font-bold text-indigo-600 font-mono uppercase tracking-wider">Classes (B)</span>
                      <span className="text-3xl font-extrabold text-slate-950 mt-1">{specClass}</span>
                      <div className="flex gap-1.5 mt-3">
                        <button onClick={() => setSpecClass(Math.max(0, specClass - 1))} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors border border-slate-200">-</button>
                        <button onClick={() => setSpecClass(specClass + 1)} className="bg-slate-950 text-white hover:bg-slate-800 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">e.g., .nav-item, :hover</span>
                    </div>

                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center shadow-2xs">
                      <span className="text-xs font-bold text-emerald-600 font-mono uppercase tracking-wider">Elements (C)</span>
                      <span className="text-3xl font-extrabold text-slate-950 mt-1">{specElem}</span>
                      <div className="flex gap-1.5 mt-3">
                        <button onClick={() => setSpecElem(Math.max(0, specElem - 1))} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors border border-slate-200">-</button>
                        <button onClick={() => setSpecElem(specElem + 1)} className="bg-slate-950 text-white hover:bg-slate-800 px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 font-mono">e.g., div, span, p</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 text-white p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-sm">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Computed Specificity Vector</div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400 mt-1">
                        ({specId}, {specClass}, {specElem})
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 md:text-right leading-relaxed max-w-sm">
                      This selector translates roughly to a weight vector. An ID count of 1 will instantly override any number of nested classes or elements (e.g., <code className="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">1, 0, 0</code> overrides <code className="text-rose-400 bg-slate-900 px-1 py-0.5 rounded">0, 15, 20</code>). When weights are identical, the rule declared latest in the stylesheet wins.
                    </div>
                  </div>
                </div>

                {/* Academic Deep-Dive Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    Deep-Dive Specification: Modern CSS Selectors & Nesting Mechanics
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    CSS specification has evolved to include powerful parent relational targeting and native compiler-free scoping:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">The Relational Parent Selector: `:has()`</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        The legendary <strong>`:has()`</strong> pseudo-class allows styling a parent element based on its children or sibling states. For example, <code className="bg-slate-100 font-mono px-1 text-slate-800">card:has(img)</code> targets only cards containing an image, effectively giving CSS a &quot;parent selector&quot; capability.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">Zero-Specificity Grouping: `:where()` vs `:is()`</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        Both allow grouping selectors cleanly, but <strong>`:where()`</strong> maintains exactly <strong>0-0-0 specificity</strong> regardless of its arguments (perfect for default/reset styles). Meanwhile, <strong>`:is()`</strong> takes the specificity score of its most specific argument.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedSection === "html-elements" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs" id="sec-panel-html-elements">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Topic 03 // Document Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
                HTML Structural Elements & Display Mechanics
              </h2>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed font-normal">
                Web rendering engines map out components into an accessibility hierarchy and physical boxes. Mastering document semantics and the CSS Display Box mechanics is essential to prevent sizing layout overflows and broken layouts.
              </p>
            </div>

            {/* Semantic HTML & Box Model Definitions Grid */}
            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-xs space-y-4 border border-slate-800">
              <div className="text-indigo-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>📦 Core Layout Architecture Concepts</span>
                <span className="text-[10px] text-slate-500 font-normal">W3C Box Model & Semantics</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-300">
                <div className="space-y-1.5">
                  <strong className="text-amber-400 text-[11px] block uppercase tracking-wider">The CSS Box Model:</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Every element is modeled as a rectangular box. It has 4 distinct zones: <strong>Content</strong>, <strong>Padding</strong>, <strong>Border</strong>, and <strong>Margin</strong>. 
                    <br />
                    Using <code className="bg-slate-950 px-1 py-0.5 rounded text-sky-400">box-sizing: border-box</code> forces the width/height variables to encapsulate padding and borders, avoiding complex padding calculations.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <strong className="text-amber-400 text-[11px] block uppercase tracking-wider">Semantic HTML & Accessibility Tree:</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Semantic elements like <code className="bg-slate-950 px-1 text-sky-400">&lt;main&gt;</code>, <code className="bg-slate-950 px-1 text-sky-400">&lt;article&gt;</code>, and <code className="bg-slate-950 px-1 text-sky-400">&lt;nav&gt;</code> translate directly into browser ARIA landmark nodes. This allows screen readers to navigate via structure instead of raw text.
                  </p>
                </div>
              </div>
            </div>

            {/* Table layout display properties */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>What are the fundamental differences between block, inline, and inline-block display values?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Display behaviors dictate document flow. Changing an inline element to block alters how margins, paddings, and alignment rules affect it.
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono border-b border-slate-200">
                        <th className="p-3 font-semibold">Display Value</th>
                        <th className="p-3 font-semibold">Starts New Line?</th>
                        <th className="p-3 font-semibold">Respects Width/Height?</th>
                        <th className="p-3 font-semibold">Typical CSS / Element Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Block</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono">Yes</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono">Yes</td>
                        <td className="p-3 text-slate-700">Fills full width of parent container (e.g., &lt;div&gt;, &lt;p&gt;, &lt;h1&gt;, &lt;section&gt;).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Inline</td>
                        <td className="p-3 text-red-600 font-semibold font-mono">No</td>
                        <td className="p-3 text-red-600 font-semibold font-mono">No</td>
                        <td className="p-3 text-slate-700">Flows within horizontal text lines. Top/bottom margins and custom sizing parameters are completely ignored (e.g., &lt;span&gt;, &lt;a&gt;, &lt;strong&gt;).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Inline-block</td>
                        <td className="p-3 text-red-600 font-semibold font-mono">No</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono">Yes</td>
                        <td className="p-3 text-slate-700">Flows inline with normal text but respects geometric block styling rules, allowing custom width, height, and padding (ideal for call-to-action buttons).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Subheading for tables */}
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-950 font-mono uppercase tracking-wider">
                    Tabular Merging Mechanics
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    To merge cells across multiple columns, we use the <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">colspan</code> attribute. To stretch a cell vertically over multiple rows, we use <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">rowspan</code>. Utilizing these correctly guarantees structured reading flows in data-grid designs.
                  </p>
                </div>

                {/* Tactile display sandbox */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider mb-3">
                    Interactive Box Display Sizing Sandbox
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Display Value:</label>
                        <div className="flex gap-1">
                          {["block", "inline", "inline-block"].map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setBoxDisplay(mode as any)}
                              className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border capitalize cursor-pointer ${
                                boxDisplay === mode ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                               {mode}
                            </button>
                          ))}
                        </div>
                      </div>
 
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 block mb-1">Width: {boxWidth}px</label>
                          <input
                            type="range"
                            min="60"
                            max="200"
                            value={boxWidth}
                            onChange={(e) => setBoxWidth(Number(e.target.value))}
                            className="w-full accent-slate-900 cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 block mb-1">Height: {boxHeight}px</label>
                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={boxHeight}
                            onChange={(e) => setBoxHeight(Number(e.target.value))}
                            className="w-full accent-slate-900 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
 
                    <div className="bg-slate-100 rounded-lg p-3 border border-slate-200 flex flex-col justify-center">
                      <div className="text-[10px] font-mono text-slate-500 mb-2">Simulated Text Flow Behavior:</div>
                      <div className="text-xs leading-relaxed bg-white p-3 rounded-md border border-slate-200 overflow-hidden min-h-[120px]">
                        Leading text sequence...
                        <div
                          style={{
                            display: boxDisplay,
                            width: `${boxWidth}px`,
                            height: `${boxHeight}px`,
                            backgroundColor: "#10b981",
                            color: "#ffffff",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "11px",
                            margin: boxDisplay === "block" ? "8px 0" : "0 4px",
                            verticalAlign: "middle",
                            lineHeight: boxDisplay === "inline" ? "normal" : `${boxHeight - 8}px`
                          }}
                          className="transition-all duration-100 border border-emerald-600"
                        >
                          {boxDisplay.toUpperCase()}
                        </div>
                        ...trailing trailing sentence text flows here. Notice the wrapping!
                      </div>
                    </div>
                  </div>
 
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-900">
                    {boxDisplay === "inline" ? (
                      <strong>⚠️ Display Alert:</strong>
                    ) : (
                      <strong>💡 Display behavior:</strong>
                    )}{" "}
                    {boxDisplay === "inline" 
                      ? "Even though the sliders are changing, the green box dimensions DO NOT change! That's because pure inline elements completely ignore width & height parameters."
                      : boxDisplay === "block"
                      ? "Notice how the Block element forces itself onto a brand new line, breaking the paragraph and expanding fully if no custom width was defined."
                      : "Inline-block aligns perfectly inline with neighbors, yet cleanly respects the width and height sliders you set!"}
                  </div>
                </div>

                {/* Academic Deep-Dive Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    Deep-Dive Specification: Accessibility Tree & Tabular Semantics
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the hood, HTML markup directly influences accessibility APIs that screen readers rely on to assist users:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">Landmark Roles & Accessibility Tree</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        The browser converts the DOM into an <strong>Accessibility Tree</strong>. Semantic tags such as <code className="bg-slate-100 font-mono px-1 text-slate-800">&lt;main&gt;</code>, <code className="bg-slate-100 font-mono px-1 text-slate-800">&lt;nav&gt;</code>, and <code className="bg-slate-100 font-mono px-1 text-slate-800">&lt;aside&gt;</code> define critical landmarks. If you replace them with generic divs, you destroy this structural index, locking out keyboard and screen reader power users.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">WCAG Table Auditing: The `scope` Attribute</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        Complex multi-row tables require strict headers. Using <code className="bg-slate-100 font-mono px-1 text-slate-800">scope=&quot;col&quot;</code> and <code className="bg-slate-100 font-mono px-1 text-slate-800">scope=&quot;row&quot;</code> explicitly announces relationship mappings between cells. Without explicit scoping, screen reader users are forced to memorize dense columns, which leads to cognitive fatigue.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedSection === "responsive-design" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs" id="sec-panel-responsive">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Topic 04 // Responsive Systems
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
                The Architecture of Responsive Web Design
              </h2>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed font-normal">
                Responsive design eliminates device borders. A single, unified codebase dynamically rearranges layout hierarchies and scales visual resources based on device capabilities.
              </p>
            </div>

            {/* Q&A 1: responsive without queries */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>Can a web page be highly responsive without explicitly writing media queries?</span>
              </h3>
              <div className="pl-8 space-y-4 text-sm text-slate-700">
                <p className="leading-relaxed">
                  Yes! Modern CSS layouts rely on fluid formulas that compute rendering dimensions dynamically instead of relying on hardcoded breakpoint steps. Key fluid mechanics include:
                </p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed text-slate-600 text-xs">
                  <li><strong>Relative Sizing Units:</strong> Declaring percentages (<code>%</code>), viewport width (<code>vw</code>), viewport height (<code>vh</code>), or parent-relative values (<code>rem</code>, <code>em</code>) instead of rigid pixels (<code>px</code>).</li>
                  <li><strong>CSS Clamp Function (Fluid Typography):</strong> Rather than defining separate font sizes inside multiple breakpoints, developers use:
                    <br />
                    <code className="block bg-slate-900 text-amber-400 p-2.5 rounded font-mono text-[11px] my-1 border border-slate-800 leading-relaxed">
                      font-size: clamp(1rem, 2vw + 0.75rem, 2.5rem);
                    </code>
                    This mathematical expression binds font-scale cleanly to screen widths while guaranteeing it stays strictly bounded between a minimum floor and a maximum ceiling.
                  </li>
                  <li><strong>Layout Wrapping & Grid Auto-Fit:</strong> Enabling wrapping in Flexbox (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">flex-wrap: wrap</code>) and configuring CSS Grid containers using:
                    <br />
                    <code className="block bg-slate-900 text-indigo-400 p-2.5 rounded font-mono text-[11px] my-1 border border-slate-800 leading-relaxed">
                      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    </code>
                    This creates dynamic multi-column grids that wrap and scale without requiring media queries.
                  </li>
                </ul>
              </div>
            </div>

            {/* Q&A 2: Viewport tag */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>What is the strategic purpose of the HTML5 Viewport Meta Tag?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Mobile devices have high-density pixel displays. Without the viewport tag, mobile browsers render pages at a simulated desktop width of <strong>980px</strong> and shrink the output to fit, making copy microscopic. The viewport tag binds the layout's viewport boundaries strictly to the hardware device width.
                </p>

                {/* Viewport Meta Tag Simulator */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
                    <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-indigo-600" /> Viewport Meta Tag Visualizer
                    </h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-slate-500 font-mono">Viewport Tag:</span>
                      <button
                        onClick={() => setViewportMeta(!viewportMeta)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-md font-bold cursor-pointer transition-all ${
                          viewportMeta ? "bg-green-600 text-white" : "bg-red-600 text-white"
                        }`}
                      >
                        {viewportMeta ? "ENABLED" : "DISABLED"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 flex justify-center">
                      <div className="w-[220px] h-[340px] overflow-hidden relative bg-slate-50 flex flex-col border border-slate-300 rounded-xl shadow-inner">
                        {/* Status bar mock */}
                        <div className="bg-slate-900 text-white text-[8px] px-3 py-1 flex justify-between font-mono">
                          <span>10:38 AM</span>
                          <span>📶 🔋 100%</span>
                        </div>

                        {viewportMeta ? (
                          /* Responsive view */
                          <div className="p-3 space-y-2 flex-1 flex flex-col justify-between overflow-y-auto">
                            <div className="space-y-2">
                              <header className="bg-indigo-600 text-white p-2 rounded text-center text-xs font-bold">
                                Modern Header
                              </header>
                              <div className="bg-white border border-slate-200 p-2 rounded text-[10px] leading-relaxed text-slate-600">
                                <h5 className="font-bold text-slate-900 text-[11px] mb-1">Easy Reading</h5>
                                Text flows naturally at a readable size. It aligns perfectly with the device screen.
                              </div>
                            </div>
                            <button className="bg-indigo-600 text-white text-[10px] py-1.5 px-3 rounded font-bold">
                              Interactive Button
                            </button>
                          </div>
                        ) : (
                          /* Non-responsive scale-down desktop view */
                          <div className="origin-top-left scale-[0.35] w-[620px] h-[950px] p-6 space-y-6 absolute top-6 left-1 bg-white">
                            <header className="bg-indigo-600 text-white p-4 rounded text-center text-2xl font-bold">
                              Desktop Layout Header
                            </header>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-slate-50 border p-4 rounded text-sm text-slate-600 col-span-2">
                                <h5 className="font-bold text-slate-900 text-lg">Desktop Title Text</h5>
                                This is modeled on how a desktop rendering works. Since there is no viewport parameter, the smartphone simulates rendering 980 pixels wide and zooms it completely down, making it microscopic on this display screen.
                              </div>
                              <div className="bg-slate-100 p-4 rounded text-xs">
                                Sidebar Column text content here.
                              </div>
                            </div>
                            <button className="bg-indigo-600 text-white text-base py-3 px-6 rounded font-bold w-full">
                              Interactive Button
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      <div className="bg-slate-900 text-white p-3 rounded-lg font-mono text-xs">
                        <span className="text-slate-400">&lt;!-- Code Injection --&gt;</span>
                        {viewportMeta ? (
                          <div className="text-green-400 mt-1">
                            &lt;<span className="text-pink-400">meta</span> <span className="text-amber-400">name</span>=&quot;viewport&quot;<br />
                            &nbsp;&nbsp;<span className="text-amber-400">content</span>=&quot;width=device-width,<br />
                            &nbsp;&nbsp;initial-scale=1.0&quot;&gt;
                          </div>
                        ) : (
                          <div className="text-red-400 mt-1 line-through font-mono">
                            &lt;!-- Viewport tag missing! --&gt;
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Toggle the switch at the top. Notice how disabling the Viewport tag forces the smartphone mock screen to display a tiny, unreadable, scaled-down desktop rendering. 
                        <strong> Always include this tag to ensure responsive styles work!</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Academic Deep-Dive Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    Deep-Dive Specification: Container Queries & Typographic Measure
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Responsive design is moving beyond simple viewport breakpoints to highly context-aware component models:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">CSS Container Queries (`@container`)</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        Unlike media queries that only listen to the viewport, <strong>Container Queries</strong> query the size of a specific parent container. By declaring <code className="bg-slate-100 font-mono px-1 text-slate-800">container-type: inline-size</code>, a child element can query its direct parent width using <code className="bg-slate-100 font-mono px-1 text-slate-800">@container (max-width: 400px)</code>, making components modular across sidebars, grid cells, or main areas.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                      <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">Readable Typographic Measure (`ch` unit)</span>
                      <p className="leading-relaxed text-slate-600 text-[11px]">
                        The <strong>`ch`</strong> unit represents the horizontal width of the character &quot;0&quot; in the element's active font. Web designers use it to set optimal line lengths (known as &quot;measure&quot;). Setting <code className="bg-slate-100 font-mono px-1 text-slate-800">max-width: 65ch</code> guarantees readable paragraphs (between 45 to 75 characters per line) on any screen.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {selectedSection === "layout-strategy" && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-8 shadow-xs" id="sec-panel-layout">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Topic 05 // Layout Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-4">
                Advanced Layout Strategy: Positioning, Flexbox & Grid
              </h2>
              <p className="text-sm text-slate-700 mt-2.5 leading-relaxed font-normal">
                Web layouts demand predictable rendering. Selecting between explicit positioning coordinates, Flexbox linear flows, or CSS Grid coordinates prevents visual shifting and ensures accessibility compatibility.
              </p>
            </div>

            {/* Positioning property details */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>How do CSS positioning values manipulate document layout flows and stacking context layers?</span>
              </h3>
              
              <div className="pl-8 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Positioning tells the browser's layout engine to bypass standard block and inline line-wrap flows. When layers overlap, the browser evaluates depth using <strong>z-index values</strong> within local <strong>Stacking Contexts</strong> (which are triggered by attributes like positioning, custom `opacity`, or 3D properties).
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono border-b border-slate-200">
                        <th className="p-3 font-semibold">Position Mode</th>
                        <th className="p-3 font-semibold">In Normal flow?</th>
                        <th className="p-3 font-semibold">Coordinate Anchor point Relationship</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Static</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono">Yes</td>
                        <td className="p-3 text-slate-700">The default mode. Ignores top, right, bottom, left offsets and standard stacking order.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Relative</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono">Yes</td>
                        <td className="p-3 text-slate-700">Offset offsets are relative to the element's default position in flow without impacting adjacent siblings.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Absolute</td>
                        <td className="p-3 text-red-600 font-semibold font-mono">No</td>
                        <td className="p-3 text-slate-700">Completely removed from flow. Anchored to coordinates relative to its nearest <strong>positioned ancestor</strong> (non-static container).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Fixed</td>
                        <td className="p-3 text-red-600 font-semibold font-mono">No</td>
                        <td className="p-3 text-slate-700">Completely removed from flow. Anchored relative to the screen's browser viewport frame. Stays locked during page scrolls.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-950">Sticky</td>
                        <td className="p-3 text-emerald-600 font-semibold font-mono font-sans text-xs">Hybrid</td>
                        <td className="p-3 text-slate-700">Behaves normally in flow until a scroll threshold is met, then pins as "fixed" inside its direct parent container boundary.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Positioning simulator widget */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider mb-3">
                    Interactive Positioning Element Simulator
                  </h4>

                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {["relative", "absolute", "fixed", "sticky"].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setBoxPosition(pos as any)}
                        className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border capitalize cursor-pointer ${
                          boxPosition === pos ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 bg-white border border-slate-200 rounded-lg p-3 h-[200px] overflow-y-auto relative" id="pos-scroll-pane">
                      <div className="text-[10px] text-slate-400 font-mono mb-2">Scrollable viewport area</div>
                      
                      <div className="space-y-2 text-xs text-slate-500">
                        <p>Line 1: Normal document text flow sentence.</p>
                        <p>Line 2: Normal document text flow sentence.</p>
                        
                        {/* THE TEST POSITIONAL ELEMENT */}
                        <div
                          style={{
                            position: boxPosition,
                            top: boxPosition === "sticky" ? "0px" : boxPosition === "absolute" ? "20px" : "5px",
                            right: boxPosition === "absolute" ? "20px" : "auto",
                            left: boxPosition === "relative" ? "15px" : "auto",
                            backgroundColor: "#4f46e5",
                            color: "#ffffff",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            zIndex: 20,
                            boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.4)"
                          }}
                          className="text-xs transition-all duration-300 inline-block font-mono"
                        >
                          📌 position: {boxPosition}
                        </div>

                        <p>Line 3: Normal document text flow sentence.</p>
                        <p>Line 4: Normal document text flow sentence.</p>
                        <p>Line 5: Scroll down further to see sticky or fixed behaviors in action.</p>
                        <p>Line 6: Normal document text flow sentence.</p>
                        <p>Line 7: Normal document text flow sentence.</p>
                        <p>Line 8: Normal document text flow sentence.</p>
                        <p>Line 9: Normal document text flow sentence.</p>
                      </div>

                      {/* Fixed Simulator Overlay so fixed doesn't float over the whole screen */}
                      {boxPosition === "fixed" && (
                        <div className="absolute bottom-3 right-3 bg-indigo-600 text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-md shadow-md animate-pulse">
                          📌 Pinned Fixed Overlay
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-center space-y-2">
                      <h5 className="text-xs font-bold text-slate-800">Behavior Notes:</h5>
                      <p className="text-[11px] text-slate-650 leading-relaxed bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                        {boxPosition === "relative" && "The element remains in flow, nudged 15px to the right of its original slot, leaving behind an empty space placeholder."}
                        {boxPosition === "absolute" && "Completely removed from document flow. It anchors precisely (20px top, 20px right) inside the nearest positioned ancestor (the parent scrollbox)."}
                        {boxPosition === "fixed" && "Removed from flow. In the real window, it anchors relative to the screen. Here, we simulate it pinned cleanly inside the scroll window."}
                        {boxPosition === "sticky" && "Acts as relative in flow. Try scrolling down! Notice how it 'sticks' cleanly to the top of the container box boundary as you scroll past it."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Flexbox vs Grid */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 flex items-start gap-3">
                <span className="text-xs bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono shrink-0 mt-0.5">Q</span>
                <span>Strategic Evaluation: When should a developer choose Flexbox over CSS Grid?</span>
              </h3>
              <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-indigo-700 font-mono uppercase tracking-wider mb-2">
                      1D Flexbox (Content-Driven Layouts)
                    </h4>
                    <p className="text-xs text-slate-650 leading-relaxed mb-4">
                      Best for **one-dimensional** alignments (either a single row OR a single column). Ideal for distributing dynamic items based strictly on their internal content size (e.g., headers, nav rails, tag lists).
                    </p>
                  </div>
                  <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                    <span className="text-indigo-400">display</span>: flex;<br />
                    <span className="text-indigo-400">justify-content</span>: space-between;
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-emerald-700 font-mono uppercase tracking-wider mb-2">
                      2D CSS Grid (Container-Driven Layouts)
                    </h4>
                    <p className="text-xs text-slate-650 leading-relaxed mb-4">
                      Best for **two-dimensional** matrix templates (rows AND columns matching up together). Perfect for full dashboard grid arrays, bento style layout profiles, and complex card grids.
                    </p>
                  </div>
                  <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                    <span className="text-indigo-400">display</span>: grid;<br />
                    <span className="text-indigo-400">grid-template-columns</span>: repeat(4, 1fr);
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Deep-Dive Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5 mt-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Deep-Dive Specification: CSS Grid Auto-Scaling & Subgrid Inheritances
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advanced layout architectures leverage modern CSS layout calculation properties to synchronize complex element grids:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                  <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">Auto-fit vs Auto-fill Columns</span>
                  <p className="leading-relaxed text-slate-600 text-[11px]">
                    Using <code className="bg-slate-100 font-mono px-1 text-slate-800">repeat(auto-fit, minmax(220px, 1fr))</code> creates an auto-wrapping responsive grid. <strong>`auto-fit`</strong> will expand active columns to stretch and fill all available remaining space. In contrast, <strong>`auto-fill`</strong> retains empty column slots, keeping card widths at their exact specified minimum boundaries.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                  <span className="font-bold text-indigo-650 font-mono text-[10px] block uppercase">CSS Subgrid Alignments</span>
                  <p className="leading-relaxed text-slate-600 text-[11px]">
                    The <strong>`subgrid`</strong> value (e.g. <code className="bg-slate-100 font-mono px-1 text-slate-800">grid-template-rows: subgrid</code>) allows nested child components to align perfectly to the track lines of the parent grid. This prevents misaligned headers and footers across adjacent columns of varying description text lengths.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Global Topic Completion Footer Action */}
        <div className="mt-8 pt-6 border-t border-slate-200/65 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-3xs" id="chapter-completion-action-bar">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-500" />
              Interactive Chapter Syllabus Progress
            </h4>
            <p className="text-xs text-slate-500">
              Finished reading and experimenting? Mark this topic as completed to track your mastery!
            </p>
          </div>
          <button
            onClick={() => toggleCompleted(selectedSection)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 border ${
              completedList.includes(selectedSection)
                ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
            }`}
          >
            <Check className={`w-4 h-4 ${completedList.includes(selectedSection) ? "text-amber-400" : "text-slate-400"}`} />
            <span>{completedList.includes(selectedSection) ? "Topic Completed ✔" : "Mark Chapter as Completed"}</span>
          </button>
        </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}
