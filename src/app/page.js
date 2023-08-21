import UploadPDF from '@/components/Pdf';

export default function Home() {

  return (
    <div className='mt-2'>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-extrabold dark:text-blue-500">Pdf File Uploader</h1>
      </div>
      <UploadPDF />
    </div>
  );
}
