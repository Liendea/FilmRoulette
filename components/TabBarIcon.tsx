import { Image, ImageSourcePropType, StyleSheet, Text } from "react-native";

type TabbarIconProps = {
  icon: ImageSourcePropType;
  width?: number;
  height?: number;
};
export default function TabBarIcon({
  icon,
  width = 30,
  height = 30,
}: TabbarIconProps) {
  return (
    <>
      <Image style={{ width: width, height: height }} source={icon} />
    </>
  );
}
