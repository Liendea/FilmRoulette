import { Pressable } from "react-native";
import Icon from "./Icon";

type ExitButtonProps = {
  onPress: () => void;
};
export default function ExitButton({ onPress }: ExitButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Icon icon={require("@/assets/icons/exit_grey.png")} />
    </Pressable>
  );
}
