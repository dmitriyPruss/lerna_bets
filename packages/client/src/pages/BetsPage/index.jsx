import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import BetForm from '../../components/BetForm';
import BetsList from '../../components/BetsList';
import { changeThemeAction } from '../../actions';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styles from './BetsPage.module.scss';

function BetsPage (props) {
  const { theme, length } = useSelector(state => ({
    theme: state.theme.theme,
    length: state.betsLoad.bets.length
  }));
  const dispatch = useDispatch();
  const changeTheme = bindActionCreators(changeThemeAction, dispatch);

  const formClasses = {
    inputData: styles.inputData,
    selectItem: styles.selectItem
  };

  const listClasses = {
    itemsContainer: styles.itemsContainer,
    listItemLight: styles.listItemLight,
    listItemDark: styles.listItemDark,
    textContainer: styles.textContainer
  };

  return (
    <div className={theme ? styles.containerLight : styles.containerDark}>
      <h1 className={theme ? styles.headerLight : styles.headerDark}>
        <StarOutlineIcon
          style={
            theme
              ? { fontSize: '45px', color: 'rgb(158, 228, 221)' }
              : { fontSize: '45px', color: 'rgb(52, 52, 52)' }
          }
        />
        Autorace. {length} last bets
        <StarOutlineIcon
          style={
            theme
              ? { fontSize: '45px', color: 'rgb(158, 228, 221)' }
              : { fontSize: '45px', color: 'rgb(52, 52, 52)' }
          }
        />
      </h1>
      <Button
        className={styles.themeButton}
        variant={theme ? 'outline-info' : 'outline-danger'}
        onClick={changeTheme}
      >
        Change Theme
      </Button>
      <section
        className={
          theme ? styles.mainContainerDataLight : styles.mainContainerDataDark
        }
      >
        <BetForm formClasses={formClasses} />
        <BetsList listClasses={listClasses} />
      </section>
    </div>
  );
}

export default BetsPage;
