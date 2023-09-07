import { VNode, h } from 'vue';
import {
  getContainerDefaultStyle,
  getTextDefaultStyle,
} from './renderer-style';

export enum LayerType {
  Template = '模板',
  Container = 'container',
  Text = 'text',
}

export interface BaseNode {
  uid: string;
  parentUid: string | undefined;
  type: LayerType;
  layout?: { [key: string]: string };
  style?: { [key: string]: string };
  children?: BaseNode[];
}

export interface NodeTree {
  label: string;
  parentUid: string | undefined;
  uid: string;
  type: string;
  children: NodeTree[];
}

export interface NodeMap {
  [key: string]: BaseNode;
}

export const DEFAULT_ROOT_ID = 'root';

/**
 * 生成随机id
 * @returns uid: string
 */
export const generateRandomId = (): string => {
  let idStr = Date.now().toString(36);
  idStr += Math.random().toString(36).substring(2, 6);
  return idStr;
};

/**
 * 创建节点
 * @param id
 * @param uid
 * @param type
 * @param parentUid
 * @returns
 */
export const createNode = (
  uid: string,
  type: LayerType,
  parentUid: string | undefined
): BaseNode => {
  let style = null;

  if (type === LayerType.Container) {
    style = getContainerDefaultStyle();
  } else if (type === LayerType.Text) {
    style = getTextDefaultStyle();
  }
  return {
    uid,
    parentUid,
    type,
    children: [],
    ...style,
  };
};

/**
 * 转换Layer树
 */
const nodeToTree = (data: BaseNode): NodeTree => {
  return {
    label: data.type,
    parentUid: data.parentUid,
    uid: data.uid,
    type: data.type,
    children: [],
  };
};

/**
 * 递归转换成树结构
 */
export const nodeArrayToTree = (
  list: Array<BaseNode>,
  parentUid: string | undefined
): NodeTree[] => {
  function loop(parentUid: string | undefined): NodeTree[] {
    const res: NodeTree[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = nodeToTree(list[i]);
      if (item.parentUid !== parentUid) {
        continue;
      }
      item.children = loop(item.uid);
      res.push(item);
    }
    return res;
  }
  return loop(parentUid);
};

const nodeToVNode = (
  data: BaseNode
): { uid: string; parentUid: string | undefined; node: VNode } => {
  let style = {};
  let type = 'div';
  let children: unknown = [];

  if (data.uid === DEFAULT_ROOT_ID) {
    const rootStyle = {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
    };
    style = Object.assign({}, rootStyle, data.layout || {}, data.style || {});
  } else {
    style = Object.assign({}, data.layout || {}, data.style || {});
  }

  if (data.type === LayerType.Text) {
    type = 'span';
    children = '请在这里输入文字';
  }

  return {
    uid: data.uid,
    parentUid: data.parentUid,
    node: h(
      type,
      {
        '^id': data.uid,
        style,
        key: data.uid,
        class: 'focus',
      },
      children
    ),
  };
};

/**
 * 递归转换成VNode树结构
 */
export const nodeArrayToVNode = (
  list: Array<BaseNode>,
  parentUid: string | undefined
): VNode => {
  const source: Array<BaseNode> = JSON.parse(JSON.stringify(list));
  function loop(parentUid: string | undefined): VNode[] {
    const result: VNode[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = nodeToVNode(source[i]);
      if (item.parentUid !== parentUid) {
        continue;
      }
      item.node.children = loop(item.uid);
      result.push(item.node);
    }
    return result;
  }
  return loop(parentUid)[0];
};
