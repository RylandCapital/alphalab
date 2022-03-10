import React from 'react'

import StakingDashboard from './stakingMarket';
import historical from '../../api/v1/historical';

import Dashboard from '../../components/DashBoardDouble'

const DashboardStaking = () => {
  const reports = [
    {
      title: 'Legacy Staking TerraStation APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Legacy_Staking_TerraStation_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: <a href='https://prismprotocol.app/stake'target="_blank" rel="noreferrer noopener"> <u>Prism yLuna APR</u></a>,
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Prism_yLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: <a href='https://terra.nexusprotocol.app/vaults'target="_blank" rel="noreferrer noopener"> <u>Nexus nLuna APR</u></a>,
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Nexus_nLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
  ];
  const reports2 = [
    {
      title: 'Anchor bLuna APR',
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Anchor_bLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title: <a href='https://lido.fi/terra'target="_blank" rel="noreferrer noopener"> <u>Lido stLuna APR</u></a>,
      imageUrl: '//whitelist.mirror.finance/images/Luna.png',
      value: '',
      ticker: 'Lido_stLuna_APR',
      action: historical.getHistoricalLiquidStaking,
    },
    {
      title:  <a href='https://terra.staderlabs.com/lt-pools'target="_blank" rel="noreferrer noopener"> <u>Stader LunaX APR</u></a>,
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
        subtitle2: 'Stake & Chill',
        imgSrc: '//alphadefi.fund/wp-content/uploads/2022/03/logo-original-1000-ps_ccexpress.png'
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
