import { useState, useRef, useEffect } from "react";

const KNOWLEDGE_BASE = {
  admissions: {
    undergraduate: {
      deadline: "March 15, 2025",
      process: "Apply via college portal → Upload documents → Pay fee → Appear for entrance test → Merit list",
      eligibility: "10+2 with minimum 60% marks in PCM/PCB/Commerce depending on stream",
      entrance_test: "CUET scores accepted; College entrance test on April 5, 2025",
      documents: ["10th marksheet", "12th marksheet", "Aadhar card", "Passport photos", "Category certificate if applicable"],
      fee_structure: "Application fee: ₹500 (General), ₹250 (SC/ST)"
    },
    postgraduate: {
      deadline: "May 20, 2025",
      process: "Online application → Entrance exam → Interview → Admission",
      eligibility: "Bachelor's degree with 55% minimum marks",
      documents: ["Graduation certificates", "Migration certificate", "Character certificate"]
    }
  },
  fees: {
    tuition: {
      btech: "₹85,000 per year",
      bca: "₹55,000 per year",
      bba: "₹50,000 per year",
      mtech: "₹95,000 per year",
      mba: "₹1,10,000 per year",
      mca: "₹70,000 per year"
    },
    hostel: {
      single_room: "₹45,000 per year",
      double_sharing: "₹32,000 per year",
      triple_sharing: "₹25,000 per year",
      mess_charges: "₹18,000 per year (compulsory for hostel residents)"
    },
    other_fees: {
      library: "₹2,000 per year",
      lab: "₹3,500 per year",
      sports: "₹1,500 per year",
      exam: "₹1,200 per semester"
    },
    payment_modes: "Online (net banking, UPI, credit/debit card) or Demand Draft in favour of 'The Principal'",
    scholarship: "Merit scholarship for top 10% students: 25% tuition fee waiver. SC/ST/OBC scholarships as per government norms."
  },
  courses: {
    undergraduate: ["B.Tech (CSE, ECE, ME, CE, EE)", "BCA", "BBA", "B.Sc (Physics, Chemistry, Maths)", "B.Com", "BA (English, Economics, History)"],
    postgraduate: ["M.Tech (CSE, ECE)", "MBA", "MCA", "M.Sc (Physics, Chemistry)", "M.Com"],
    diploma: ["Diploma in Computer Science (3 years)", "Diploma in Mechanical Engineering (3 years)"],
    certifications: ["Python Programming (6 weeks)", "Data Science (3 months)", "Digital Marketing (2 months)", "Cybersecurity Basics (6 weeks)"]
  },
  exams: {
    mid_semester: {
      odd_sem: "October 7-14, 2025",
      even_sem: "March 3-10, 2025"
    },
    end_semester: {
      odd_sem: "November 25 - December 10, 2025",
      even_sem: "April 20 - May 5, 2025"
    },
    hall_ticket: "Available on student portal 5 days before exam",
    result: "Results declared within 30 days of last exam",
    grading: "10-point CGPA system. Minimum 5.0 CGPA to pass each semester",
    backlog: "Students with backlogs can apply for supplementary exams in June and December"
  },
  hostel: {
    boys_hostels: ["Bharat Bhavan (200 rooms)", "Vivekananda Bhavan (150 rooms)", "New Boys Hostel (300 rooms)"],
    girls_hostels: ["Saraswati Bhavan (180 rooms)", "Meera Bhavan (220 rooms)"],
    facilities: ["Wi-Fi (50 Mbps)", "24/7 security", "Laundry", "Reading room", "Indoor games", "Medical room"],
    rules: {
      curfew: "10:30 PM on weekdays, 11:30 PM on weekends",
      visitors: "Allowed in common area only, 10 AM - 7 PM",
      leave: "Outpass required for overnight leave; apply 24 hours in advance via portal",
      prohibited: ["Cooking in rooms", "Alcohol", "Smoking", "Loud music after 10 PM"]
    },
    warden: "Contact hostel warden office: ext. 205 (boys), ext. 206 (girls)"
  },
  departments: {
    academics: { contact: "academics@college.edu", ext: "101", head: "Dr. Ramesh Kumar" },
    admissions: { contact: "admissions@college.edu", ext: "102", location: "Admin Block, Room 5" },
    finance: { contact: "finance@college.edu", ext: "103", hours: "10 AM - 4 PM, Mon-Fri" },
    library: { contact: "library@college.edu", ext: "104", hours: "8 AM - 9 PM (Mon-Sat), 10 AM - 6 PM (Sun)" },
    it_support: { contact: "itsupport@college.edu", ext: "105" },
    hostel_office: { contact: "hostel@college.edu", ext: "205/206" },
    placement: { contact: "placement@college.edu", ext: "107", head: "Mr. Arvind Sharma" },
    sports: { contact: "sports@college.edu", ext: "108" }
  },
  placements: {
    stats_2024: "Average package: ₹8.2 LPA | Highest package: ₹42 LPA | 92% placement rate",
    top_recruiters: ["TCS", "Infosys", "Wipro", "Google", "Microsoft", "Amazon", "Deloitte", "KPMG", "HCL", "Cognizant"],
    internships: "Mandatory 6-week internship in 6th semester for B.Tech students",
    eligibility: "Minimum 6.5 CGPA required to sit for campus placements",
    process: "Registration on placement portal → Aptitude test → Technical round → HR round"
  },
  library: {
    collection: "50,000+ books, 200+ journals, access to IEEE, Springer, Elsevier databases",
    borrowing: "UG students: 3 books for 14 days | PG students: 5 books for 21 days",
    fine: "₹5 per day per book for late return",
    digital: "Remote access to e-resources via student login at library.college.edu",
    hours: "Monday-Saturday: 8 AM - 9 PM | Sunday: 10 AM - 6 PM"
  },
  clubs: {
    technical: ["Coding Club", "Robotics Club", "IEEE Student Branch", "Entrepreneurship Cell"],
    cultural: ["Drama Club", "Music Society", "Dance Troupe", "Photography Club", "Literary Society"],
    sports: ["Cricket", "Football", "Basketball", "Badminton", "Chess", "Athletics"],
    how_to_join: "Attend club fair in first week of semester or email club coordinator directly"
  },
  important_dates_2025: {
    "Semester registration": "July 1-10",
    "Classes begin": "July 15",
    "Last date fee payment": "July 31",
    "Mid-sem exams": "October 7-14",
    "Diwali break": "October 20-25",
    "End-sem exams": "November 25 - December 10",
    "Winter break": "December 15 - January 5",
    "Annual fest (Technomania)": "February 14-16, 2026"
  }
};

