import { useState, useEffect } from "react";

const QUESTIONS = [
  {
    dimension: "PLANNING INTEGRITY",
    text: "When your project plan was written, how much of it was built from operational experience in the actual delivery context?",
    options: [
      { text: "The plan was designed by people who have delivered in similar conditions before", score: 5 },
      { text: "The plan was technically sound but designed at a distance from implementation realities", score: 3 },
      { text: "The plan was written to satisfy funding requirements and interpreted later by field teams", score: 1 },
    ],
  },
  {
    dimension: "PLANNING INTEGRITY",
    text: "How accurately does your current workplan reflect what the project is actually doing this quarter?",
    options: [
      { text: "The workplan is a living document that teams use daily to sequence their activities", score: 5 },
      { text: "The workplan exists and is broadly followed, but deviations accumulate without formal revision", score: 3 },
      { text: "The workplan and the actual work have diverged to the point where updating it would mean rewriting it", score: 1 },
    ],
  },
  {
    dimension: "PLANNING INTEGRITY",
    text: "When assumptions in the original design turn out to be wrong, what happens?",
    options: [
      { text: "A structured revision process adjusts scope, timeline, and budget in coordination with all stakeholders", score: 5 },
      { text: "Teams adapt informally and the formal plan is updated at the next reporting cycle", score: 3 },
      { text: "The original assumptions persist in the documentation while reality moves in a different direction", score: 1 },
    ],
  },
  {
    dimension: "STAKEHOLDER ARCHITECTURE",
    text: "How many of your project partners could accurately describe the project's current priorities without checking a document?",
    options: [
      { text: "Most of them, because alignment is maintained through regular operational coordination", score: 5 },
      { text: "Some of them, depending on their proximity to the central coordination team", score: 3 },
      { text: "Very few, because each partner operates from their own interpretation of the original agreement", score: 1 },
    ],
  },
  {
    dimension: "STAKEHOLDER ARCHITECTURE",
    text: "When a decision requires input from multiple partners, how long does it take to reach resolution?",
    options: [
      { text: "Days, because decision channels and escalation paths are pre-agreed", score: 5 },
      { text: "Weeks, because coordination requires convening meetings and negotiating competing priorities", score: 3 },
      { text: "Months, or the decision is quietly made unilaterally and communicated as consensus", score: 1 },
    ],
  },
  {
    dimension: "STAKEHOLDER ARCHITECTURE",
    text: "How would you describe the relationship between your coordination meetings and actual project decisions?",
    options: [
      { text: "Meetings produce decisions with named owners, deadlines, and follow-through mechanisms", score: 5 },
      { text: "Meetings are useful for information-sharing but decisions tend to happen outside them", score: 3 },
      { text: "Meetings are held because they are scheduled, and the minutes read better than the outcomes", score: 1 },
    ],
  },
  {
    dimension: "RESOURCE COHERENCE",
    text: "How well does your project budget reflect the actual cost of delivering the agreed outputs?",
    options: [
      { text: "The budget was built from operational costing and is tracked against delivery milestones", score: 5 },
      { text: "The budget covers most requirements but was structured around donor categories rather than delivery logic", score: 3 },
      { text: "The budget tells a funding story that is increasingly disconnected from what delivery actually costs", score: 1 },
    ],
  },
  {
    dimension: "RESOURCE COHERENCE",
    text: "If a critical team member left tomorrow, how long would it take to restore delivery capacity?",
    options: [
      { text: "Weeks, because knowledge is documented and roles have built-in redundancy", score: 5 },
      { text: "A few months, because institutional memory lives in people more than in systems", score: 3 },
      { text: "It would be a crisis, because the project depends on individuals the structure cannot replace", score: 1 },
    ],
  },
  {
    dimension: "RESOURCE COHERENCE",
    text: "When your project timeline slips, where does the pressure go?",
    options: [
      { text: "Into a formal reprioritisation process that adjusts scope or resources to match reality", score: 5 },
      { text: "Into the field team, who absorb the pressure by working harder within the same constraints", score: 3 },
      { text: "Into the next reporting period, where the slip is reframed as adjusted planning", score: 1 },
    ],
  },
  {
    dimension: "CROSS-CONTEXT OPERATIONS",
    text: "How does your project handle the fact that partners operate in different languages, institutional cultures, or administrative systems?",
    options: [
      { text: "Multilingual and multi-system operations are built into the project architecture from design stage", score: 5 },
      { text: "Translation and adaptation happen as needed, usually driven by individual initiative", score: 3 },
      { text: "One operational language and one administrative system dominate, and partners adapt or fall behind", score: 1 },
    ],
  },
  {
    dimension: "CROSS-CONTEXT OPERATIONS",
    text: "When your project operates across multiple countries or institutional environments, how consistent is the quality of delivery?",
    options: [
      { text: "Consistent, because quality standards are explicit and monitored across all contexts", score: 5 },
      { text: "Variable, depending on the capacity and engagement of local implementing partners", score: 3 },
      { text: "Inconsistent, and the variation is not systematically tracked or addressed", score: 1 },
    ],
  },
  {
    dimension: "CROSS-CONTEXT OPERATIONS",
    text: "How does your project balance donor reporting requirements with the realities of implementation on the ground?",
    options: [
      { text: "Reporting systems are designed to capture operational truth and satisfy compliance simultaneously", score: 5 },
      { text: "The team manages two parallel realities and does its best to bridge them at reporting time", score: 3 },
      { text: "Reporting has become a performance that the ground team produces for an audience that does not visit", score: 1 },
    ],
  },
  {
    dimension: "DELIVERY UNDER CONSTRAINT",
    text: "When external conditions change significantly mid-project, what is the first thing that happens?",
    options: [
      { text: "The project manager activates a pre-agreed contingency protocol and informs all stakeholders within 48 hours", score: 5 },
      { text: "The project manager assesses the situation and begins informal consultations to determine next steps", score: 3 },
      { text: "The project continues as planned while leadership decides whether the change is significant enough to acknowledge", score: 1 },
    ],
  },
  {
    dimension: "DELIVERY UNDER CONSTRAINT",
    text: "How does your project distinguish between a delivery problem and a design problem?",
    options: [
      { text: "Through regular operational reviews that separate execution gaps from structural flaws in the original design", score: 5 },
      { text: "When the same problem persists despite multiple attempts to fix it at the operational level", score: 3 },
      { text: "The distinction is rarely made, and most problems are treated as execution failures regardless of their origin", score: 1 },
    ],
  },
  {
    dimension: "DELIVERY UNDER CONSTRAINT",
    text: "What is the single biggest risk to your project's credibility over the next twelve months?",
    options: [
      { text: "Failing to deliver on existing commitments, which would be visible and consequential", score: 5 },
      { text: "Losing the alignment between partners that currently holds the project together", score: 3 },
      { text: "Continuing to produce activity reports that no longer correspond to measurable outcomes", score: 1 },
    ],
  },
];

