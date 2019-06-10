import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { Card, Heading } from 'evergreen-ui';
import ColumnRow from '../ui/ColumnRow';
import Column from '../ui/Column';
import TextRow from '../ui/TextRow';
import Button from '../ui/Button';
import ButtonGroup from '../ui/ButtonGroup';

const propTypes = forbidExtraProps({});

const defaultProps = {};

function DetailView(props) {
  return (
    <React.Fragment>
      <Heading size={700}>Products</Heading>
      <br />
      <Card elevation={2} background="white" border="default">
        <ColumnRow>
          <Column>
            <TextRow label="Name" title="Advertiser one" />
          </Column>
        </ColumnRow>
        <ColumnRow>
          <Column>
            <TextRow label="Title" title="Sr. Program Manager" />
          </Column>
          <Column>
            <TextRow label="Timezone" title="PST" />
          </Column>
        </ColumnRow>
        <ButtonGroup large>
          <Button primary>Apply</Button>
          <Button secondary>Cancel</Button>
        </ButtonGroup>
      </Card>
    </React.Fragment>
  );
}

DetailView.propTypes = propTypes;
DetailView.defaultProps = defaultProps;

export default DetailView;
