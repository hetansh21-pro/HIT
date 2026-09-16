import React, { useState } from 'react';
import { Search, Database, FileSpreadsheet, Check, Zap, AlertTriangle, Share2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SampleItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  warehouse: string;
}

const SAMPLE_INVENTORY: SampleItem[] = [
  { id: '1', sku: 'PLY-18-BWP', name: '18mm BWP Marine Grade Plywood', category: 'Plywood', stock: 420, price: 1120, warehouse: 'Godown 1 (Rack A-4)' },
  { id: '2', sku: 'PLY-12-COM', name: '12mm Commercial MR Plywood', category: 'Plywood', stock: 180, price: 728, warehouse: 'Godown 2 (Rack B-2)' },
  { id: '3', sku: 'LAM-08-MAT', name: '0.8mm Matte White Finish Laminate', category: 'Laminates', stock: 65, price: 540, warehouse: 'Godown 1 (Rack C-1)' },
  { id: '4', sku: 'HDW-SS-HNG', name: 'SS 304 Soft Close Hydraulic Hinges (Pair)', category: 'Hardware', stock: 850, price: 310, warehouse: 'Hardware Room' },
  { id: '5', sku: 'GLU-SH-50K', name: 'Synthetic Resin Adhesive (50kg Drum)', category: 'Adhesives', stock: 24, price: 4600, warehouse: 'Chemical Bay' },
];

export const ExcelToCatalogVisualizer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = SAMPLE_INVENTORY.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = (id: string) => {
    sound.playSuccess();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="w-full bg-[#0E1424]/90 border border-slate-800 rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Data Modernization
            </span>
            <span className="text-xs text-slate-400">Excel / WhatsApp ➔ Structured AI Catalog</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white">
            Transform 5,000+ SKU Excel Chaos into an Instant AI Searchable Database
          </h4>
        </div>

        {/* Before / After Toggle */}
        <div className="flex items-center bg-[#070B14] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('before');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'before'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Before (Excel Chaos)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('after');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'after'
                ? 'bg-[#FF1E42] text-white shadow-md shadow-red-950/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#EEFF41]" />
            After (HIT AI Catalog)
          </button>
        </div>
      </div>

      {viewMode === 'before' ? (
        /* The "Before" view - Raw messy excel simulator */
        <div className="bg-[#0B101D] rounded-2xl border border-red-900/30 p-5">
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 border border-amber-500/20 px-3 py-2 rounded-xl mb-4">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Real business problem: 5,000 products spread across 12 unlinked Excel files, outdated dealer rate lists, and stock mismatches.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[#121B2F] text-slate-400 border-b border-slate-800">
                  <th className="p-2.5">Row</th>
                  <th className="p-2.5">Item_Desc (Raw Text)</th>
                  <th className="p-2.5">Stock_Status</th>
                  <th className="p-2.5">Rate_Old</th>
                  <th className="p-2.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-2.5 text-slate-500">142</td>
                  <td className="p-2.5 text-red-300">ply 18 mm gurjan marine bwp ??</td>
                  <td className="p-2.5 text-amber-400">call godown to check</td>
                  <td className="p-2.5">₹1100 (March 2024?)</td>
                  <td className="p-2.5 text-slate-500">dealer asking discount</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-500">143</td>
                  <td className="p-2.5 text-red-300">18-bwp-plywood</td>
                  <td className="p-2.5">???</td>
                  <td className="p-2.5">₹1150</td>
                  <td className="p-2.5 text-slate-500">duplicate entry?</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-500">144</td>
                  <td className="p-2.5 text-red-300">comm ply 12mm mr</td>
                  <td className="p-2.5 text-amber-400">150 or 200 sheets left</td>
                  <td className="p-2.5">₹720</td>
                  <td className="p-2.5 text-slate-500">GST not added</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Result: 20-30 minute delay per dealer inquiry + lost sales</span>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('after');
              }}
              className="text-[#FF5E78] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              See the AI Fix ➔
            </button>
          </div>
        </div>
      ) : (
        /* The "After" view - Live interactive catalog search */
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Try searching: '18mm', 'Marine', 'Hinges', 'Godown 1'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B101D] border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1E42] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 shrink-0">Quick Filters:</span>
            {['All', '18mm', 'Plywood', 'Hardware', 'Godown 1'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  sound.playClick();
                  setSearchQuery(tag === 'All' ? '' : tag);
                }}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 ${
                  (tag === 'All' && !searchQuery) || searchQuery === tag
                    ? 'bg-[#FF1E42]/20 border-[#FF1E42] text-white font-semibold'
                    : 'bg-[#10172A] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Catalog Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0B101D] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#DFFF00] bg-slate-800/80 px-2 py-0.5 rounded">
                        {item.sku}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {item.stock} in stock
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white leading-snug">{item.name}</h5>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-blue-400" />
                      {item.warehouse}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Unit Price (ex. GST)</span>
                      <span className="text-sm font-bold text-white font-mono">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => handleCopyLink(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Shared!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>WhatsApp Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
                No items found for "{searchQuery}". Try searching "Plywood" or "Hardware".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