const DIMENSIONS = [
  "PLANNING INTEGRITY",
  "STAKEHOLDER ARCHITECTURE",
  "RESOURCE COHERENCE",
  "CROSS-CONTEXT OPERATIONS",
  "DELIVERY UNDER CONSTRAINT",
];

const DIM_INSIGHTS = {
  "PLANNING INTEGRITY": {
    high: "Your project plan appears to be an operational instrument rather than a funding artefact. This matters because planning integrity is the structural precondition for everything downstream: if the map does not match the territory, every subsequent decision compounds the original error. The question worth examining is whether this integrity survives contact with the next budget cycle.",
    mid: "Your planning architecture carries the right structure but shows signs of drift between documentation and operational reality. This is the most common condition in multi-partner projects: the plan was sound at design stage, but the gap between what was written and what is being done widens incrementally until somebody notices at audit.",
    low: "Your project plan and your operational reality appear to have separated. This is the condition where reporting becomes a parallel activity disconnected from delivery, and where teams spend increasing energy maintaining the narrative rather than correcting the trajectory. The plan is no longer a steering instrument. It is a compliance document.",
  },
  "STAKEHOLDER ARCHITECTURE": {
    high: "Coordination in your project produces decisions rather than meetings. This is rarer than it sounds: most multi-partner architectures are designed for information-sharing and alignment, which is not the same as decision-making. If your coordination mechanisms carry actual decision authority, your project has structural capacity that many programmes three times its budget do not.",
    mid: "Your stakeholder architecture functions but relies on individual relationships more than on structural mechanisms. This means coordination holds when the right people are in the room and degrades when they are not. The risk is human-dependent governance in a project that will outlast any single coordinator.",
    low: "Stakeholder coordination in your project appears to have become a ceremony. Partners attend meetings, minutes are circulated, and each actor continues to operate from a private interpretation of the agreement. This is the condition where shared ownership quietly becomes shared alibi.",
  },
  "RESOURCE COHERENCE": {
    high: "Your budget, timeline, and human capacity appear to be aligned around delivery rather than around reporting categories. This is the difference between a project that can absorb pressure and one that collapses under it: when resources are allocated to outcomes, constraints are visible early. When they are allocated to budget lines, the crisis arrives at audit.",
    mid: "Your resource architecture is functional but carries structural tensions between what the project has committed to and what it can realistically deliver. The gap typically shows first in the field team's workload, which absorbs the difference between planning ambition and operational capacity.",
    low: "Your project's resources and commitments appear to be operating on different assumptions. Budgets tell one story, timelines tell another, and the team on the ground is managing the difference with personal resilience rather than structural adjustment. This is not sustainable, and the correction will be imposed externally if it is not initiated internally.",
  },
  "CROSS-CONTEXT OPERATIONS": {
    high: "Your project appears to operate across institutional and cultural boundaries with genuine fluency rather than procedural tolerance. This capacity is the least visible and most expensive competency in international project management: it determines whether a multi-country operation delivers consistent quality or produces local variations that nobody at headquarters has the means to compare.",
    mid: "Your cross-context operations function but depend on adaptation rather than design. Translation, cultural navigation, and multi-system coordination happen through individual initiative rather than structural provision. The cost is invisible until the person doing the translating leaves.",
    low: "Your project appears to operate from a single institutional logic applied across multiple contexts. This creates the appearance of coherence from the centre and the experience of imposition at the periphery. Quality variation across sites is likely significant and likely unmeasured.",
  },
  "DELIVERY UNDER CONSTRAINT": {
    high: "Your project demonstrates the capacity to maintain direction when conditions shift, which is the clearest signal of operational maturity. Contingency is structural rather than reactive, and the distinction between design problems and execution problems is maintained under pressure. This is the dimension that separates projects that survive their environment from projects that perform well in stable conditions.",
    mid: "Your project adapts to constraint but through individual initiative rather than institutional mechanism. This means the project's resilience is a function of specific people's judgment, which works until those people are unavailable. The gap between reactive adaptation and structural preparedness is where delivery credibility is most exposed.",
    low: "Your project appears to treat constraint as an interruption rather than a permanent condition. When external conditions shift, the response is delayed, escalated, or absorbed silently. This is the condition where the distance between what the project reports and what the project delivers grows widest, because the reporting system was designed for a reality that no longer exists.",
  },
};

