const express = require("express");
const PDFDocument = require("pdfkit");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.post("/generate-invoice", (req, res) => {
  const { name, idNumber, course } = req.body;

  const doc = new PDFDocument();
  const invoicePath = `./invoices/invoice-${idNumber}.pdf`;

  doc.pipe(fs.createWriteStream(invoicePath));

  // Add content to the PDF
  doc.fontSize(22).text("Kenyatta University", { align: "center" });
  doc.moveDown();
  doc.fontSize(13).text(`Name: ${name}`);
  doc.text(`ID Number: ${idNumber}`);
  doc.text(`Course: ${course}`);
  doc.moveDown();
  doc.text(`Dear ${name}`);
  doc.moveDown();
  doc.text(
    "We are thrilled to extend an invitation to you to join Kenyatta University for the upcoming academic year. Your impressive academic record and achievements have caught our attention, and we believe you would be a valuable addition to our vibrant and dynamic student community."
  );
  doc.moveDown();
  doc.text(
    "At Kenyatta University, we offer a diverse range of courses designed to provide a comprehensive and enriching educational experience. Our dedicated faculty members, state-of-the-art facilities, and a plethora of extracurricular activities ensure that our students receive a well-rounded education that prepares them for successful careers and fulfilling lives."
  );
  doc.text("Sincerely,");
  doc.text("Joash Kerongo");
  doc.text("Registrar, Academic Affairs");

  // Finalize the PDF
  doc.end();

  res.json({ message: "Invoice generated successfully", path: invoicePath });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
