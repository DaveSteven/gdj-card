import emitter from './mitt';

export enum EVENTS_TYPE {
  UPDATE_NODE_MAP = 'updateNodeMap',
}

export const dispatch = {
  updateNodeMap: (data: any): void => {
    emitter.emit(EVENTS_TYPE.UPDATE_NODE_MAP, data);
  },
};
