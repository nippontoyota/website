fetch('http://localhost:3000/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bot Test', phone: '1234567890', model: 'TEST MODEL' })
})
.then(res => res.json())
.then(data => console.log('Result:', data))
.catch(err => console.error('Error:', err));
