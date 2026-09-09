const projects = [
  {
    name: "Document-Q-A-System-with-Intelligent-RAG-Pipeline",
    description: "Extern final project — a pharmaceutical document Q&A system that parses multi-page PDFs, routes questions to the relevant document type, and generates cited answers with a quantized LLM.",
    language: "Python",
    category: "ai-rag",
    video: null,
    url: "https://github.com/keyonai/Document-Q-A-System-with-Intelligent-RAG-Pipeline"
  },
  {
    name: "page-level-metadata-with-opensource",
    description: "Extracts and classifies metadata from pharmaceutical PDFs using a locally-run open source LLM (Mistral-7B).",
    language: "Python",
    category: "ai-rag",
    video: null,
    url: "https://github.com/keyonai/page-level-metadata-with-opensource"
  },
  {
    name: "RAG-chatbot-experiments",
    description: "Build a Retrieval-Augmented Generation (RAG) pipeline using LlamaIndex.",
    language: "Python",
    category: "ai-rag",
    video: null,
    url: "https://github.com/keyonai/RAG-chatbot-experiments"
  },
  {
    name: "pytorch-ml-projects",
    description: "Repository for PyTorch machine learning projects.",
    language: "Python",
    category: "ai-rag",
    video: null,
    url: "https://github.com/keyonai/pytorch-ml-projects"
  },
  {
    name: "loan-approval-prediction-ml",
    description: "ML model for loan approval using multiple classifiers and performance comparison.",
    language: "Python",
    category: "ai-rag",
    video: null,
    url: "https://github.com/keyonai/loan-approval-prediction-ml"
  },
  {
    name: "image-segmentation-sam",
    description: "Segments any object you point at using Meta's Segment Anything Model (SAM), via Ultralytics.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/image-segmentation-sam"
  },
  {
    name: "optical-flow-cpp",
    description: "Real-time optical flow visualization in C++ using RAFT-small (LibTorch) and OpenCV.",
    language: "C++",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/optical-flow-cpp"
  },
  {
    name: "OCR-practice",
    description: "Comparing TesseractOCR, PaddleOCR, and EasyOCR on real documents in Google Colab.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/OCR-practice"
  },
  {
    name: "air-drawing-mediapipe",
    description: "Real-time air drawing using your hand and a webcam with MediaPipe hand tracking.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/air-drawing-mediapipe"
  },
  {
    name: "yolo-midas-cpp",
    description: "Real-time depth-aware object detection in C++ using YOLOv8 and MiDaS.",
    language: "C++",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/yolo-midas-cpp"
  },
  {
    name: "depth-estimation-midas-pytorch",
    description: "Estimates per-pixel depth from a single RGB image using Intel's MiDaS model and PyTorch.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/depth-estimation-midas-pytorch"
  },
  {
    name: "robot-perception-yolo-opencv",
    description: "Detects and localizes multiple objects in real-time using YOLOv8 and OpenCV.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/robot-perception-yolo-opencv"
  },
  {
    name: "image-preproccesing-opencv",
    description: "Applied preprocessing techniques for cleaning noisy scanned documents.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/image-preproccesing-opencv"
  },
  {
    name: "License-Plate-Recognition",
    description: "Used OCR engines and OpenCV to detect and extract information from a license plate.",
    language: "Python",
    category: "computer-vision",
    video: null,
    url: "https://github.com/keyonai/License-Plate-Recognition"
  }
];

const categoryLabels = {
  "ai-rag": "Applied AI/ML",
  "computer-vision": "Computer Vision",
  "robotics": "Robotic Software"
};

const grid = document.getElementById("project-grid");
const categoryTabs = document.querySelectorAll(".tabs[aria-label='Project categories'] .tab");
const languageTabsContainer = document.getElementById("language-tabs");

let activeCategory = "all";
let activeLanguage = "all";

function buildLanguageTabs() {
  const languages = [...new Set(projects.map(p => p.language))].sort();

  languages.forEach(lang => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.dataset.lang = lang;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.textContent = lang;
    languageTabsContainer.appendChild(btn);
  });
}

