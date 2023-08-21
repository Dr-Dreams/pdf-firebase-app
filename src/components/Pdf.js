"use client";
import { React, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import PdfCard from "./PdfCard";
import { storage, db } from "../../firebase.config";
import { useEffect } from "react";


function Pdf() {

    const [pdf, setPdf] = useState(null);
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        showPdf();
    }, [pdfs]);

    // upload pdf function
    const uploadPdf = async () => {

        try {
            const storageRef = ref(storage, `pdfs/${pdf.name}`);
            await uploadBytes(storageRef, pdf).then((snapshot) => {
                console.log("Pdf is uploaded!");
            });
            const url = await getDownloadURL(storageRef);
            console.log(url);
            const docRef = doc(db, "pdfs", pdf.name);
            await setDoc(docRef, { url });
            setPdf(null);
            setPdfs([]);
            alert("Your Pdf is uploaded sucessfully!")

        } catch (err) {
            console.error(err);
        }

    }

    // show pdf function
    const showPdf = async () => {

        try {

            const queryRef = collection(db, "pdfs");
            const querySnap = await getDocs(queryRef);
            const pdfUrls = [];
            querySnap.forEach((doc) => {

                const url = doc.data().url;
                pdfUrls.push(url);
            });
            setPdfs(pdfUrls);

        } catch (err) {
            console.error(err);
        }

    }
    return (
        <div>
            <div className="flex items-center justify-center w-[50vw] ml-auto mr-auto mt-10">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            {pdf ? pdf.name : 'PDF (MAX. 5MB)'}
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={(event) => { setPdf(event.target.files[0]) }} />
                </label>
            </div>
            <div className="flex justify-center items-center mt-5">
                <button
                    type="submit"
                    onClick={uploadPdf}
                    className="mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
                <button
                    type="submit"
                    onClick={() => setPdf(null)}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                    Cancel
                </button>
            </div>
            <div className="flex flex-wrap justify-center mt-4">
                {pdfs.map((url, index) => (
                    <PdfCard idx={index + 1} url={url} />
                ))}
            </div>
        </div>
    );
}

export default Pdf;
