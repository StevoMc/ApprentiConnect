"use client";

import { useEffect, useState } from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  src: "https://github.com/matomo-org/travis-scripts/raw/master/fonts/Arial.ttf",
});

const columnWidths = ["30", "100%", "12%", "12%"];
const defaultValues = [
  { description: "\n", individualHours: "", totalHours: "" },
  { description: "\n", individualHours: "", totalHours: "" },
  { description: "\n", individualHours: "", totalHours: "" },
  { description: "\n", individualHours: "", totalHours: "" },
  { description: "\n", individualHours: "", totalHours: "" },
];

const activities = [
  {
    day: "Monday",
    activities: defaultValues,
  },
  {
    day: "Tuesday",
    activities: defaultValues,
  },
  {
    day: "Wednesday",
    activities: defaultValues,
  },
  {
    day: "Thursday",
    activities: defaultValues,
  },
  {
    day: "Friday",
    activities: defaultValues,
  },
  // Add more days and activities as needed
];

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingLeft: 56,
    paddingRight: 34,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  subheading: {
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Helvetica",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableCol: {
    justifyContent: "space-between",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol_underlined: {
    flexGrow: 1,
    marginHorizontal: 4,
    justifyContent: "space-between",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    borderBottom: 1,
  },
  tableCol_underlined_small: {
    flexGrow: 0.1,
    justifyContent: "space-between",
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottom: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  tableCell: {
    marginTop: 5,
    fontSize: 10,
    borderBottom: 0,
  },
  text: {
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  logo: {
    height: "5%",
    width: "auto",
    // opacity: 0.5,
    marginRight: "auto",
    marginBottom: 8,
    aspectRatio: "contain",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  week_number: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica",
    width: "30px",
    borderBottom: 1,
    marginHorizontal: 4,
  },
  underlined_number: {
    fontSize: 11,
    textAlign: "center",
    textDecoration: "underline",
    fontFamily: "Helvetica",
    flexGrow: 1,
    // width: "100%",
  },
  table_lage: {
    display: "flex",
    width: "100%",
    fontSize: 9,
  },
  tableRow_lage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderStyle: "solid",
    borderTop: 2,
  },
  tableCol_lage: {
    flexGrow: 1,
    borderStyle: "solid",
    borderRight: 1,
  },
  tableCell_lage: {
    margin: "auto",
    marginTop: 4,
    marginBottom: 2,
    // fontSize: 10,
  },
});

const table_styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: "20",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 0,
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    borderTop: "1 solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
  },
  row_no_border: {
    flexDirection: "row",
  },
  row_rotated: {
    width: columnWidths[0],
    borderStyle: "solid",
    borderColor: "#000",
    borderTop: 1,
    borderRight: 1,
    fontSize: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  start: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 1,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
  },
  cell: {
    width: columnWidths[0],
    overflow: "hidden",
    borderStyle: "solid",
    borderColor: "#000",
    borderRight: 1,
  },
  cell2: {
    width: columnWidths[1],
    borderStyle: "solid",
    borderColor: "#000",
    borderRight: 1,
  },
  cell3: {
    width: columnWidths[2],
    borderStyle: "solid",
    borderColor: "#000",
    borderRight: 1,
  },
  cell4: {
    width: columnWidths[3],
    borderStyle: "solid",
    borderColor: "#000",
    borderRight: 0,
  },
});
const aspectRatio = "portrait";

const data = {
  kw: "31",
  start: "04.09.23",
  ende: "08.09.23",
  jahr: "1",
  name: "NAME",
  beruf: "BERUF",
  abteilung: "ABTEILUNG",
  berufs_feld: "BERUFSFELD",
};

const header = (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    }}
  >
    <Text style={styles.heading}>{"Ausbildungsnachweis "}</Text>
    <Text style={styles.subheading}>{"über Ausbildungswoche Nr."}</Text>
    <Text style={styles.week_number}>{"53"}</Text>
  </View>
);

