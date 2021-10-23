import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function TasksListItem (props) {
  const {
    description,
    isDone,
    theme,
    checkTaskHandler,
    deleteTaskHandler,
    listClasses: { listItemLight, listItemDark }
  } = props;

  return (
    <li className={theme ? listItemLight : listItemDark}>
      <input
        defaultChecked={isDone ? true : false}
        type='checkbox'
        onClick={checkTaskHandler}
      />
      <span>{description}</span>
      <Button
        variant={theme ? 'outline-success' : 'outline-light'}
        onClick={deleteTaskHandler}
      >
        <DeleteOutlineIcon />
      </Button>
    </li>
  );
}

export default TasksListItem;
