import { Image, ImageSourcePropType } from "react-native";

type IconProps = {
  icon: ImageSourcePropType;
  width?: number;
  height?: number;
};
export default function Icon({ icon, width = 35, height = 35 }: IconProps) {
  return (
    <>
      <Image style={{ width: width, height: height }} source={icon} />
    </>
  );
}
