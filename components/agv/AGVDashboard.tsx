"use client";

import React, { useState, useEffect } from "react";
import { AGV, ChargingStation, FleetMetrics, ActivityEvent, FleetAlert } from "../../types/agv";

export interface AGVDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  fleet?: AGV[];
  chargingStations?: ChargingStation[];
  metrics?: FleetMetrics;
  activities?: ActivityEvent[];
  alerts?: FleetAlert[];
  onSelectAgv?: (agvId: string) => void;
  onScenarioChange?: (scenarioId: string) => void;
}

export function AGVDashboard({
  isOpen,
  onClose,
  fleet = [],
  chargingStations = [],
  metrics,
  activities = [],
  alerts = [],
  onSelectAgv,
  onScenarioChange
}: AGVDashboardProps) {
  const [selectedAgv, setSelectedAgv] = useState<AGV | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl p-4 sm:p-6 md:p-8 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-[1600px] h-[90vh] max-h-[920px] rounded-2xl border border-slate-700/50 bg-slate-900/90 shadow-2xl backdrop-blur-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">AGV Fleet Intelligence</h2>
                <span className="px-2 py-0.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">Real-time autonomous material movement</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400">
              Digital Twin Simulation Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top KPI strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 font-mono">TOTAL AGVS</span>
              <div className="text-2xl font-bold text-white mt-1">{metrics?.totalAgvs ?? fleet.length}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-teal-400 font-mono">WORKING</span>
              <div className="text-2xl font-bold text-teal-400 mt-1">{metrics?.working ?? 0}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-sky-400 font-mono">CHARGING</span>
              <div className="text-2xl font-bold text-sky-400 mt-1">{metrics?.charging ?? 0}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-amber-400 font-mono">IDLE</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">{metrics?.idle ?? 0}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-rose-400 font-mono">WARNING</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">{metrics?.warning ?? 0}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[11px] text-emerald-400 font-mono">UTILIZATION</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{metrics?.fleetUtilization ?? 0}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AGVDashboard;
