
import Chatbot from "https://cdn.jsdelivr.net/gh/AI-MicroMind/ChatBot@latest/dist/web.js"

// Calculate 60% of viewport height
const viewportHeight = window.innerHeight;
const chatHeight = Math.floor(viewportHeight * 0.6);

Chatbot.init({
    chatflowid: "3b5d3c36-2d14-47aa-abe6-0010cc575d3f",
    apiHost: "https://www.dk.octobot.it.com",
    chatflowConfig: {
        /* Chatflow Config */
    },
    observersConfig: {
        /* Observers Config */
    },
    theme: {
        button: {
            backgroundColor: '#E91E63', // Changed to match your accent-1
            right: 20,
            bottom: 20,
            size: 56, // Increased for better visibility
            dragAndDrop: true,
            iconColor: 'white',
            customIconSrc: 'https://octobot.sirv.com/robot1.png',
            autoWindowOpen: {
                autoOpen: false,
                openDelay: 2,
                autoOpenOnMobile: false
            }
        },
        tooltip: {
            showTooltip: true,
            tooltipMessage: 'Ask OctoBot Anything! 🐙',
            tooltipBackgroundColor: '#B039D3', // accent-2
            tooltipTextColor: 'white',
            tooltipFontSize: 16
        },
        customCSS: ``,
        chatWindow: {
            showTitle: true,
            showAgentMessages: true,
            title: 'Your OctoBot Assistant',
            titleAvatarSrc: 'https://octobot.sirv.com/robot1.png',
            welcomeMessage: 'Hello! I am OctoBot, how can I help you today?',
            errorMessage: 'Oops! Something went wrong. Please try again.',
            backgroundColor: '#ffffff',
            backgroundImage: '',
            height: chatHeight,
            width: 400,
            fontSize: 16,
            starterPromptFontSize: 15,
            clearChatOnReload: false,
            sourceDocsTitle: 'Sources:',
            renderHTML: true,
            botMessage: {
                backgroundColor: '#FFF0F5', // Light pink tint
                textColor: '#1A1A1A',
                showAvatar: true,
                avatarSrc: 'https://octobot.sirv.com/robot1.png'
            },
            userMessage: {
                backgroundColor: '#4527A0', // accent-3
                textColor: '#ffffff',
                showAvatar: true,
                avatarSrc: 'https://octobot.sirv.com/user%20(1).png'
            },
            textInput: {
                placeholder: 'Type your question',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '#E91E63', // accent-1
                maxChars: 500, // Increased from 50
                maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 500 characters.',
                autoFocus: true,
                sendMessageSound: true,
                sendSoundLocation: 'send_message.mp3',
                receiveMessageSound: true,
                receiveSoundLocation: 'receive_message.mp3'
            },
            feedback: {
                color: '#B039D3' // accent-2
            },
            dateTimeToggle: {
                date: true,
                time: true
            }
        }
    }
});

// Update height on window resize
window.addEventListener('resize', () => {
    const chatElement = document.querySelector('flowise-chatbot');
    if (chatElement && chatElement.shadowRoot) {
        const chatWindow = chatElement.shadowRoot.querySelector('.chat-window');
        if (chatWindow) {
            const newHeight = Math.floor(window.innerHeight * 0.6);
            chatWindow.style.height = `${newHeight}px`;
        }
    }
});



function fixChatbotBranding() {
    const chatbotElement = document.querySelector('flowise-chatbot');
    if (!chatbotElement || !chatbotElement.shadowRoot) {
        setTimeout(fixChatbotBranding, 1000);
        return;
    }

    function updateBranding() {
        const shadowRoot = chatbotElement.shadowRoot;

        // Find all anchor tags that might contain the branding
        const links = shadowRoot.querySelectorAll('a[href*="aimicromind"], .lite-badge a, #lite-badge a');

        links.forEach(link => {
            // Update href
            link.href = 'https://octobot.it.com/';
            link.target = '_blank';

            // Update text content
            const spans = link.querySelectorAll('span');
            spans.forEach(span => {
                if (span.textContent.includes('AI Micromind')) {
                    span.innerHTML = '&nbsp; OctoBot';
                }
            });
        });
    }

    // Initial update
    updateBranding();

    // Set up observer for changes
    const observer = new MutationObserver(() => updateBranding());
    observer.observe(chatbotElement.shadowRoot, {
        childList: true,
        subtree: true
    });
}

