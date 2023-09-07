interface DefaultStyle {
  layout?: {
    [key: string]: string;
  };
  style?: {
    [key: string]: string;
  };
}

export const getContainerDefaultStyle = (): DefaultStyle => {
  return {
    layout: {
      display: 'flex',
      width: '100px',
      height: '100px',
    },
    style: {
      background: '#ccc',
    },
  };
};

export const getTextDefaultStyle = (): DefaultStyle => {
  return {
    layout: {
      width: '100px',
      height: '30px',
    },
    style: {
      display: 'inline-block',
    },
  };
};
