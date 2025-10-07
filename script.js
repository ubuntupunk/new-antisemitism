// Educational Antisemitism Awareness Page JavaScript

// Educational content for each popup
const popupContent = {
    start: {
        title: "Understanding Modern Antisemitism",
        content: `
            <p>This educational tool helps identify patterns in antisemitic rhetoric that have evolved from historical antisemitism and continue today.</p>
            <div class="educational-tip">
                <strong>Educational Goal:</strong> By understanding these patterns, we can better recognize and counter hate speech and discrimination in all its forms.
            </div>
            <p>The flowchart below shows how contemporary antisemitic arguments often follow predictable patterns, regardless of how they're presented.</p>
        `
    },
    
    denial: {
        title: "The 'I'm Not Antisemitic, But...' Pattern",
        content: `
            <p>This phrase is often used as a disclaimer before making antisemitic statements. It's a common rhetorical device that attempts to provide cover for prejudiced views.</p>
            <div class="warning">
                <strong>Warning Sign:</strong> When someone feels the need to deny being antisemitic before speaking, it often indicates they're about to say something problematic.
            </div>
            <div class="educational-tip">
                <strong>Recognition Tip:</strong> Similar patterns exist for other forms of discrimination: "I'm not racist, but..." or "I'm not sexist, but..."
            </div>
            <p>This disclaimer doesn't absolve someone of responsibility for harmful statements that follow.</p>
        `
    },
    
    replacement: {
        title: "Identity Replacement Theory",
        content: `
            <p>This claim attempts to delegitimize Jewish identity by suggesting Palestinians are the "true" Semites, misunderstanding both the term "antisemitism" and ethnic identities.</p>
            <div class="warning">
                <strong>Historical Context:</strong> The term "antisemitism" was coined specifically to describe hatred of Jews, not all Semitic peoples.
            </div>
            <div class="educational-tip">
                <strong>Why This Matters:</strong> This rhetoric attempts to redefine antisemitism to exclude hatred against Jews, making it harder to identify and address anti-Jewish prejudice.
            </div>
            <p>Both Jewish and Palestinian identities are legitimate and complex, rooted in history, culture, and experience.</p>
        `
    },
    
    admission: {
        title: "Open Antisemitism",
        content: `
            <p>While rare in public discourse, some individuals openly express antisemitic views without attempting to disguise them.</p>
            <div class="warning">
                <strong>Direct Threat:</strong> Open antisemitism represents the most clearly identifiable form of anti-Jewish hatred.
            </div>
            <div class="educational-tip">
                <strong>Response:</strong> Open antisemitism should be reported to appropriate authorities and countered with education and community support.
            </div>
            <p>This directness, while harmful, can be easier to identify and address than coded or disguised antisemitism.</p>
        `
    },
    
    distinguish: {
        title: "False Distinctions",
        content: `
            <p>This argument claims to distinguish between "good" and "bad" Jews based on their political views, particularly regarding Israel.</p>
            <div class="warning">
                <strong>Problem:</strong> This creates a test for Jewish acceptability based on political positions, which is a form of discrimination.
            </div>
            <div class="educational-tip">
                <strong>Recognition:</strong> No ethnic or religious group should have to pass political litmus tests to be accepted or treated with respect.
            </div>
            <p>Jews, like all people, hold diverse political views and shouldn't be judged as a collective based on any single issue.</p>
        `
    },
    
    identity: {
        title: "Cultural Appropriation Claims",
        content: `
            <p>This narrative falsely claims that Jewish identity and culture are stolen from Arabs, denying the authentic historical connection of Jews to their heritage.</p>
            <div class="warning">
                <strong>Historical Denial:</strong> This erases thousands of years of documented Jewish history, culture, and connection to the Middle East.
            </div>
            <div class="educational-tip">
                <strong>Understanding:</strong> Multiple peoples can have legitimate historical connections to the same region without negating each other's identities.
            </div>
            <p>Jewish identity developed over millennia and includes diverse communities from around the world.</p>
        `
    },
    
    hitler: {
        title: "Holocaust Glorification",
        content: `
            <p>Expressing admiration for Hitler represents one of the most extreme forms of antisemitism and Holocaust denial/glorification.</p>
            <div class="warning">
                <strong>Extreme Hatred:</strong> This represents genocidal antisemitism and should be taken as a serious threat.
            </div>
            <div class="educational-tip">
                <strong>Historical Education:</strong> Understanding the Holocaust and its consequences is crucial for preventing future genocides against any group.
            </div>
            <p>Such statements violate the human dignity of Holocaust survivors and their descendants, and promote dangerous ideologies.</p>
        `
    },
    
    racism: {
        title: "Redefining Racism",
        content: `
            <p>This argument attempts to label Jewish national self-determination as racism while often ignoring the racist persecution that led to the need for such self-determination.</p>
            <div class="warning">
                <strong>Double Standard:</strong> This often applies different standards to Jewish national aspirations than to other peoples.
            </div>
            <div class="educational-tip">
                <strong>Complexity:</strong> Issues of nationalism, self-determination, and minority rights are complex and deserve nuanced discussion, not simplistic labels.
            </div>
            <p>All peoples deserve protection from discrimination and the right to self-determination, including both Jews and Palestinians.</p>
        `
    },
    
    "promised-land": {
        title: "Theft Narratives",
        content: `
            <p>This claim presents a complex historical situation in overly simplistic terms, ignoring the legitimate connections multiple peoples have to the same land.</p>
            <div class="warning">
                <strong>Oversimplification:</strong> Historical conflicts over land rarely have simple "good vs. evil" explanations.
            </div>
            <div class="educational-tip">
                <strong>Balanced Understanding:</strong> Both Jews and Palestinians have legitimate historical connections to the land and valid grievances about displacement.
            </div>
            <p>Solutions require acknowledging the rights and sufferings of all peoples involved, not delegitimizing one side's connection to the land.</p>
        `
    },
    
    destroy: {
        title: "Genocidal Antisemitism",
        content: `
            <p>Calls for the destruction of Jews represent the most extreme form of antisemitism and constitute incitement to genocide.</p>
            <div class="warning">
                <strong>Criminal Threat:</strong> Such statements may constitute hate crimes and incitement to violence in many jurisdictions.
            </div>
            <div class="educational-tip">
                <strong>Urgent Response:</strong> Genocidal threats against any group require immediate attention from law enforcement and community protection measures.
            </div>
            <p>All people have the right to exist safely and with dignity, regardless of their ethnicity, religion, or nationality.</p>
        `
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupBody = document.getElementById('popup-body');
    const closeBtn = document.querySelector('.close-btn');
    const boxes = document.querySelectorAll('[data-popup]');

    // Draw connection lines between boxes
    drawConnectionLines();

    // Add click event listeners to all boxes
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            const popupType = this.getAttribute('data-popup');
            showPopup(popupType);
        });
    });

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', closePopup);

    // Close popup when overlay is clicked
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    function showPopup(type) {
        if (popupContent[type]) {
            const content = popupContent[type];
            popupBody.innerHTML = `
                <h3>${content.title}</h3>
                ${content.content}
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-style: italic; color: #666;">
                    This educational content is designed to help recognize and understand patterns of hate speech and discrimination.
                </div>
            `;
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Add visual feedback for interactive elements
    boxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add educational disclaimer
    console.log('Educational Antisemitism Awareness Tool Loaded');
    console.log('Purpose: To help users recognize patterns of hate speech and discrimination');
    console.log('This tool is for educational purposes only');
});

