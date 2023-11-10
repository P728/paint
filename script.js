const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const clearButton = document.querySelector('#clearButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
	if (!isDrawing) return;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
    if (e.type === 'touchmove') {
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    } else {
        ctx.lineTo(e.offsetX, e.offsetY);
    }
	ctx.stroke();
	[lastX, lastY] = [e.type === 'touchmove' ? e.touches[0].clientX : e.offsetX, e.type === 'touchmove' ? e.touches[0].clientY : e.offsetY];
	hue++;
	if (hue >= 360) {
		hue = 0;
	}
	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
		direction = !direction;
	}
	if (direction) {
		ctx.lineWidth++;
	} else {
		ctx.lineWidth--;
	}
}

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);

function clearCanvas() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.lineCap = 'round';
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'b' || e.key === 'B') {
		clearCanvas();
	}
});

clearButton.addEventListener('click', clearCanvas);
