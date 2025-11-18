// Promotional popup functionality
let promoPopupShown = false;

window.addEventListener('load', function() {
    setTimeout(function() {
        showPromoPopup();
    }, 35000);
});

function showPromoPopup() {
    const popup = document.getElementById('promoPopup');
    if (!promoPopupShown) {
        popup.style.display = 'flex';
        promoPopupShown = true;
        
        // Add click event listener to redirect when popup is shown
        document.addEventListener('click', handleRedirectClick);
    }
}

function handleRedirectClick(event) {
    // Only redirect if the popup is currently shown
    if (promoPopupShown) {
        window.location.href = 'signin.html';
    }
}

function closePromoPopup() {
    // Even when closing via X button, redirect to signin
    window.location.href = 'signin.html';
}

function redirectToSignUp() {
    window.location.href = 'signin.html';
}

// Close promo popup when clicking the overlay (but still redirect)
document.addEventListener('DOMContentLoaded', function() {
    const promoPopup = document.getElementById('promoPopup');
    
    if (promoPopup) {
        promoPopup.addEventListener('click', function(event) {
            if (event.target === this) {
                window.location.href = 'signin.html';
            }
        });
    }
});

// Topic cards functionality
document.addEventListener('DOMContentLoaded', function() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = card.getAttribute('data-topic');
            openDetailsPopup(topic);
        });
    });
});

// Details popup functions
function openDetailsPopup(topicName) {
    const contentData = JSON.parse(document.getElementById('contentData').textContent);
    const modal = document.getElementById('topicModal');
    const modalBody = document.getElementById('modalBody');
    
    if (contentData[topicName]) {
        const topic = contentData[topicName];
        let html = `<span class="close-btn" onclick="closeDetailsPopup()">&times;</span>`;
        html += `<h2 style="color: #0066cc; margin-bottom: 1rem;">${topicName}</h2>`;
        html += `<p style="color: #666; margin-bottom: 1.5rem;">${topic.description}</p>`;
        
        if (topic.subtopics) {
            html += `<div style="display: grid; gap: 1rem;">`;
            topic.subtopics.forEach((subtopic, index) => {
                html += `
                    <div class="subtopic-card" onclick="event.stopPropagation(); showSubtopicDetail('${topicName}', ${index})" style="padding: 1rem; background-color: #f0f4ff; border-radius: 8px; border-left: 4px solid #0066cc; cursor: pointer; transition: all 0.3s ease;">
                        <h3 style="color: #0066cc; margin-bottom: 0.5rem; font-size: 1.05rem;">${subtopic.title}</h3>
                        <p style="color: #888; font-size: 0.9rem;">Click to read more...</p>
                    </div>
                `;
            });
            html += `</div>`;
        }
        
        modalBody.innerHTML = html;
        modal.style.display = 'flex';
    }
}

function showSubtopicDetail(topicName, index) {
    const contentData = JSON.parse(document.getElementById('contentData').textContent);
    const modalBody = document.getElementById('modalBody');
    
    const topic = contentData[topicName];
    const subtopic = topic.subtopics[index];
    
    let html = `<span class="close-btn" onclick="closeDetailsPopup()">&times;</span>`;
    html += `<button onclick="event.stopPropagation(); openDetailsPopup('${topicName}')" style="background-color: #0066cc; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 1rem;">← Back</button>`;
    html += `<h2 style="color: #0066cc; margin-bottom: 1rem;">${subtopic.title}</h2>`;
    html += `<p style="color: #555; line-height: 1.8;">${subtopic.content}</p>`;
    
    modalBody.innerHTML = html;
}

function closeDetailsPopup() {
    document.getElementById('topicModal').style.display = 'none';
}

// Close modal when clicking the overlay
document.addEventListener('DOMContentLoaded', function() {
    const topicModal = document.getElementById('topicModal');
    
    if (topicModal) {
        topicModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeDetailsPopup();
            }
        });
    }
});
