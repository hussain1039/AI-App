let prompt = document.querySelector('#prompt');
let btn = document.querySelector('#btn');
let container = document.querySelector('.container');
let chatContainer = document.querySelector('.chat-container');
let API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDuWMnQj3YrBsaXblH_Fblv64EczNXxL_g';
let userMessage = null;
const createChatBox = (html, className) => {
    let div = document.createElement('div');
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

const showLoading = () => {
    let html = `<img src="chatbot.png" alt="image" width="30">
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="loading" height="45">`;
    let aiChatBox = createChatBox(html, 'ai-chat-box');
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector('.text');
    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": [{ "parts": [{ text: userMessage }] }]
            })
        })
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse;
    } catch (error) {
        console.log(error);
    }
    finally {
        aiChatBox.querySelector('.loading').style.display = 'none';
    }
}

btn.addEventListener('click', () => {
    userMessage = prompt.value;
    if (userMessage == '') {
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }
    if (!userMessage) return;
    let html = `<img src="user.png" alt="image" width="30">
            <p class="text"></p>`;
    let userChatBox = createChatBox(html, 'user-chat-box');
    userChatBox.querySelector('.text').innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    prompt.value = '';
    setTimeout(showLoading, 500);
})