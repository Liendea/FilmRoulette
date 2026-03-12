import { Image, ImageSourcePropType } from "react-native";

type IconProps = {
  icon: ImageSourcePropType;
  width?: number;
  height?: number;
};
export default function Icon({ icon, width = 30, height = 30 }: IconProps) {
  return (
    <>
      <Image style={{ width: width, height: height }} source={icon} />
    </>
  );
}
