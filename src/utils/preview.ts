import { VNode, h } from 'vue';

/**
 * 创建高亮时的8个角
 * @returns VNode[]
 */
export const createHighlightNodeCorners = (): VNode[] => {
  const corners: VNode[] = [];
  const positionDict: { [key: number]: object } = {
    1: {
      left: '0',
      top: '0',
      transform: 'translate(-50%, -50%)',
    },
    2: {
      left: '0',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    3: {
      left: '0',
      bottom: '0',
      transform: 'translate(-50%, 50%)',
    },
    4: {
      left: '50%',
      bottom: '0',
      transform: 'translate(-50%, 50%)',
    },
    5: {
      right: '0',
      bottom: '0',
      transform: 'translate(50%, 50%)',
    },
    6: {
      right: '0',
      top: '50%',
      transform: 'translate(50%, -50%)',
    },
    7: {
      right: '0',
      top: '0',
      transform: 'translate(50%, -50%)',
    },
    8: {
      right: '50%',
      top: '0',
      transform: 'translate(50%, -50%)',
    },
  };
  for (let i = 1; i <= 8; i++) {
    corners.push(
      h('i', {
        style: {
          display: 'inline-block',
          width: '8px',
          height: '8px',
          border: '1px solid #ccc',
          background: '#fff',
          position: 'absolute',
          ...positionDict[i],
        },
      })
    );
  }
  return corners;
};

/**
 * 创建焦点VNode
 * @param target
 * @returns
 */
export const createFocusNode = (target: HTMLElement): VNode => {
  return h(
    'div',
    {
      style: {
        position: 'absolute',
        width: `${target.clientWidth}px`,
        height: `${target.clientHeight}px`,
        left: `${target.offsetLeft}px`,
        top: `${target.offsetTop}px`,
      },
    },
    createHighlightNodeCorners()
  );
};

export const createHighlightNode = (target: HTMLElement): VNode => {
  return h(
    'div',
    {
      style: {
        position: 'absolute',
        width: `${target.clientWidth}px`,
        height: `${target.clientHeight}px`,
        left: `${target.offsetLeft}px`,
        top: `${target.offsetTop}px`,
        border: '2px solid var(--el-color-primary)',
      },
    },
    []
  );
};
