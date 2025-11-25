function openPdfModal(pdfUrl) {
  document.getElementById("pdfViewer").src = pdfUrl;
  document.getElementById("pdfModal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closePdfModal() {
  document.getElementById("pdfModal").classList.add("hidden");
  document.getElementById("pdfViewer").src = "";
  document.body.classList.remove("overflow-hidden");
}

const btncv = document.getElementById("btncv");
btncv.addEventListener("click", function () {
  openPdfModal("assets/docs/CV.pdf");
});

const btnCloseModal = document.getElementById("btnCloseModal");
btnCloseModal.addEventListener("click", function () {
  closePdfModal();
});
