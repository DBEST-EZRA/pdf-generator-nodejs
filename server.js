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
  doc.fontSize(25).text("University Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(16).text(`Name: ${name}`);
  doc.text(`ID Number: ${idNumber}`);
  doc.text(`Course: ${course}`);
  doc.moveDown();
  doc.text("This is a static dummy data for inviting people to a university.", {
    align: "center",
  });

  // Finalize the PDF
  doc.end();

  res.json({ message: "Invoice generated successfully", path: invoicePath });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
