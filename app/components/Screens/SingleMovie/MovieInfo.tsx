import { Text, View } from "react-native";

interface MovieInfo_TP {
  label: string;
  value: string | number | null;
}
function MovieInfo({ label, value }: MovieInfo_TP) {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-200 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
}

export default MovieInfo;
