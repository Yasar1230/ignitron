/**
 * TypeScript Data Contracts for AGV Fleet Intelligence Dashboard
 */

export type AGVStatus = "working" | "charging" | "idle" | "warning" | "offline";

export interface AGV {
  id: string;
  type: "flatdeck" | "tugger" | "unitload" | "bodycarrier";
  status: AGVStatus;
  battery: number; // 0 - 100
  soc: number; // 0.0 - 1.0
  battKwh: number;
  currentLocation: string;
  destination: string;
  task: string;
  cargoWeight: number; // kg
  eta: string; // MM:SS
  speed: number; // m/s
  taskProgress: number; // 0 - 100
  route: string | null;
  priority?: "HIGH" | "NORMAL" | "LOW";
  isCoilCharging?: boolean;
  chargingStation?: string;
  lastCharge?: string;
}

export interface ChargingStation {
  id: string;
  code: string;
  name: string;
  short: string;
  status: "available" | "occupied" | "fault";
  currentAgv?: string;
  battery?: number;
  chargingProgress?: number;
  estimatedCompletion?: number; // minutes
  powerKw: number;
}

export interface FleetMetrics {
  totalAgvs: number;
  working: number;
  charging: number;
  idle: number;
  warning: number;
  fleetUtilization: number; // percentage
  avgBatterySoc: number;
}

export interface ActivityEvent {
  id: string;
  time: string;
  message: string;
  kind: "ok" | "fault" | "action" | "info";
  agvId?: string;
}

export interface FleetAlert {
  id: string;
  type: "LOW_BATTERY" | "CHARGING_COMPLETE" | "ROUTE_DELAY" | "STATION_OCCUPIED" | "SAFETY_STOP";
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
}

export interface SimulationScenario {
  id: "normal" | "high-demand" | "coil-bottleneck" | "disruption";
  name: string;
  description: string;
  affectedAgvs: number;
  throughputDelta: string;
  avgDelay: string;
}