const PROFILES = [
  {
    range: [60, 75],
    name: "Delivery-Ready Operation",
    tagline: "Your project architecture holds under pressure.",
    summary: "Your project has achieved something that most multi-partner, cross-context operations never reach: the gap between what it plans and what it delivers is short, visible, and correctable. Planning reflects operational reality. Coordination produces decisions. Resources match commitments. This is operational credibility as engineering, and it is the rarest currency in international project management.",
    color: "#C4A265",
  },
  {
    range: [45, 59],
    name: "Structured but Fragile",
    tagline: "The architecture exists. The load-bearing capacity is uneven.",
    summary: "Your project has the right structures, the right vocabulary, and in several dimensions genuine operational discipline. Where it is exposed is in the transitions: between planning and execution, between partners, between reporting and reality. These seams hold under normal conditions and begin to leak when pressure arrives. Most well-managed projects live here. The question is whether the fragility is visible to the people who can fix it.",
    color: "#E8DCC8",
  },
  {
    range: [30, 44],
    name: "Planning-Execution Drift",
    tagline: "The plan and the delivery have separated.",
    summary: "Your project is operating in a zone where planning documents, coordination structures, and reporting cycles continue to function while the connection between these activities and measurable delivery has weakened. The teams are working. The meetings are held. The reports are submitted. But the distance between what the project says it is doing and what it is producing grows with each cycle, and the correction mechanisms that should catch this gap are not firing.",
    color: "#8B7355",
  },
  {
    range: [15, 29],
    name: "Operational Theater",
    tagline: "Activity continues. Delivery does not.",
    summary: "Your project has entered a condition where the structures of project management continue to operate without producing the outcomes they were designed to deliver. Plans are maintained. Meetings convene. Reports are filed. Partners attend. But the relationship between this activity and tangible results has eroded to the point where the project's credibility depends on the persistence of its narrative rather than the evidence of its impact.",
    color: "#6B5B4F",
  },
];

