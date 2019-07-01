import React, { useState, useRef, useMemo, useCallback, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import fromentries from 'fromentries';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const propTypes = forbidExtraProps({
  closeButtonLabel: PropTypes.string,
  disableCatalog: PropTypes.bool,
  hideCatalog: PropTypes.bool,
  id: PropTypes.string,
  itemsLabel: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  removeAllLabel: PropTypes.string,
  selectAllLabel: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
});

const defaultProps = {
  closeButtonLabel: 'Close',
  disableCatalog: false,
  hideCatalog: false,
  id: 'awesome-select',
  itemsLabel: 'items',
  max: 1,
  onChange: () => {},
  options: [],
  removeAllLabel: 'Remove All',
  selectAllLabel: 'Select All',
  value: [],
};

const CHAR_CODE = 'A'.charCodeAt();

function getMatchedSuggestions(suggestions, query = '') {
  const inputValue = query.trim().toLowerCase();
  const inputLength = inputValue.length;
  return suggestions.filter(
    ({ label }) => inputLength === 0 || label.slice(0, inputLength).toLowerCase() === inputValue,
  );
}

function getSuggestions(suggestions, query = '') {
  return getMatchedSuggestions(suggestions, query).reduce(
    (suggestionSet, { label, value }) => ({
      ...suggestionSet,
      [label.slice(0, 1)]: [...(suggestionSet[label.slice(0, 1)] || []), [label, value]],
    }),
    {},
  );
}

function compare(itemA, itemB) {
  if (itemA.label < itemB.label) {
    return -1;
  }
  if (itemA.label > itemB.label) {
    return 1;
  }
  return 0;
}

function AwesomeSelect({
  closeButtonLabel,
  disableCatalog,
  hideCatalog,
  id,
  itemsLabel,
  label,
  max,
  options,
  placeholder,
  removeAllLabel,
  selectAllLabel,
  value,
  onChange,
}) {
  // eslint-disable-next-line no-use-before-define
  const styles = useStyles();
  const initInputValue = useMemo(() => {
    const optionSet = fromentries(
      options.map(({ label: optionLabel, value: optionValue }) => [optionValue, optionLabel]),
    );
    return value.reduce(
      (inputValue, optionValue) => ({
        ...inputValue,
        ...(optionSet[optionValue] && { [optionValue]: optionSet[optionValue] }),
      }),
      {},
    );
  }, [value, options]);
  const sortedOptions = useMemo(() => (disableCatalog ? options : [...options].sort(compare)), [
    options,
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(initInputValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchOptions = useMemo(() => getMatchedSuggestions(sortedOptions, inputValue), [
    sortedOptions,
    inputValue,
  ]);

  const inputRef = useRef();
  const scrollRef = useRef();
  const indexRefs = useMemo(
    () =>
      fromentries(Object.keys(getSuggestions(sortedOptions)).map((index) => [index, createRef()])),
    [sortedOptions],
  );
  useEffect(() => {
    if (selectedItem !== initInputValue) {
      onChange(Object.keys(selectedItem));
    }
  }, [selectedItem]);

  const handleInputChange = useCallback(({ target }) => setInputValue(target.value), []);
  const handleChange = useCallback(
    ([itemLabel, itemValue]) => {
      const { [itemValue]: prevItem, ...otherSelectedItem } = selectedItem;
      const newSelectedItem = {
        ...otherSelectedItem,
        ...(!prevItem && { [itemValue]: itemLabel }),
      };
      setInputValue('');
      setSelectedItem(newSelectedItem);
    },
    [selectedItem],
  );

  const handleDelete = (updatedEntries = []) => {
    setSelectedItem(fromentries(updatedEntries));
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    } else {
      setShowDropdown(true);
    }
  };

  const handleIndexPress = useCallback((selectedIndex) => {
    const refEntries = Object.entries(indexRefs);
    const [scrollTop] = refEntries.reduce(
      ([top, prevTop], [indexChar, { current }]) => {
        if (selectedIndex === indexChar) {
          return [current.offsetTop, current.offsetTop];
        }
        if (selectedIndex > indexChar) {
          return [top, current.offsetTop];
        }
        const midTop = top !== prevTop ? (prevTop + current.offsetTop) / 2 : prevTop;
        return [midTop, midTop];
      },
      [refEntries[refEntries.length - 1][1].current.offsetTop],
    );
    scrollRef.current.scrollTop = scrollTop;
  });

  const handleSelectAll = ({ target }) => {
    const selections = target.checked
      ? searchOptions.reduce(
          (output, { label: optionLabel, value: optionValue }) => ({
            ...output,
            [optionValue]: optionLabel,
          }),
          {},
        )
      : {};
    setSelectedItem(selections);
  };

  return (
    <Downshift
      id={id}
      inputValue={inputValue}
      onChange={handleChange}
      onOuterClick={() => setShowDropdown(false)}
      selectedItem={selectedItem}
      isOpen={showDropdown}
      itemToString={(object) => Object.keys(object)[0]}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps({
          onFocus: handleFocus,
        });
        const selectedEntries = Object.entries(selectedItem2);

        return (
          <div className={styles.container}>
            <TextField
              InputProps={{
                classes: {
                  root: styles.inputRoot,
                  input: styles.inputInput,
                },
                startAdornment: (
                  <React.Fragment>
                    {selectedEntries
                      .slice(0, max <= 0 ? -1 : max - 1)
                      .map(([, selectedItemLabel], idx) => (
                        <Chip
                          key={`selected_${selectedItemLabel}`}
                          tabIndex={-1}
                          label={selectedItemLabel}
                          color="primary"
                          className={styles.chip}
                          onDelete={() =>
                            handleDelete([
                              ...selectedEntries.slice(0, idx),
                              ...selectedEntries.slice(idx + 1),
                            ])
                          }
                        />
                      ))}
                    {max > 0 && selectedEntries.length >= max && (
                      <Chip
                        tabIndex={-1}
                        label={
                          selectedEntries.length > max
                            ? `${selectedEntries.length - max + 1} ${itemsLabel}`
                            : selectedEntries[max - 1][1]
                        }
                        color="primary"
                        className={styles.chip}
                        onDelete={() => handleDelete(selectedEntries.slice(0, max - 1))}
                      />
                    )}
                    <Chip
                      key="add_option_button"
                      tabIndex={-1}
                      color="primary"
                      label={<AddIcon />}
                      variant="outlined"
                      className={styles.addChip}
                      clickable
                      onClick={onFocus}
                    />
                  </React.Fragment>
                ),
                onBlur,
                onFocus,
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
              label={label}
              placeholder={placeholder}
            />
            {isOpen && (
              <Paper className={styles.paper} square>
                {!hideCatalog && !disableCatalog && (
                  <div id="catalog_buttons" className={styles.catalog}>
                    {Array(26)
                      .fill('')
                      .map((_, index) => (
                        <Button
                          // eslint-disable-next-line react/no-array-index-key
                          key={`index_button_${index}`}
                          variant="text"
                          className={styles.catalogItem}
                          onClick={() => handleIndexPress(String.fromCharCode(CHAR_CODE + index))}
                        >
                          {String.fromCharCode(CHAR_CODE + index)}
                        </Button>
                      ))}
                  </div>
                )}
                <div className={styles.resultContainer}>
                  <div className={styles.searchContainer}>
                    <div className={styles.searchInputContainer}>
                      <InputBase
                        placeholder="Search"
                        className={styles.searchInput}
                        autoFocus
                        inputRef={inputRef}
                        onChange={(event) => {
                          handleInputChange(event);
                          onChange(event);
                        }}
                        {...inputProps}
                      />
                      <SearchIcon className={styles.searchIcon} />
                    </div>
                    <div className={styles.selectAllContainer}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            value=""
                            checked={selectedEntries.length === searchOptions.length}
                          />
                        }
                        label={selectAllLabel}
                        onClick={handleSelectAll}
                      />
                      <Button
                        className={styles.iconButton}
                        aria-label={removeAllLabel}
                        size="small"
                        variant="outlined"
                        onClick={() => handleDelete()}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                  <div className={styles.optionContainer} ref={scrollRef}>
                    <FormGroup>
                      {Object.entries(getSuggestions(sortedOptions, inputValue2)).map(
                        ([indexChar, suggestion]) => (
                          <React.Fragment key={`suggestion_index_${indexChar}`}>
                            <div ref={indexRefs[indexChar]} />
                            {!disableCatalog && (
                              <div className={styles.indexHeaderContainer}>
                                <Typography variant="subtitle1" className={styles.indexHeader}>
                                  {indexChar}
                                </Typography>
                              </div>
                            )}
                            {suggestion.map(([suggestionLabel, suggestionValue]) => (
                              <FormControlLabel
                                key={`suggestion_${suggestionLabel}`}
                                control={
                                  <Checkbox
                                    {...getItemProps({ item: [suggestionLabel, suggestionValue] })}
                                    color="primary"
                                    checked={Boolean(selectedItem2[suggestionValue])}
                                    value={suggestionValue || suggestionLabel}
                                  />
                                }
                                label={suggestionLabel}
                                className={styles.optionItems}
                              />
                            ))}
                          </React.Fragment>
                        ),
                      )}
                    </FormGroup>
                  </div>
                  <div className={styles.resetButton}>
                    <Button
                      aria-label={closeButtonLabel}
                      color="primary"
                      onClick={() => setShowDropdown(false)}
                      fullWidth
                      disableRipple
                      autoCapitalize="none"
                    >
                      {closeButtonLabel}
                    </Button>
                  </div>
                </div>
              </Paper>
            )}
          </div>
        );
      }}
    </Downshift>
  );
}

AwesomeSelect.propTypes = propTypes;
AwesomeSelect.defaultProps = defaultProps;

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 400,
  },
  addChip: {
    borderWidth: 2,
    margin: theme.spacing(0.5, 0.5, 1),
    width: 32,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25, 1),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  catalog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `1px ${theme.palette.grey['400']} solid`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  catalogItem: {
    ...theme.typography.caption,
    minWidth: 10,
    padding: theme.spacing(0, 1.5),
  },
  resultContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    margin: theme.spacing(1, 1.5, 0),
    borderRadius: 4,
    borderColor: theme.palette.grey['400'],
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: theme.palette.grey['100'],
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    paddingLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    fontSize: 24,
    paddingRight: theme.spacing(1),
    color: theme.palette.grey['600'],
  },
  selectAllContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 1.5, 0),
  },
  iconButton: {
    minWidth: 0,
    height: 36,
    paddingLeft: 4,
    paddingRight: 4,
    boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
  },
  optionContainer: {
    position: 'absolute',
    top: 100,
    height: `calc(100% - ${100 + 54}px)`,
    width: '100%',
    borderTop: `1px ${theme.palette.grey['400']} solid`,
    overflow: 'auto',
  },
  optionItems: {
    padding: theme.spacing(0, 1.5),
  },
  resetButton: {
    borderTop: `1px ${theme.palette.grey['400']} solid`,
    padding: theme.spacing(1),
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

export default AwesomeSelect;
