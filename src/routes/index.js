import React from "react";
import { Redirect } from "react-router-dom";

import Dashboard from "../pages/Dashboard/index";
import DashboardCrypto from "../pages/Dashboard-SpreadTracker/index";
import DashboardAnchor from "../pages/Dashboard-Anchor/index";
import DashboardNexus from "../pages/Dashboard-Nexus/index";
import DashboardTerra from "../pages/Dashboard-terradash/index";
import DashboardFarmers from "../pages/Dashboard-FarmersMarket/index";
import DashboardStaking from "../pages/Dashboard-StakingMarket/index";
import DashboardLiqProfile from "../pages/Dashboard-LiqProfile/index";

// FeeStation

import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // moved from  private
  { path: "/dashboard", component: Dashboard },
  { path: "/terradash", component: DashboardTerra },
  { path: "/anchor", component: DashboardAnchor },
  { path: "/nexus", component: DashboardNexus },

  { path: "/spread-tracker", component: DashboardCrypto },
  { path: "/farmers-market", component: DashboardFarmers },
  { path: "/staking-market", component: DashboardStaking },
  { path: "/liq-profile", component: DashboardLiqProfile },
];

export { authProtectedRoutes, publicRoutes };
