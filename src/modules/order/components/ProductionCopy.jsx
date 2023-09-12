import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ProductionCopy = ({ measurementInfo, orderFinalData }) => {
  console.log({ measurementInfo, orderFinalData });
  return (
    <div className="flex justify-content-center">
      <PDFViewer width="600" height="650">
        <Document>
          <Page size="A6" style={styles.page}>
            <View style={styles.section}>
              <Text >Section #1</Text>
            </View>
            {/* <View style={styles.section}>
              <Text>Section #2</Text>
            </View> */}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ProductionCopy;
