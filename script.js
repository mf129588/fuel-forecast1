const startPage = document.getElementById('startPage');
const calculatorPage = document.getElementById('calculatorPage');
const resultPage = document.getElementById('resultPage');
const startBtn = document.getElementById('startBtn');
const fuelForm = document.getElementById('fuelForm');
const resultMessage = document.getElementById('resultMessage');
const maxDistance = document.getElementById('maxDistance');
const resetBtn = document.getElementById('resetBtn');
const fuelOptions = document.querySelectorAll('input[name="fuelOption"]');
const litersOption = document.getElementById('litersOption');
const percentageOption = document.getElementById('percentageOption');

startBtn.addEventListener('click', () => {
    startPage.classList.remove('active');
    calculatorPage.classList.add('active');
});

fuelOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        if (e.target.value === 'liters') {
            litersOption.style.display = 'block';
            percentageOption.style.display = 'none';
            document.getElementById('fuelLevel').required = true;
            document.getElementById('tankCapacity').required = false;
            document.getElementById('fuelPercentage').required = false;
        } else {
            litersOption.style.display = 'none';
            percentageOption.style.display = 'block';
            document.getElementById('fuelLevel').required = false;
            document.getElementById('tankCapacity').required = true;
            document.getElementById('fuelPercentage').required = true;
        }
    });
});

fuelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const distance = parseFloat(document.getElementById('distance').value);
    const consumption = parseFloat(document.getElementById('consumption').value);
    const reserve = parseFloat(document.getElementById('reserve').value) || 0;
    
    let fuelLevel;
    const selectedOption = document.querySelector('input[name="fuelOption"]:checked').value;
    
    if (selectedOption === 'liters') {
        fuelLevel = parseFloat(document.getElementById('fuelLevel').value);
    } else {
        const tankCapacity = parseFloat(document.getElementById('tankCapacity').value);
        const fuelPercentage = parseFloat(document.getElementById('fuelPercentage').value);
        fuelLevel = (tankCapacity * fuelPercentage) / 100;
    }
    
    const usableFuel = fuelLevel - reserve;
    const fuelNeeded = (distance / 100) * consumption;
    
    calculatorPage.classList.remove('active');
    resultPage.classList.add('active');
    
    if (usableFuel >= fuelNeeded) {
        resultPage.classList.add('success');
        resultPage.classList.remove('failure');
        resultMessage.textContent = 'You will make it!';
        maxDistance.style.display = 'none';
    } else {
        resultPage.classList.add('failure');
        resultPage.classList.remove('success');
        resultMessage.textContent = 'You will stand in the middle of nowhere';
        const maxDist = (usableFuel / consumption) * 100;
        maxDistance.textContent = `Maximum distance you can travel: ${maxDist.toFixed(1)} km`;
        maxDistance.style.display = 'block';
    }
});

resetBtn.addEventListener('click', () => {
    resultPage.classList.remove('active');
    startPage.classList.add('active');
    fuelForm.reset();
});
