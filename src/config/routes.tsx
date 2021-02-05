//define routes
//define layout

import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from 'antd';


//layout
import SideNav from "../components/layouts/sidebar";

//pages
import Overview from "../components/pages/overview"
import Rack from "../components/pages/rack"
import Server from "../components/pages/server"


const { Content, Sider, Header } = Layout;

const Routes = () =>{

  return(
    <Router>
      <Layout>
        <Sider width={200} style={{background: '#fff'}}>
          <SideNav />
        </Sider>
        <Layout>
          <Header className="siteLayoutBackground" style={{padding: 0, background: "#001529"}}>
          </Header>
          <Content style={{margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
            <Switch>
                <Route exact path="/overview" component={Overview} />
                <Route exact path="/rack" component={Rack} />
                <Route exact path="/server" component={Server} />
                <Redirect to="/overview" from="/" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Routes;
