import './style.css'
import axios from 'axios'

window.onload = async () => {
 await getResponse();
}

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
  localStorage.setItem("url", urlInput);
})

//toggle Logo
document.getElementById('toggleLogo').addEventListener('click', () => {
  document.getElementById("passwordScreen").classList.toggle('hidden');
});

document.getElementById('yes').addEventListener('click', async () => {
  await sendResponse('yes');
});

document.getElementById('no').addEventListener('click', async () => {
  await sendResponse('no');
});

document.getElementById('get-status').addEventListener('click', async () => {
  await getResponse();
});

const sendResponse = async (answer) => {
  const secret = localStorage.getItem("secret");
  const url = localStorage.getItem("url");
  if (secret == null) {
    alert('Secret is null');
  }
  try {
    const res = await axios.post(`${url}/update-status`, {
      token: secret,
      newStatus: answer
    })
    document.getElementById('status-text').textContent = `server updated status with : ${res.data.status}`;

  } catch (error) {
    document.getElementById('status-text').textContent = `failed to send request, please try again.`;
    alert("failed");
    console.log(error);
  }
};

const getResponse = async () => {
  const url = localStorage.getItem("url");
  const res = await axios.get(`${url}/status`);
  const status = res.data.status;
  if (status === "no") {
    document.getElementById('status-text').textContent = `ESP is not pinging Wake-on-LAN requests`;
  }
  if (status === "yes") {
    document.getElementById('status-text').textContent = `ESP is pinging Wake-on-LAN requests`;
  }
};