const SYSTEM_PROMPT = `You are ARIA (Automated Response & Information Agent), an intelligent college helpdesk assistant for Apex Institute of Technology & Management. You are friendly, concise, and deeply knowledgeable.

KNOWLEDGE BASE:
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

CRITICAL RESPONSE FORMAT:
Always respond with a valid JSON object in this exact structure:
{
  "message": "Your friendly, helpful response to the student (use markdown: **bold**, bullet points with -, etc.)",
  "department": "ONE of: Admissions | Finance | Academics | Hostel | Library | Placements | IT Support | Student Affairs | General",
  "intent_tags": ["array", "of", "detected", "intents"],
  "needs_clarification": false,
  "clarification_question": null,
  "ticket": null
}

If you need clarification:
{
  "message": "Brief acknowledgment + your clarifying question",
  "department": "General",
  "intent_tags": ["clarification_needed"],
  "needs_clarification": true,
  "clarification_question": "The specific question you need answered",
  "ticket": null
}

If the query is COMPLETELY outside your knowledge base AND cannot be reasonably answered:
{
  "message": "Your response explaining you're escalating this",
  "department": "Escalated",
  "intent_tags": ["unknown_query", "escalated"],
  "needs_clarification": false,
  "clarification_question": null,
  "ticket": {
    "id": "TKT-[4-digit number]",
    "category": "Category of issue",
    "priority": "Low/Medium/High/Critical",
    "description": "Detailed description of the unresolved query",
    "student_message": "Original student message",
    "timestamp": "Current time",
    "assigned_to": "Relevant department email"
  }
}

BEHAVIORAL RULES:
1. Handle MULTIPLE intents in a single response — if student asks about fees AND hostel, answer BOTH thoroughly
2. Ask clarification only when genuinely ambiguous (e.g., "my application" — which course?)
3. Generate tickets ONLY for queries truly outside your KB (e.g., specific room numbers, personal account issues, complaints)
4. Be warm and student-friendly, use "I" naturally
5. Keep responses scannable — use bullet points and **bold** for key info
6. Always suggest next steps or relevant contact info
7. Respond in the same language as the student (Hindi/English/Hinglish)
8. NEVER make up information not in the knowledge base`;

