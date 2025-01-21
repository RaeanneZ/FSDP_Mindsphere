const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class autogenCert {
  constructor(Name) {
    this.Name = Name;
  }

  static async generateCert(name, workshop) {
    try {
      if (!name || !workshop) {
        throw new Error("");
      }

      // Create a new PDF document
      const pdf = new PDFDocument();

      // Generate a file path
      const customDirectory = path.join(__dirname, "../certificates", "pdf"); // Using relative path to "pdf" folder
      const fileName = `${name}_certificate.pdf`;
      const filePath = path.join(customDirectory, fileName);

      // Ensure the directory exists
      fs.mkdirSync(customDirectory, { recursive: true });

      // Pipe the PDF to a writable stream
      pdf.pipe(fs.createWriteStream(filePath));

      // Add content to the PDF
      pdf
        .fontSize(20)
        .text("Certificate of Completion", { align: "center" })
        .moveDown(1);

      pdf
        .fontSize(16)
        .text(
          `This is to certify that ${name} has successfully completed the course.`,
          { align: "center" }
        )
        .moveDown(2);

      pdf.text("Congratulations!", { align: "center" });

      // Finalize the PDF and close the stream
      pdf.end();

      // Return file path
      return filePath;
    } catch (error) {
      console.error("Error generating certificate:", error);
      throw error;
    }
  }
}

module.exports = autogenCert;
