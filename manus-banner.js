(function () {
  var banner = document.createElement('div');
  banner.id = 'manus-referral';
  banner.style.cssText = [
    'background:#f0f9ff',
    'border-top:2px solid #bae6fd',
    'padding:16px 5%',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'gap:14px',
    'flex-wrap:wrap',
    'font-family:"Noto Sans TC",sans-serif',
  ].join(';');
  banner.innerHTML = [
    '<span style="font-size:0.7rem;font-weight:800;color:#0284c7;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;">推薦工具</span>',
    '<span style="font-size:0.88rem;color:#1e293b;line-height:1.5;">不用一步步下指令——<b>Manus</b> 說清楚你要什麼，它自己把任務從頭跑到尾。</span>',
    '<a href="https://manus.im/invitation/WU2SLUUQLD2DJ?utm_source=invitation&utm_medium=social&utm_campaign=copy_link" target="_blank" rel="noopener" style="display:inline-block;background:#0ea5e9;color:#fff;font-weight:700;font-size:0.82rem;padding:8px 20px;border-radius:99px;text-decoration:none;white-space:nowrap;flex-shrink:0;">免費試用 Manus →</a>',
  ].join('');

  var footer = document.querySelector('footer') || document.querySelector('.article-footer');
  if (footer) {
    footer.parentNode.insertBefore(banner, footer);
  } else {
    document.body.appendChild(banner);
  }
})();
