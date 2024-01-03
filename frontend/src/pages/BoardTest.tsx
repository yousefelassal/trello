import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const initialData:any = { //eslint-disable-line
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1','column-2','column-3'],
};

export default function BoardTest() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result:any) => { //eslint-disable-line
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Moving columns
    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  }
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided:any) => ( //eslint-disable-line
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-2"
            >
              {state.columnOrder.map((columnId:any, index:any) => { //eslint-disable-line
                const column = state.columns[columnId];
                const tasks = column.taskIds.map((taskId:any) => state.tasks[taskId]); //eslint-disable-line
                return <Column key={column.id} column={column} tasks={tasks} index={index} />;
              })}
              {provided.placeholder}
            </div>
            )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

//eslint-disable-next-line
const Column = ({ column, tasks, index }:any) => {
    return (
      <Draggable draggableId={column.id} index={index}>
        {(provided:any) => ( //eslint-disable-line
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-52 flex flex-col"
        >
            <div 
              {...provided.dragHandleProps}
              className="flex w-full"
            >
              <h3>{column.title}</h3>
            </div>
            <Droppable droppableId={column.id} type="task">
                {(provided:any, snapshot:any) => ( //eslint-disable-line
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 transition min-h-32 space-y-2 ${snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-black'}`}
                    >
                        {tasks.map((task:any, index:any) => ( //eslint-disable-line
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
        )}
      </Draggable>
    );
}

const Task = ({ task, index }:any) => { //eslint-disable-line
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided:any, snapshot:any) => ( //eslint-disable-line
                <div 
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`${snapshot.isDragging ? 'bg-slate-400' : 'bg-gray-200' } text-black rounded-sm`}
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
}