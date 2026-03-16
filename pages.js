let url = window.location.href;
console.log("url: ", url)
let lastPart = url.split('/').pop();  // "index.html"
console.log("lastPart: ", lastPart);


// Determine the prefix for hrefs
let dir_index = lastPart === "index.html" ? "" : "../";
let dir_pages = lastPart === "index.html" ? "pages/" : "";


const navItems = [
  { href: dir_index + "index.html", text: "Home" },

  { href: dir_pages + "number.html", text: "Числові типи даних" },
  { href: dir_pages + "string.html", text: "Текстовий тип даних" },
  { href: dir_pages + "bool.html", text: "Логічні (Булівські) типи" },
  { href: dir_pages + "list.html", text: "Список (Масив) в Python" },


  { href: dir_pages + "os.html", text: "Модуль os робота з операційною системою" },
  { href: dir_pages + "datetime.html", text: "Модуль datetime дата та час" },
  { href: dir_pages + "pyodbc.html", text: "Модуль pyodbc для роботи з базами даних через ODBC" },
  { href: dir_pages + "oracledb.html", text: "Модуль python-oracledb для роботи з бд Oracle" },
  { href: dir_pages + "pywin32_excel.html", text: "Модуль pywin32 для роботи з Excel" },
  { href: dir_pages + "pywin32_outlook.html", text: "Модуль pywin32 для роботи з Outlook" },
  { href: dir_pages + "paramiko.html", text: "Робота з SFTP-сервером: Завантаження та передача файлів за допомогою Paramiko" },
  { href: dir_pages + "tkinter.html", text: "Розробка GUI в Python: основи роботи з Tkinter" },
  { href: dir_pages + "proxy.html", text: "Використання проксі-сервера" },

];

const ul = document.getElementById("nav-global");
const div = document.createElement("div")
div.className = "resizer"
ul.appendChild(div)

navItems.forEach(item => {



  const a = document.createElement("a");
  a.href = item.href;
  a.textContent = item.text;

  if (a.href === location.href) a.classList.add("active");

  ul.appendChild(a);
})

  ;


(function () {
  const navLeft = document.getElementById("nav-local");
  const navRight = document.getElementById("nav-global");
  const content = document.getElementById("content");
  if (!content || (!navLeft && !navRight)) return;

  const MIN_WIDTH = 140;
  const MAX_WIDTH = 500;
  const LEFT_STORAGE_KEY = "localNavWidth";
  const RIGHT_STORAGE_KEY = "globalNavWidth";

  // Restore saved widths
  if (navLeft) {
    const savedLeft = localStorage.getItem(LEFT_STORAGE_KEY);
    if (savedLeft) {
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(savedLeft)));
      navLeft.style.width = width + "px";
    }
  }

  if (navRight) {
    const savedRight = localStorage.getItem(RIGHT_STORAGE_KEY);
    if (savedRight) {
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(savedRight)));
      navRight.style.width = width + "px";
    }
  }

  // Update content padding based on both sidebars
  function updateContentPadding() {
    const leftWidth = navLeft ? navLeft.offsetWidth : 0;
    const rightWidth = navRight ? navRight.offsetWidth : 0;
    content.style.paddingLeft = leftWidth + "px";
    content.style.paddingRight = rightWidth + "px";
  }

  updateContentPadding();

  // Generic resizer drag function
  function makeResizable(nav, storageKey, isLeft) {
    const resizer = nav.querySelector(".resizer");
    if (!resizer) return;

    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.body.style.cursor = "ew-resize";

      function onMouseMove(e) {
        let newWidth;
        if (isLeft) {
          newWidth = e.clientX; // distance from left edge
        } else {
          const leftWidth = navLeft ? navLeft.offsetWidth : 0;
          newWidth = window.innerWidth - e.clientX - leftWidth; // distance from right edge
        }

        const clamped = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth));
        nav.style.width = clamped + "px";
        localStorage.setItem(storageKey, clamped);
        updateContentPadding();
      }

      function onMouseUp() {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  if (navLeft) makeResizable(navLeft, LEFT_STORAGE_KEY, true);
  if (navRight) makeResizable(navRight, RIGHT_STORAGE_KEY, false);

  // Update content padding on window resize
  window.addEventListener("resize", updateContentPadding);
})();
