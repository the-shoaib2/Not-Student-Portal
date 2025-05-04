import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

// You may want to use a local image or a URL for the DIU logo
const DIU_LOGO_URL = 'https://notstudentportal.vercel.app/diuLogo.png';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { studentInfo, resultData, semesterName } = req.body;
    if (!studentInfo || !resultData) {
      return res.status(400).json({ message: 'Missing student info or result data' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Academic_Result_${studentInfo.id}.pdf"`);
      res.send(pdfData);
    });

    // Header with DIU logo
    doc.image(DIU_LOGO_URL, 40, 30, { width: 80 });
    doc.fontSize(22).text('Daffodil International University', 130, 40, { align: 'left', continued: false });
    doc.fontSize(14).text('Academic Result', 130, 70, { align: 'left' });
    doc.moveDown();
    doc.moveTo(40, 110).lineTo(555, 110).stroke();

    // Student Info
    doc.moveDown(1.5);
    doc.fontSize(12).text(`Student Name: ${studentInfo.name}`);
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
    doc.text('Course Code', 40, doc.y, { continued: true });
    doc.text('Course Title', 120, doc.y, { continued: true });
    doc.text('Credit', 320, doc.y, { continued: true });
    doc.text('Grade', 370, doc.y, { continued: true });
    doc.text('Point', 420, doc.y, { continued: true });
    doc.text('Total', 470, doc.y);
    doc.moveDown(0.2);
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();

    // Table Rows
    resultData.forEach((course: any) => {
      doc.text(course.customCourseId || course.courseId, 40, doc.y, { continued: true });
      doc.text(course.courseTitle, 120, doc.y, { continued: true });
      doc.text(course.totalCredit.toString(), 320, doc.y, { continued: true });
      doc.text(course.gradeLetter, 370, doc.y, { continued: true });
      doc.text(course.pointEquivalent.toFixed(2), 420, doc.y, { continued: true });
      doc.text(course.grandTotal !== null ? course.grandTotal.toString() : '-', 470, doc.y);
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

    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
}