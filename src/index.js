import helloworld from "./helloworld.js"
import imgSrc from "./assets/ylyn_addr_writeoff_light.png"
import abc from "./assets/abc.jpg"
import rightSvg from "./assets/right.svg"
import exampleText from "./assets/example.txt"
import "./style.css"
import "./style.less"
import "./style.scss"

helloworld()
const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.src = rightSvg
document.body.appendChild(img2)

const block = document.createElement('div')
block.textContent = '12312123123123lkjalsdj alsdj aj敖德萨所大所大多撒 '
block.classList.add('block-bg')
block.classList.add('icon')
document.body.appendChild(block)

const img3 = document.createElement('img')
img3.style.cssText = 'width:100px;height:200px;'
img3.src = abc
document.body.appendChild(img3)