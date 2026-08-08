/* 講師控制台｜共用小工具：主題切換、localStorage 進度、複製提示語 */

const LS_KEYS = {
  theme: "console.theme",
  lastCourse: "console.lastCourse",
  progress: "console.progress" // { [courseId]: { [sessionId]: { [segmentIndex]: 'done' } } }
};

function initTheme() {
  const saved = localStorage.getItem(LS_KEYS.theme);
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = currentTheme() === "dark" ? "☀️" : "🌙";
    btn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(LS_KEYS.theme, next);
      btn.textContent = next === "dark" ? "☀️" : "🌙";
    });
  }
}

function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr) return attr;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function copyToClipboard(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btnEl) return;
    const original = btnEl.textContent;
    btnEl.textContent = "已複製 ✓";
    btnEl.classList.add("copied");
    setTimeout(() => {
      btnEl.textContent = original;
      btnEl.classList.remove("copied");
    }, 1500);
  });
}

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEYS.progress) || "{}");
  } catch (e) {
    return {};
  }
}

function setSegmentDone(courseId, sessionId, segIndex, done) {
  const p = getProgress();
  p[courseId] = p[courseId] || {};
  p[courseId][sessionId] = p[courseId][sessionId] || {};
  if (done) p[courseId][sessionId][segIndex] = "done";
  else delete p[courseId][sessionId][segIndex];
  localStorage.setItem(LS_KEYS.progress, JSON.stringify(p));
}

function isSegmentDone(courseId, sessionId, segIndex) {
  const p = getProgress();
  return !!(p[courseId] && p[courseId][sessionId] && p[courseId][sessionId][segIndex] === "done");
}

function setLastCourse(courseId) {
  localStorage.setItem(LS_KEYS.lastCourse, courseId);
}

function getLastCourse() {
  return localStorage.getItem(LS_KEYS.lastCourse);
}

function findCourse(id) {
  return COURSES.find(c => c.id === id);
}

function findPrompt(id) {
  return PROMPTS.find(p => p.id === id);
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function lockBadge(revealSession, currentSession) {
  if (!revealSession || !currentSession || revealSession <= currentSession) return "";
  return `<span class="lock-badge">🔒 第${revealSession}堂後才發放</span>`;
}
