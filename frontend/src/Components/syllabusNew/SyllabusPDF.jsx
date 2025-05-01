import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image
} from '@react-pdf/renderer';

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<\/?[^>]+(>|$)/g, '');
};

// Helper function to parse HTML lists
const parseHtmlLists = (content) => {
  if (!content || typeof content !== 'string') return [];
  
  // For simplicity, let's handle basic <li> items
  const listItems = [];
  const listRegex = /<li>(.*?)<\/li>/g;
  let match;
  
  while ((match = listRegex.exec(content)) !== null) {
    listItems.push(match[1]);
  }
  
  return listItems.length > 0 ? listItems : [content]; // Return original content if no list items found
};

// Register both regular and bold font variants
Font.register({
  family: 'Arial',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Arial',
    fontSize: 10,
  },
  watermark: {
    position: 'absolute',
    opacity: 0.15,
    width: '400px',
    height: '400px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  grayBg: {
    backgroundColor: '#e0e0e0',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    fontSize: 10,
  },
  tableCellLastColumn: {
    padding: 5,
    fontSize: 10,
  },
  tableCellCentered: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    fontSize: 10,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    right: 20,
    textAlign: 'right',
  },
  courseInfo: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 20,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
  },
  bullet: {
    width: 10,
    marginRight: 5,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  listItemContent: {
    flex: 1,
  },
  orderedListItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  orderedListNumber: {
    width: 20,
    textAlign: 'right',
    marginRight: 5,
  },
  indentedContent: {
    paddingLeft: 15,
  },
  subItem: {
    paddingLeft: 15,
    flexDirection: 'row',
    marginBottom: 2,
  },
  subItemMarker: {
    width: 15,
    marginRight: 5,
  },
  courseCodeTitle: {
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,  
  }
});

// Roman numerals helper
const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

