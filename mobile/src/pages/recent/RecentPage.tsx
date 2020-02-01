import styled from "styled-components/native";
import React from "react";
import { Section, TableView } from "react-native-tableview-simple";
import RecentCell from "./components/RecentCell";
import { useAppTheme } from "../../styles/Theme";

const Container = styled.ScrollView`
  flex: 1;
`;

const RecentPage = () => {
  const { background, border } = useAppTheme().colors;
  return (
    <Container>
      <TableView>
        <Section sectionTintColor={background} separatorTintColor={border}>
          <RecentCell />
          <RecentCell />
        </Section>
      </TableView>
    </Container>
  );
};

export default RecentPage;
