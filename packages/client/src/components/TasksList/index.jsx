import React, { useEffect } from 'react';
import * as actionCreators from './../../actions';
import { connect } from 'react-redux';
import TasksListItem from './TasksListItem';

function TasksList (props) {
  const {
    theme: { theme },
    tasksLoad: { isFetching, error, tasks },
    getTasks,
    deleteTask,
    updateTask,
    listClasses: { itemsContainer }
  } = props;

  useEffect(() => {
    getTasks();
  }, []);

  const mapTask = ({ id, description, isDone }, index) => {
    const checkTaskHandler = () => {
      updateTask(id, { isDone });
    };

    const deleteTaskHandler = () => {
      deleteTask(id);
    };

    return (
      <TasksListItem
        key={id}
        description={description}
        isDone={isDone}
        theme={theme}
        checkTaskHandler={checkTaskHandler}
        deleteTaskHandler={deleteTaskHandler}
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
      <ul className={itemsContainer}>{tasks.map(mapTask)}</ul>
    </>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(actionCreators.getTasksAction()),
    deleteTask: id => {
      dispatch(actionCreators.deleteTaskAction(id));
    },
    updateTask: (id, isDone) => {
      dispatch(actionCreators.updateTaskAction(id, isDone));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