function updateLanguageTabAvailability() {
  const inCategory = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);
  const availableLanguages = new Set(inCategory.map(p => p.language));

  languageTabsContainer.querySelectorAll(".tab").forEach(tab => {
    const lang = tab.dataset.lang;
    const disabled = lang !== "all" && !availableLanguages.has(lang);
    tab.disabled = disabled;
    tab.classList.toggle("tab-disabled", disabled);
  });
}

function renderProjects() {
  grid.innerHTML = "";

  if (activeCategory === "robotics") {
    const card = document.createElement("div");
    card.className = "card placeholder";
    card.innerHTML = `
      <h3>${categoryLabels[activeCategory]} — coming soon</h3>
      <p>I'm currently building out ${categoryLabels[activeCategory].toLowerCase()} projects. Check back soon.</p>
    `;
    grid.appendChild(card);
    return;
  }

  const list = projects.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesLanguage = activeLanguage === "all" || p.language === activeLanguage;
    return matchesCategory && matchesLanguage;
  });

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-msg";
    empty.textContent = "No projects match this filter combination yet.";
    grid.appendChild(empty);
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-top">
        <h3>${p.name}</h3>
      </div>
      <p>${p.description}</p>
      <div class="card-meta">
        <span class="tag">${categoryLabels[p.category]}</span>
        <span class="lang">${p.language}</span>
      </div>
      <div class="card-links">
        <a class="card-link" href="${p.url}" target="_blank" rel="noopener">View on GitHub &rarr;</a>
        <button class="demo-btn" ${p.video ? "" : "disabled"}>
          ${p.video ? "▶ Watch demo" : "Demo coming soon"}
        </button>
      </div>
    `;
    if (p.video) {
      card.querySelector(".demo-btn").addEventListener("click", () => openVideoModal(p));
    }
    grid.appendChild(card);
  });
}

// Video modal
const videoModal = document.getElementById("video-modal");
const videoModalBackdrop = document.getElementById("video-modal-backdrop");
const videoModalClose = document.getElementById("video-modal-close");
const videoModalPlayer = document.getElementById("video-modal-player");
const videoModalTitle = document.getElementById("video-modal-title");

function toEmbedUrl(url) {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  return null;
}

function openVideoModal(project) {
  videoModalTitle.textContent = project.name;
  const embedUrl = toEmbedUrl(project.video);

  videoModalPlayer.innerHTML = embedUrl
    ? `<iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    : `<video src="${project.video}" controls autoplay></video>`;

  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");
}

function closeVideoModal() {
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
  videoModalPlayer.innerHTML = "";
}

videoModalBackdrop.addEventListener("click", closeVideoModal);
videoModalClose.addEventListener("click", closeVideoModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

categoryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    activeCategory = tab.dataset.filter;

    activeLanguage = "all";
    languageTabsContainer.querySelectorAll(".tab").forEach(t => {
      t.classList.toggle("active", t.dataset.lang === "all");
      t.setAttribute("aria-selected", t.dataset.lang === "all" ? "true" : "false");
    });

    updateLanguageTabAvailability();
    renderProjects();
  });
});

languageTabsContainer.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab || tab.disabled) return;

  languageTabsContainer.querySelectorAll(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  activeLanguage = tab.dataset.lang;
  renderProjects();
});

buildLanguageTabs();
updateLanguageTabAvailability();
renderProjects();

// Email copy-to-clipboard
function copyToClipboard(text) {
  const fallback = () => {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  };

  if (!navigator.clipboard) {
    fallback();
    return;
  }

  // Some browser/automation contexts leave navigator.clipboard.writeText()
  // permanently pending instead of resolving or rejecting, so race it
  // against a short timeout and fall back to execCommand if it stalls.
  let settled = false;
  const timeout = setTimeout(() => {
    if (!settled) {
      settled = true;
      fallback();
    }
  }, 300);

  navigator.clipboard.writeText(text).then(() => {
    if (!settled) {
      settled = true;
      clearTimeout(timeout);
    }
  }).catch(() => {
    if (!settled) {
      settled = true;
      clearTimeout(timeout);
      fallback();
    }
  });
}

document.querySelectorAll(".email-copy-btn").forEach(btn => {
  const originalText = btn.textContent;
  btn.addEventListener("click", () => {
    copyToClipboard(btn.dataset.email);
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = originalText; }, 1500);
  });
});
