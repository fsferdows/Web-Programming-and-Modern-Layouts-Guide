import React, { useState, useEffect } from "react";
import { PLAYGROUND_PRESETS } from "../data/curriculum";
import { RefreshCw, Play, Info, Check, Code2, AlertTriangle, CheckCircle2, Copy, Sparkles } from "lucide-react";

// Real-time Syntax Validation Engine
function validateSyntax(html: string, css: string) {
  const issues: string[] = [];

  // 1. Check bracket closures in HTML
  let openBrackets = 0;
  let closeBrackets = 0;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === "<") openBrackets++;
    if (html[i] === ">") closeBrackets++;
  }
  if (openBrackets !== closeBrackets) {
    issues.push(`Unbalanced tags brackets: found ${openBrackets} opening '<' and ${closeBrackets} closing '>' symbols.`);
  }

  // Count standard HTML element matching
  const tagsToValidate = ["div", "p", "span", "table", "thead", "tbody", "tr", "th", "td", "strong", "em", "h1", "h2", "h3", "h4", "h5", "caption"];
  
  tagsToValidate.forEach((tag) => {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)*>`, "gi");
    const closeRegex = new RegExp(`</${tag}>`, "gi");
    
    const openCount = (html.match(openRegex) || []).length;
    const closeCount = (html.match(closeRegex) || []).length;
    
    if (openCount !== closeCount) {
      issues.push(`Mismatched <${tag}> tags: found ${openCount} opening and ${closeCount} closing </${tag}>.`);
    }
  });

  // 2. Check CSS Braces
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`Unbalanced curly braces in CSS: found ${openBraces} opening '{' and ${closeBraces} closing '}'.`);
  }

  // 3. Simple declaration validation
  const blockMatches = css.match(/\{([^}]*)\}/g) || [];
  blockMatches.forEach((block, blockIdx) => {
    const lines = block.slice(1, -1).split(";");
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.length > 0 && !trimmed.includes(":") && !trimmed.startsWith("/*")) {
        issues.push(`CSS rule warning near block #${blockIdx + 1}: selector rule "${trimmed}" is missing a colon ':' or semicolon ';'.`);
      }
    });
  });

  if (issues.length > 0) {
    return {
      type: "warning" as const,
      message: "Syntax Validation: Warnings Detected",
      details: issues,
    };
  }

  return {
    type: "success" as const,
    message: "Syntax Validation: Perfect Structure",
    details: ["No structural HTML/CSS syntax irregularities found. Excellent structure!"]
  };
}

