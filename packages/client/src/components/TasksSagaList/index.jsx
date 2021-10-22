import React, { useEffect } from 'react';
import * as actionCreators from './../../actions';
import { connect } from 'react-redux';
import TasksListItem from './TasksListItem';

function TasksSagaList (props) {
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

  const mapTask = (task, index) => {
    const { id, description, isDone } = task;

    const checkTaskHandler = () => {
      // console.log('checkTaskHandler task :>> ', task);
      // console.log('checkTaskHandler id :>> ', id);

      updateTask(id, task);
    };

    const deleteTaskHandler = () => {
      deleteTask(id);
    };

    console.log('isDone :>> ', isDone);

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
      {error && (
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textShadow: '0px 3px 3px white, 0px 6px 4px red'
          }}
        >
          ERROR!
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
    updateTask: (id, task) => {
      dispatch(actionCreators.updateTaskAction(id, task));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksSagaList);