const attributes = ({
  kw,
  start,
  ende,
  jahr,
  name,
  beruf,
  abteilung,
  berufs_feld,
}: {
  kw: string;
  start: string;
  ende: string;
  jahr: string;
  name: string;
  beruf: string;
  abteilung: string;
  berufs_feld: string;
}) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <View style={{ width: "55%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"KW Nr."}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{kw}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"vom"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{start}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "45%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"bis zum"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{ende}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"Ausbildungsjahr"}</Text>
          </View>
          <View style={styles.tableCol_underlined_small}>
            <Text style={styles.tableCell}>{jahr}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View style={{ width: "55%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"Name"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{name}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "45%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"Ausbildungsberuf"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{beruf}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.tableRow}>
      <View style={{ width: "55%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"Ausbildende Abteilung"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text
              style={{
                marginTop: 5,
                marginHorizontal: "auto",
                fontSize: "1vh",
                borderBottom: 0,
              }}
            >
              {abteilung}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "45%" }}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{"Fachrichtung"}</Text>
          </View>
          <View style={styles.tableCol_underlined}>
            <Text style={styles.tableCell}>{berufs_feld}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const day = (day: string) => (
  <View
    style={{
      flexDirection: "row",
      borderStyle: "solid",
      height: "10vh",
      flexGrow: 0,
      borderTop: 2,
    }}
  >
    <View
      style={{
        borderStyle: "solid",
        borderRight: 1,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          transform: "rotate(-90deg)",
          height: 10,
          textAlign: "center",
        }}
      >
        {day}
      </Text>
    </View>
    <View style={styles.tableCol_lage}>
      <Text style={styles.tableCell_lage}>{"\n"}</Text>
    </View>
    <View style={styles.tableCol_lage}>
      <Text style={styles.tableCell_lage}>{"\n"}</Text>
    </View>
    <View
      style={{
        flexGrow: 1,
        borderStyle: "solid",
        borderRight: 0,
      }}
    >
      <Text style={styles.tableCell_lage}>{"\n"}</Text>
    </View>
  </View>
);

const PDF = () => (
  <Document>
    <Page style={styles.body}>
      {/*  eslint-disable-next-line jsx-a11y/alt-text */}
      <Image src="/logo.png" style={styles.logo} />
      <Text style={styles.text}>{"\n"}</Text>
      {header}
      <Text style={styles.text}>{"\n"}</Text>
      {attributes({ ...data })}
      <Text style={styles.text}>{"\n"}</Text>
      <Text style={styles.text}>{"\n"}</Text>
      <View style={table_styles.table}>
        {/* HEAD */}
        <View style={table_styles.row}>
          <View style={[table_styles.cell, table_styles.center]}>
            <Text>Tag</Text>
          </View>
          <View style={[table_styles.cell2, table_styles.center]}>
            <Text>
              {" "}
              Ausgeführte Arbeiten, Unterweisungen, Unterricht in der
              Berufsschule usw.
            </Text>
          </View>
          <View style={[table_styles.cell3, table_styles.center]}>
            <Text>Einzelstunden</Text>
          </View>
          <View style={[table_styles.cell4, table_styles.center]}>
            <Text>Gesamtstunden</Text>
          </View>
        </View>
        {/* Content */}
        {activities.map((dayData) => (
          <View style={table_styles.row_no_border} key={dayData.day}>
            <View
              style={[
                table_styles.row_rotated,
                table_styles.center,
                {
                  height: "100%",
                },
              ]}
            >
              <Text style={[{ transform: "rotate(-90deg)" }]}>
                {dayData.day}
              </Text>
            </View>
            <View style={table_styles.cell2}>
              {dayData.activities.map((activity) => (
                <View style={table_styles.row} key={activity.description}>
                  <View style={[table_styles.cell2, table_styles.start]}>
                    <Text>{activity.description}</Text>
                  </View>
                  <View style={[table_styles.cell3, table_styles.center]}>
                    <Text>{activity.individualHours}</Text>
                  </View>
                  <View style={[table_styles.cell4, table_styles.center]}>
                    <Text>{activity.totalHours}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Create Document Component
export const ReportPDF = ({
  profile,
  reports,
}: {
  profile?: any;
  reports?: any;
}): JSX.Element => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="absolut top-16 z-[60] flex h-full w-full grow flex-col overflow-hidden bg-white">
      <PDFViewer className="h-full w-full grow">
        <PDF />
      </PDFViewer>
    </div>
  );
};

export default ReportPDF;
