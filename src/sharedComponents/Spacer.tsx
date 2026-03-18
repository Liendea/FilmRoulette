import { View } from "react-native";
type spacerProps = {
  height: number;
};

export default function Spacer({ height = 20 }: spacerProps) {
  return <View style={{ height: height }}></View>;
}
