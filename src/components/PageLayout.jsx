import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Pane, Popover, Position, Menu } from 'evergreen-ui';

import Text from '../ui/Text';
import Title from '../ui/Title';
import Button from '../ui/Button';
import ButtonGroup from '../ui/ButtonGroup';
import Spacing from '../ui/Spacing';
import TextRow from '../ui/TextRow';
import ColumnRow from '../ui/ColumnRow';
import Column from '../ui/Column';

import { withStyles, withStylesPropTypes, css } from '../withStyles';

const propsTypes = {
  ...withStylesPropTypes,
  children: PropTypes.node.isRequired,
};

function PageLayout({ styles, children }) {
  return (
    <div {...css(styles.body)}>
      <div {...css(styles.nav)}>
        <Pane padding={16} display="flex" alignItems="center">
          <Title level={2}>SK Telecom</Title>
        </Pane>
      </div>
      <div {...css(styles.sidebar)}>
        <Pane padding={16}>
          <Pane paddingTop={4} paddingBottom={4}>
            <Popover
              position={Position.BOTTOM_LEFT}
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item>Share...</Menu.Item>
                    <Menu.Item>Move...</Menu.Item>
                    <Menu.Item>Rename...</Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <Button
                iconBefore="plus"
                appearance="primary"
                width="100%"
                alignItems="center"
                justifyContent="flex-start"
                height={40}
                primary
              >
                New
              </Button>
            </Popover>
          </Pane>
          <Menu>
            <Menu.Group>
              <Menu.Item icon="cell-tower">
                <Text>Advertisers</Text>
              </Menu.Item>
              <Menu.Item icon="box" intent="info">
                <Text primary bold>
                  Products
                </Text>
              </Menu.Item>
              <Menu.Item icon="lightbulb">
                <Text>Campaigns</Text>
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />

            <Menu.Group>
              <Menu.Item icon="cell-tower">
                <Text>Teams</Text>
              </Menu.Item>
            </Menu.Group>
          </Menu>
          {false && (
            <React.Fragment>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="cell-tower" marginRight={8} color="default" />
                <Text>Advertisers</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="box" marginRight={8} color="default" />
                <Text>Products</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="lightbulb" marginRight={8} color="default" />
                <Text>Campaigns</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="projects" marginRight={8} color="default" />
                <Text>Creative Groups</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="media" marginRight={8} color="default" />
                <Text>Creatives</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="link" marginRight={8} color="default" />
                <Text>Tracking Links</Text>
              </Pane>
              <Pane paddingTop={4} paddingBottom={4} display="flex" alignItems="center">
                <Icon icon="people" marginRight={8} color="default" />
                <Text>Audiences</Text>
              </Pane>
            </React.Fragment>
          )}
        </Pane>
      </div>
      <div {...css(styles.container)}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = propsTypes;

export default withStyles(({ color, font }) => ({
  body: {
    backgroundColor: '#f1f6ff',
    height: '100%',
  },
  container: {
    marginLeft: 280,
    padding: 8,
    paddingTop: 58,
    paddingBottom: 32,
  },
  content: {
    position: 'relative',
    padding: 10,
  },
  nav: {
    position: 'fixed',
    width: '100%',
    height: 50,
    zIndex: 99,
    backgroundColor: '#f1f6ff',
  },
  sidebar: {
    position: 'fixed',
    height: '100%',
    width: 280,
    paddingTop: 50,
  },
}))(PageLayout);
