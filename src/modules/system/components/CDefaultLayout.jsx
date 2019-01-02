import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import CNav from './CNav';

const { Header, Content } = Layout;

class CDefaultLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <CNav />
        </Header>
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

CDefaultLayout.defaultProps = {
  children: null,
};

CDefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default CDefaultLayout;
