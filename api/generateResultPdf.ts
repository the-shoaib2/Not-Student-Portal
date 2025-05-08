import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

// You may want to use a local image or a URL for the DIU logo
const DIU_LOGO_URL = 'https://notstudentportal.vercel.app/diuLogo.png';

interface StudentInfo {
  id: string;
  name: string;
  program: string;
  batch: string;
  department: string;
  faculty: string;
  campus: string;
  semesterName?: string;
}

interface CourseResult {
  courseId: string;
  customCourseId?: string;
  courseTitle: string;
  totalCredit: number;
  gradeLetter: string;
  pointEquivalent: number;
  grandTotal: number | null;
  cgpa?: number;
}

// Type declaration for PDFKit
interface PDFKitDocument {
  y: number;
  image: (src: string, x: number, y: number, options?: { width?: number }) => void;
  fontSize: (size: number) => PDFKitDocument;
  text: (text: string, x?: number | { align?: string; continued?: boolean; underline?: boolean }, y?: number, options?: { align?: string; continued?: boolean; underline?: boolean }) => PDFKitDocument;
  moveDown: (n?: number) => PDFKitDocument;
  moveTo: (x: number, y: number) => PDFKitDocument;
  lineTo: (x: number, y: number) => PDFKitDocument;
  stroke: () => PDFKitDocument;
  fillColor: (color: string) => PDFKitDocument;
  end: () => void;
  on: (event: string, callback: (chunk: Buffer) => void) => void;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentInfo, resultData, semesterName } = req.body as {
      studentInfo: StudentInfo;
      resultData: CourseResult[];
      semesterName?: string;
    };

    if (!studentInfo || !resultData) {
      return res.status(400).json({ message: 'Missing student info or result data' });
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true
    }) as unknown as PDFKitDocument;

    // Collect PDF data
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // When PDF is done
    doc.on('end', () => {
      const pdfData = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Academic_Result_${studentInfo.id}.pdf"`);
      res.send(pdfData);
    });

    // Header with DIU logo
    doc.image(DIU_LOGO_URL, 40, 30, { width: 80 });
    doc.fontSize(22).text('Daffodil International University', 130, 40);
    doc.fontSize(14).text('Academic Result', 130, 70);
    doc.moveDown();
    doc.moveTo(40, 110).lineTo(555, 110).stroke();

    // Student Info
    doc.moveDown(1.5);
    doc.fontSize(12);
    doc.text(`Student Name: ${studentInfo.name}`);
    doc.text(`Student ID: ${studentInfo.id}`);
    doc.text(`Program: ${studentInfo.program}`);
    doc.text(`Batch: ${studentInfo.batch}`);
    doc.text(`Department: ${studentInfo.department}`);
    doc.text(`Faculty: ${studentInfo.faculty}`);
    doc.text(`Campus: ${studentInfo.campus}`);
    doc.text(`Semester: ${semesterName || studentInfo.semesterName}`);
    doc.moveDown();

    // Table Header
    doc.fontSize(13).text('Course Results:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11);
    
    // Table headers with proper spacing
    const tableHeaders = [
      { text: 'Course Code', x: 40 },
      { text: 'Course Title', x: 120 },
      { text: 'Credit', x: 320 },
      { text: 'Grade', x: 370 },
      { text: 'Point', x: 420 },
      { text: 'Total', x: 470 }
    ];

    tableHeaders.forEach(header => {
      doc.text(header.text, header.x, doc.y, { continued: header.text !== 'Total' });
    });

    doc.moveDown(0.2);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

    // Table Rows
    resultData.forEach((course) => {
      const rowData = [
        { text: course.customCourseId || course.courseId, x: 40 },
        { text: course.courseTitle, x: 120 },
        { text: course.totalCredit.toString(), x: 320 },
        { text: course.gradeLetter, x: 370 },
        { text: course.pointEquivalent.toFixed(2), x: 420 },
        { text: course.grandTotal !== null ? course.grandTotal.toString() : '-', x: 470 }
      ];

      rowData.forEach((cell, index) => {
        doc.text(cell.text, cell.x, doc.y, { continued: index < rowData.length - 1 });
      });
    });

    doc.moveDown();

    // CGPA/SGPA
    if (resultData.length > 0 && resultData[0].cgpa) {
      doc.fontSize(12).text(`CGPA: ${resultData[0].cgpa.toFixed(2)}`);
    }

    // Certification
    doc.moveDown(2);
    doc.fontSize(11).fillColor('gray').text('Certified by N.O.T. Student Portal', { align: 'center' });
    doc.fontSize(10).fillColor('gray').text('This result is generated from the official DIU Student Portal.', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(9).fillColor('gray').text('For any discrepancy, please contact the DIU Exam Office.', { align: 'center' });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
}