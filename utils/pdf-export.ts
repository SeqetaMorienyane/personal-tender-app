import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportToPDF(elementId: string, filename = "tender-comparison.pdf") {
  try {
    // Get the element to export
    const element = document.getElementById(elementId)
    if (!element) throw new Error("Element not found")

    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    // Calculate the PDF dimensions
    const imgData = canvas.toDataURL("image/png")
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create the PDF
    const pdf = new jsPDF("p", "mm", "a4")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Handle multi-page if necessary
    let position = 0
    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight)
      heightLeft = heightLeft - pageHeight
    }

    // Save the PDF
    pdf.save(filename)
    return true
  } catch (error) {
    console.error("Error exporting PDF:", error)
    return false
  }
}