const S = {
  serif: "'Playfair Display', Georgia, serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
  bg: "#0A0A0A",
  bone: "#E8DCC8",
  gold: "#C4A265",
  boneDim: "rgba(232,220,200,0.5)",
  boneGhost: "rgba(232,220,200,0.25)",
  goldDim: "rgba(196,162,101,0.4)",
  goldGhost: "rgba(196,162,101,0.2)",
  line: "rgba(232,220,200,0.08)",
};

const GoldLine = ({ w = 40, mb = 20 }) => (
  <div style={{ width: w, height: 1, background: S.gold, marginBottom: mb }} />
);
const Label = ({ children }) => (
  <div style={{ fontFamily: S.mono, fontSize: 10, color: S.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
    {children}
  </div>
);

function FontLoader() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
  return null;
}

function Landing({ onProceed }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div style={{ minHeight: "100vh", background: S.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 32px", opacity: show ? 1 : 0, transition: "opacity 1.2s ease" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
        <GoldLine />
        <h1 style={{ fontFamily: S.serif, fontSize: "clamp(32px,6vw,52px)", color: S.bone, fontWeight: 400, lineHeight: 1.12, marginTop: 40, marginBottom: 16 }}>
          The Operational<br />Delivery Diagnostic
        </h1>
        <p style={{ fontFamily: S.serif, fontSize: 16, color: S.boneDim, fontStyle: "italic", lineHeight: 1.6, marginBottom: 48, maxWidth: 440 }}>
          How well does your project translate<br />planning into results?
        </p>
        <GoldLine mb={36} />
        <div style={{ display: "flex", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
          {[["15", "questions"], ["5", "dimensions"], ["6", "minutes"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: S.serif, fontSize: 30, color: S.gold }}>{n}</div>
              <div style={{ fontFamily: S.mono, fontSize: 9, color: S.goldDim, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: S.mono, fontSize: 11, color: "rgba(232,220,200,0.3)", lineHeight: 1.9, marginBottom: 24, maxWidth: 520 }}>
          Built from eight years managing multi-partner programmes across four countries, with budgets exceeding 1M\u20ac and stakeholder networks spanning institutional, governmental, and field-level actors. This diagnostic maps your project across five operational dimensions and returns a candid assessment of where delivery holds and where it leaks.
        </p>
        <div style={{ fontFamily: S.mono, fontSize: 11, color: S.gold, lineHeight: 1.9, marginBottom: 48, maxWidth: 500 }}>
          Complete the diagnostic and receive a personalized operational profile with dimension-level analysis and the option to request a direct review.
        </div>
        <button onClick={onProceed} style={{ background: "transparent", border: "1px solid " + S.gold, color: S.gold, fontFamily: S.mono, fontSize: 11, letterSpacing: 2.5, padding: "16px 44px", cursor: "pointer", textTransform: "uppercase", transition: "all 0.4s ease" }}
          onMouseEnter={e => { e.target.style.background = S.gold; e.target.style.color = S.bg }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = S.gold }}>
          Begin Diagnostic
        </button>
        <div style={{ marginTop: 80, fontFamily: S.mono, fontSize: 8, color: S.goldGhost, letterSpacing: 2, textTransform: "uppercase" }}>
          PROJECT DELIVERY \ MULTI-STAKEHOLDER COORDINATION \ CROSS-CONTEXT OPERATIONS
        </div>
      </div>
    </div>
  );
}

function IntakeForm({ onSubmit }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", organization: "", role: "", projectType: "" });
  const [errors, setErrors] = useState({});
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.email.trim() || !form.email.includes("@")) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inp = (field) => ({
    background: "transparent",
    border: "1px solid " + (errors[field] ? "rgba(200,100,80,0.5)" : "rgba(232,220,200,0.12)"),
    color: S.bone, fontFamily: S.serif, fontSize: 15,
    padding: "14px 18px", width: "100%", boxSizing: "border-box",
    outline: "none", transition: "border-color 0.3s ease",
  });

  const lbl = { fontFamily: S.mono, fontSize: 9, color: S.goldDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, display: "block" };

  return (
    <div style={{ minHeight: "100vh", background: S.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 32px", opacity: show ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <Label>YOUR DETAILS</Label>
        <GoldLine mb={32} />
        <p style={{ fontFamily: S.serif, fontSize: 18, color: S.bone, lineHeight: 1.5, marginBottom: 8 }}>Enter your details below to start the diagnostic.</p>
        <p style={{ fontFamily: S.mono, fontSize: 11, color: "rgba(232,220,200,0.3)", lineHeight: 1.7, marginBottom: 40 }}>
          Your responses are confidential. Upon completion, you will receive a personalized operational profile and the option to request a direct analysis.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={lbl}>First name *</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
                style={inp("firstName")} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={lbl}>Last name</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
                style={inp("lastName")} />
            </div>
          </div>
          <div>
            <label style={lbl}>Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
              style={inp("email")} />
          </div>
          <div>
            <label style={lbl}>Organization</label>
            <input value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })}
              onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
              style={inp("organization")} />
          </div>
          <div>
            <label style={lbl}>Your role / title</label>
            <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
              style={inp("role")} />
          </div>
          <div>
            <label style={lbl}>Project type / sector</label>
            <input value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })}
              onFocus={e => { e.target.style.borderColor = S.gold }} onBlur={e => { e.target.style.borderColor = "rgba(232,220,200,0.12)" }}
              placeholder="e.g. humanitarian, development, institutional, private sector"
              style={{ ...inp("projectType"), fontStyle: form.projectType ? "normal" : "italic", color: form.projectType ? S.bone : "rgba(232,220,200,0.2)" }} />
          </div>
        </div>
        <p style={{ fontFamily: S.mono, fontSize: 9, color: "rgba(232,220,200,0.2)", lineHeight: 1.7, marginTop: 24, marginBottom: 32 }}>
          By proceeding, you agree to receive your personalized operational profile. Your data will not be shared with third parties.
        </p>
        <button onClick={() => { if (validate()) onSubmit(form) }} style={{
          background: S.gold, border: "none", color: S.bg, fontFamily: S.mono, fontSize: 11,
          letterSpacing: 2.5, padding: "16px 44px", cursor: "pointer", textTransform: "uppercase", fontWeight: 500, transition: "all 0.3s ease",
        }} onMouseEnter={e => { e.target.style.background = S.bone }} onMouseLeave={e => { e.target.style.background = S.gold }}>
          Start Diagnostic
        </button>
      </div>
    </div>
  );
}