// Start when page loads
window.addEventListener('load', fixChatbotBranding);
setTimeout(fixChatbotBranding, 1500);



function animateChatbotBubble() {
    const chatbotElement = document.querySelector('flowise-chatbot');
    if (!chatbotElement || !chatbotElement.shadowRoot) {
        setTimeout(animateChatbotBubble, 1000);
        return;
    }

    const shadowRoot = chatbotElement.shadowRoot;

    // Check if styles already injected
    if (shadowRoot.querySelector('#chatbot-animations')) {
        return;
    }

    // Create and inject custom styles with enhanced animations
    const styleSheet = document.createElement('style');
    styleSheet.id = 'chatbot-animations';
    styleSheet.textContent = `
        /* Create wave containers */
        .relative > button[aria-label="Chat"]::before,
        .fixed > button[aria-label="Chat"]::before,
        button.chatbot-toggle-main::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, #E91E63 0%, transparent 70%);
            z-index: -1;
            animation: waveExpand 3s ease-out infinite;
        }

        .relative > button[aria-label="Chat"]::after,
        .fixed > button[aria-label="Chat"]::after,
        button.chatbot-toggle-main::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, #B039D3 0%, transparent 70%);
            z-index: -2;
            animation: waveExpand 3s ease-out infinite 1.5s;
        }

        /* Main button animations */
        .relative > button[aria-label="Chat"],
        .fixed > button[aria-label="Chat"],
        button.chatbot-toggle-main {
            position: relative !important;
            animation: pulse 2s ease-in-out infinite, float 4s ease-in-out infinite !important;
            box-shadow: 0 5px 25px rgba(233, 30, 99, 0.4), 
                        0 10px 10px -5px rgba(233, 30, 99, 0.2) !important;
            transition: all 0.3s ease !important;
            transform-origin: center center !important;
            overflow: visible !important;
            background: linear-gradient(135deg, #E91E63, #B039D3) !important;
        }

        /* Wave expansion animation */
        @keyframes waveExpand {
            0% {
                width: 100%;
                height: 100%;
                opacity: 0.6;
            }
            100% {
                width: 200%;
                height: 200%;
                opacity: 0;
            }
        }

        /* Hover effect */
        .relative > button[aria-label="Chat"]:hover,
        .fixed > button[aria-label="Chat"]:hover,
        button.chatbot-toggle-main:hover {
            transform: translateY(-3px) scale(1.1) !important;
            box-shadow: 0 8px 30px rgba(233, 30, 99, 0.5), 
                        0 15px 15px -5px rgba(176, 57, 211, 0.3) !important;
            animation-play-state: paused !important;
        }

        /* Pulse animation with gradient effect */
        @keyframes pulse {
            0% {
                box-shadow: 0 5px 25px rgba(233, 30, 99, 0.4), 
                            0 10px 10px -5px rgba(233, 30, 99, 0.2),
                            0 0 0 0 rgba(233, 30, 99, 0.8);
            }
            50% {
                box-shadow: 0 5px 25px rgba(176, 57, 211, 0.4), 
                            0 10px 10px -5px rgba(176, 57, 211, 0.2),
                            0 0 0 20px rgba(176, 57, 211, 0);
            }
            100% {
                box-shadow: 0 5px 25px rgba(233, 30, 99, 0.4), 
                            0 10px 10px -5px rgba(233, 30, 99, 0.2),
                            0 0 0 0 rgba(233, 30, 99, 0);
            }
        }

        /* Enhanced float animation */
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(-5px) rotate(-2deg);
            }
            50% {
                transform: translateY(-3px) rotate(1deg);
            }
            75% {
                transform: translateY(-5px) rotate(2deg);
            }
        }

        /* Attention shake with gradient */
        @keyframes shake {
            0%, 100% { 
                transform: translateX(0) rotate(0deg);
                filter: hue-rotate(0deg);
            }
            25% { 
                transform: translateX(-5px) rotate(-5deg);
                filter: hue-rotate(10deg);
            }
            75% { 
                transform: translateX(5px) rotate(5deg);
                filter: hue-rotate(-10deg);
            }
        }

        /* Glow effect with color shift */
        @keyframes glow {
            0%, 100% { 
                filter: brightness(1) hue-rotate(0deg);
                box-shadow: 0 5px 25px rgba(233, 30, 99, 0.4), 
                           0 10px 10px -5px rgba(233, 30, 99, 0.2);
            }
            25% {
                filter: brightness(1.3) hue-rotate(10deg);
                box-shadow: 0 5px 40px rgba(176, 57, 211, 0.6), 
                           0 10px 20px -5px rgba(176, 57, 211, 0.4),
                           0 0 60px rgba(176, 57, 211, 0.3);
            }
            50% { 
                filter: brightness(1.2) hue-rotate(-10deg);
                box-shadow: 0 5px 35px rgba(69, 39, 160, 0.8), 
                            0 10px 20px -5px rgba(69, 39, 160, 0.4),
                            0 0 50px rgba(69, 39, 160, 0.4);
            }
            75% {
                filter: brightness(1.3) hue-rotate(5deg);
                box-shadow: 0 5px 40px rgba(233, 30, 99, 0.6), 
                           0 10px 20px -5px rgba(233, 30, 99, 0.4),
                           0 0 60px rgba(233, 30, 99, 0.3);
            }
        }

        /* Ripple effect on click */
        @keyframes ripple {
            0% {
                width: 100%;
                height: 100%;
                opacity: 1;
            }
            100% {
                width: 300%;
                height: 300%;
                opacity: 0;
            }
        }

        .attention-shake {
            animation: shake 0.5s ease-in-out !important;
        }

        .attention-glow {
            animation: glow 3s ease-in-out !important;
        }

        /* Additional styling for the button */
        button.chatbot-toggle-main svg {
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
    `;

    shadowRoot.appendChild(styleSheet);

    // Find and animate the button
    function applyAnimations() {
        // Try multiple selectors to find the chat bubble
        const selectors = [
            'button[aria-label="Chat"]',
            '.fixed button',
            '.relative button',
            'button:has(svg)'
        ];

        let chatButton = null;
        for (const selector of selectors) {
            const buttons = shadowRoot.querySelectorAll(selector);
            for (const button of buttons) {
                // Check if this is the floating button (not in chat window)
                if (!button.closest('.chat-window') && !button.closest('[role="dialog"]')) {
                    chatButton = button;
                    break;
                }
            }
            if (chatButton) break;
        }

        if (chatButton) {
            chatButton.classList.add('chatbot-toggle-main');

            // Attention animations every 10 seconds
            setInterval(() => {
                const chatWindow = shadowRoot.querySelector('.chat-window');
                const isOpen = chatWindow && window.getComputedStyle(chatWindow).display !== 'none';

                if (!isOpen) {
                    const animations = ['attention-shake', 'attention-glow'];
                    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

                    chatButton.classList.add(randomAnimation);
                    setTimeout(() => {
                        chatButton.classList.remove(randomAnimation);
                    }, randomAnimation === 'attention-shake' ? 500 : 3000);
                }
            }, 10000);

            // Add click ripple effect
            chatButton.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    
                `;
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        }
    }

    // Wait a bit for DOM to settle, then apply animations
    setTimeout(applyAnimations, 500);

    // Reapply if DOM changes
    const observer = new MutationObserver(() => {
        setTimeout(applyAnimations, 100);
    });

    observer.observe(shadowRoot, {
        childList: true,
        subtree: true
    });
}

// Start animations with multiple attempts
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateChatbotBubble, 1000);
});
window.addEventListener('load', () => {
    setTimeout(animateChatbotBubble, 2000);
});
setTimeout(animateChatbotBubble, 3000);
