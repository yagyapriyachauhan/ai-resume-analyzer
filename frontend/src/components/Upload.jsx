import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload file first!");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData
      );

      console.log(res.data); // 🔥 debug
      setResult(res.data);
    } catch (err) {
      console.log("ERROR:", err);
      alert("Backend error aa raha hai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative backdrop-blur-2xl bg-white/5 p-10 rounded-3xl shadow-2xl w-full max-w-xl border border-white/10">

        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          AI Resume Analyzer ⚡
        </h1>

        {/* Upload */}
        <label className="block border-2 border-dashed border-white/20 p-6 rounded-xl mb-5 text-center cursor-pointer hover:border-blue-400 transition">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="text-gray-300">
            {file ? file.name : "Click to upload resume"}
          </p>
        </label>

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-8 space-y-6">

            {/* SCORE CARD */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-gray-400">Overall Score</h3>
              <p className="text-2xl text-blue-400 font-bold">{result.score}%</p>
            </div>

            {/* ATS + ROLE */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-gray-400">ATS Score</h3>
                <p className="text-green-400 font-bold">{result.atsScore}%</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-gray-400">Role Match</h3>
                <p className="text-purple-400 font-bold">{result.roleMatch}%</p>
              </div>
            </div>

            {/* FOUND SKILLS */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-green-400 mb-2">✔ Found Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.found?.map((s, i) => (
                  <span key={i} className="bg-green-500/20 px-2 py-1 rounded text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* MISSING SKILLS */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-red-400 mb-2">✘ Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missing?.map((s, i) => (
                  <span key={i} className="bg-red-500/20 px-2 py-1 rounded text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* ROLE SKILLS */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-yellow-400 mb-2">⚡ Missing Role Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingRoleSkills?.map((s, i) => (
                  <span key={i} className="bg-yellow-500/20 px-2 py-1 rounded text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* AI ANALYSIS */}
            {result.aiAnalysis && (
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <h3 className="text-yellow-400 mb-3">🤖 AI Insights</h3>

                {result.aiAnalysis.summary ? (
                  <div className="space-y-3 text-sm">

                    <div>
                      <h4 className="text-blue-400">Summary</h4>
                      <p>{result.aiAnalysis.summary}</p>
                    </div>

                    <div>
                      <h4 className="text-green-400">Strengths</h4>
                      {result.aiAnalysis.strengths?.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-red-400">Weaknesses</h4>
                      {result.aiAnalysis.weaknesses?.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-purple-400">Suggestions</h4>
                      {result.aiAnalysis.suggestions?.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </div>

                  </div>
                ) : (
                  <p>{result.aiAnalysis.raw}</p>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Upload;