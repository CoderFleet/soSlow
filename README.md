<!-- README.md -->

<h1 align="center">🐢 SoSlow — Speed Up Your Videos Like a Pro</h1>

<p align="center">
  <b>A minimal and elegant Chrome Extension to control video playback speed globally.</b><br/>
  Skip the slow. Speed what matters. Pause when you need. 🎮🚀
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20With-HTML%20%7C%20JS%20%7C%20Tailwind-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Chrome%20Extension-MV3-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/CoderFleet/soSlow?style=for-the-badge" />
</p>

---

## ✨ Features

- ⚡️ **Set Default Speed** for all videos across all websites
- 👀 **Keyboard Shortcuts**  
  ↳ `Shift + ↑` to increase speed  
  ↳ `Shift + ↓` to decrease speed
- 🌐 **Exclude Domains** where the extension should not modify video speeds
- 💾 **Persistent Settings** using Chrome local storage
- 🔁 **Auto-applies** speed even to newly loaded videos (SPAs like YouTube)
- 📊 **Intuitive Dashboard** built with TailwindCSS
- 🧪 **No Frameworks**, just HTML, JS, and 💚 Tailwind

---

## 📸 Preview

<p align="center">
  
  <img src="https://github.com/user-attachments/assets/de79aea2-21f7-4767-9e4f-54628baf43fe" width="900" alt="Popup UI" />
  <br/>
  <em>Extension popup</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a7185215-40a4-45fc-91cf-6ce99c247118" width="900" alt="Dashboard UI" />
  <br/>
  <em>Dashboard interface</em>
</p>

---

## 🧰 Tech Stack

| Layer        | Tech              |
|--------------|-------------------|
| Frontend UI  | Tailwind CSS      |
| Storage      | Chrome localStorage API |
| Architecture | MV3 - Manifest V3 |
| Framework    | None (Vanilla JS) |

---

## ⌨️ Keyboard Shortcuts

| Action    | Shortcut     |
|-----------|--------------|
| Speed Up  | `Shift + ↑`  |
| Slow Down | `Shift + ↓`  |
| Toggle Site | Use the popup UI |

---

## 🔐 Permissions

This extension only uses:

```json
"permissions": [
 "storage",
 "tabs",
 "activeTab",
 "scripting"
]
```
- ✅ We do not collect or transmit any user data.
- 🧘 Privacy-first. Always.

---

## 📄 License
- Licensed under MIT — Feel free to use, modify, and share.
- Just don't be a weirdo and resell it as-is 😆
