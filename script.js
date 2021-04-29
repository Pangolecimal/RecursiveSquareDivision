const width = 800, height = 800
const cnv = document.querySelector('.cnv')
cnv.setAttribute('width', width)
cnv.setAttribute('height', height)
const ctx = cnv.getContext('2d')

const ruleElement = document.querySelector('.rule')
const cells = Array.from(ruleElement.children)
let rule = cells.map(cell => cell.getAttribute('value'))

let rects

cells.forEach(cell =>
	cell.addEventListener('click', e => {
		const cell = e.target
		cell.setAttribute('value', cell.getAttribute('value') === '0' ? '1' : '0')
		draw()
	})
)

function draw() {
	rule = cells.map(cell => cell.getAttribute('value'))
	rects = [{ x: 0, y: 0, w: 800, h: 800 }]

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < rects.length; j++) {
			rects[j] = divide(rects[j])
		}
		rects = rects.flat()
	}

	ctx.fillStyle = 'rgb(204, 204, 204)'
	ctx.clearRect(0, 0, width, height)
	rects.forEach(r => {
		ctx.fillRect(r.x - 1, r.y - 1, r.w + 1, r.h + 1)
	})
}

function divide(e) {
	const divided = []
	const dim = { w: e.w / 5, h: e.h / 5 }

	rule.forEach((cell, cellIndex) => {
		if (cell === '1') {
			divided.push({
				x: Math.floor(e.x + cellIndex % 5 * dim.w),
				y: Math.floor(e.y + Math.floor(cellIndex / 5) * dim.h),
				...dim
			})
		}
	})

	return divided
}