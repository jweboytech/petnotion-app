import dayjs from "dayjs";
import Toast from "react-native-root-toast";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function toast(text: string) {
  Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}

export function formatDate(value: string | number) {
  return dayjs(value).format("LL, h:mm A");
}
