// Enhance existing journal task lists while retaining their saved completion keys.
document.querySelectorAll('.week-section').forEach((week, index) => {
  week.id = 'week-' + (index + 1);

  week.querySelectorAll('.day-card').forEach((day) => {
    const dayName = day.querySelector('.day-name').textContent;
    const tasks = day.querySelector('.day-tasks');
    tasks.classList.add('interactive');

    [...tasks.children].forEach((task, taskIndex) => {
      const id = week.id + '-' + dayName + '-' + taskIndex;
      const label = document.createElement('label');
      const check = document.createElement('input');
      const text = document.createElement('span');

      check.type = 'checkbox';
      text.textContent = task.textContent;
      try {
        check.checked = localStorage.getItem(id) === 'completed';
      } catch {
        // The checkbox still works for this visit when browser storage is unavailable.
      }

      check.addEventListener('change', () => {
        try {
          if (check.checked) {
            localStorage.setItem(id, 'completed');
          } else {
            localStorage.removeItem(id);
          }
        } catch {
          // Keep the visible checkbox state even if it cannot be persisted.
        }
      });

      label.append(check, text);
      task.replaceChildren(label);
    });
  });
});
