async function run() {
  const url = "https://script.google.com/macros/s/AKfycbyOE5cZHoXxviZ1qxdCHUHA9uxEiHyFfzYwcnPD2NreGvZLOys2EOh6DAsKO2j8TLGm/exec";
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: "Node Test", phone: "123", model: "GLANZA" })
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response text length:", text.length);
  if (text.length < 500) {
    console.log("Text:", text);
  } else {
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    console.log("Title:", titleMatch ? titleMatch[1] : "No title found");
  }
}
run();