// Function to draw connection lines between boxes
function drawConnectionLines() {
    const svg = document.getElementById('connection-lines');
    if (!svg) return;

    // Define the connections based on the flowchart
    const connections = [
        // From start box to level 1
        ['start-box', 'denial-box'],
        ['start-box', 'replacement-box'],
        ['start-box', 'admission-box'],
        
        // Horizontal connections within level 1
        ['denial-box', 'replacement-box'],
        ['replacement-box', 'admission-box'],
        
        // From level 1 to level 2
        ['denial-box', 'distinguish-box'],
        ['replacement-box', 'identity-box'],
        ['admission-box', 'hitler-box'],
        
        // Cross connections from level 1 to level 2
        ['denial-box', 'identity-box'],
        ['denial-box', 'hitler-box'],
        ['replacement-box', 'distinguish-box'],
        ['replacement-box', 'hitler-box'],
        ['admission-box', 'distinguish-box'],
        ['admission-box', 'identity-box'],
        
        // Horizontal connections within level 2
        ['distinguish-box', 'identity-box'],
        ['identity-box', 'hitler-box'],
        
        // From level 2 to level 3
        ['distinguish-box', 'racism-box'],
        ['identity-box', 'promised-land-box'],
        ['hitler-box', 'destroy-box'],
        
        // Cross connections from level 2 to level 3
        ['distinguish-box', 'promised-land-box'],
        ['distinguish-box', 'destroy-box'],
        ['identity-box', 'racism-box'],
        ['identity-box', 'destroy-box'],
        ['hitler-box', 'racism-box'],
        ['hitler-box', 'promised-land-box'],
        
        // Horizontal connections within level 3
        ['racism-box', 'promised-land-box'],
        ['promised-land-box', 'destroy-box'],
        
        // From level 3 to conclusion
        ['racism-box', 'conclusion-box'],
        ['promised-land-box', 'conclusion-box'],
        ['destroy-box', 'conclusion-box']
    ];

    // Helper function to get center coordinates of an element
    function getElementCenter(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const containerRect = svg.getBoundingClientRect();
        
        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
        };
    }

    // Clear existing lines
    svg.innerHTML = '';

    // Draw each connection
    connections.forEach(([fromId, toId]) => {
        const fromPos = getElementCenter(fromId);
        const toPos = getElementCenter(toId);
        
        if (fromPos && toPos) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromPos.x);
            line.setAttribute('y1', fromPos.y);
            line.setAttribute('x2', toPos.x);
            line.setAttribute('y2', toPos.y);
            line.setAttribute('class', 'connection-line');
            svg.appendChild(line);
        }
    });
}

// Redraw lines on window resize
window.addEventListener('resize', function() {
    setTimeout(drawConnectionLines, 100);
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for better accessibility
    const boxes = document.querySelectorAll('[data-popup]');
    boxes.forEach(box => {
        box.setAttribute('role', 'button');
        box.setAttribute('tabindex', '0');
        box.setAttribute('aria-label', 'Click to learn about this antisemitic rhetoric pattern');
        
        // Add keyboard navigation
        box.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
