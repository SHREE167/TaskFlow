/**
 * TaskFlow — Application Logic
 * Built with HTML5, CSS3, and Vanilla JavaScript (ES6)
 * Vault of Codes Internship Project
 */

// Storage & Configuration Keys
const STORAGE_KEY = "taskflow.tasks";
const THEME_KEY = "taskflow.theme";
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

// DOM Helper Shortcuts
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Application State
let tasks = loadTasks(); // array of task objects
let filter = "all";      // "all" | "active" | "completed"
let editingId = null;    // id of task currently being edited

/**
 * Initialize application on page load
 */
function init() {
  applyTheme(loadTheme());
  setupEventListeners();
  render();
}

/**
 * Set up user interface event listeners
 */
function setupEventListeners() {
  const form = $("#taskForm");
  const cancelBtn = $("#cancelEditBtn");
  const themeToggle = $("#themeToggle");
  const searchInput = $("#search");
  const sortSelect = $("#sortBy");
  const taskList = $("#taskList");
  const clearDoneBtn = $("#clearDone");
  const filterButtons = $$("#filterButtons .filter-btn");

  // Form Submission (Add or Update)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#title").value.trim();
    if (!title) {
      showToast("Please enter a task title.");
      $("#title").focus();
      return;
    }

    const data = {
      title,
      due: $("#due").value,
      priority: $("#priority").value,
      category: $("#category").value
    };

    if (editingId) {
      const task = tasks.find((t) => t.id === editingId);
      if (task) {
        Object.assign(task, data);
      }
      cancelEdit();
    } else {
      tasks.unshift({
        id: Date.now(),
        ...data,
        done: false,
        created: Date.now()
      });
    }

    saveTasks();
    render();
    form.reset();
    $("#priority").value = "medium";
    $("#category").value = "Personal";
  });

  // Cancel Edit
  cancelBtn.addEventListener("click", cancelEdit);

  // Search input live filtering
  searchInput.addEventListener("input", () => {
    render();
  });

  // Sort dropdown change
  sortSelect.addEventListener("change", () => {
    render();
  });

  // Filter Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
      filter = btn.dataset.filter;
      render();
    });
  });

  // Clear Completed Tasks
  clearDoneBtn.addEventListener("click", () => {
    const count = tasks.filter((t) => t.done).length;
    if (!count) return;
    if (!confirm(`Remove ${count} completed task(s)?`)) return;
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    render();
  });

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // Storage unavailable fallback
    }
  });

  // Delegated Event Handling for Task List
  taskList.addEventListener("click", (e) => {
    const item = e.target.closest("li[data-id]");
    if (!item) return;

    const id = Number(item.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (e.target.matches(".check")) {
      task.done = !task.done;
    } else if (e.target.matches(".edit") || e.target.closest(".edit")) {
      return startEdit(task);
    } else if (e.target.matches(".delete") || e.target.closest(".delete")) {
      if (!confirm("Delete this task?")) return;
      tasks = tasks.filter((t) => t.id !== id);
      if (editingId === id) {
        cancelEdit();
      }
    }

    saveTasks();
    render();
  });
}

/**
 * Load tasks from localStorage or provide initial sample tasks
 */
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
  } catch (e) {
    /* ignore corrupt data and fallback to sample */
  }
  return sampleTasks();
}

/**
 * Persist current tasks array to localStorage
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    /* storage quota exceeded or private mode */
  }
}

/**
 * Get date offset in YYYY-MM-DD string
 */
function getRelativeDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/**
 * Default sample tasks depicted in the internship report
 */
function sampleTasks() {
  return [
    {
      id: 1,
      title: "Design responsive layout for mobile",
      due: getRelativeDate(2),
      priority: "medium",
      category: "Work",
      done: true,
      created: Date.now() - 500000
    },
    {
      id: 2,
      title: "Buy groceries",
      due: getRelativeDate(-2),
      priority: "low",
      category: "Shopping",
      done: true,
      created: Date.now() - 400000
    },
    {
      id: 3,
      title: "Push project code to GitHub",
      due: getRelativeDate(-1), // Due yesterday -> Overdue!
      priority: "high",
      category: "Work",
      done: false,
      created: Date.now() - 300000
    },
    {
      id: 4,
      title: "Revise JavaScript DOM concepts",
      due: getRelativeDate(3),
      priority: "medium",
      category: "Study",
      done: false,
      created: Date.now() - 200000
    },
    {
      id: 5,
      title: "Submit internship weekly report",
      due: getRelativeDate(5),
      priority: "high",
      category: "Work",
      done: false,
      created: Date.now() - 100000
    }
  ];
}

