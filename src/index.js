import helloworld from "./helloworld.js"
import imgSrc from "./assets/ylyn_addr_writeoff_light.png"
import rightSvg from "./assets/right.svg"
import exampleText from "./assets/example.txt"
helloworld()
const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = rightSvg
document.body.appendChild(img2)

const block = document.createElement('div')
block.textContent = exampleText
document.body.appendChild(block)