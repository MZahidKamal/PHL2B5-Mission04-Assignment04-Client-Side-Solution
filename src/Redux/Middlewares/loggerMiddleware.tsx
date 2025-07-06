import formattedDateTime from "../../utilities/dateAndTime.tsx"


/** Action logging middleware for Redux */
const loggerMiddleware = (state: any) => (next: any) => (action: any) => {

    console.group(`--> --> --> --> New Log created on: `, formattedDateTime);
    console.log(`[Redux Logger] Current State:`, state.getState());
    console.log(`[Redux Logger] Dispatched Action:`, action);
    console.log(`[Redux Logger] Description: Action ${action.type} was dispatched with payload ${JSON.stringify(action.payload)}`);
    console.groupEnd();

    return next(action);
};


export default loggerMiddleware;


// To Learn more, visit (https://redux.js.org/understanding/history-and-design/middleware#understanding-middleware).
