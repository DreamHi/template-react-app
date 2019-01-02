import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Menu, Dropdown, Icon, Row, Col } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

import storage from '../../../utils/storage';
import { ROUTE_LOGIN } from '../../../utils/constants';

const history = createHistory({ forceRefresh: true });

class CNav extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    storage.clearLocalStorage();
    history.push(ROUTE_LOGIN);
  }

  render() {
    const { formatMessage } = this.props.intl;

    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item>{formatMessage({ id: 'logout.button.name' })}</Menu.Item>
      </Menu>
    );

    const user = storage.getUser() || { name: '' };
    const name = `${user.name}`;

    return (
      <Row className="nav">
        <Col span={8}>
          <h2 style={{ color: 'white' }}>Template</h2>
        </Col>
        <Col span={8} offset={8} className="name">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              <i className="icon-user" /> {name} <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

CNav.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CNav);
