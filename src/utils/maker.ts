export default function getSvg(title: string, footer: string): string {
  const svg = `
  <svg width="350" height="170" viewBox="0 0 1200 627" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font: bolder 72px Helvetica; color: #252A31; height: 430px; display: flex; align-items: flex-start; justify-content: flex-start; }
      .subtitle { font: bold 40px Helvetica; color: #252A31; height: 50px; display: flex; align-items: flex-end; justify-content: flex-start; }
    </style>
    <rect x="10" y="10" width="1180" height="607" rx="10" fill="white"/>
    <rect x="10" y="10" width="1180" height="607" rx="10" stroke="url(#paint0_angular)" stroke-width="20"/>
    <foreignObject x="80" y="80" width="1040" height="480">
      <div class="title" xmlns="http://www.w3.org/1999/xhtml">
        ${title}
      </div>
      <div class="subtitle" xmlns="http://www.w3.org/1999/xhtml">
        ${footer}
      </div>
    </foreignObject>
    <defs>
    <radialGradient id="paint0_angular" gradientUnits="userSpaceOnUse" gradientTransform="skewX(300) scale(3)">
    <stop offset="14.5833%" stop-color="#FA5182"/>
    <stop offset="65.1042%" stop-color="#6AC6C8"/>
    <stop offset="85.4167%" stop-color="#973D99"/>
    </radialGradient>
    </defs>
  </svg>
  `;

  return svg;
}
