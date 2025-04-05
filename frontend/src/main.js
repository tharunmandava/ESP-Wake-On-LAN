import './style.css'
import viteLogo from '/vite.svg'
import axios from 'axios'

const VITE_SECRET = import.meta.env.VITE_SECRET;
const VITE_URL = import.meta.env.VITE_URL;

console.log(`${VITE_URL}/status`);

document.getElementById("test").addEventListener('click', () => {
  console.log(localStorage.getItem("secret"));
});

document.getElementById('save').addEventListener('click', () => {
  const passwordInput = document.getElementById('passwordInput').value;
  if (passwordInput === ""){
    alert('its empty!')
  }
  localStorage.setItem("secret", passwordInput);
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
  if(secret == null){
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





