document.addEventListener('DOMContentLoaded', () => {
  let stylePoints = parseInt(localStorage.getItem('stylePoints') || '0');

  // Dark Mode Toggle + Persistence
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  document.getElementById('dark-mode-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  });

  // Sign Out Button
  document.getElementById('signout-btn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });

  // Profile Page Logic
  if (document.getElementById('profile-email')) {
    const email = localStorage.getItem('userEmail') || "Guest";
    document.getElementById('profile-email').textContent = email;
    document.getElementById('profile-stylepoints').textContent = stylePoints;

    const tips = JSON.parse(localStorage.getItem('userTips') || '[]');
    const tipsBox = document.getElementById('profile-tips');
    tipsBox.innerHTML = tips.length
      ? tips.map(tip => `<p>${tip}</p>`).join('')
      : "<p>No tips yet. Take the quiz!</p>";

    // Chart (dummy values)
    const ctx = document.getElementById('profile-stats-chart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Quiz', 'Closet', 'Subscribe'],
        datasets: [{
          label: 'Points',
          data: [
            parseInt(localStorage.getItem('quizPoints') || '0'),
            parseInt(localStorage.getItem('closetPoints') || '0'),
            parseInt(localStorage.getItem('subPoints') || '0')
          ],
          backgroundColor: '#000'
        }]
      }
    });
  }

  // Example: Store fake tips and email (simulate login or quiz)
  if (!localStorage.getItem('userTips')) {
    localStorage.setItem('userTips', JSON.stringify([
      "Add texture with accessories.",
      "Don't be afraid of color.",
      "Layering = style + comfort."
    ]));
  }

  if (!localStorage.getItem('userEmail')) {
    localStorage.setItem('userEmail', 'you@example.com');
  }

  if (!localStorage.getItem('stylePoints')) {
    localStorage.setItem('stylePoints', '175');
    localStorage.setItem('quizPoints', '100');
    localStorage.setItem('subPoints', '50');
    localStorage.setItem('closetPoints', '25');
  }
});