/**
 * Current date in user's local timezone (YYYY-MM-DD)
 */
function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/**
 * Check if a task is overdue
 */
function isOverdue(t) {
  return !t.done && !!t.due && t.due < today();
}

/**
 * Format ISO date string into readable text (e.g. 22 Jun 2025)
 */
function formatDate(iso) {
  if (!iso) return "No due date";
  return new Date(iso + "T00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/**
 * Filter, search, and sort tasks based on user selections
 */
function visibleTasks() {
  const q = ($("#search").value || "").trim().toLowerCase();
  const sort = $("#sortBy").value;

  return tasks
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "completed") return t.done;
      return true; // "all"
    })
    .filter((t) => {
      if (!q) return true;
      return (
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.category && t.category.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "due") {
        return (a.due || "9999").localeCompare(b.due || "9999");
      }
      if (sort === "priority") {
        return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      }
      return b.created - a.created; // "newest"
    });
}

/**
 * Render the task list and update statistics
 */
function render() {
  const list = visibleTasks();
  const taskListEl = $("#taskList");

  taskListEl.innerHTML = list.length
    ? list.map(taskTemplate).join("")
    : `<li class="empty">No tasks to show.</li>`;

  const pendingCount = tasks.filter((t) => !t.done).length;
  $("#tasksLeft").textContent = `${pendingCount} ${pendingCount === 1 ? "task" : "tasks"} left`;

  updateStats();
}

/**
 * HTML template for a single task item
 */
function taskTemplate(t) {
  const late = isOverdue(t);
  const priorityClass = t.priority || "medium";
  const priorityTagClass = `tag-priority-${priorityClass}`;

  return `
    <li class="task ${priorityClass} ${t.done ? "done" : ""}" data-id="${t.id}">
      <input type="checkbox" class="check" ${t.done ? "checked" : ""} aria-label="Mark task done">
      <div class="info">
        <span class="title">${escapeHtml(t.title)}</span>
        <div class="meta-row">
          <span class="meta ${late ? "overdue" : ""}">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate(t.due)}${late ? " &bull; Overdue" : ""}
          </span>
          <span class="tag tag-category">${escapeHtml(t.category || "General")}</span>
          <span class="tag ${priorityTagClass}">${escapeHtml(t.priority || "medium")}</span>
        </div>
      </div>
      <div class="actions">
        <button class="edit" title="Edit task" aria-label="Edit task">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="delete" title="Delete task" aria-label="Delete task">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </li>
  `;
}

/**
 * Recalculate statistics and update the UI
 */
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;
  const overdueCount = tasks.filter(isOverdue).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  $("#statTotal").textContent = total;
  $("#statPending").textContent = pending;
  $("#statDone").textContent = done;
  $("#statOverdue").textContent = overdueCount;

  $("#progressBar").style.width = pct + "%";
  $("#progressText").textContent = pct + "% complete";
}

/**
 * Initiate task editing mode
 */
function startEdit(task) {
  editingId = task.id;
  $("#title").value = task.title;
  $("#due").value = task.due || "";
  $("#priority").value = task.priority || "medium";
  $("#category").value = task.category || "Personal";

  $("#submitBtn").textContent = "Update Task";
  $("#cancelEditBtn").style.display = "inline-flex";

  $("#formSection").scrollIntoView({ behavior: "smooth", block: "center" });
  $("#title").focus();
}

/**
 * Cancel task editing mode
 */
function cancelEdit() {
  editingId = null;
  $("#taskForm").reset();
  $("#priority").value = "medium";
  $("#category").value = "Personal";
  $("#submitBtn").textContent = "Add Task";
  $("#cancelEditBtn").style.display = "none";
}

/**
 * Escape HTML input to prevent XSS injection
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

/**
 * Toast notifications for user feedback
 */
let toastTimeout = null;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/**
 * Load stored theme preference
 */
function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "light";
  } catch (e) {
    return "light";
  }
}

/**
 * Apply theme to document body
 */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

// Start application
document.addEventListener("DOMContentLoaded", init);
