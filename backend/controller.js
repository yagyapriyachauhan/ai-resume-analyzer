const fs = require("fs");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk/index.js");

// 🔑 Groq init
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.resume;

    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }

    const filePath = "./uploads/" + file.name;
    await file.mv(filePath);

    // 📄 PDF parse
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    // 🧠 Skill check
    const skills = ["python", "java", "c++", "react", "node", "sql"];

    let found = [];
    let missing = [];

    skills.forEach((skill) => {
      if (text.includes(skill)) found.push(skill);
      else missing.push(skill);
    });

    const score = Math.floor((found.length / skills.length) * 100);

    // 🔥 ATS SCORE (NEW)
    const keywords = ["teamwork", "leadership", "project", "internship"];

    let keywordScore = 0;
    keywords.forEach((k) => {
      if (text.includes(k)) keywordScore++;
    });

    const atsScore = Math.floor(
      (found.length / skills.length) * 50 +
      (keywordScore / keywords.length) * 30 +
      20
    );

    // 🎯 ROLE MATCHING (NEW)
    const roles = {
      sde: ["c++", "java", "dsa", "react"],
      data: ["python", "sql", "pandas"],
    };

    const selectedRole = "sde"; // 🔥 baad me frontend se dynamic karenge

    const roleSkills = roles[selectedRole];

    let matched = 0;
    let missingRoleSkills = [];

    roleSkills.forEach((skill) => {
      if (text.includes(skill)) matched++;
      else missingRoleSkills.push(skill);
    });

    const roleMatch = Math.floor((matched / roleSkills.length) * 100);

    // 🔥 GROQ AI CALL (UPDATED STRUCTURED OUTPUT)
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume analyzer. Respond ONLY in JSON format with keys: summary, strengths, weaknesses, suggestions, score.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    let aiParsed;
    try {
      aiParsed = JSON.parse(response.choices[0].message.content);
    } catch {
      aiParsed = { raw: response.choices[0].message.content };
    }

    // 🧹 delete file
    fs.unlinkSync(filePath);

    // 🚀 FINAL RESPONSE
    res.json({
      score,
      atsScore,            // ✅ NEW
      roleMatch,           // ✅ NEW
      found,
      missing,
      missingRoleSkills,   // ✅ NEW
      aiAnalysis: aiParsed,
    });

  } catch (err) {
    console.log("FULL ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};