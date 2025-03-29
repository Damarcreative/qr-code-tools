# QR Code Tools

[![Static Badge](https://img.shields.io/badge/Status-Complete-brightgreen)](https://github.com/Damarcreative/qr-code-tools)
[![License](https://img.shields.io/github/license/Damarcreative/qr-code-tools.svg)](https://github.com/Damarcreative/qr-code-tools/blob/main/LICENSE)

## Description

QR Code Tools is a static web application that allows you to easily generate and scan QR codes. Built with HTML, CSS, and JavaScript, this frontend-only application provides a fast and convenient way to create QR codes for URLs, text, and more, as well as scan QR codes directly from your device's camera or by uploading an image. No server-side processing is required.

## Features

*   **QR Code Scanner:**
    *   Scans QR codes using your device's camera.
    *   Scans QR codes from uploaded images.
    *   Displays the scan result.
    *   Button to copy the scan result to the clipboard.
*   **QR Code Generator:**
    *   Generates QR codes from entered text or URLs.
    *   Displays the generated QR code.
    *   Button to download the QR code in PNG format.
*   **Responsive User Interface:**
    *   Responsive design to work well on various screen sizes (desktop, tablet, and mobile).
    *   Easy to use.

## Technologies Used

*   HTML5
*   CSS3 (with CSS variables)
*   JavaScript (ES6+)
*   Libraries:
    *   jsQR (for scanning QR codes)
    *   qrcode (for generating QR codes)
    *   Font Awesome (for icons)

## How to Use

1.  **Download or Clone the Repo:**
    *   Download the source code from this GitHub repository (click the "Code" button and select "Download ZIP") or clone the repository using Git: `git clone https://github.com/Damarcreative/qr-code-tools.git`
2.  **Open `index.html`:**
    *   Open the `index.html` file in your web browser.
3.  **Use the Features:**
    *   **Scanner:** Click the "Start Scanning" button to use your camera. Alternatively, upload an image containing a QR code.
    *   **Generator:** Enter text or a URL in the input field, then click "Generate QR Code". Download the QR code image by clicking the "Download QR Code" button.

## Deployment

Since this is a static web application, there are several ways to deploy it:

1.  **GitHub Pages:**
    *   The easiest way is to use GitHub Pages. After you've uploaded the code to GitHub, go to your repository's settings, find the "Pages" section, and select the branch to use for deployment (usually `main` or `gh-pages`). GitHub will automatically host your website.
2.  **Netlify:**
    *   Netlify is a very popular platform for hosting static websites. You can connect your GitHub repository to Netlify, and Netlify will automatically build and deploy your website every time you make changes.
3.  **Other Static Hosting Services:**
    *   There are many other static hosting services, such as Vercel, Cloudflare Pages, and Firebase Hosting.
4.  **Local Web Server (Testing):**
    *   For local testing, you can simply open `index.html` in your web browser.  However, some features (like camera access) may not work correctly without a server environment.

## Contributing

Contributions are welcome! If you want to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m "feat: Add a new feature"` or `git commit -m "fix: Resolve an issue"`).  Use conventional commits.
5.  Push your branch (`git push origin feature/your-feature-name`).
6.  Create a Pull Request.

## License

This project is licensed under the MIT License - see the [`LICENSE`](https://github.com/Damarcreative/qr-code-tools/blob/main/LICENSE) file for details.

## Contact

*   **Damar Jati:** [Your Email or Link to your profile] (Optional, if you want people to contact you directly)

---

**Thank you for using QR Code Tools!**