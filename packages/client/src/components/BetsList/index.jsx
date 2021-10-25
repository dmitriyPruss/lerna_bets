import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../actions';
import BetListItem from './BetListItem';

function BetsList (props) {
  const {
    theme: { theme },
    betsLoad: { isFetching, error, bets }
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const {
    getBetsAction,
    updateBetAction,
    deleteBetAction
  } = bindActionCreators(actionCreators, dispatch);

  const {
    listClasses: { itemsContainer }
  } = props;

  useEffect(() => {
    getBetsAction();
  }, [bets.length]);

  const mapBet = ({ id, team, betValue, isWinned }, index) => {
    const checkBetHandler = () => {
      updateBetAction(id, { isWinned });
    };

    const deleteBetHandler = () => {
      deleteBetAction(id);
    };

    return (
      <BetListItem
        key={id}
        team={team}
        betValue={betValue}
        isWinned={isWinned}
        theme={theme}
        checkBetHandler={checkBetHandler}
        deleteBetHandler={deleteBetHandler}
        listClasses={props.listClasses}
      />
    );
  };

  return (
    <>
      {isFetching && (
        <div
          style={{
            fontSize: '22px',
            color: 'blue',
            textShadow: '3px 3px 7px darkblue'
          }}
        >
          Loading...
        </div>
      )}
      {error && (
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textShadow: '0px 3px 3px white, 0px 6px 4px red'
          }}
        >
          ERROR! {error.message || ''}
        </div>
      )}
      <ul className={itemsContainer}>{bets.map(mapBet)}</ul>
    </>
  );
}

export default BetsList;
