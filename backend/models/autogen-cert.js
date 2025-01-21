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
        throw new Error(
          "Both name and workshop are required to generate the certificate."
        );
      }

      // Create a new PDF document with A4 landscape layout
      const pdf = new PDFDocument({ size: "A4", layout: "landscape" }); // Set the page size and orientation

      // Generate file path and ensure directory exists
      const customDirectory = path.join(__dirname, "../pdf/certificates");
      const fileName = `${name}_certificate.pdf`;
      const filePath = path.join(customDirectory, fileName);

      // Add the certificate template image as the background
      const templatePath = path.join(
        __dirname,
        "../assets",
        "certificate_template.png"
      );
      pdf.image(templatePath, 0, 0, { width: 841 }); // Add the image as the background

      // Ensure the directory exists
      fs.mkdirSync(customDirectory, { recursive: true });

      // Add name text over the template
      pdf
        .fontSize(30)
        .font("Helvetica-Bold")
        .fillColor("black")
        .text(name, 250, 250, { width: 500, align: "center" });

      // Add the workshop text over the template (adjust position)
      pdf
        .fontSize(18)
        .font("Helvetica")
        .fillColor("black")
        .text(`Workshop: ${workshop}`, 250, 300, {
          width: 500,
          align: "center",
        });

      // Set up a writable stream
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the PDF to the writable stream
      pdf.pipe(writeStream);

      // Catch any error during file writing
      writeStream.on("finish", () => {
        console.log("PDF file successfully created at", filePath);
      });

      // Add error handler for the writable stream
      writeStream.on("error", (err) => {
        console.error("Error writing the PDF file:", err);
      });

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
