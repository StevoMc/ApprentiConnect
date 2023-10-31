/* eslint-disable jsx-a11y/alt-text */
"use client";

import React from "react";
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
import { cn } from "@/lib/utils";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  logo: {
    height: "5%",
    width: "auto",
    opacity: 0.5,
    marginRight: "auto",
    aspectRatio: "contain"
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
});

const aspectRatio = "portrait";

// Create Document Component
export const MyDocument = () => (
  <div className="fixed top-16 z-20 h-screen w-full bg-white">
    <PDFViewer className="h-full w-full">
      <Document>
        <Page style={styles.body}>
          <Image src="/logo_large.png" style={styles.logo} />
          <Text style={styles.title}>Ausbildungsnachweis <Text style={styles.author}>über Ausbildungswoche Nr.</Text></Text>
          
          {/* <Image
        style={styles.image}
        src="/images/quijote1.jpg"
      /> */}
          <Text style={styles.subtitle}></Text>
          <Text style={styles.text}>
            Text
          </Text>
          {/* <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          /> */}
        </Page>
      </Document>
    </PDFViewer>
  </div>
);

export default MyDocument;