function QuizQuestion({ question, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); setSelected(null); const t = setTimeout(() => setShow(true), 60); return () => clearTimeout(t); }, [index]);

  const pick = (i) => { setSelected(i); setTimeout(() => onAnswer(question.options[i].score), 500); };
  const progress = ((index + 1) / total) * 100;

  return (
    <div style={{ minHeight: "100vh", background: S.bg, display: "flex", flexDirection: "column", padding: "40px 32px 60px", opacity: show ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 10, width: progress + "%", background: S.gold, transition: "width 0.5s ease" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 600, margin: "0 auto 52px", width: "100%" }}>
        <div style={{ fontFamily: S.mono, fontSize: 9, color: S.gold, letterSpacing: 2.5, textTransform: "uppercase" }}>{question.dimension}</div>
        <div style={{ fontFamily: S.mono, fontSize: 10, color: S.boneGhost, letterSpacing: 1 }}>{String(index + 1).padStart(2, "0")} / {total}</div>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(18px,3vw,24px)", color: S.bone, fontWeight: 400, lineHeight: 1.55, marginBottom: 44 }}>{question.text}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {question.options.map((opt, i) => (
            <button key={i} onClick={() => pick(i)} style={{
              background: selected === i ? "rgba(196,162,101,0.07)" : "transparent",
              border: "1px solid " + (selected === i ? S.gold : "rgba(232,220,200,0.08)"),
              padding: "18px 22px", textAlign: "left", cursor: "pointer",
              transition: "all 0.25s ease", display: "flex", alignItems: "flex-start", gap: 14,
            }}
              onMouseEnter={e => { if (selected !== i) e.currentTarget.style.borderColor = "rgba(196,162,101,0.3)" }}
              onMouseLeave={e => { if (selected !== i) e.currentTarget.style.borderColor = "rgba(232,220,200,0.08)" }}>
              <span style={{ fontFamily: S.mono, fontSize: 9, flexShrink: 0, marginTop: 3, color: selected === i ? S.gold : S.goldDim, letterSpacing: 1 }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ fontFamily: S.serif, fontSize: 14, color: selected === i ? S.bone : "rgba(232,220,200,0.55)", lineHeight: 1.65, transition: "color 0.25s ease" }}>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Results({ scores, userData, onRestart }) {
  const [show, setShow] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const profile = PROFILES.find(p => totalScore >= p.range[0] && totalScore <= p.range[1]) || PROFILES[PROFILES.length - 1];

  const dimScores = DIMENSIONS.map((dim, i) => {
    const s = scores.slice(i * 3, i * 3 + 3);
    const t = s.reduce((a, b) => a + b, 0);
    const level = t >= 12 ? "high" : t >= 7 ? "mid" : "low";
    return { name: dim, score: t, max: 15, level, insight: DIM_INSIGHTS[dim][level] };
  });

  const strongest = [...dimScores].sort((a, b) => b.score - a.score)[0];
  const weakest = [...dimScores].sort((a, b) => a.score - b.score)[0];

  const exportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      user: userData,
      totalScore,
      profile: profile.name,
      dimensions: dimScores.map(d => ({ name: d.name, score: d.score, level: d.level })),
      answers: scores,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostic_${userData.firstName}_${userData.lastName || "anon"}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: S.bg, padding: "60px 32px 80px", opacity: show ? 1 : 0, transition: "opacity 1s ease" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Label>YOUR OPERATIONAL PROFILE</Label>
        <GoldLine mb={40} />

        <div style={{ fontFamily: S.serif, fontSize: 72, color: profile.color, fontWeight: 400, marginBottom: 4, lineHeight: 1 }}>
          {totalScore}<span style={{ fontSize: 26, color: S.boneGhost }}>/75</span>
        </div>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,5vw,42px)", color: S.bone, fontWeight: 400, lineHeight: 1.15, marginBottom: 10, marginTop: 16 }}>{profile.name}</h2>
        <p style={{ fontFamily: S.serif, fontSize: 15, color: profile.color, fontStyle: "italic", marginBottom: 40, lineHeight: 1.5 }}>{profile.tagline}</p>
        <p style={{ fontFamily: S.serif, fontSize: 15, color: "rgba(232,220,200,0.65)", lineHeight: 1.85, marginBottom: 48 }}>{profile.summary}</p>

        <div style={{ height: 1, background: S.line, marginBottom: 40 }} />

        <Label>DIMENSION BREAKDOWN</Label>
        <div style={{ marginTop: 20, marginBottom: 48 }}>
          {dimScores.map(dim => (
            <div key={dim.name} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: S.mono, fontSize: 9, color: S.boneDim, letterSpacing: 1.5, textTransform: "uppercase" }}>{dim.name}</span>
                <span style={{ fontFamily: S.serif, fontSize: 14, color: S.gold }}>{dim.score}/{dim.max}</span>
              </div>
              <div style={{ height: 3, background: "rgba(232,220,200,0.05)", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: (dim.score / dim.max * 100) + "%", background: profile.color, transition: "width 1.5s ease" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: S.line, marginBottom: 40 }} />

        <Label>DETAILED ANALYSIS BY DIMENSION</Label>
        <div style={{ marginTop: 24 }}>
          {dimScores.map(dim => (
            <div key={dim.name} style={{ marginBottom: 32, padding: "24px 0", borderBottom: "1px solid " + S.line }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: S.mono, fontSize: 9, color: S.gold, letterSpacing: 2, textTransform: "uppercase" }}>{dim.name}</span>
                <span style={{ fontFamily: S.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
                  color: dim.level === "high" ? S.gold : dim.level === "mid" ? S.boneDim : "#8B7355" }}>
                  {dim.level === "high" ? "STRONG" : dim.level === "mid" ? "MODERATE" : "CRITICAL"}
                </span>
              </div>
              <p style={{ fontFamily: S.serif, fontSize: 14, color: "rgba(232,220,200,0.6)", lineHeight: 1.8 }}>{dim.insight}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(196,162,101,0.04)", border: "1px solid rgba(196,162,101,0.12)", padding: 32, marginBottom: 48 }}>
          <div style={{ fontFamily: S.mono, fontSize: 9, color: S.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>KEY FINDING</div>
          <p style={{ fontFamily: S.serif, fontSize: 15, color: S.bone, lineHeight: 1.8 }}>
            Your strongest dimension is <span style={{ color: S.gold }}>{strongest.name.toLowerCase()}</span> ({strongest.score}/15) and your most exposed area is <span style={{ color: S.gold }}>{weakest.name.toLowerCase()}</span> ({weakest.score}/15). This gap is where operational credibility is most likely to erode under pressure, because projects are judged by the dimension that fails first, and stakeholders rarely distinguish between a project that delivers well in four areas and loses traction in one.
          </p>
        </div>

        <div style={{ height: 1, background: S.line, marginBottom: 40 }} />

        {!requestSent ? (
          <div style={{ background: "rgba(196,162,101,0.04)", border: "1px solid rgba(196,162,101,0.15)", padding: 36, marginBottom: 48, textAlign: "center" }}>
            <div style={{ fontFamily: S.mono, fontSize: 9, color: S.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20 }}>WANT A DEEPER READ?</div>
            <p style={{ fontFamily: S.serif, fontSize: 16, color: S.bone, lineHeight: 1.7, marginBottom: 8, maxWidth: 440, margin: "0 auto 8px" }}>
              Request a personalized analysis of your diagnostic results
            </p>
            <p style={{ fontFamily: S.mono, fontSize: 11, color: "rgba(232,220,200,0.35)", lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
              David will review your responses and send you a confidential briefing with specific observations and operational recommendations tailored to your project context.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setRequestSent(true)} style={{
                background: S.gold, border: "none", color: S.bg, fontFamily: S.mono, fontSize: 11,
                letterSpacing: 2.5, padding: "16px 40px", cursor: "pointer", textTransform: "uppercase", fontWeight: 500, transition: "all 0.3s ease",
              }} onMouseEnter={e => { e.target.style.background = S.bone }} onMouseLeave={e => { e.target.style.background = S.gold }}>
                Request Analysis
              </button>
              <button onClick={exportData} style={{
                background: "transparent", border: "1px solid rgba(232,220,200,0.15)", color: S.boneDim, fontFamily: S.mono, fontSize: 11,
                letterSpacing: 2.5, padding: "16px 32px", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s ease",
              }} onMouseEnter={e => { e.target.style.borderColor = S.gold; e.target.style.color = S.gold }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(232,220,200,0.15)"; e.target.style.color = S.boneDim }}>
                Export Results
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(196,162,101,0.06)", border: "1px solid rgba(196,162,101,0.2)", padding: 36, marginBottom: 48, textAlign: "center" }}>
            <div style={{ fontFamily: S.serif, fontSize: 20, color: S.gold, marginBottom: 12 }}>Request received.</div>
            <p style={{ fontFamily: S.serif, fontSize: 14, color: "rgba(232,220,200,0.55)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
              {userData.firstName}, your diagnostic has been submitted for review. David will send a personalized operational briefing to <span style={{ color: S.bone }}>{userData.email}</span> within the coming days.
            </p>
          </div>
        )}

        <div style={{ height: 1, background: S.line, marginBottom: 40 }} />

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 48 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(196,162,101,0.1)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(196,162,101,0.15)" }}>
            <span style={{ fontFamily: S.serif, fontSize: 20, color: S.gold }}>A</span>
          </div>
          <div>
            <div style={{ fontFamily: S.serif, fontSize: 18, color: S.bone, marginBottom: 6 }}>David</div>
            <p style={{ fontFamily: S.serif, fontSize: 13, color: "rgba(232,220,200,0.45)", lineHeight: 1.7, marginBottom: 16, maxWidth: 420 }}>
              Senior project management across four countries, fifteen partners, and budgets exceeding 1M\u20ac. Positioning at the intersection of strategy, technology, and institutional delivery. Multilingual operations in French, English, and Spanish.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/david-dabert" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: S.mono, fontSize: 11, color: S.gold, textDecoration: "none", letterSpacing: 1, borderBottom: "1px solid rgba(196,162,101,0.25)", paddingBottom: 2 }}>
                LinkedIn
              </a>
              <a href="mailto:pr.dabertdavid@gmail.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: S.mono, fontSize: 11, color: S.gold, textDecoration: "none", letterSpacing: 1, borderBottom: "1px solid rgba(196,162,101,0.25)", paddingBottom: 2 }}>
                Contact
              </a>
            </div>
          </div>
        </div>

        <button onClick={onRestart} style={{
          background: "transparent", border: "1px solid rgba(232,220,200,0.1)",
          color: S.boneDim, fontFamily: S.mono, fontSize: 10, letterSpacing: 2,
          padding: "12px 24px", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s ease",
        }} onMouseEnter={e => { e.target.style.borderColor = S.gold; e.target.style.color = S.gold }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(232,220,200,0.1)"; e.target.style.color = S.boneDim }}>
          Retake Diagnostic
        </button>

        <div style={{ marginTop: 64, fontFamily: S.mono, fontSize: 8, color: S.goldGhost, letterSpacing: 2, textTransform: "uppercase" }}>
          THE OPERATIONAL DELIVERY DIAGNOSTIC DAVID 2026
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState([]);
  const [userData, setUserData] = useState(null);

  return (
    <>
      <FontLoader />
      {phase === "landing" && <Landing onProceed={() => setPhase("intake")} />}
      {phase === "intake" && <IntakeForm onSubmit={d => { setUserData(d); setPhase("quiz"); setCurrentQ(0); setScores([]); }} />}
      {phase === "quiz" && <QuizQuestion question={QUESTIONS[currentQ]} index={currentQ} total={QUESTIONS.length}
        onAnswer={s => { const n = [...scores, s]; setScores(n); if (currentQ + 1 < QUESTIONS.length) setCurrentQ(currentQ + 1); else setPhase("results"); }} />}
      {phase === "results" && <Results scores={scores} userData={userData}
        onRestart={() => { setPhase("landing"); setScores([]); setCurrentQ(0); setUserData(null); }} />}
    </>
  );
}
