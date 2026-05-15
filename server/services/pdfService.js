import PDFDocument from "pdfkit";

export const generateReceipt = (res, user) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt-${user.paymentId}.pdf`,
  );

  doc.pipe(res);

  // Header
  doc.fontSize(24).fillColor("#2563eb").text("Enrollix", { align: "left" });

  doc.fontSize(10).fillColor("gray").text("Smart enrollments made simple");

  doc.moveDown(2);

  // Title + Paid Badge
  doc
    .fontSize(18)
    .fillColor("black")
    .text("Payment Receipt", { continued: true });

  doc.fontSize(10).fillColor("green").text("PAID");

  doc.moveDown();

  // Divider
  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#e5e7eb").stroke();

  doc.moveDown();

  // Customer Info
  doc.fontSize(12).fillColor("black").text("Billed To:", { underline: true });

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .text(user.name)
    .text(user.email || "-")
    .text(user.phone);

  doc.moveDown(2);

  // Payment Table
  const startY = doc.y;

  doc
    .fontSize(12)
    .text("Description", 50, startY)
    .text("Amount", 450, startY, { align: "right" });

  doc.moveDown();

  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#d1d5db").stroke();

  doc.moveDown();

  doc
    .fontSize(12)
    .text(`Enrollment (${user.role})`, 50)
    .text(`₹${user.amount}`, 450, doc.y - 15, { align: "right" });

  doc.moveDown(2);

  // Total
  doc
    .fontSize(14)
    .text("Total Paid", 50, doc.y)
    .text(`${user.amount}`, 450, doc.y, { align: "right" });

  doc.moveDown(2);

  // 📌 Metadata
  doc
    .fontSize(10)
    .fillColor("gray")
    .text(`Payment ID: ${user.paymentId}`)
    .text(`Date: ${new Date(user.createdAt).toLocaleString()}`);

  doc.moveDown(3);

  // Footer
  doc
    .fontSize(12)
    .fillColor("#6b7280")
    .text("Thank you for your purchase!", { align: "center" });

  doc.end();
};

export const generateReceiptBuffer = (user) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });

    doc.on("error", reject);

    // Header
    doc.fontSize(24).fillColor("#2563eb").text("Enrollix", { align: "left" });

    doc.fontSize(10).fillColor("gray").text("Smart enrollments made simple");

    doc.moveDown(2);

    // Title + Paid Badge
    doc
      .fontSize(18)
      .fillColor("black")
      .text("Payment Receipt", { continued: true });

    doc.fontSize(10).fillColor("green").text("PAID");

    doc.moveDown();

    // Divider
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#e5e7eb").stroke();

    doc.moveDown();

    // Customer Info
    doc.fontSize(12).fillColor("black").text("Billed To:", { underline: true });

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(user.name)
      .text(user.email || "-")
      .text(user.phone);

    doc.moveDown(2);

    // Payment Table
    const startY = doc.y;

    doc
      .fontSize(12)
      .text("Description", 50, startY)
      .text("Amount", 450, startY, { align: "right" });

    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor("#d1d5db").stroke();

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Enrollment (${user.role})`, 50)
      .text(`${user.amount}`, 450, doc.y - 15, { align: "right" });

    doc.moveDown(2);

    // Total
    doc
      .fontSize(14)
      .text("Total Paid", 50, doc.y)
      .text(`${user.amount}`, 450, doc.y, { align: "right" });

    doc.moveDown(2);

    // Metadata
    doc
      .fontSize(10)
      .fillColor("gray")
      .text(`Payment ID: ${user.paymentId}`)
      .text(`Date: ${new Date(user.createdAt).toLocaleString()}`);

    doc.moveDown(3);

    // Footer
    doc
      .fontSize(12)
      .fillColor("#6b7280")
      .text("Thank you for your purchase!", { align: "center" });

    doc.end();
  });
};
