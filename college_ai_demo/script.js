document.addEventListener('DOMContentLoaded', () => {

    // --- AI Chat Interface Logic ---
    const chatBody = document.getElementById('chat-body');
    const aiInput = document.getElementById('ai-input');
    const sendBtn = document.getElementById('send-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    // Simulate Fake AI Responses
    const aiResponses = [
        "That's a great question! MESCOE offers excellent placement opportunities for that branch, with top recruiters visiting annually.",
        "The curriculum for that program was recently updated to match industry standards, focusing heavily on AI and Machine Learning.",
        "Our campus has state-of-the-art labs and a 24/7 library to support your studies.",
        "Admissions for the upcoming academic year have started. You can apply directly through the 'Apply Now' button on the navigation bar.",
        "Would you like me to connect you with a student ambassador from that department to learn more?"
    ];

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        
        if(sender === 'user') {
            msgDiv.classList.add('user-message');
            msgDiv.innerHTML = `<p>${text}</p>`;
        } else {
            msgDiv.classList.add('ai-message');
            // Adding a typing indicator simulation
            msgDiv.innerHTML = `<p><span class="typing">...</span></p>`;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate processing time
            setTimeout(() => {
                msgDiv.innerHTML = `<p>${text}</p>`;
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
            return; // Exit early to avoid appending twice
        }
        
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleSend() {
        const text = aiInput.value.trim();
        if (text === '') return;
        
        // User sends
        appendMessage('user', text);
        aiInput.value = '';

        // AI replies
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            appendMessage('ai', randomResponse);
        }, 500);
    }

    sendBtn.addEventListener('click', handleSend);
    
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Handle Quick Prompts
    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            aiInput.value = chip.innerText;
            handleSend();
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const observeElements = document.querySelectorAll('.bento-box, .section-header, .campus-image-wrap');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => {
        // Initial state for animation
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
