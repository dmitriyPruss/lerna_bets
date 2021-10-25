import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function BetListItem (props) {
  const {
    team,
    betValue,
    isWinned,
    theme,
    checkBetHandler,
    deleteBetHandler,
    listClasses: { listItemLight, listItemDark }
  } = props;

  return (
    <li className={theme ? listItemLight : listItemDark}>
      <input
        defaultChecked={isWinned ? true : false}
        type='checkbox'
        onClick={checkBetHandler}
      />
      <span>Team: {team}</span>, <span>bet: {betValue}$</span>
      <Button
        variant={theme ? 'outline-success' : 'outline-light'}
        onClick={deleteBetHandler}
      >
        <DeleteOutlineIcon />
      </Button>
    </li>
  );
}

export default BetListItem;
