import React from 'react';
import { Button } from 'react-bootstrap';
import GppBadIcon from '@mui/icons-material/GppBad';

function BetListItem (props) {
  const {
    team,
    betValue,
    isWinned,
    theme,
    checkBetHandler,
    deleteBetHandler,
    listClasses: { listItemLight, listItemDark, textContainer }
  } = props;

  return (
    <li className={theme ? listItemLight : listItemDark}>
      <input
        defaultChecked={isWinned ? true : false}
        type='checkbox'
        onClick={checkBetHandler}
      />
      <div className={textContainer}>
        <div>Team: {team}</div>
        <div>Bet: {betValue}$</div>
      </div>
      <Button
        variant={theme ? 'outline-success' : 'outline-light'}
        onClick={deleteBetHandler}
      >
        <GppBadIcon />
      </Button>
    </li>
  );
}

export default BetListItem;
