import React, { useState } from "react";
import { 
  Globe, Target, Columns4, Smartphone, Layout, 
  Play, RotateCcw, Check, Sparkles, AlertCircle, HelpCircle, Eye, RefreshCw
} from "lucide-react";
import { CURRICULUM_SECTIONS } from "../data/curriculum";

export default function SectionViewer() {
  const [selectedSection, setSelectedSection] = useState("infrastructure");

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6" id="section-viewer-root">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 space-y-4" id="section-sidebar">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h2 className="text-xs font-semibold text-slate-500 uppercase font-mono tracking-wider mb-3">
            Core Curriculum Sections
          </h2>
          <div className="space-y-2">
            {CURRICULUM_SECTIONS.map((section) => {
              const isSelected = selectedSection === section.id;
              return (
                <button
                  key={section.id}
                  id={`select-sec-${section.id}`}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-white border-slate-900 shadow-sm text-slate-950 font-medium"
                      : "bg-transparent border-transparent hover:bg-white hover:border-slate-200 text-slate-600"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`p-2 rounded-lg ${isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {getSectionIcon(section.icon)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 font-mono">
                          0{section.number}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold truncate mt-0.5">{section.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">{section.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4 rounded-xl">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase font-mono tracking-wider">
                Pro Tip: Interactive Labs
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed mt-1">
                Each curriculum panel below includes a <strong>live interactive simulator</strong> built directly around its corresponding web engineering theory. Experiment with parameters to visualize mechanics in real time!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study/Visual Panel */}
      <div className="lg:col-span-8 space-y-6" id="section-detail-panel">
        {selectedSection === "infrastructure" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6" id="sec-panel-infrastructure">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                Topic 1
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
                Web Infrastructure & Inclusive Design Paradigm
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Modern web systems require a complete balance between mechanical DNS resolution and social accessibility. This dual setup is essential to create high-performance, universally compliant digital products.
              </p>
            </div>

            {/* Q&A 1: DNS */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                How does the Domain Name System (DNS) resolve a human-readable URL into a machine-usable IP address?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed pl-7">
                The DNS lookup process is a recursive, structured sequence. It moves from local browser cache memory to global authoritative servers to translate a domain like <code className="bg-slate-100 text-slate-800 font-mono px-1.5 py-0.5 rounded text-xs">www.example.com</code> into a numeric IP address.
              </p>

              {/* DNS STEP BY STEP SIMULATOR */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" /> Interactive DNS Lookup Step-by-Step
                  </h4>
                  <button
                    onClick={() => setDnsStep(0)}
                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 space-y-1.5">
                    {dnsSteps.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setDnsStep(idx)}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                          dnsStep === idx
                            ? "bg-slate-950 text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {idx + 1}. {s.name}
                      </button>
                    ))}
                  </div>

                  <div className="md:col-span-8 bg-white border border-slate-100 rounded-lg p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase">
                          Step {dnsStep + 1} of 6
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-full">
                          {dnsStep === 0 || dnsStep === 5 ? "Client local" : "Internet Query"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mt-2 text-sm">{dnsSteps[dnsStep].name}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dnsSteps[dnsStep].detail}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-mono">IP Lookup State:</span>
                      <strong className="font-mono text-slate-900 text-xs">
                        {dnsStep === 5 ? "93.184.216.34 (Cached)" : dnsStep > 3 ? "93.184.216.34" : "Pending..."}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A 2: Curb-cut */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                What is the "curb-cut effect" in Web Accessibility, and how does it provide a competitive advantage?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed pl-7">
                The <strong>"curb-cut effect"</strong> describes how accessibility accommodations built for people with disabilities end up providing massive structural advantages to the general, non-impaired user base as well. Let's look at key examples:
              </p>

              {/* CURB CUT SIMULATOR AND TABLE */}
              <div className="pl-7 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-lg">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono">
                        <th className="p-2.5 border border-slate-200">Accessibility Feature</th>
                        <th className="p-2.5 border border-slate-200">Disability Supported</th>
                        <th className="p-2.5 border border-slate-200">General User Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Alt Text</td>
                        <td className="p-2.5 border border-slate-200">Visual Impairments</td>
                        <td className="p-2.5 border border-slate-200">Displays if cell signal fails; improves SEO indexing.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Captions / Transcripts</td>
                        <td className="p-2.5 border border-slate-200">Hearing Impairments</td>
                        <td className="p-2.5 border border-slate-200">Allows viewing videos in silent public places.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Keyboard Navigation</td>
                        <td className="p-2.5 border border-slate-200">Motor Impairments</td>
                        <td className="p-2.5 border border-slate-200">Increases speed and efficiency for power users/developers.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">High Color Contrast</td>
                        <td className="p-2.5 border border-slate-200">Low-Vision / Ageing</td>
                        <td className="p-2.5 border border-slate-200">Enhances readability on phone in bright outdoor sunlight.</td>
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
              </div>
            </div>
          </div>
        )}

        {selectedSection === "selectors" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6" id="sec-panel-selectors">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Topic 2
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
                Precision Targeting: CSS Selectors & Specificity
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Applying rules to elements requires clear selector knowledge. If selector rules collide, the browser uses strict mathematical math vectors to determine which style overrides which.
              </p>
            </div>

            {/* Selector list table */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                What are the primary CSS selector types used to target HTML elements?
              </h3>
              
              <div className="pl-7 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-lg">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono">
                        <th className="p-2.5 border border-slate-200">Selector Type</th>
                        <th className="p-2.5 border border-slate-200">Syntax</th>
                        <th className="p-2.5 border border-slate-200">Target Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Element</td>
                        <td className="p-2.5 border border-slate-200"><code className="bg-slate-100 font-mono px-1 rounded text-red-600">p &#123; &#125;</code></td>
                        <td className="p-2.5 border border-slate-200">Targets all p elements globally.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Class</td>
                        <td className="p-2.5 border border-slate-200"><code className="bg-slate-100 font-mono px-1 rounded text-red-600">.note &#123; &#125;</code></td>
                        <td className="p-2.5 border border-slate-200">Targets elements with class=&quot;note&quot;.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">ID</td>
                        <td className="p-2.5 border border-slate-200"><code className="bg-slate-100 font-mono px-1 rounded text-red-600">#main &#123; &#125;</code></td>
                        <td className="p-2.5 border border-slate-200">Targets the unique element with id=&quot;main&quot;.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Universal</td>
                        <td className="p-2.5 border border-slate-200"><code className="bg-slate-100 font-mono px-1 rounded text-red-600">* &#123; &#125;</code></td>
                        <td className="p-2.5 border border-slate-200">Targets every single element on the page.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">Group</td>
                        <td className="p-2.5 border border-slate-200"><code className="bg-slate-100 font-mono px-1 rounded text-red-600">h1, h2 &#123; &#125;</code></td>
                        <td className="p-2.5 border border-slate-200">Applies same rules to h1 and h2 simultaneously.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CSS Specificity Calculator Widget */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                How is CSS Specificity weight calculated? Test it in real time!
              </h3>
              
              <div className="pl-7 space-y-4">
                <p className="text-sm text-slate-700">
                  CSS uses a 3-part specificity score vector: <code>(ID, Class, Element)</code>. Use the simulator below to add components and see how the mathematical score builds up.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider mb-4">
                    Interactive Specificity Vector Builder
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white border p-3 rounded-lg flex flex-col items-center">
                      <span className="text-xs font-bold text-red-600 font-mono uppercase">IDs</span>
                      <span className="text-3xl font-extrabold text-slate-900 mt-1">{specId}</span>
                      <div className="flex gap-1.5 mt-2">
                        <button onClick={() => setSpecId(Math.max(0, specId - 1))} className="bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">-</button>
                        <button onClick={() => setSpecId(specId + 1)} className="bg-slate-900 text-white hover:bg-slate-850 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">e.g., #header</span>
                    </div>

                    <div className="bg-white border p-3 rounded-lg flex flex-col items-center">
                      <span className="text-xs font-bold text-blue-600 font-mono uppercase">Classes</span>
                      <span className="text-3xl font-extrabold text-slate-900 mt-1">{specClass}</span>
                      <div className="flex gap-1.5 mt-2">
                        <button onClick={() => setSpecClass(Math.max(0, specClass - 1))} className="bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">-</button>
                        <button onClick={() => setSpecClass(specClass + 1)} className="bg-slate-900 text-white hover:bg-slate-850 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">e.g., .nav-item</span>
                    </div>

                    <div className="bg-white border p-3 rounded-lg flex flex-col items-center">
                      <span className="text-xs font-bold text-green-600 font-mono uppercase">Elements</span>
                      <span className="text-3xl font-extrabold text-slate-900 mt-1">{specElem}</span>
                      <div className="flex gap-1.5 mt-2">
                        <button onClick={() => setSpecElem(Math.max(0, specElem - 1))} className="bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">-</button>
                        <button onClick={() => setSpecElem(specElem + 1)} className="bg-slate-900 text-white hover:bg-slate-850 px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer">+</button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">e.g., div, span</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Computed Specificity Vector Score</div>
                      <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
                        ({specId}, {specClass}, {specElem})
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 md:text-right leading-relaxed max-w-sm">
                      This selector translates roughly to a value weight of <strong>{specId * 100 + specClass * 10 + specElem}</strong>. 
                      An ID count of 1 will instantly override any number of nested classes or elements (e.g., 1-0-0 exceeds 0-15-20).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection === "html-elements" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6" id="sec-panel-html-elements">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                Topic 3
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
                HTML Structural Elements & Display Mechanics
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Elements occupy viewport layouts differently based on their default CSS display behavior. Mastering Block, Inline, and Inline-block modes is crucial to prevent sizing bugs.
              </p>
            </div>

            {/* Table layout display properties */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                What are the fundamental differences between block, inline, and inline-block displays?
              </h3>
              
              <div className="pl-7 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-lg">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono">
                        <th className="p-2.5 border border-slate-200">Display Value</th>
                        <th className="p-2.5 border border-slate-200">Starts New Line?</th>
                        <th className="p-2.5 border border-slate-200">Respects custom Width/Height?</th>
                        <th className="p-2.5 border border-slate-200">Typical CSS Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Block</td>
                        <td className="p-2.5 border border-slate-200 text-emerald-600 font-semibold">Yes</td>
                        <td className="p-2.5 border border-slate-200 text-emerald-600 font-semibold">Yes</td>
                        <td className="p-2.5 border border-slate-200">Fills full width of parent container (e.g., &lt;div&gt;, &lt;p&gt;, &lt;h1&gt;).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Inline</td>
                        <td className="p-2.5 border border-slate-200 text-red-600 font-semibold">No</td>
                        <td className="p-2.5 border border-slate-200 text-red-600 font-semibold">No</td>
                        <td className="p-2.5 border border-slate-200">Flows within horizontal text lines. Custom sizing is ignored (e.g., &lt;span&gt;, &lt;a&gt;, &lt;strong&gt;).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Inline-block</td>
                        <td className="p-2.5 border border-slate-200 text-red-600 font-semibold">No</td>
                        <td className="p-2.5 border border-slate-200 text-emerald-600 font-semibold">Yes</td>
                        <td className="p-2.5 border border-slate-200">Sits inline but behaves like block, allowing custom sizing and padding. (Ideal for styled buttons).</td>
                      </tr>
                    </tbody>
                  </table>
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
              </div>
            </div>
          </div>
        )}

        {selectedSection === "responsive-design" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6" id="sec-panel-responsive">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                Topic 4
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
                The Architecture of Responsive Design
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Responsive design eliminates device borders, allowing a single unified codebase to serve smart phone screens and wide professional monitors seamlessly.
              </p>
            </div>

            {/* Q&A 1: responsive without queries */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                Can a web page be responsive without explicitly using media queries?
              </h3>
              <div className="pl-7 space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Yes! By using fluid CSS layouts, elements resize dynamically across any viewport size. Key fluid mechanics include:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <li><strong>Relative Units:</strong> Declaring percentages (<code>%</code>), viewport width (<code>vw</code>), viewport height (<code>vh</code>), or parent-relative values (<code>rem</code>, <code>em</code>) instead of rigid pixels (<code>px</code>).</li>
                  <li><strong>Flexible Containers:</strong> Declaring <code>flex-wrap: wrap</code> in Flexbox or using grid repetition utilities like <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))</code>.</li>
                  <li><strong>Fluid Media Elements:</strong> Assigning <code>max-width: 100%</code> and <code>height: auto</code> globally to images to prevent page overflows.</li>
                </ul>
              </div>
            </div>

            {/* Q&A 2: Viewport tag */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                What is the strategic purpose of the HTML5 Viewport Meta Tag?
              </h3>
              
              <div className="pl-7 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  The HTML viewport meta tag is critical for styling. It tells mobile browser rendering engines to match the scale 1:1 with device physical independent pixels, stopping the browser from shrinking page text into unreadable sizes.
                </p>

                {/* Viewport Meta Tag Simulator */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3 border-b pb-2">
                    <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-purple-600" /> Viewport Meta Tag Visualizer
                    </h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-slate-500 font-mono">Viewport Tag:</span>
                      <button
                        onClick={() => setViewportMeta(!viewportMeta)}
                        className={`text-[10px] font-mono px-2 py-1 rounded font-bold cursor-pointer transition-all ${
                          viewportMeta ? "bg-green-600 text-white" : "bg-red-600 text-white"
                        }`}
                      >
                        {viewportMeta ? "ENABLED" : "DISABLED"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border rounded-lg p-3">
                      <div className="text-[10px] font-mono text-slate-400 mb-2">Simulated Smartphone Render</div>
                      <div className="border-4 border-slate-800 rounded-2xl w-[220px] h-[340px] mx-auto overflow-hidden relative bg-slate-50 flex flex-col shadow-inner">
                        {/* Status bar mock */}
                        <div className="bg-slate-900 text-white text-[8px] px-3 py-1 flex justify-between font-mono">
                          <span>10:38 AM</span>
                          <span>📶 🔋 100%</span>
                        </div>

                        {viewportMeta ? (
                          /* Responsive view */
                          <div className="p-3 space-y-2 flex-1 flex flex-col justify-between overflow-y-auto">
                            <div className="space-y-2">
                              <header className="bg-purple-600 text-white p-2 rounded text-center text-xs font-bold">
                                Modern Header
                              </header>
                              <div className="bg-white border p-2 rounded text-[10px] leading-relaxed text-slate-600">
                                <h5 className="font-bold text-slate-900 text-[11px] mb-1">Easy Reading</h5>
                                Text flows naturally at a readable size. It aligns perfectly with the device screen.
                              </div>
                            </div>
                            <button className="bg-purple-600 text-white text-[10px] py-1.5 px-3 rounded font-bold">
                              Interactive Button
                            </button>
                          </div>
                        ) : (
                          /* Non-responsive scale-down desktop view */
                          <div className="origin-top-left scale-[0.35] w-[620px] h-[950px] p-6 space-y-6 absolute top-6 left-1 bg-white">
                            <header className="bg-purple-600 text-white p-4 rounded text-center text-2xl font-bold">
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
                            <button className="bg-purple-600 text-white text-base py-3 px-6 rounded font-bold w-full">
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
                          <div className="text-red-400 mt-1 line-through">
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
              </div>
            </div>
          </div>
        )}

        {selectedSection === "layout-strategy" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6" id="sec-panel-layout">
            <div>
              <span className="text-xs font-bold uppercase font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Topic 5
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-3">
                Advanced Layout Strategy: Positioning, Flexbox & Grid
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Accurate layout architecture relies on using the right positioning, Flexbox alignment, or Grid matrix templates depending on the design dimensions.
              </p>
            </div>

            {/* Positioning property details */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                How do CSS positioning values affect the normal document flow?
              </h3>
              
              <div className="pl-7 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-lg">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 font-mono">
                        <th className="p-2.5 border border-slate-200">Position</th>
                        <th className="p-2.5 border border-slate-200">Viewport / Flow Relationship</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Relative</td>
                        <td className="p-2.5 border border-slate-200">Stays in normal flow; shifted relative to its original spot without disturbing adjacent neighbors.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Absolute</td>
                        <td className="p-2.5 border border-slate-200 text-red-600 font-semibold">Removed from flow; positioned relative to its nearest positioned ancestor.</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Fixed</td>
                        <td className="p-2.5 border border-slate-200 text-red-600 font-semibold">Removed from flow; pinned to a specific coordinate inside the viewport (never scrolls).</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-950">Sticky</td>
                        <td className="p-2.5 border border-slate-200">Behaves normally in flow until a scroll threshold is met, then acts like fixed within parent box boundaries.</td>
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
                      <p className="text-[11px] text-slate-600 leading-relaxed bg-indigo-50 border border-indigo-100 rounded-lg p-3">
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
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-xs bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-mono">Q</span>
                Strategic Evaluation: When should a developer choose Flexbox vs. CSS Grid?
              </h3>
              <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-extrabold text-blue-700 font-mono uppercase tracking-wider mb-2">
                    1D Flexbox (Content-Driven)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Best for **one-dimensional** alignments (a single row OR a single column). Ideal for distributing items based on their content size.
                  </p>
                  <div className="bg-white p-2.5 rounded border text-[11px] font-mono text-slate-700">
                    <span className="text-indigo-600">display</span>: flex;<br />
                    <span className="text-indigo-600">justify-content</span>: space-between;
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-extrabold text-emerald-700 font-mono uppercase tracking-wider mb-2">
                    2D CSS Grid (Layout-Driven)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Best for **two-dimensional** matrix structures (rows AND columns together). Perfect for full dashboard templates.
                  </p>
                  <div className="bg-white p-2.5 rounded border text-[11px] font-mono text-slate-700">
                    <span className="text-indigo-600">display</span>: grid;<br />
                    <span className="text-indigo-600">grid-template-columns</span>: repeat(4, 1fr);
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
