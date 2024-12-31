import {
  DescriptionEntity,
  DescriptionOrderedListEntity,
  DescriptionUnorderedListEntity
} from '@/types';
import {
  Dispatch,
  useCallback,
  useEffect,
  useReducer
} from 'react';

enum DescriptionFieldEntityType {
  ORDERED_LIST = 'description-ordered-list-entity',
  UNORDERED_LIST = 'description-unordered-list-entity',
  STRING = 'string',
}

enum DescriptionFieldActionType {
  ADD_ITEM = 'description-field-add-item',
  REMOVE_ITEM = 'description-field-remove-item',
  UPDATE_ITEM = 'description-field-update-item',
  SET_TYPE = 'description-field-set-type',
  UPDATE_DESCRIPTION = 'description-field-edit-description'
}

interface DescriptionFieldAddItemAction {
  type: DescriptionFieldActionType.ADD_ITEM;
}

interface DescriptionFieldRemoveItemAction {
  type: DescriptionFieldActionType.REMOVE_ITEM;
  payload: {
    index: number;
  };
}

interface DescriptionFieldUpdateItemAction {
  type: DescriptionFieldActionType.UPDATE_ITEM;
  payload: {
    index: number;
    value: string;
  };
}

interface DescriptionFieldSetTypeAction {
  type: DescriptionFieldActionType.SET_TYPE;
  payload: {
    type: DescriptionFieldEntityType;
  };
}
interface DescriptionFieldUpdateDescriptionAction {
  type: DescriptionFieldActionType.UPDATE_DESCRIPTION;
  payload: string;
}

interface  DescriptionFieldState {
  description: DescriptionEntity;
  type: DescriptionFieldEntityType;
}

type DescriptionFieldAction =
  DescriptionFieldAddItemAction |
  DescriptionFieldRemoveItemAction |
  DescriptionFieldUpdateItemAction |
  DescriptionFieldSetTypeAction |
  DescriptionFieldUpdateDescriptionAction;

const reducer = (
  state: DescriptionFieldState,
  action: DescriptionFieldAction
): DescriptionFieldState => {
  switch(action.type) {
    case DescriptionFieldActionType.ADD_ITEM:
      if (state.type === DescriptionFieldEntityType.ORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: [
              ...(state.description as DescriptionOrderedListEntity).items,
              ''
            ]
          }
        }
      }

      if (state.type === DescriptionFieldEntityType.UNORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: [
              ...(state.description as DescriptionUnorderedListEntity).items,
              ''
            ]
          }
        }
      }

      return state;
    case DescriptionFieldActionType.REMOVE_ITEM:
      if (state.type === DescriptionFieldEntityType.ORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: (state.description as DescriptionOrderedListEntity).items.filter((_item, index) => {
              return index !== action.payload.index
            })
          }
        }
      }

      if (state.type === DescriptionFieldEntityType.UNORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: (state.description as DescriptionUnorderedListEntity).items.filter((_item, index) => {
              return index !== action.payload.index
            })
          }
        }
      }
      
      return state;
    case DescriptionFieldActionType.UPDATE_ITEM:
      if (state.type === DescriptionFieldEntityType.ORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: (state.description as DescriptionOrderedListEntity).items.map((item: string, index: number) => {
              if (action.payload.index === index) return action.payload.value;
              return item;
            })
          }
        }
      }

      if (state.type === DescriptionFieldEntityType.UNORDERED_LIST) {
        return {
          type: state.type,
          description: {
            type: state.type,
            items: (state.description as DescriptionUnorderedListEntity).items.map((item: string, index: number) => {
              if (action.payload.index === index) return action.payload.value;
              return item;
            })
          }
        }
      }

      return state;
    case DescriptionFieldActionType.SET_TYPE:
      if (action.payload.type === DescriptionFieldEntityType.ORDERED_LIST) {
        return {
          type: DescriptionFieldEntityType.ORDERED_LIST,
          description: {
            type: DescriptionFieldEntityType.ORDERED_LIST,
            items: []
          }
        }
      }

      if (action.payload.type === DescriptionFieldEntityType.UNORDERED_LIST) {
        return {
          type: DescriptionFieldEntityType.UNORDERED_LIST,
          description: {
            type: DescriptionFieldEntityType.UNORDERED_LIST,
            items: []
          }
        }
      }

      if (action.payload.type === DescriptionFieldEntityType.STRING) {
        return {
          type: DescriptionFieldEntityType.STRING,
          description: ''
        };
      }

      return state;
    case DescriptionFieldActionType.UPDATE_DESCRIPTION:
      return {
        type: DescriptionFieldEntityType.STRING,
        description: action.payload
      };
    default:
      return state;
  }
};

const initialState: DescriptionFieldState = {
  description: '',
  type: DescriptionFieldEntityType.STRING
}

export interface DescriptionFieldProps {
  fieldString: string;
  setValue: any;
}

export const DescriptionField = ({
  fieldString,
  setValue
}: DescriptionFieldProps) => {
  const [state, dispatch]: [
    DescriptionFieldState,
    Dispatch<DescriptionFieldAction>
  ] = useReducer(reducer, initialState);

  const {
    type,
    description
  } = state as DescriptionFieldState;

  useEffect(() => {
    setValue(fieldString, description);
  }, [
    description,
    fieldString,
    setValue
  ]);

  const getFields = useCallback(() => {
    if (type === 'string') {
      return (
        <textarea value={description as string} onChange={(e) => {
          dispatch({
            type: DescriptionFieldActionType.UPDATE_DESCRIPTION,
            payload: e.target.value
          });
        }}>
        </textarea>
      );
    }

    if (type === 'description-ordered-list-entity') {
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: DescriptionFieldActionType.ADD_ITEM
              })
            }}>
            Add Item
          </button>
          {
            (description as DescriptionOrderedListEntity).items.map((item, index) => {
              return (
                <div key={index}>
                  <textarea
                    onChange={(e) => {
                      dispatch({
                        type: DescriptionFieldActionType.UPDATE_ITEM,
                        payload: {
                          index,
                          value: e.target.value
                        }
                      });
                    }}
                    value={item}>
                  </textarea>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: DescriptionFieldActionType.REMOVE_ITEM,
                        payload: {
                          index
                        }
                      })
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          }
        </div>
      )
    }

    if (type === 'description-unordered-list-entity') {
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: DescriptionFieldActionType.ADD_ITEM
              })
            }}>
            Add Item
          </button>
          {
            (description as DescriptionUnorderedListEntity).items.map((item, index) => {
              return (
                <div key={index}>
                  <textarea
                    onChange={(e) => {
                      dispatch({
                        type: DescriptionFieldActionType.UPDATE_ITEM,
                        payload: {
                          index,
                          value: e.target.value
                        }
                      });
                    }}
                    value={item}>
                  </textarea>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: DescriptionFieldActionType.REMOVE_ITEM,
                        payload: {
                          index
                        }
                      })
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          }
        </div>
      )
    }

    return null;
  }, [
    description,
    type
  ]);

  return (
    <div>
      <select onChange={(e) => {
        dispatch({
          type: DescriptionFieldActionType.SET_TYPE,
          payload: {
            type: e.target.value as DescriptionFieldEntityType
          }
        })
      }} value={type}>
        <option value={DescriptionFieldEntityType.ORDERED_LIST}>Ordered List</option>
        <option value={DescriptionFieldEntityType.UNORDERED_LIST}>Unordered List</option>
        <option value={DescriptionFieldEntityType.STRING}>String</option>
      </select>
      {getFields()}
    </div>
  );
};