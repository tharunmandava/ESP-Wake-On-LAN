import './style.css'
import viteLogo from '/vite.svg'
import axios from 'axios'

const VITE_SECRET = import.meta.env.VITE_SECRET;
const VITE_URL = import.meta.env.VITE_URL;

console.log(`${VITE_URL}/status`);

// document.querySelector('#app').innerHTML = `
//   <div>
//       <img src="${viteLogo}" id="toggleLogo" class="logo" alt="Vite logo" />
//     <h1>Hello Whizzkid!</h1>
//         <div class="card">
//       <button id="yes" type="button">yes</button>
//       <button id="no" type="button">no</button>
//     </div>
//     <p class="status-text">
//     Status
//     </p>
//     <p class="status-text" id="status-text">
//       Placeholder
//     </p>
//     <div id="passwordScreen">
//       <input type="password"/> 
//       <button id="save">save</button>
//     </div>

//   </div>
// `

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
  try {
    const res = await axios.post(`${VITE_URL}/update-status`, {
      token: VITE_SECRET,
      newStatus: answer
    })
    document.getElementById('status-text').textContent = `server says : ${res.data.message}`;

  } catch (error) {
    document.getElementById('status-text').textContent = `failed to send request, please try again.`;
    console.log(error);
  }
}





