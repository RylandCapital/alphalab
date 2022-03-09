import React from 'react'

import StakingDashboard from './stakingMarket';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/DashBoardDouble'

const DashboardStaking = () => {
  const reports = [
    {
      title: 'Legacy_Staking_TerraStation_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Legacy_Staking_TerraStation_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: 'Prism_yLuna_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Prism_yLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: 'Nexus_nLuna_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Nexus_nLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
  ];
  const reports2 = [
    {
      title: 'Anchor_bLuna_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Anchor_bLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: 'Lido_stLuna_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Lido_stLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: 'Stader_LunaX_APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: 'Stader_LunaX_APR',
      ticker: 'Stader_LunaX_APR',
      action: historical.getHistoricalLiquidStaking,
    },
  ];

  return (
    <Dashboard
      title="Dashboards"
      breadcrumbItem="LUNA STAKING DERIVATIVES"
      headerProps={{
        title: 'Luna Staking Derivatives',
        subTitle: 'Select TimeSeries To Analyze',
        desc: 'Visualize Historical Trends',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2022/03/logo-nobackground-200-2.png'
      }}
      reports={reports}
      reports2={reports2}
      aprTrackers={[StakingDashboard]}
      widgetFormatter={(index) => (data) => {
        
          return Number(data.Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%';
        
      }}
      fieldKey="value"
    />
  );
}

export default DashboardStaking;
