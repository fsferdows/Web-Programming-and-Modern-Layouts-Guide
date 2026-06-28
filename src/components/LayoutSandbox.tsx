import React, { useState } from "react";
import { Copy, Check, Sparkles, Sliders, LayoutGrid, Rows, Layers, Eye } from "lucide-react";

export default function LayoutSandbox() {
  const [activeEngine, setActiveEngine] = useState<"flex" | "grid">("flex");
  const [visualMode, setVisualMode] = useState<boolean>(true);

  // Flexbox parameters
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [justifyContent, setJustifyContent] = useState<"flex-start" | "center" | "flex-end" | "space-between" | "space-around">("space-between");
  const [alignItems, setAlignItems] = useState<"flex-start" | "center" | "flex-end" | "stretch">("center");
  const [flexGap, setFlexGap] = useState<"4px" | "10px" | "20px" | "35px">("10px");
  const [flexItemCount, setFlexItemCount] = useState(4);

  // Grid parameters
  const [gridCols, setGridCols] = useState<"repeat(4, 1fr)" | "repeat(2, 1fr)" | "1fr 2fr 1fr" | "repeat(3, 1fr)">("repeat(4, 1fr)");
  const [gridGap, setGridGap] = useState<"4px" | "12px" | "24px">("12px");
  const [gridItemCount, setGridItemCount] = useState(4);

  const [copied, setCopied] = useState(false);

  // Format code display blocks
  const getFlexCode = () => {
    return `.stat-row {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${flexGap};
}

.box {
  flex: 1; /* evenly distributes content */
  padding: 1rem;
}`;
  };

  const getGridCode = () => {
    return `.stat-row {
  display: grid;
  grid-template-columns: ${gridCols};
  gap: ${gridGap};
}

.box {
  padding: 1rem;
}`;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6 space-y-6" id="layout-lab-root">
      {/* Intro card banner */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
        <div className="flex items-center space-x-3 mb-2" id="lab-banner">
          <div className="bg-slate-900 text-white p-2 rounded-lg">
            <Sliders className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Tactile Visual Layout Lab</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">FLEXBOX VS CSS GRID SIMULATION ENGINE</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Toggle CSS properties on the left to control live stat card layouts. Compare how 1-dimensional Flexbox distributes elements based on content versus how 2-dimensional CSS Grid anchors alignments into rigid columns.
        </p>

        {/* Engine switcher tabs */}
        <div className="flex gap-2 mt-5" id="engine-tabs">
          <button
            onClick={() => setActiveEngine("flex")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase cursor-pointer border transition-all ${
              activeEngine === "flex"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Rows className="w-4 h-4" />
            <span>1D Flexbox Alignment</span>
          </button>
          <button
            onClick={() => setActiveEngine("grid")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase cursor-pointer border transition-all ${
              activeEngine === "grid"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>2D CSS Grid Matrix</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="lab-workspace">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-4" id="lab-controls">
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
              {activeEngine === "flex" ? "Flexbox Alignment Controls" : "CSS Grid Matrix Controls"}
            </h3>

            {activeEngine === "flex" ? (
              /* FLEX CONTROLS */
              <div className="space-y-4" id="flex-controls-list">
                {/* flex-direction */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">flex-direction</label>
                  <div className="grid grid-cols-2 gap-1">
                    {["row", "row-reverse", "column", "column-reverse"].map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setFlexDirection(dir as any)}
                        className={`text-[10px] font-mono p-1.5 rounded-md border text-center cursor-pointer capitalize ${
                          flexDirection === dir ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* justify-content */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">justify-content</label>
                  <div className="flex flex-col gap-1">
                    {["flex-start", "center", "flex-end", "space-between", "space-around"].map((jc) => (
                      <button
                        key={jc}
                        onClick={() => setJustifyContent(jc as any)}
                        className={`text-[10px] font-mono p-1.5 rounded-md border text-left px-3 cursor-pointer ${
                          justifyContent === jc ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {jc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* align-items */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">align-items</label>
                  <div className="grid grid-cols-2 gap-1">
                    {["flex-start", "center", "flex-end", "stretch"].map((ai) => (
                      <button
                        key={ai}
                        onClick={() => setAlignItems(ai as any)}
                        className={`text-[10px] font-mono p-1.5 rounded-md border text-center cursor-pointer ${
                          alignItems === ai ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {ai}
                      </button>
                    ))}
                  </div>
                </div>

                {/* gap */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">gap size</label>
                  <div className="grid grid-cols-4 gap-1">
                    {["4px", "10px", "20px", "35px"].map((gap) => (
                      <button
                        key={gap}
                        onClick={() => setFlexGap(gap as any)}
                        className={`text-[10px] font-mono p-1.5 rounded-md border text-center cursor-pointer ${
                          flexGap === gap ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {gap}
                      </button>
                    ))}
                  </div>
                </div>

                {/* item count */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 font-mono">item count</label>
                    <span className="text-xs font-bold text-slate-500 font-mono">{flexItemCount} boxes</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={flexItemCount}
                    onChange={(e) => setFlexItemCount(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              /* GRID CONTROLS */
              <div className="space-y-4" id="grid-controls-list">
                {/* grid-template-columns */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">grid-template-columns</label>
                  <div className="flex flex-col gap-1">
                    {[
                      { val: "repeat(4, 1fr)", label: "4 Equal Columns" },
                      { val: "repeat(2, 1fr)", label: "2 Equal Columns" },
                      { val: "repeat(3, 1fr)", label: "3 Equal Columns" },
                      { val: "1fr 2fr 1fr", label: "Weighted (1fr 2fr 1fr)" }
                    ].map((col) => (
                      <button
                        key={col.val}
                        onClick={() => setGridCols(col.val as any)}
                        className={`text-[10px] font-mono p-2 rounded-md border text-left px-3 cursor-pointer ${
                          gridCols === col.val ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {col.label} <code className="text-[9px] block text-slate-400 font-normal">{col.val}</code>
                      </button>
                    ))}
                  </div>
                </div>

                {/* gap */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-mono">grid gap size</label>
                  <div className="grid grid-cols-3 gap-1">
                    {["4px", "12px", "24px"].map((gap) => (
                      <button
                        key={gap}
                        onClick={() => setGridGap(gap as any)}
                        className={`text-[10px] font-mono p-1.5 rounded-md border text-center cursor-pointer ${
                          gridGap === gap ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {gap}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Item Count */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 font-mono">item count</label>
                    <span className="text-xs font-bold text-slate-500 font-mono">{gridItemCount} boxes</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={gridItemCount}
                    onChange={(e) => setGridItemCount(Number(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* live code viewer block */}
          <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-850 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Computed CSS Output</span>
              <button
                onClick={() => copyCode(activeEngine === "flex" ? getFlexCode() : getGridCode())}
                className="text-[10px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 font-mono text-[10px] leading-relaxed text-blue-300 overflow-x-auto whitespace-pre">
              {activeEngine === "flex" ? getFlexCode() : getGridCode()}
            </pre>
          </div>
        </div>

        {/* Live Visual Canvas Area */}
        <div className="lg:col-span-8 bg-slate-100 border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-inner min-h-[350px]" id="lab-canvas">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">
                Visual Canvas ({activeEngine.toUpperCase()})
              </span>
              <div className="flex items-center gap-2.5">
                {/* Visual Box Model Outlines Switch */}
                <button
                  onClick={() => setVisualMode(!visualMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                    visualMode 
                      ? "bg-amber-500 border-amber-600 text-slate-950 shadow-xs" 
                      : "bg-white hover:bg-slate-55 text-slate-700 border-slate-200"
                  }`}
                  id="toggle-visual-box-model"
                  title="Draw colored boundaries representing margins, borders, and padding dimensions"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Visual Box Mode: {visualMode ? "ON" : "OFF"}</span>
                </button>
                <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-lg font-mono text-slate-600 hidden sm:inline">
                  Resizes fluidly
                </span>
              </div>
            </div>

            {/* Box Model Interactive Legend */}
            {visualMode && (
              <div className="mb-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-medium" id="box-model-legend">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-orange-400 rounded-xs border border-orange-500 shrink-0"></span>
                  <span className="text-slate-700 font-mono">Margin (Orange Outlines)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-xs shrink-0"></span>
                  <span className="text-slate-700 font-mono">Border (Solid Blue Line)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-100 border border-emerald-400 border-dashed rounded-xs shrink-0"></span>
                  <span className="text-slate-700 font-mono">Padding (Green Spacing)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-xs shrink-0"></span>
                  <span className="text-slate-700 font-mono">Element (Red Border)</span>
                </div>
              </div>
            )}

            {/* Simulated Frame */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-xs min-h-[220px] flex flex-col justify-center">
              {activeEngine === "flex" ? (
                /* Flexbox Simulated Element Group */
                <div
                  style={{
                    display: "flex",
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    gap: flexGap,
                    width: "100%",
                    minHeight: "150px",
                    border: visualMode ? "3px solid #3b82f6" : "2px dashed #cbd5e1",
                    outline: visualMode ? "4px solid rgba(249, 115, 22, 0.45)" : "none",
                    outlineOffset: visualMode ? "4px" : "0",
                    borderRadius: "8px",
                    padding: visualMode ? "24px" : "8px",
                    backgroundColor: visualMode ? "rgba(34, 197, 94, 0.08)" : "transparent",
                    position: "relative"
                  }}
                  className="transition-all duration-300"
                  id="canvas-flexbox-container"
                >
                  {visualMode && (
                    <span className="absolute -top-3.5 left-2 bg-blue-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider z-20">
                      Parent (.container)
                    </span>
                  )}
                  {Array.from({ length: flexItemCount }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-600 text-white p-3 rounded-md shadow-sm transition-all duration-300 text-left min-w-[70px] shrink-0 relative"
                      style={{
                        flex: 1,
                        minHeight: "60px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        border: visualMode ? "2px solid #ef4444" : "none",
                        outline: visualMode ? "2px solid rgba(249, 115, 22, 0.3)" : "none",
                        outlineOffset: "2px"
                      }}
                    >
                      {visualMode && (
                        <span className="absolute top-1 left-1 font-mono text-[8px] bg-indigo-950 text-indigo-300 px-1 rounded font-bold">
                          Child {idx + 1}
                        </span>
                      )}
                      <h4 className="text-[10px] font-semibold text-indigo-200 uppercase font-mono mt-1">Stat Box {idx + 1}</h4>
                      <p className="text-xs font-bold mt-0.5 leading-none">{(idx + 1) * 125}</p>
                    </div>
                  ))}
                </div>
              ) : (
                /* CSS Grid Simulated Element Group */
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    gap: gridGap,
                    width: "100%",
                    minHeight: "150px",
                    border: visualMode ? "3px solid #3b82f6" : "2px dashed #cbd5e1",
                    outline: visualMode ? "4px solid rgba(249, 115, 22, 0.45)" : "none",
                    outlineOffset: visualMode ? "4px" : "0",
                    borderRadius: "8px",
                    padding: visualMode ? "24px" : "8px",
                    backgroundColor: visualMode ? "rgba(34, 197, 94, 0.08)" : "transparent",
                    position: "relative"
                  }}
                  className="transition-all duration-300"
                  id="canvas-grid-container"
                >
                  {visualMode && (
                    <span className="absolute -top-3.5 left-2 bg-blue-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider z-20">
                      Parent (.grid-container)
                    </span>
                  )}
                  {Array.from({ length: gridItemCount }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-600 text-white p-3 rounded-md shadow-sm transition-all duration-300 text-left min-h-[60px] flex flex-col justify-center relative"
                      style={{
                        border: visualMode ? "2px solid #ef4444" : "none",
                        outline: visualMode ? "2px solid rgba(249, 115, 22, 0.3)" : "none",
                        outlineOffset: "2px"
                      }}
                    >
                      {visualMode && (
                        <span className="absolute top-1 left-1 font-mono text-[8px] bg-emerald-950 text-emerald-300 px-1 rounded font-bold">
                          Child {idx + 1}
                        </span>
                      )}
                      <h4 className="text-[10px] font-semibold text-emerald-200 uppercase font-mono mt-1">Cell {idx + 1}</h4>
                      <p className="text-xs font-bold mt-0.5 leading-none font-mono">GRID_{idx + 1}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick analysis box */}
          <div className="mt-4 p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <strong>Evaluation Guide:</strong>{" "}
              {activeEngine === "flex" ? (
                <span>
                  Flexbox aligns columns natively in a 1-dimensional row. Notice how changing <code>justify-content</code> automatically controls how empty white space wraps around or between boxes across horizontal streams.
                </span>
              ) : (
                <span>
                  CSS Grid establishes a rigid, mathematical 2-dimensional cell block frame. Regardless of stat text contents, boxes snap perfectly into alignment along vertical and horizontal column matrices.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
