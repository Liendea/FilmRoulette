import { BaseToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#1a1a1a",
        borderLeftColor: "#E50914",
        height: 70,
        width: "90%",
        borderRadius: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 13,
        color: "#bbb",
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#1a1a1a",
        borderLeftColor: "#5a5959",
        height: 70,
        width: "90%",
        borderRadius: 12,
      }}
      text1Style={{ color: "#fff" }}
      text2Style={{ color: "#bbb" }}
    />
  ),
};
