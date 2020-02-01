import React from "react";
import { TouchableOpacity } from "react-native";
import { useAppTheme } from "../../../styles/Theme";
import PlusIcon from "../../../../assets/plus.svg";
import { useActionSheet } from "@expo/react-native-action-sheet";

const AddIcon = () => {
  const { text } = useAppTheme().colors;
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <TouchableOpacity
      css={`
        margin: 0 15px;
      `}
      onPress={() => {
        showActionSheetWithOptions(
          {
            options: ["TypeScript", "JSON Schema", "Cancel"],
            cancelButtonIndex: 2
          },
          i => {
            if (i !== 2) {
              console.log(i);
            }
          }
        );
      }}
    >
      <PlusIcon fill={text} />
    </TouchableOpacity>
  );
};

export default AddIcon;
