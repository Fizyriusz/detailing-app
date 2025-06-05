const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const calendarEl = document.getElementById('calendar');
const dayEditor = document.getElementById('day-editor');
const editorDate = document.getElementById('editor-date');
const descInput = document.getElementById('desc');
const iconsInput = document.getElementById('icons');
const servicesInput = document.getElementById('services');
const saveDayBtn = document.getElementById('save-day');
const closeEditorBtn = document.getElementById('close-editor');
const exportBtn = document.getElementById('export');

const calendarData = {};

function populateSelectors() {
    for (let m = 0; m < 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = new Date(2020, m, 1).toLocaleString('default', { month: 'long' });
        monthSelect.appendChild(opt);
    }
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 5; y <= currentYear + 5; y++) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
    }
    monthSelect.value = new Date().getMonth();
    yearSelect.value = currentYear;
}

function buildCalendar() {
    calendarEl.innerHTML = '';
    const year = parseInt(yearSelect.value, 10);
    const month = parseInt(monthSelect.value, 10);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
        const empty = document.createElement('div');
        calendarEl.appendChild(empty);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
        const cell = document.createElement('div');
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        cell.className = 'day';
        cell.textContent = d;
        cell.dataset.date = dateStr;
        if (calendarData[dateStr]) {
            cell.classList.add('open');
        }
        cell.addEventListener('click', () => editDay(dateStr));
        calendarEl.appendChild(cell);
    }
}

function editDay(dateStr) {
    editorDate.textContent = dateStr;
    const data = calendarData[dateStr] || { desc: '', icons: [], services: [] };
    descInput.value = data.desc;
    iconsInput.value = data.icons.join(',');
    servicesInput.value = data.services.join(',');
    dayEditor.classList.remove('hidden');
    saveDayBtn.onclick = () => {
        const desc = descInput.value.trim();
        const icons = iconsInput.value.split(',').map(s => s.trim()).filter(Boolean);
        const services = servicesInput.value.split(',').map(s => s.trim()).filter(Boolean);
        if (desc || icons.length || services.length) {
            calendarData[dateStr] = { desc, icons, services };
        } else {
            delete calendarData[dateStr];
        }
        dayEditor.classList.add('hidden');
        buildCalendar();
    };
}

closeEditorBtn.addEventListener('click', () => dayEditor.classList.add('hidden'));
monthSelect.addEventListener('change', buildCalendar);
yearSelect.addEventListener('change', buildCalendar);
exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(calendarData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dates.json';
    a.click();
    URL.revokeObjectURL(url);
});

populateSelectors();
buildCalendar();
