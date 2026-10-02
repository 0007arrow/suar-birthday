# Happy Birthday Bacchi ❤️

A premium, interactive, romantic birthday surprise website built for Suar.

## How to Customize

This project is designed to be easily editable without needing to dive deep into the code. All major text, messages, and configurations are located at the top of the `script.js` file.

### 1. Where are the photos stored?
The photos are expected to be in the `assets/` folder.
Currently, the configuration looks for:
- `assets/photo1.jpg`
- `assets/photo2.jpg`
- `assets/photo3.jpg`

### 2. How to replace the photos
1. Drop your 3 photos into the `assets/` directory.
2. Rename them to `photo1.jpg`, `photo2.jpg`, and `photo3.jpg`.
3. (Alternatively) Open `script.js` and change the filenames in the `birthdayConfig` object at the very top of the file to match your photo names.

### 3. How to change Suar's name or nickname
Open `script.js` and edit the `birthdayConfig` object at the top:
```javascript
const birthdayConfig = {
    name: "Suar",
    nickname: "Bacchi",
    // ...
};
```
*Note: Some text is hardcoded in the HTML for cinematic styling. If you need to change instances in the HTML, open `index.html` and search for "Suar" or "Bacchi".*

### 4. How to edit the letter
Open `script.js` and modify the `letter` property inside `birthdayConfig`. You can use `<br>` to create line breaks.

### 5. How to change the romantic messages and reasons
Open `script.js` and look for the `wishes` and `reasons` arrays inside `birthdayConfig`. Add, remove, or change the lines as you wish.

### 6. How to change the music
1. Add your romantic MP3 file to the `assets/` folder.
2. Rename it to `birthday-music.mp3`, OR open `index.html` and change the `<source src="assets/birthday-music.mp3">` path to match your file name.
*Note: Browsers block autoplaying audio, so a music toggle button (♫) is placed at the top right for her to start the music.*

### 7. How to run the website
Since this is a simple static website (HTML, CSS, JS), you don't need any complex servers.
- **Simplest way**: Just double-click the `index.html` file to open it in your browser.
- **Better way**: Use a local server like VS Code's "Live Server" extension to ensure all assets load perfectly.

### 8. How to deploy it
You can host this for free very easily:
- **GitHub Pages**: Upload the folder to a GitHub repository and turn on GitHub Pages in the repository settings.
- **Vercel / Netlify / Surge**: Drag and drop the `birthday-website` folder onto their deployment page, and they will give you a live link to share with Suar.

---
*Made with love by Sharib ❤️*
