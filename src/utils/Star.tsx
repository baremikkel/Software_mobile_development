import React from 'react';
import { Path, Svg } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};

export const EmptyStar = (props: Props): JSX.Element => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 1.61804L14.2186 8.4463L14.3309 8.7918H14.6942H21.8738L16.0654 13.0119L15.7715 13.2254L15.8837 13.5709L18.1024 20.3992L12.2939 16.1791L12 15.9656L11.7061 16.1791L5.89763 20.3992L8.11627 13.5709L8.22853 13.2254L7.93464 13.0119L2.12616 8.7918H9.30583H9.6691L9.78136 8.4463L12 1.61804Z"
        stroke="#404040"
      />
    </Svg>
  );
};

export const HalfStar = (props: Props): JSX.Element => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9 1L7.25 7H2L6.2 10.375L4.45 16L9 12.25V7.75V1Z"
        fill="#FDE047"
      />
      <Path
        d="M9 1.61804L10.5451 6.37336L10.6574 6.71885H11.0206H16.0207L11.9755 9.6578L11.6817 9.87132L11.7939 10.2168L13.339 14.9721L9.29389 12.0332L9 11.8197L8.70611 12.0332L4.66099 14.9721L6.20609 10.2168L6.31834 9.87132L6.02445 9.6578L1.97933 6.71885H6.97937H7.34265L7.4549 6.37336L9 1.61804Z"
        stroke="#404040"
      />
    </Svg>
  );
};

export const FullStar = (props: Props): JSX.Element => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 1.61804L14.2186 8.4463L14.3309 8.7918H14.6942H21.8738L16.0654 13.0119L15.7715 13.2254L15.8837 13.5709L18.1024 20.3992L12.2939 16.1791L12 15.9656L11.7061 16.1791L5.89763 20.3992L8.11627 13.5709L8.22853 13.2254L7.93464 13.0119L2.12616 8.7918H9.30583H9.6691L9.78136 8.4463L12 1.61804Z"
        fill="#FDE047"
        stroke="#404040"
      />
    </Svg>
  );
};