const DEPT_COLORS = {
  "Admissions": { bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-500/30" },
  "Finance": { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/30" },
  "Academics": { bg: "bg-violet-500/20", text: "text-violet-300", border: "border-violet-500/30" },
  "Hostel": { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/30" },
  "Library": { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/30" },
  "Placements": { bg: "bg-rose-500/20", text: "text-rose-300", border: "border-rose-500/30" },
  "IT Support": { bg: "bg-orange-500/20", text: "text-orange-300", border: "border-orange-500/30" },
  "Student Affairs": { bg: "bg-pink-500/20", text: "text-pink-300", border: "border-pink-500/30" },
  "General": { bg: "bg-slate-500/20", text: "text-slate-300", border: "border-slate-500/30" },
  "Escalated": { bg: "bg-red-500/20", text: "text-red-300", border: "border-red-500/30" }
};

const QUICK_QUESTIONS = [
  "What are the B.Tech fees?",
  "When are mid-semester exams?",
  "How do I apply for hostel?",
  "What's the placement record?",
  "Tell me about library timings and how to borrow books",
  "What are the admission requirements and deadlines?"
];

function formatMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, i) => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: line.slice(2) }} />;
    }
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
  });
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: {
        message: "👋 Hello! I'm **ARIA**, your Apex Institute helpdesk assistant.\n\nI can help you with:\n- **Admissions** — eligibility, deadlines, documents\n- **Fees** — tuition, hostel, scholarships\n- **Exams** — schedule, results, grading\n- **Hostel** — rooms, rules, facilities\n- **Placements** — companies, packages, eligibility\n- **Library, Clubs, Courses** and much more!\n\nWhat can I help you with today? 😊",
        department: "General",
        intent_tags: ["greeting"],
        ticket: null
      }
    }]);
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = { role: "user", content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const conversationHistory = newMessages
        .filter(m => m.role !== "assistant" || typeof m.content === "object")
        .map(m => ({
          role: m.role,
          content: m.role === "assistant"
            ? `[Previous response about: ${m.content.intent_tags?.join(", ")}] ${m.content.message}`
            : m.content
        }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      const rawText = data.content?.map(c => c.text || "").join("") || "";

      let parsed;
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
      } catch {
        parsed = {
          message: rawText || "I'm sorry, I couldn't process that. Please try again.",
          department: "General",
          intent_tags: ["error"],
          ticket: null
        };
      }

      if (parsed.ticket) {
        setTickets(prev => [{ ...parsed.ticket, timestamp: new Date().toLocaleString() }, ...prev]);
      }

      setMessages(prev => [...prev, { role: "assistant", content: parsed }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: {
          message: "⚠️ Connection error. Please check your API key or network and try again.",
          department: "IT Support",
          intent_tags: ["error"],
          ticket: null
        }
      }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const ticketPriorityColor = (p) => ({
    "Critical": "text-red-400 bg-red-400/10",
    "High": "text-orange-400 bg-orange-400/10",
    "Medium": "text-yellow-400 bg-yellow-400/10",
    "Low": "text-green-400 bg-green-400/10"
  }[p] || "text-slate-400 bg-slate-400/10");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0a0f1e", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Mono:wght@400;700&display=swap');
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-bright { background: rgba(255,255,255,0.07); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); }
        
        .glow-blue { box-shadow: 0 0 30px rgba(99, 102, 241, 0.15); }
        
        .typing-dot { width: 7px; height: 7px; background: #6366f1; border-radius: 50%; animation: typing 1.2s infinite ease-in-out; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
        
        .msg-in { animation: slideIn 0.3s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        
        .tab-active { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; }
        .tab-inactive { color: #64748b; }
        .tab-inactive:hover { color: #94a3b8; background: rgba(255,255,255,0.05); }
        
        .quick-btn { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: #a5b4fc; transition: all 0.2s; }
        .quick-btn:hover { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.4); color: #c7d2fe; transform: translateY(-1px); }
        
        .send-btn { background: linear-gradient(135deg, #6366f1, #8b5cf6); transition: all 0.2s; }
        .send-btn:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(99,102,241,0.4); }
        .send-btn:disabled { opacity: 0.4; transform: none; }

        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* Header */}
      <div className="glass" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "white", fontFamily: "'Space Mono', monospace"
            }}>A</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>ARIA</div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase" }}>Apex Institute Helpdesk</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 500 }}>Online</span>
            </div>

            {tickets.length > 0 && (
              <button onClick={() => setActiveTab("tickets")}
                style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
                🎫 {tickets.length} Ticket{tickets.length > 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px 0" }}>
        <div style={{ display: "flex", gap: 4, padding: 4, background: "rgba(255,255,255,0.03)", borderRadius: 12, width: "fit-content", border: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { id: "chat", label: "💬 Chat" },
            { id: "tickets", label: `🎫 Tickets${tickets.length ? ` (${tickets.length})` : ""}` },
            { id: "kb", label: "📚 Quick Info" }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "tab-active" : "tab-inactive"}
              style={{ padding: "8px 16px", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", transition: "all 0.2s" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24, display: "flex", gap: 20, height: "calc(100vh - 130px)" }}>

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div style={{ display: "flex", gap: 20, width: "100%", height: "100%" }}>
            {/* Main Chat */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
              {/* Messages */}
              <div className="glass" style={{ flex: 1, borderRadius: 20, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.map((msg, i) => (
                  <div key={i} className="msg-in" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    {msg.role === "assistant" && (
                      <div style={{ display: "flex", gap: 10, maxWidth: "85%", alignItems: "flex-start" }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700, color: "white", fontFamily: "'Space Mono', monospace"
                        }}>A</div>
                        <div>
                          {msg.content.department && (
                            <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                              <span className={`${DEPT_COLORS[msg.content.department]?.bg || "bg-slate-500/20"} ${DEPT_COLORS[msg.content.department]?.text || "text-slate-300"}`}
                                style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.5px", textTransform: "uppercase", border: `1px solid`, display: "inline-block" }}>
                                {msg.content.department}
                              </span>
                              {msg.content.intent_tags?.filter(t => t !== "greeting" && t !== "error").slice(0, 3).map((tag, ti) => (
                                <span key={ti} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.05)", color: "#64748b", border: "1px solid rgba(255,255,255,0.06)" }}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="glass-bright" style={{ padding: "12px 16px", borderRadius: "4px 16px 16px 16px", fontSize: 14, lineHeight: 1.6 }}>
                            <div>{formatMessage(msg.content.message)}</div>
                          </div>
                          {msg.content.ticket && (
                            <div style={{ marginTop: 8, padding: "10px 14px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                              <div style={{ fontSize: 11, color: "#f87171", fontWeight: 600, marginBottom: 4 }}>🎫 TICKET GENERATED</div>
                              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                                <span style={{ fontFamily: "'Space Mono', monospace", color: "#fbbf24" }}>{msg.content.ticket.id}</span>
                                {" · "}{msg.content.ticket.category}
                                {" · "}<span className={ticketPriorityColor(msg.content.ticket.priority)} style={{ padding: "1px 6px", borderRadius: 4 }}>{msg.content.ticket.priority}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div style={{
                        maxWidth: "75%", padding: "10px 16px", borderRadius: "16px 4px 16px 16px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        fontSize: 14, lineHeight: 1.5, color: "white", fontWeight: 400
                      }}>
                        {msg.content}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="msg-in" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", fontFamily: "'Space Mono', monospace" }}>A</div>
                    <div className="glass-bright" style={{ padding: "14px 18px", borderRadius: "4px 16px 16px 16px", display: "flex", gap: 5, alignItems: "center" }}>
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="glass" style={{ borderRadius: 16, padding: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about admissions, fees, exams, hostel, placements..."
                    rows={1}
                    style={{
                      flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: "10px 14px", color: "#e2e8f0", fontSize: 14,
                      resize: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5,
                      maxHeight: 120, overflow: "auto"
                    }}
                  />
                  <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="send-btn"
                    style={{ width: 44, height: 44, borderRadius: 12, border: "none", color: "white", fontSize: 18, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ↑
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Quick Questions */}
            <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="glass" style={{ borderRadius: 20, padding: 16, flex: 1, overflowY: "auto" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Quick Questions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {QUICK_QUESTIONS.map((q, i) => (
                    <button key={i} className="quick-btn" onClick={() => sendMessage(q)}
                      style={{ padding: "10px 12px", borderRadius: 12, fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>
                      {q}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Departments</div>
                  {Object.entries(DEPT_COLORS).filter(([k]) => k !== "General" && k !== "Escalated").map(([dept, colors]) => (
                    <div key={dept} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <div className={colors.bg} style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#64748b" }}>{dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div style={{ width: "100%", overflowY: "auto" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Support Tickets</h2>
              <p style={{ fontSize: 13, color: "#64748b" }}>Escalated queries that need staff attention</p>
            </div>
            {tickets.length === 0 ? (
              <div className="glass" style={{ borderRadius: 20, padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>No tickets yet</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>All queries have been resolved by ARIA</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {tickets.map((t, i) => (
                  <div key={i} className="glass" style={{ borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", color: "#fbbf24", fontWeight: 700, fontSize: 14 }}>{t.id}</span>
                        <span className={ticketPriorityColor(t.priority)} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>{t.priority}</span>
                        <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }}>{t.category}</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#475569" }}>{t.timestamp}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8, lineHeight: 1.6 }}>{t.description}</p>
                    {t.assigned_to && (
                      <div style={{ fontSize: 11, color: "#475569" }}>Assigned to: <span style={{ color: "#6366f1" }}>{t.assigned_to}</span></div>
                    )}
                    <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 12, color: "#64748b" }}>
                      <strong>Student query:</strong> "{t.student_message}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* QUICK INFO TAB */}
        {activeTab === "kb" && (
          <div style={{ width: "100%", overflowY: "auto" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Quick Reference</h2>
              <p style={{ fontSize: 13, color: "#64748b" }}>Key information at a glance</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {[
                {
                  title: "📅 Important Dates 2025",
                  items: Object.entries(KNOWLEDGE_BASE.important_dates_2025).map(([k, v]) => `${k}: ${v}`)
                },
                {
                  title: "💰 Tuition Fees",
                  items: Object.entries(KNOWLEDGE_BASE.fees.tuition).map(([k, v]) => `${k.toUpperCase()}: ${v}`)
                },
                {
                  title: "🏠 Hostel Charges",
                  items: Object.entries(KNOWLEDGE_BASE.fees.hostel).map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
                },
                {
                  title: "🎓 Placement Stats 2024",
                  items: [
                    KNOWLEDGE_BASE.placements.stats_2024,
                    `Top recruiters: ${KNOWLEDGE_BASE.placements.top_recruiters.slice(0, 5).join(", ")}...`,
                    `Eligibility: ${KNOWLEDGE_BASE.placements.eligibility}`
                  ]
                },
                {
                  title: "📞 Key Contacts",
                  items: Object.entries(KNOWLEDGE_BASE.departments).map(([k, v]) => `${k.replace(/_/g, " ")}: Ext. ${v.ext}`)
                },
                {
                  title: "📚 Library",
                  items: [
                    `Hours: ${KNOWLEDGE_BASE.library.hours}`,
                    `UG: ${KNOWLEDGE_BASE.library.borrowing.split('|')[0]}`,
                    `PG: ${KNOWLEDGE_BASE.library.borrowing.split('|')[1]}`,
                    `Fine: ${KNOWLEDGE_BASE.library.fine}`
                  ]
                }
              ].map((card, i) => (
                <div key={i} className="glass" style={{ borderRadius: 16, padding: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{card.title}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {card.items.map((item, j) => (
                      <li key={j} style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, paddingLeft: 12, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#6366f1" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
