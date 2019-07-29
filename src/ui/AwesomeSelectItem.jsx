import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const propTypes = forbidExtraProps({
  id: PropTypes.string,
  indexChar: PropTypes.string,
  checked: PropTypes.bool,
  suggestionLabel: PropTypes.string,
  suggestionValue: PropTypes.string,
  role: PropTypes.string,
  'aria-selected': PropTypes.bool,
  onMouseMove: PropTypes.func,
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
});

const defaultProps = {
  checked: false,
};

function AwesomeSelectItem({ indexChar, suggestionLabel, suggestionValue, checked, ...itemProps }) {
  // eslint-disable-next-line no-use-before-define
  const styles = useStyles();

  if (indexChar) {
    return (
      <div className={styles.indexHeaderContainer}>
        <Typography variant="subtitle1" className={styles.indexHeader}>
          {indexChar}
        </Typography>
      </div>
    );
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...itemProps}
          color="primary"
          checked={checked}
          value={suggestionValue || suggestionLabel}
        />
      }
      label={suggestionLabel}
      className={styles.optionItems}
    />
  );
}

AwesomeSelectItem.propTypes = propTypes;
AwesomeSelectItem.defaultProps = defaultProps;

const useStyles = makeStyles((theme) => ({
  optionItems: {
    padding: theme.spacing(0, 1.5),
  },
  indexHeader: {
    margin: theme.spacing(0, 1.5),
    borderBottom: `1px ${theme.palette.grey['200']} solid`,
  },
  indexHeaderContainer: {
    top: 0,
    position: 'sticky',
    zIndex: 99,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 0, 0),
  },
}));

export default AwesomeSelectItem;
