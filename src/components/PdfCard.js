"use client";
import React from 'react';

function PdfCard({ url, idx }) {
    console.log(idx);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mx-2 mb-4">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">PDF #{idx}</p>
            <iframe
                title={`PDF Viewer #${idx}`}
                src={url}
                width="1000vw"
                height="1000vh"
            ></iframe>
        </div>
    );
}

export default PdfCard;
