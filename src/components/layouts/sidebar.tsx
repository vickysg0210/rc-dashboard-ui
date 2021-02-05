import React from 'react';
import { Menu } from 'antd'
import { useHistory } from 'react-router';

const SideNav = () => {
  const h = useHistory();

  const handleOverviewClick = () => {
    h.push('/overview');
  }

  const handleRackClick = () => {
    h.push('/rack')
  }

  const handleServerClick = () => {
    h.push('/server')
  }

  return (
     <div>
        <div style={{height: "32px", margin: "16px"}}></div>
            <Menu mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleOverviewClick}>
                    <span> Overview</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleRackClick}>
                    <span> Rack</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleServerClick}>
                    <span> Server</span>
                </Menu.Item>
            </Menu>
      </div>
  )
}

export default SideNav;
