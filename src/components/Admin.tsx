"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utility/type";
import { getData, sendData } from "../redux/actions";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AdminSide = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState<Boolean>(false);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleOpenFileManager = () => {
    fileRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return toast.info("Select a CSV before uploading");
    setConfirmSubmit(true);
  };

  const finalSubmission = () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("csvFile", file);
      dispatch(sendData({ file: formData }));
      setConfirmSubmit(false);
      setFile(null);
    } catch (error) {
      setConfirmSubmit(false);
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);


  return (
    <div className="bg-[#e9ebec] lg:text-xl text-center">
      {confirmSubmit ? (
        <div className="h-screen w-screen flex justify-center items-center flex-col">
          <div className="text-center text-xl pt-10 text-white font-bold w-1/2 lg:w-1/3 h-1/3 bg-black/40 rounded">
            <div>
              <p>Confirm Submission??</p>
              <p>This is an irreversible action</p>
            </div>
            <div className="text-base mt-5">{file?.name}</div>
            <div className="flex justify-between px-16 pt-20">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="font-mono hover:bg-gray-100 bg-gray-300 px-4 py-2 rounded text-rose-500  text-xl"
              >
                Cancel
              </button>
              <button
                onClick={finalSubmission}
                className="font-mono hover:bg-gray-100 bg-gray-300 px-4 py-2 rounded text-emerald-400 text-xl"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-20 flex flex-col justify-evenly min-h-screen ">
          <div className="flex flex-col items-center gap-2">
            <p>
              Visit Official{" "}
              <Link target="_blank" href="https://anemiamuktbharat.info/">
                <i className="text-rose-500 underline font-bold">
                  Anemia Mukt Bharat Website
                </i>
              </Link>
            </p>
            <div>
              <p>
                Select{" "}
                <span className="font-semibold">Quarter-wise dropdown</span>{" "}
                from the <span className="font-semibold">AMB Ranking</span> in
                the navigation header
              </p>
            </div>
            <div>
              <p>
                Check the <span className="font-semibold">Select Quarter</span>{" "}
                checkbox, select the required{" "}
                <span className="font-semibold">
                  Year, Quarter and Location
                </span>{" "}
                from the dropdowns available and then press{" "}
                <span className="font-semibold">View Details</span>
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Download</span> the pdf
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p>
              Now that you have the required pdf, the next step is to convert it
              to csv
            </p>
            <p>
              You can do so from{" "}
              <Link
                target="_blank"
                href="https://products.groupdocs.app/conversion/pdf-to-csv"
              >
                <i className="text-rose-500 underline font-bold">
                  PDF to CSV Website
                </i>
              </Link>
            </p>
            <p>
              <span className="font-semibold">Download</span> the converted CSV
              file.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p>
              Now that all the boring processes are done, all that&apos;s left
              is <span className="font-semibold">uploading the CSV file</span>{" "}
              to our server.
            </p>
            <p>You can do so down here:</p>
            <div
              className={`h-full bg-black/40 hover:bg-transparent/20 hover:text-black px-2 py-1 rounded text-white cursor-pointer flex justify-center flex-col gap-4 items-center`}
              onClick={handleOpenFileManager}
            >
              <p>Select CSV File</p>
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
            <div className="border border-t-black border-b-black">
              {file?.name}
            </div>
            <button onClick={handleUpload}>
              <i className="text-rose-500  text-xl lg:text-2xl pt-3 underline font-bold">
                Upload CSV
              </i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSide;
