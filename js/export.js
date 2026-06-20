/* ================================== PDF EXPORT ================================== */ async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  /* TITLE */ pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("NUMERICAL DIFFERENTIATION CALCULATOR", 20, 15);
  /* CURRENT DATE */

const today = new Date();

const formattedDate =
today.toLocaleDateString("en-GB");

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setFontSize(10);

pdf.text(
    "Date: " + formattedDate,
    155,
    12
);
  pdf.setFontSize(10);
  pdf.text(
    "Department of Computer Science and Engineering (CSE), IIUC",
    20,
    22,
  );
  pdf.line(20, 26, 190, 26);
  /* TEAM */ pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.text("Developer Team", 20, 36);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text("Abdullah Al Kafi (C231078)", 25, 45);
  pdf.text("Mir Mohammed Farhad (C231043)", 25, 52);
  pdf.text("Mohammed Minul Islam (C231076)", 25, 59);
  pdf.line(20, 65, 190, 65);
  /* RESULT SUMMARY */ pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Result Summary", 20, 75);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(
    "Derivative : " + document.getElementById("derivativeCard").innerText,
    25,
    85,
  );
  pdf.text(
    "Exact Value : " + document.getElementById("exactCard").innerText,
    25,
    92,
  );
  pdf.text("Error : " + document.getElementById("errorCard").innerText, 25, 99);
  pdf.text(
    "Method : " + document.getElementById("methodCard").innerText,
    25,
    106,
  );
  pdf.line(20, 112, 190, 112);
  /* COMPARISON TABLE */ pdf.setFont("helvetica", "bold");
  pdf.text("Method Comparison", 20, 122);
  pdf.setFont("helvetica", "normal");
  pdf.text("Method", 25, 132);
  pdf.text("Derivative", 85, 132);
  pdf.text("Error", 150, 132);
  pdf.line(20, 136, 190, 136);
  const rows = document.querySelectorAll("#comparisonBody tr");
  let y = 145;
  rows.forEach((row) => {
    const cols = row.querySelectorAll("td");
    pdf.text(cols[0].innerText, 25, y);
    pdf.text(cols[1].innerText, 85, y);
    pdf.text(cols[2].innerText, 150, y);
    y += 8;
  });
  /* FUNCTION GRAPH */ const graphDiv =
    document.getElementById("functionGraph");
  const graphImage = await Plotly.toImage(graphDiv, {
    format: "png",
    width: 900,
    height: 500,
  });
  pdf.setFont("helvetica", "bold");
  pdf.text("Function Graph", 20, 182);
  pdf.addImage(graphImage, "PNG", 20, 187, 170, 75);
  /* SAVE PDF */ pdf.save("NumericalDifferentiationReport.pdf");
}
/* ================================== GRAPH DOWNLOAD ================================== */ function downloadGraph() {
  Plotly.downloadImage("functionGraph", {
    format: "png",
    filename: "FunctionGraph",
    width: 1200,
    height: 700,
  });
}
