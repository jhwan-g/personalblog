import React, { useState } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  '../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export default function Pdf({url}) {
    

    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    }

    return (
        <>
        <div className="main">
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                >
                {[...new Array(numPages)].map((_, i) => i + 1).map((i) => (<Page pageNumber={i} key={i}/>))}
            </Document>
        </div>
        </>
    );
}