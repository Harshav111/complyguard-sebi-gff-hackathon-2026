import { useState, useRef } from "react";
import { CIRCULAR } from "../data/mockData";

const PROCESSING_STEPS = [
  "Parsing PDF text...",
  "Chunking + generating embeddings...",
  "Retrieving relevant clauses...",
  "Extracting structured obligations...",
];

export default function UploadCircular({ onComplete }) {
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const timeouts = useRef([]);

  function startProcessing(name) {
    setFileName(name);
    setProcessing(true);
    setStepIndex(0);
    PROCESSING_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), (i + 1) * 550);
      timeouts.current.push(t);
    });
    const done = setTimeout(() => onComplete(), PROCESSING_STEPS.length * 550 + 450);
    timeouts.current.push(done);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    startProcessing(file ? file.name : `${CIRCULAR.name}.pdf`);
  }

  function handlePick(e) {
    const file = e.target.files?.[0];
    startProcessing(file ? file.name : `${CIRCULAR.name}.pdf`);
  }

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
        Upload a circular
      </h2>
      <p className="mt-2 text-sm text-neutral-500">
        Drop a SEBI circular PDF, or use the sample Master Circular for Stock
        Brokers.
      </p>

      {!processing && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
            dragOver ? "border-violet-400 bg-violet-50/40" : "border-neutral-200"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            ↑
          </div>
          <p className="mt-4 text-sm text-neutral-500">
            Drag and drop a PDF here, or
          </p>
          <label className="mt-3 cursor-pointer rounded-full bg-emerald-300 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400">
            Choose file
            <input type="file" accept="application/pdf" className="hidden" onChange={handlePick} />
          </label>
          <button
            onClick={() => startProcessing(`${CIRCULAR.name}.pdf`)}
            className="mt-4 text-sm text-violet-700 underline underline-offset-2 hover:text-violet-900"
          >
            or use the sample circular
          </button>
        </div>
      )}

      {processing && (
        <div className="mt-8 rounded-2xl border border-neutral-200 p-8">
          <p className="font-mono text-sm font-medium text-neutral-900">{fileName}</p>
          <div className="mt-6 space-y-3">
            {PROCESSING_STEPS.map((label, i) => {
              const active = i === stepIndex;
              return (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                      i <= stepIndex ? "bg-violet-600" : "bg-neutral-200"
                    } ${active ? "animate-pulse" : ""}`}
                  />
                  <p
                    className={`font-mono text-sm ${
                      i <= stepIndex ? "text-neutral-900" : "text-neutral-300"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
