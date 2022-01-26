export default `
// Google Tag
window.excludeGtagPaths=[/^(?:\\/preview\\/(?:(?!(?:\\/|^)\\.).)*?)$/];
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer && window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-37075177-6', {'anonymize_ip': true});
`
