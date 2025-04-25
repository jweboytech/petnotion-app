import { icons } from "lucide-react-native";
import { ViewStyle } from "react-native";

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const Icon = ({ name, size, color, style }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} style={style} />;
};

export default Icon;