export default function CodePlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState(() => {
    return localStorage.getItem("playground_selected_preset_id") || PLAYGROUND_PRESETS[0].id;
  });
  
  const currentPreset = PLAYGROUND_PRESETS.find(p => p.id === selectedPresetId) || PLAYGROUND_PRESETS[0];

  const [htmlCode, setHtmlCode] = useState(() => {
    return localStorage.getItem(`playground_html_${selectedPresetId}`) || currentPreset.html;
  });
  const [cssCode, setCssCode] = useState(() => {
    return localStorage.getItem(`playground_css_${selectedPresetId}`) || currentPreset.css;
  });
  const [activeEditorTab, setActiveEditorTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);
  const [copyStates, setCopyStates] = useState<Record<string, "html" | "css" | null>>({});

  // Real-time syntax validation state
  const [syntaxIssues, setSyntaxIssues] = useState(() => validateSyntax(htmlCode, cssCode));

  // Keep track of preset selection in local storage
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    localStorage.setItem("playground_selected_preset_id", id);
  };

  // Sync state with selected preset, honoring saved local changes
  useEffect(() => {
    const savedHtml = localStorage.getItem(`playground_html_${selectedPresetId}`);
    const savedCss = localStorage.getItem(`playground_css_${selectedPresetId}`);
    setHtmlCode(savedHtml !== null ? savedHtml : currentPreset.html);
    setCssCode(savedCss !== null ? savedCss : currentPreset.css);
  }, [selectedPresetId, currentPreset]);

  // Persist code changes dynamically
  useEffect(() => {
    localStorage.setItem(`playground_html_${selectedPresetId}`, htmlCode);
  }, [htmlCode, selectedPresetId]);

  useEffect(() => {
    localStorage.setItem(`playground_css_${selectedPresetId}`, cssCode);
  }, [cssCode, selectedPresetId]);

  // Real-time syntax validation debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = validateSyntax(htmlCode, cssCode);
      setSyntaxIssues(result);
    }, 200);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode]);

  // Combined iframe srcDoc
  const srcDocValue = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  // Quick helper scripts users can click to append
  const applyQuickStyle = (type: string) => {
    if (type === "background") {
      setCssCode(prev => prev + "\n\nbody {\n  background-color: #f0f9ff !important;\n}");
    } else if (type === "border") {
      setCssCode(prev => prev + "\n\n.box, td, p {\n  border: 2px dashed #e11d48 !important;\n}");
    } else if (type === "padding") {
      setCssCode(prev => prev + "\n\n.stat-row, .inventory-table {\n  padding: 2.5rem !important;\n  gap: 20px !important;\n}");
    }
  };

  const copyCodeToClipboard = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPresetSnippet = (id: string, type: "html" | "css", code: string) => {
    navigator.clipboard.writeText(code);
    setCopyStates(prev => ({ ...prev, [id]: type }));
    setTimeout(() => {
      setCopyStates(prev => ({ ...prev, [id]: null }));
    }, 1500);
  };

  return (
    <div className="py-6 space-y-6" id="playground-root">
      {/* Upper header block */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-bold font-mono text-[10px] px-2 py-0.5 rounded uppercase">Interactive Lab</span>
            <h2 className="text-xl font-bold tracking-tight">Vite Live Code Playground</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Edit the HTML and CSS panels below. The sandbox preview rendering container updates in real time using sandboxed iframes. Test specificity rules and structural tags!
          </p>
        </div>

        {/* Preset dropdown */}
        <div className="shrink-0">
          <label className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">Select Study Preset:</label>
          <select
            id="preset-selector"
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="bg-slate-800 text-slate-100 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {PLAYGROUND_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main split work space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="playground-workspace">
        {/* Left Side: Code Editor Controls */}
        <div className="lg:col-span-6 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Editor Header tabs */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <div className="flex space-x-1" id="editor-language-tabs">
              <button
                onClick={() => setActiveEditorTab("html")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeEditorTab === "html" ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setActiveEditorTab("css")}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeEditorTab === "css" ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                style.css
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setHtmlCode(currentPreset.html);
                  setCssCode(currentPreset.css);
                }}
                title="Reset Preset Code"
                className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-950 rounded transition-all cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Revert
              </button>
              <button
                onClick={copyCodeToClipboard}
                className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-950 rounded transition-all cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Code2 className="w-3.5 h-3.5" />} 
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Preset details card */}
          <div className="bg-amber-50/55 p-3 px-4 border-b border-slate-100 text-xs text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <strong>Practice Objective:</strong> {currentPreset.description}
            </div>
          </div>

          {/* Raw Input Editors */}
          <div className="relative flex-1 min-h-[350px]">
            {activeEditorTab === "html" ? (
              <textarea
                value={htmlCode}
                id="html-editor-textarea"
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full min-h-[350px] p-4 font-mono text-xs bg-slate-950 text-slate-100 leading-relaxed resize-none outline-none focus:ring-0"
                spellCheck="false"
              />
            ) : (
              <textarea
                value={cssCode}
                id="css-editor-textarea"
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-full min-h-[350px] p-4 font-mono text-xs bg-slate-950 text-slate-100 leading-relaxed resize-none outline-none focus:ring-0"
                spellCheck="false"
              />
            )}
          </div>

          {/* Real-time Syntax Validation Panel */}
          <div className={`p-3.5 border-t border-slate-200 flex flex-col gap-2 ${
            syntaxIssues.type === "success" ? "bg-emerald-50/50" : "bg-amber-50/70"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-500">
                Live Linter Status
              </span>
              <div className="flex items-center gap-1 text-[11px] font-extrabold">
                {syntaxIssues.type === "success" ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Structures Valid
                  </span>
                ) : (
                  <span className="text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" /> Check Syntax
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              {syntaxIssues.details?.map((detail, index) => (
                <p key={index} className={`text-xs leading-relaxed ${
                  syntaxIssues.type === "success" ? "text-emerald-800 font-medium" : "text-slate-700"
                }`}>
                  • {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Quick interactive snippet injection shortcuts */}
          <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Inject:</span>
            <button
              onClick={() => applyQuickStyle("background")}
              className="px-2 py-1 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 rounded text-[11px] text-slate-700 cursor-pointer transition-all"
            >
              🎨 Add Light-Blue BG
            </button>
            <button
              onClick={() => applyQuickStyle("border")}
              className="px-2 py-1 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 rounded text-[11px] text-slate-700 cursor-pointer transition-all"
            >
              🛑 Add Dashed Red Borders
            </button>
            <button
              onClick={() => applyQuickStyle("padding")}
              className="px-2 py-1 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100 rounded text-[11px] text-slate-700 cursor-pointer transition-all"
            >
              📏 Expand Padding & Gap
            </button>
          </div>
        </div>

        {/* Right Side: Sandboxed Browser Output */}
        <div className="lg:col-span-6 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs h-full min-h-[460px]">
          {/* Screen Output Tab Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
              <span className="text-xs text-slate-500 font-mono pl-1.5">Live Output Render Frame</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-emerald-800 text-emerald-800" /> Active Sandbox
            </span>
          </div>

          {/* Actual sandboxed output frame */}
          <div className="flex-1 bg-white p-1 h-full min-h-[400px]">
            <iframe
              srcDoc={srcDocValue}
              title="Vite Sandbox Target Frame"
              sandbox="allow-scripts"
              className="w-full h-full min-h-[400px] border-none bg-white rounded-md"
              id="live-preview-iframe"
            />
          </div>
        </div>
      </div>

      {/* Chapter Code Snippet Quick-Copy Reference Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden" id="snippet-reference-library">
        <div className="p-5 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              Syllabus Snippets Reference Library
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Instant access to copy code structures directly. Paste them into the editor above or save them to your study notebooks!
            </p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="reference-presets-grid">
          {PLAYGROUND_PRESETS.map((preset) => {
            const hasCopiedHtml = copyStates[preset.id] === "html";
            const hasCopiedCss = copyStates[preset.id] === "css";

            return (
              <div 
                key={preset.id} 
                className="border border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-white p-4 rounded-xl space-y-3.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate font-sans">{preset.title}</h4>
                    <span className="text-[9px] bg-slate-100 border border-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 min-h-[32px]">
                    {preset.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => copyPresetSnippet(preset.id, "html", preset.html)}
                    className={`flex-1 py-1.5 px-2 bg-white border rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      hasCopiedHtml 
                        ? "bg-slate-950 text-amber-300 border-slate-950" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white"
                    }`}
                    title="Copy snippet HTML to Clipboard"
                  >
                    {hasCopiedHtml ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                    <span>{hasCopiedHtml ? "Copied HTML!" : "Copy HTML"}</span>
                  </button>
                  <button
                    onClick={() => copyPresetSnippet(preset.id, "css", preset.css)}
                    className={`flex-1 py-1.5 px-2 bg-white border rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      hasCopiedCss 
                        ? "bg-slate-950 text-amber-300 border-slate-950" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-950 hover:border-slate-950 hover:text-white"
                    }`}
                    title="Copy snippet CSS to Clipboard"
                  >
                    {hasCopiedCss ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                    <span>{hasCopiedCss ? "Copied CSS!" : "Copy CSS"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