// The PDF Document component
const SyllabusPDFDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Centered Watermark */}
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: -1}}>
        <Image src="/image.png" style={{width: '400px', height: '400px', opacity: 0.15}} />
      </View>
      
      {/* Header Section - New Layout based on image */}
      <View style={styles.table}>
        {/* Year and Credits Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Year</Text>
            
          </View>
          <View style={[styles.tableCell, styles.tableCellCentered, { width: '15%' }]}>
            <Text>{formData.year}</Text>
          </View> 
          <View style={[styles.tableCell, { width: '50%', rowSpan: 4 }]}>
            <View style={styles.courseCodeTitle}>
              <Text style={styles.bold}>Course Code: {formData.courseCode}</Text>
            </View>
            <View style={styles.courseCodeTitle}>
              <Text style={styles.bold}>Course Title: {stripHtmlTags(formData.courseTitle)}</Text>
            </View>
          </View>
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '25%' }]}>
            <Text>Credits</Text>
          </View>
          <View style={[styles.tableCellLastColumn, styles.tableCellCentered, { width: '20%' }]}>
            <Text>{formData.credits}</Text>
          </View>
        </View>

        {/* Sem and Hours Row */}
        <View style={styles.tableRow}>

          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Sem.</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellCentered, { width: '15%' }]}>
            <Text>{formData.semester}</Text>
          </View>
          {/* This cell is occupied by the rowSpan from above */}
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Hours</Text>
          </View>
          <View style={[styles.tableCellLastColumn, styles.tableCellCentered, { width: '15%' }]}>
            <Text>{formData.totalHours}</Text>
          </View>
        </View>

        {/* Category Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '30%', columnSpan: 2 }]}>
            {/* Empty cells combined */}
          </View>
          {/* This cell is occupied by the rowSpan from above */}
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Category</Text>
          </View>
          <View style={[styles.tableCellLastColumn, styles.tableCellCentered, { width: '15%' }]}>
            <Text>{formData.category}</Text>
          </View>
        </View>

        {/* Prerequisites Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '30%' }]}>
            <Text style={styles.bold}>Course Prerequisites, if any</Text>
          </View>
          <View style={[styles.tableCellLastColumn, { width: '70%', columnSpan: 4 }]}>
            <Text>{stripHtmlTags(formData.prerequisites) || "NIL"}</Text>
          </View>
        </View>

        {/* Assessment Marks Row - Redesigned to match image layout */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '30%' }]}>
            <Text style={styles.bold}>Internal Assessment Marks: {formData.internalMarks}</Text>
          </View>
          <View style={[styles.tableCell, { width: '30%' }]}>
            <Text style={styles.bold}>End Semester Marks: {formData.endSemesterMarks}</Text>
          </View>
          <View style={[styles.tableCellLastColumn, { width: '40%', columnSpan: 3 }]}>
            <Text style={styles.bold}>Duration of ESA (Theory): {formData.durationTheory}</Text>
            <Text style={[styles.bold, { marginTop: 3 }]}>Duration of ESA (Practical): {formData.durationPractical}</Text>
          </View>
        </View>

        {/* Course Outcomes Row */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '30%' }]}>
            <Text style={styles.bold}>Course Outcomes</Text>
          </View>
          <View style={[styles.tableCellLastColumn, { width: '70%', columnSpan: 4 }]}>
            {formData.outcomes.map((outcome, index) => {
              // Check if the outcome has HTML tags
              const parsedOutcomes = parseHtmlLists(outcome);
              
              return parsedOutcomes.map((parsedOutcome, pIndex) => (
                <View key={`${index}-${pIndex}`} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listItemContent}>{stripHtmlTags(parsedOutcome)}</Text>
                </View>
              ));
            })}
          </View>
        </View>

        {/* Unit No and Course Content Headers */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Unit No.</Text>
          </View>
          <View style={[styles.tableCell, styles.tableHeaderCell, { width: '70%', columnSpan: 3 }]}>
            <Text>Course Content</Text>
          </View>
          <View style={[styles.tableCellLastColumn, styles.tableHeaderCell, { width: '15%' }]}>
            <Text>Hours</Text>
          </View>
        </View>

        {/* Theory Component Header */}
        <View style={[styles.tableRow, styles.grayBg]}>
          <View style={[styles.tableCellLastColumn, styles.tableHeaderCell, { width: '100%', columnSpan: 5, textAlign: 'center' }]}>
            <Text>Theory Component</Text>
          </View>
        </View>

        {/* Theory Units */}
        {formData.units.map((unit, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCell, { width: '15%' }]}>
              <Text style={styles.bold}>Unit {unit.number}</Text>
              <Text style={styles.bold}>{stripHtmlTags(unit.title)}</Text>
            </View>
            <View style={[styles.tableCell, { width: '70%', columnSpan: 3 }]}>
              <Text>{stripHtmlTags(unit.content)}</Text>
            </View>
            <View style={[styles.tableCellLastColumn, { width: '15%', textAlign: 'center' }]}>
              <Text>{unit.hours}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Page number and course code */}
      <Text style={styles.pageNumber}>Page 1 of 2</Text>
      <Text style={styles.courseInfo}>{formData.courseCode}: {stripHtmlTags(formData.courseTitle)}</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      {/* Centered Watermark on second page */}
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: -1}}>
        <Image src="/image.png" style={{width: '400px', height: '400px', opacity: 0.15}} />
      </View>
      
      <View style={styles.table}>
        {/* Practical Component Header */}
        <View style={[styles.tableRow, styles.grayBg]}>
          <View style={[styles.tableCellLastColumn, styles.tableHeaderCell, { width: '100%', columnSpan: 5, textAlign: 'center' }]}>
            <Text>Practical Component</Text>
          </View>
        </View>

        {/* Practical Exercises */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '15%' }]}>
            <Text style={styles.bold}>Exercises</Text>
          </View>
          <View style={[styles.tableCell, { width: '70%', columnSpan: 3 }]}>
            {formData.practicalExercises.map((exercise, index) => {
              // Check if the exercise contains sub-items
              if (typeof exercise === 'object' && exercise.title && exercise.subitems) {
                return (
                  <View key={index} style={{ marginBottom: 5 }}>
                    <View style={styles.orderedListItem}>
                      <Text style={styles.orderedListNumber}>{index + 1}.</Text>
                      <Text>{stripHtmlTags(exercise.title)}</Text>
                    </View>
                    <View style={styles.indentedContent}>
                      {exercise.subitems.map((subitem, subIndex) => (
                        <View key={subIndex} style={styles.subItem}>
                          <Text style={styles.subItemMarker}>
                            {romanNumerals[subIndex] || String.fromCharCode(97 + subIndex)}.
                          </Text>
                          <Text>{stripHtmlTags(subitem)}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              } else {
                const exerciseText = typeof exercise === 'string' ? exercise : JSON.stringify(exercise);
                const parsedExercises = parseHtmlLists(exerciseText);
                
                return parsedExercises.map((parsedExercise, pIndex) => (
                  <View key={`${index}-${pIndex}`} style={styles.orderedListItem}>
                    <Text style={styles.orderedListNumber}>{index + pIndex + 1}.</Text>
                    <Text>{stripHtmlTags(parsedExercise)}</Text>
                  </View>
                ));
              }
            })}
          </View>
          <View style={[styles.tableCellLastColumn, { width: '15%', textAlign: 'center' }]}>
            <Text>{formData.practicalHours || 30}</Text>
          </View>
        </View>

        {/* Learning Resources Header */}
        <View style={[styles.tableRow, styles.grayBg]}>
          <View style={[styles.tableCellLastColumn, styles.tableHeaderCell, { width: '100%', columnSpan: 5, textAlign: 'center' }]}>
            <Text>Recommended Learning Resources</Text>
          </View>
        </View>

        {/* Print Resources */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { width: '15%' }]}>
            <Text style={styles.bold}>Print</Text>
            <Text style={styles.bold}>Resources</Text>
          </View>
          <View style={[styles.tableCellLastColumn, { width: '85%', columnSpan: 4 }]}>
            {formData.references.map((ref, index) => (
              <View key={index} style={styles.orderedListItem}>
                <Text style={styles.orderedListNumber}>{index + 1}.</Text>
                <Text style={styles.listItemContent}>
                  {stripHtmlTags(ref.author)}, "{stripHtmlTags(ref.title)}", {stripHtmlTags(ref.publisher)}, {ref.year}.
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Syllabus Design */}
        <View style={styles.tableRowLast}>
          <View style={[styles.tableCellLastColumn, { width: '100%', columnSpan: 5 }]}>
            <Text style={styles.bold}>Syllabus Design:</Text>
            <Text> {stripHtmlTags(formData.designedBy)}</Text>
          </View>
        </View>
      </View>

      {/* Page number and course code */}
      <Text style={styles.pageNumber}>Page 2 of 2</Text>
      <Text style={styles.courseInfo}>{formData.courseCode}: {stripHtmlTags(formData.courseTitle)}</Text>
    </Page>
  </Document>
);

// The downloadable button component
export const SyllabusPDFDownload = ({ formData }) => {
  return (
    <PDFDownloadLink
      document={<SyllabusPDFDocument formData={formData} />}
      fileName={`Syllabus_${formData.courseCode}.pdf`}
      style={{
        backgroundColor: '#047857',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '0.25rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Preparing PDF...' : 'Download as PDF'
      }
    </PDFDownloadLink>
  );
};