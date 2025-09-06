
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
           
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
   
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


let darkModeIcon = document.querySelector('#darkmode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

(function() {
   
    emailjs.init('5LQOnrv-xgIM7SV64'); 
})()


const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotBox = document.getElementById('chatbot-box');
const closeChat = document.getElementById('close-chat');
const userMessageInput = document.getElementById('user-message');
const sendMessageBtn = document.getElementById('send-message');
const chatbotMessages = document.getElementById('chatbot-messages');

document.addEventListener('DOMContentLoaded', () => {
    
    testGeminiAPI().then(success => {
        if (success) {
            console.log('Gemini API initialized successfully');
           
            addMessage('Hello!👋 I\'m Michael\'s virtual assistance. How can I help you today?', 'bot');
        } else {
            
            console.warn('Using basic responses as fallback');
          
            addMessage('Hello! How can I help you today?', 'bot');
        }
    }).catch(error => {
        console.error('Error testing Gemini API:', error);
   
        addMessage('Hello! How can I help you today?', 'bot');
    });
});


chatbotIcon.addEventListener('click', () => {
    chatbotBox.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatbotBox.classList.remove('active');
});

async function sendMessage() {
    const message = userMessageInput.value.trim();
    if (message === '') return;
    
   
    addMessage(message, 'user');
   
    userMessageInput.value = '';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = '<p>Thinking...</p>';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    try {
      
        const botResponse = await getBotResponse(message);
        
       
        chatbotMessages.removeChild(typingIndicator);
        

        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error in sendMessage:', error);
        
      
        chatbotMessages.removeChild(typingIndicator);
        
        
        addMessage("I'm having trouble connecting right now. Please try again later.", 'bot');
    }
}


function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    messageElement.appendChild(messageText);
    chatbotMessages.appendChild(messageElement);
    
  
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

let geminiAI;


async function initGeminiAI() {
    try {
      
        const API_KEY = 'AIzaSyDIaBFsy8hddAz3zlDdIWPh0T2nItsiAAo';
        
       
        geminiAI = new window.GoogleGenAI(API_KEY);
        
        console.log('Gemini AI initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing Gemini AI:', error);
        return false;
    }
}


let apiKey = 'AIzaSyDIaBFsy8hddAz3zlDdIWPh0T2nItsiAAo'; 




async function testGeminiAPI() {
    try {
        if (!apiKey) {
            console.warn('No Gemini API key provided. Using basic responses instead.');
            return false;
        }
        
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: 'Hello, testing the API connection'
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Gemini API test successful:', data);
        geminiInitialized = true;
        return true;
    } catch (error) {
        console.error('Error testing Gemini API:', error);
        geminiInitialized = false;
        return false;
    }
}


async function getBotResponse(message) {
   
    if (apiKey && geminiInitialized) {
        try {
          
            const prompt = `You are Michael Caldo's AI assistant on his portfolio website. Respond briefly and professionally to this message from a visitor: "${message}".  Keep responses under 100 words.`;
            
           
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            
            return text;
        } catch (error) {
            console.error('Error getting response from Gemini API:', error);
   
            return getBasicResponse(message);
        }
    } else {

        return getBasicResponse(message);
    }
}


function getBasicResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! How can I help you today?';
    } else if (message.includes('services') || message.includes('what do you do')) {
        return 'I offer web development, mobile development, and software development services. Check out the Services section for more details!';
    } else if (message.includes('contact') || message.includes('hire') || message.includes('work')) {
        return 'You can contact me through the form in the Contact section or send an email directly to caldomichael10@gmail.com';
    } else if (message.includes('portfolio') || message.includes('projects')) {
        return 'I have worked on various projects including a Weather App, Digital Clock, and Drag and Drop interface. Check out the Portfolio section to see them!';
    } else if (message.includes('about') || message.includes('who are you')) {
        return "I'm Michael Caldo, a Junior Software Developer with experience in creating innovative solutions such as chatbots, mobile applications, and augmented reality projects.";
    } else if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! Feel free to ask if you have any other questions.";
    } else {
        return "I'm not sure I understand. Could you please rephrase your question? You can ask about my services, portfolio, or how to contact me.";
    }
}


sendMessageBtn.addEventListener('click', () => {
    sendMessage().catch(error => {
        console.error('Error in send button event listener:', error);
    });
});

userMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage().catch(error => {
            console.error('Error in keypress event listener:', error);
        });
    }
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    

    const templateParams = {
        from_name: document.getElementById('from_name').value,
        email_id: document.getElementById('email_id').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    
    emailjs.send('service_23k0f57', 'template_v44pyut', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('contact-form').reset();

            setTimeout(function() {
                document.getElementById('success-message').style.display = 'none';
            }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
        })
        .finally(function() {
   
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});