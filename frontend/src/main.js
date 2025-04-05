import './style.css'
import axios from 'axios'

//debug button
document.getElementById("debugButton").addEventListener('click', () => {
  console.log(localStorage.getItem("secret"));
  console.log(localStorage.getItem("url"));
});

//save secret
document.getElementById('saveSecret').addEventListener('click', () => {
  const passwordInput = document.getElementById('passwordInput').value;
  if (passwordInput === "") {
    alert('password empty!')
  }
  localStorage.setItem("secret", passwordInput);
})

//save url
document.getElementById('saveUrl').addEventListener('click', () => {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput === "") {
    alert('url empty!')
  }
  localStorage.setItem("url",urlInput);
})

document.getElementById('toggleLogo').addEventListener('click', () => {
  document.getElementById("passwordScreen").classList.toggle('hidden');
});

document.getElementById('yes').addEventListener('click', () => {
  sendResponse('yes');
});

document.getElementById('no').addEventListener('click', () => {
  sendResponse('no');
});

async function sendResponse(answer) {
  const secret = localStorage.getItem("secret");
  const url = localStorage.getItem("url");
  if (secret == null) {
    alert('Secret is null');
  }
  try {
    const res = await axios.post(`${VITE_URL}/update-status`, {
      token: secret,
      newStatus: answer
    })
    document.getElementById('status-text').textContent = `server says : ${res.data.message}`;

  } catch (error) {
    document.getElementById('status-text').textContent = `failed to send request, please try again.`;
    console.log(error);
  }
}





