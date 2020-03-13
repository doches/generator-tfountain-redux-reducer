import { Dispatch } from "redux";
import { baseURL, headers } from "./api";

export interface I<%= pluralInitialCaps %>State {
  fetchPending: boolean;
  fetched: boolean;
  updatePending: boolean;

  <%= plural %>: I<%= initialCaps %>[];
}

export const DEFAULT_<%= pluralAllCaps %>_STATE: I<%= pluralInitialCaps %>State = {
  fetchPending: false,
  fetched: false,
  updatePending: false,
  <%= plural %>: [],
}

export const SET_FETCH_PENDING = "@@<%= plural %>/SET_FETCH_PENDING";
export const SET_UPDATE_PENDING = "@@<%= plural %>/SET_UPDATE_PENDING";
export const SET_<%= pluralAllCaps %> = "@@<%= plural %>/SET_<%= pluralAllCaps %>";
export const ADD_<%= allCaps %> = "@@<%= plural %>/ADD_<%= allCaps %>";
export const REMOVE_<%= allCaps %> = "@@<%= plural %>/REMOVE_<%= allCaps %>";
export const UPDATE_<%= allCaps %> = "@@<%= plural %>/UPDATE_<%= allCaps %>";

export function setFetchPending(pending: boolean) {
  return {
      type: SET_FETCH_PENDING,
      pending,
  };
}

export function setUpdatePending(pending: boolean) {
  return {
      type: SET_UPDATE_PENDING,
      pending,
  };
}

export function set<%= pluralInitialCaps %>(<%= plural %>: I<%= initialCaps %>[]) {
  return {
      type: SET_<%= pluralAllCaps %>,
      <%= plural %>,
  };
}

export function add<%= initialCaps %>(<%= lowercase %>: I<%= initialCaps %>) {
  return {
      type: ADD_<%= allCaps %>,
      <%= lowercase %>,
  };
}

export function remove<%= initialCaps %>(<%= lowercase %>Id: number) {
  return {
      type: REMOVE_<%= allCaps %>,
      id: <%= lowercase %>Id,
  };
}

function replace<%= initialCaps %>(<%= lowercase %>: I<%= initialCaps %>) {
  return {
      type: UPDATE_<%= allCaps %>,
      <%= lowercase %>,
  };
}

export function create<%= initialCaps %>(<%= lowercase %>: I<%= initialCaps %>) {
  return (dispatch: Dispatch<any>) => {
      dispatch(setUpdatePending(true));
      return fetch(`${baseURL}<%= plural %>/create`, {
          headers,
          method: "POST",
          body: JSON.stringify(<%= lowercase %>),
      })
      .then((response: Response) => {
          if (!response.ok) {
              throw new Error();
          }
          return response.json();
      })
      .then((created: I<%= initialCaps %>) => {
        dispatch(add<%= initialCaps %>(created));
      })
      .catch((error: any) => {
          console.error(error);
      })
      .finally(() => {
          dispatch(setUpdatePending(false));
      });
  }
}

export function list<%= pluralInitialCaps %>() {
  return (dispatch: Dispatch<any>) => {
      dispatch(setFetchPending(true));
      return fetch(`${baseURL}<%= plural %>/list`, {
          headers,
          method: "GET",
      })
      .then((response: Response) => {
          if (!response.ok) {
              throw new Error();
          }
          return response.json();
      })
      .then((<%= plural %>: I<%= initialCaps %>[]) => {
        dispatch(set<%= pluralInitialCaps %>(<%= plural %>));
      })
      .catch((error: any) => {
          console.error(error);
      })
      .finally(() => {
          dispatch(setFetchPending(false));
      });
  }
}

export function update<%= initialCaps %>(<%= lowercase %>: I<%= initialCaps %>) {
  return (dispatch: Dispatch<any>) => {
      dispatch(setUpdatePending(true));
      return fetch(`${baseURL}<%= plural %>/update`, {
          headers,
          method: "POST",
          body: JSON.stringify(<%= lowercase %>),
      })
      .then((response: Response) => {
          if (!response.ok) {
              throw new Error();
          }

          dispatch(replace<%= initialCaps %>(<%= lowercase %>));
      })
      .catch((error: any) => {
          console.error(error);
      })
      .finally(() => {
          dispatch(setUpdatePending(false));
      });
  }
}

export function delete<%= initialCaps %>(<%= lowercase %>Id: number) {
  return (dispatch: Dispatch<any>) => {
      dispatch(setUpdatePending(true));
      return fetch(`${baseURL}<%= plural %>/${<%= lowercase %>Id}/delete`, {
          headers,
          method: "POST",
      })
      .then((response: Response) => {
          if (!response.ok) {
              throw new Error();
          }
          dispatch(remove<%= initialCaps %>(<%= lowercase %>Id));
      })
      .catch((error: any) => {
          console.error(error);
      })
      .finally(() => {
          dispatch(setUpdatePending(false));
      });
  }
}

export function <%= plural %>(state: I<%= pluralInitialCaps %>State, action: any) {
  if (!state) {
    state = DEFAULT_<%= pluralAllCaps %>_STATE;
  }

  switch (action.type) {
    default: 
      return state;
    case SET_FETCH_PENDING:
      return {
        ...state,
        fetchPending: action.pending,
      };
    case SET_UPDATE_PENDING:
      return {
        ...state,
        updatePending: action.pending,
    };
    case SET_<%= pluralAllCaps %>:
      return {
        ...state,
        fetchPending: false,
        fetched: true,
        <%= plural %>: action.<%= plural %>,
      };
    case ADD_<%= allCaps %>:
      return {
        ...state,
        updatePending: false,
        <%= plural %>: [
          ...state.<%= plural %>,
          action.<%= lowercase %>,
        ],
      };
    case REMOVE_<%= allCaps %>:
      return {
        ...state,
        updatePending: false,
        <%= plural %>: state.<%= plural %>.filter((<%= lowercase %>: I<%= initialCaps %>) => <%= lowercase %>.id != action.<%= lowercase %>.id),
      };
    case UPDATE_<%= allCaps %>:
      return {
        ...state,
        updatePending: false,
        <%= plural %>: state.<%= plural %>.map((<%= lowercase %>: I<%= initialCaps %>) => <%= lowercase %>.id === action.<%= lowercase %>.id ? action.<%= lowercase %> : <%= lowercase %>),
      };
  }
}