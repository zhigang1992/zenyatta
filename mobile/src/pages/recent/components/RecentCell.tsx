import { Cell } from "react-native-tableview-simple";
import React from "react";
import { useAppTheme } from "../../../styles/Theme";

const RecentCell = () => {
  const { card, text } = useAppTheme().colors;
  return (
    <Cell
      titleTextColor={text}
      subtitleColor={text}
      onPress={() => {
        // TODO
      }}
      contentContainerStyle={{
        paddingVertical: 10,
        height: 67,
        backgroundColor: card
      }}
      cellStyle="Subtitle"
      accessory={"DisclosureIndicator"}
      title="9b827855"
      detail={"last edited at 2a.m. today"}
    />
  );
};

export default RecentCell;
