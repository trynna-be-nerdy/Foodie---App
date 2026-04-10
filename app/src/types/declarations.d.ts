// Type declarations for modules without TypeScript definitions

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import {Component} from 'react';
  import {TextProps} from 'react-native';

  interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class MaterialCommunityIcons extends Component<IconProps> {}
}

declare module 'react-native-vector-icons/Ionicons' {
  import {Component} from 'react';
  import {TextProps} from 'react-native';

  interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Ionicons extends Component<IconProps> {}
}

declare module 'react-native-vector-icons/FontAwesome' {
  import {Component} from 'react';
  import {TextProps} from 'react-native';

  interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class FontAwesome extends Component<IconProps> {}
}

declare module 'react-native-share' {
  const Share: {
    open: (options: {message?: string; url?: string}) => Promise<unknown>;
  };
  export default Share;
}

declare module 'react-native-fast-image' {
  import {ComponentType} from 'react';
  import {ImageProps} from 'react-native';

  const FastImage: ComponentType<ImageProps> & {
    resizeMode: {
      contain: string;
      cover: string;
      stretch: string;
      center: string;
    };
  };

  export default FastImage;
}
