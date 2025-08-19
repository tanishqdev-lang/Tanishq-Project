import { useState, useEffect } from "react";

export default function RoutineTracker() {
  const [mode, setMode] = useState("routine"); // routine | coding
  const [darkMode, setDarkMode] = useState(false);

  // Tasks for modes
  const routineTasks = [
    { id: 1, text: "Wake up at 7:00 (no snooze)" },
    { id: 2, text: "No phone in washroom" },
    { id: 3, text: "Morning workout / stretch" },
    { id: 4, text: "Gym (9–10:30 am)" },
    { id: 5, text: "No bed/TV after gym" },
    { id: 6, text: "Deep Work #1 (11–1)" },
    { id: 7, text: "Lunch without screens" },
    { id: 8, text: "Deep Work #2 (2–4)" },
    { id: 9, text: "Power Nap 20 min max" },
    { id: 10, text: "Deep Work #3 (4:30–6:30)" },
    { id: 11, text: "Dinner (no phone)" },
    { id: 12, text: "Deep Work #4 (8–9:30)" },
    { id: 13, text: "Reward (anime/games)" },
    { id: 14, text: "Sleep at 11:15" },
  ];

  const codingTasks = [
    { id: 1, text: "Basics of JS (variables, loops, functions)" },
    { id: 2, text: "DOM Manipulation practice" },
    { id: 3, text: "Array & Object methods" },
    { id: 4, text: "ES6+ features (let, const, arrow functions)" },
    { id: 5, text: "Async JS (Promises, async/await)" },
    { id: 6, text: "Mini-project (To-do app)" },
  ];

  // Initialize tasks state according to mode
  const [tasks, setTasks] = useState(() =>
    mode === "routine"
      ? routineTasks.map(t => ({ ...t, done: false }))
      : codingTasks.map(t => ({ ...t, done: false }))
  );
  const [streak, setStreak] = useState(0);
  const [allDone, setAllDone] = useState(false);

  // Update tasks when mode changes (and reset allDone)
  useEffect(() => {
    const taskList = mode === "routine"
      ? routineTasks.map(t => ({ ...t, done: false }))
      : codingTasks.map(t => ({ ...t, done: false }));
    setTasks(taskList);
    setAllDone(false);
  }, [mode]);

  // Calculate progress percentage
  const progress = Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);

  // When tasks update, check if all completed for congratulation message
  useEffect(() => {
    if (tasks.length && tasks.every((task) => task.done)) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [tasks]);

  // Toggle task completion state
  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Reset tasks and update streak if all done
  const resetTasks = () => {
    if (tasks.every((task) => task.done)) {
      setStreak(streak + 1);
      alert("Congrats on completing all tasks! Streak increased.");
    } else if (window.confirm("Some tasks are incomplete. Resetting will lose streak! Proceed?")) {
      setStreak(0);
    } else {
      return;
    }
    setTasks(tasks.map((task) => ({ ...task, done: false })));
    setAllDone(false);
  };

  // Switch between routine and coding mode
  const switchMode = () => {
    setMode(mode === "routine" ? "coding" : "routine");
    setStreak(0);
  };

  // Theme colors for routine and coding modes, with dark variants
  const theme = {
    routine: {
      light: {
        main: "#4CAF50",
        light: "#d4edda",
        dark: "#2e7d32",
        background: "#e8f5e9",
        buttonPrimary: "#388e3c",
        buttonSecondary: "#81c784",
        card: "#fff",
        text: "#2e7d32",
        border: "#ccc"
      },
      dark: {
        main: "#81c784",
        light: "#2e7d32",
        dark: "#d4edda",
        background: "#1a2b1a",
        buttonPrimary: "#388e3c",
        buttonSecondary: "#4CAF50",
        card: "#222d22",
        text: "#d4edda",
        border: "#4CAF50"
      }
    },
    coding: {
      light: {
        main: "#2196F3",
        light: "#bbdefb",
        dark: "#1565c0",
        background: "#e3f2fd",
        buttonPrimary: "#1976d2",
        buttonSecondary: "#64b5f6",
        card: "#fff",
        text: "#1565c0",
        border: "#ccc"
      },
      dark: {
        main: "#64b5f6",
        light: "#1565c0",
        dark: "#bbdefb",
        background: "#182233",
        buttonPrimary: "#1976d2",
        buttonSecondary: "#2196F3",
        card: "#232b3a",
        text: "#bbdefb",
        border: "#2196F3"
      }
    }
  };

  const currentTheme = theme[mode][darkMode ? "dark" : "light"];

  // Simple checkmark SVG icon for tasks
  const CheckIcon = () => (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={currentTheme.main}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.2rem",
            fontWeight: "700",
            userSelect: "none",
          }}
        >
          ⚔️ Tanishq's{" "}
          <span
            style={{
              color: currentTheme.main,
            }}
          >
            {mode === "routine" ? "Discipline Tracker" : "Coding Progress"}
          </span>
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            margin: 0,
            fontWeight: "500",
          }}
        >
          Progress:{" "}
          <span
            aria-label="progress percentage"
            style={{ fontWeight: "700", color: currentTheme.main }}
          >
            {progress}%
          </span>{" "}
          | Streak:{" "}
          <span
            aria-label="streak count"
            style={{ fontWeight: "700", color: currentTheme.main }}
          >
            {streak} {streak === 1 ? "day" : "days"}
          </span>
        </p>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: currentTheme.card,
          borderRadius: 14,
          padding: "1.2rem",
          boxShadow: darkMode
            ? "0 10px 30px rgba(0,0,0,0.5)"
            : "0 10px 30px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s, box-shadow 0.3s"
        }}
      >
        {/* Progress Bar */}
        <div
          aria-label="progress bar"
          style={{
            height: 12,
            backgroundColor: darkMode ? "#333" : "#eee",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: "1rem",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: currentTheme.main,
              transition: "width 0.4s ease-in-out",
            }}
          />
        </div>

        {/* Tasks List */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
          aria-live="polite"
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleTask(task.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={task.done}
              style={{
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: task.done ? currentTheme.light : (darkMode ? "#232b2b" : "#fafafa"),
                padding: "12px 16px",
                marginBottom: 10,
                borderRadius: 10,
                border: `1.5px solid ${
                  task.done ? currentTheme.main : currentTheme.border
                }`,
                cursor: "pointer",
                boxShadow: task.done
                  ? `0 0 10px ${currentTheme.main}44`
                  : darkMode
                  ? "0 1px 3px rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                transition:
                  "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                  color: task.done ? currentTheme.dark : currentTheme.text,
                  fontSize: "1.1rem",
                  flex: 1,
                  marginRight: 12,
                }}
              >
                {task.text}
              </span>
              {task.done && <CheckIcon />}
            </li>
          ))}
        </ul>

        {/* Congratulatory message */}
        {allDone && (
          <div
            role="alert"
            style={{
              marginTop: 15,
              padding: 12,
              backgroundColor: currentTheme.light,
              borderRadius: 10,
              border: `1.5px solid ${currentTheme.main}`,
              color: currentTheme.dark,
              fontWeight: "600",
              textAlign: "center",
              fontSize: "1.15rem",
              boxShadow: `0 0 10px ${currentTheme.main}99`,
              userSelect: "none",
            }}
          >
            🎉 Great job! You completed all tasks for today!
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 25,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={resetTasks}
            aria-label="Reset day and clear all tasks"
            style={{
              flexGrow: 1,
              padding: "12px 20px",
              backgroundColor: currentTheme.buttonPrimary,
              color: "white",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: 10,
              boxShadow: `0 4px 12px ${currentTheme.buttonPrimary}88`,
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor =
                currentTheme.dark)
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor =
                currentTheme.buttonPrimary)
            }
          >
            Reset Day
          </button>

          <button
            onClick={switchMode}
            aria-label={`Switch to ${mode === "routine" ? "Coding" : "Routine"
              } mode`}
            style={{
              flexGrow: 1,
              padding: "12px 20px",
              backgroundColor: currentTheme.buttonSecondary,
              color: "white",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: 10,
              boxShadow: `0 4px 12px ${currentTheme.buttonSecondary}88`,
              cursor: "pointer",
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor =
                currentTheme.main)
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor =
                currentTheme.buttonSecondary)
            }
          >
            Switch to {mode === "routine" ? "Coding" : "Routine"}
          </button>

          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
            style={{
              flexGrow: 1,
              padding: "12px 20px",
              backgroundColor: darkMode ? "#222" : "#eee",
              color: darkMode ? "#fff" : "#222",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: 10,
              boxShadow: darkMode
                ? "0 4px 12px #0008"
                : "0 4px 12px #8882",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s, box-shadow 0.3s",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </main>

      <footer
        style={{
          marginTop: "2rem",
          fontSize: "0.875rem",
          color: darkMode ? "#bbb" : "#666",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        <small>
          Developed with ❤️ by Tanishq | Improved UI/UX
        </small>
      </footer>
    </div>
  );
}