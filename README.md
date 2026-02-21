# MESCOE AI Voice Agent Demos

This project contains various prototype designs and functional demos for the Modern Education Society's Wadia College of Engineering (MESCOE) website, integrated with an advanced **ElevenLabs Conversational AI Voice Agent**.

The goal of this project is to showcase a modern, human-centric, and interactive college website where visitors can instantly get answers about admissions, fees, courses, placements, and campus life using a 24/7 AI-powered voice and chat assistant.

## Features Built

1.  **Multiple Design Concepts:** We have built several different UI approaches for the college website ranging from traditional informative layouts to sleek, premium, dark-mode designs with glassmorphism.
2.  **Conversational AI Integration:** An ElevenLabs AI agent (`agent_2801khzf2nkwfx4r98tt7dvtgkpr`) is smoothly integrated into the website interfaces.
3.  **Real MESCOE Knowledge Base:** The AI is capable of answering detailed questions based on real scraped data about the college, including cutoff marks, NAAC accreditation, scholarship links (MahaDBT), hostel rules, and direct contact numbers.
4.  **Multi-Language Voice Support:** The AI agent can manage queries and respond vocally in both English and Hindi (configurable in the ElevenLabs dashboard).

## Demo Files Included

You can view the different prototypes by opening the respective HTML files directly in any modern web browser. No complex build tools or servers are required.

*   `college_ai_demo/index.html`: A highly cinematic, dark-mode, premium demo with a central AI-chat focus.
*   `Yash_idea/mescoe_website.html`: A clean, comprehensive layout with interactive bento boxes and a floating AI agent widget.
*   `tempdemo/tempdemo.html`: Alternative traditional layout with floating AI widget.
*   `tempdemo/temp2demo.html`: Another layout iteration featuring a static hero chat interface and the floating AI widget.
*   `pratik_idea/college-helpdesk-agent.html`: Dedicated helpdesk interface design.

## How to Run

1.  Clone or download this repository to your local machine.
2.  Navigate to the folder of the demo you wish to view.
3.  Double-click the HTML file (e.g., `college_ai_demo/index.html`) to open it in Chrome, Edge, Firefox, or Safari.
4.  To test the AI, click on the **ElevenLabs AI Widget** appearing in the corner (or the chat interfaces built into the pages) and start speaking or typing your questions!

## Notes on the AI Voice Integration

The floating AI assistant is powered by ElevenLabs Conversational Voice API. It uses a `<elevenlabs-convai>` HTML web component injected at the bottom of the HTML files. 

If the agent speaks the wrong language or gives incorrect information, you **do not** need to edit the website code. Simply log into your ElevenLabs account, modify the system prompt/voice settings for the agent, and the changes will instantly reflect on all these demo websites.

## Tech Stack
*   HTML5
*   CSS3 (Vanilla, custom properties, modern layouts)
*   JavaScript (ES6, Intersection Observers for scroll animations)
*   [ElevenLabs Conversational AI Widget](https://elevenlabs.io/)
