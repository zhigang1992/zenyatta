import React from "react";
import { TouchableOpacity } from "react-native";
import { useAppTheme } from "../../../styles/Theme";
import PlusIcon from "../../../../assets/plus.svg";

const AddIcon = () => {
  const { text } = useAppTheme().colors;
  return (
    <TouchableOpacity
      css={`
        margin: 0 15px;
      `}
    >
      <PlusIcon fill={text} />
    </TouchableOpacity>
  );
};

export default AddIcon;
