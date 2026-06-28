import React, { useState, useEffect } from "react";
import { PLAYGROUND_PRESETS } from "../data/curriculum";
import { RefreshCw, Play, Info, Check, Code2 } from "lucide-react";

export default function CodePlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState(PLAYGROUND_PRESETS[0].id);
  
  const currentPreset = PLAYGROUND_PRESETS.find(p => p.id === selectedPresetId) || PLAYGROUND_PRESETS[0];

  const [htmlCode, setHtmlCode] = useState(currentPreset.html);
  const [cssCode, setCssCode] = useState(currentPreset.css);
  const [activeEditorTab, setActiveEditorTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);

  // Sync state with selected preset
  useEffect(() => {
    setHtmlCode(currentPreset.html);
    setCssCode(currentPreset.css);
  }, [selectedPresetId, currentPreset]);

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
            onChange={(e) => setSelectedPresetId(e.target.value)}
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
    </div>
  );
}
