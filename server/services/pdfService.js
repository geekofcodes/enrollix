import PDFDocument from "pdfkit";

export const generateReceipt = (res, user) => {
  const doc = new PDFDocument();

  // Headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt-${user.paymentId}.pdf`
  );

  doc.pipe(res);

  // Title
  doc.fontSize(20).text("Enrollix Receipt", { align: "center" });
  doc.moveDown();

  // User details
  doc.fontSize(12).text(`Name: ${user.name}`);
  doc.text(`Phone: ${user.phone}`);
  doc.text(`Email: ${user.email || "-"}`);
  doc.text(`Role: ${user.role || "-"}`);
  doc.moveDown();

  // Payment details
  doc.text(`Payment ID: ${user.paymentId}`);
  doc.text(`Amount Paid: ₹500`);
  doc.text(`Date: ${new Date().toLocaleString()}`);

  doc.moveDown();
  doc.text("Thank you for enrolling!", { align: "center" });

  doc.end();
};