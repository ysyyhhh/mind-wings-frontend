<template>
	<div class="fireworks">

		<canvas style="height: 100%;width:100%;" canvas-id="canvasId" id="canvasId">
			<!-- <text class="congrats">恭喜你</text> -->
		</canvas>
		
	</div>
</template>

<script>
	export default {
		name: 'Fireworks',
		props: {
			duration: {
				type: Number,
				default: 1000 // 特效持续时间，默认为3秒
			}
		},
		data(){
			return {
				iWidth:500,
				iHeight:800,
				time:""
			}
		},
		mounted() {
			// const canvas = this.$refs.canvas
			const ctx = uni.createCanvasContext('canvasId', this)
			// ctx.width = window.innerWidth
			// ctx.height = window.innerHeight
			// console.log(uni.innerWidth)
			// console.log(uni.innerHeight)
			let _this = this
			uni.getSystemInfo({
				success:(res)=>{
					console.log(res)
					_this.iWidth = res.screenWidth
					_this.iHeight = res.screenHeight
				}}
			 )
			 // console.log(this.iWidth)
			 // console.log(this.iHeight)
			const particles = []
			const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

			class Particle {
				constructor(x, y, dx, dy, size, color) {
					this.x = x
					this.y = y
					this.dx = dx
					this.dy = dy
					this.size = size
					this.color = color
					this.alpha = 1
				}

				update() {
					if (this.alpha <= 0) {
						particles.splice(particles.indexOf(this), 1)
					} else {
						this.x += this.dx
						this.y += this.dy+1.75
						this.alpha -= 0.01
						this.dx *= 0.99
						this.dy *= 0.965
						this.size -= 0.015
						if(this.size < 0.0) this.size = 0.0
					}
				}

				draw() {
					ctx.fillStyle = this.color
					ctx.beginPath()
					ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

					ctx.closePath()
					ctx.fill()

				}
			}

			function createParticles(x, y) {
				for (let i = 0; i < 100; i++) {
					const size = Math.random() * 4 + 1.5
					const color = colors[Math.floor(Math.random() * colors.length)]
					
					const angle = Math.random() * Math.PI * 2
					const dx = Math.sin(angle) * (Math.random() * 6 + 3)
					const dy = Math.cos(angle) * (Math.random() * 6 + 3)
					particles.push(new Particle(x, y, dx, dy, size, color))
				}
			}
			function createParticles(x, y) {
				for (let i = 0; i < 150; i++) {
					const size = Math.random() * 4 + 1.5
					const color = colors[Math.floor(Math.random() * colors.length)]
					
					const angle = Math.random() * Math.PI * 2
					const dx = Math.sin(angle) * (Math.random() * 6 + 3)
					const dy = Math.cos(angle) * (Math.random() * 6 + 3)
					particles.push(new Particle(x, y, dx, dy, size, color))
				}
			}
			function animate(mwidth,mheight) {
				// var that = this
				// console.log("animate")
				// requestAnimationFrame(animate)
				
				
				// requestAnimationFrame(() => {
				// 					this.animate()
				// 				})
				ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
				ctx.fillRect(0, 0, mwidth, mheight)
				particles.forEach(particle => {
					particle.update()
					particle.draw()
					
				})
				ctx.draw()
			}
			
			//fireworks
			createParticles(this.iWidth / 2, this.iHeight / 6)
			var timerId = setInterval(function(){
			    animate(this.iWidth,this.iHeight)
			}, 10)
			
			
			var that = this
			setTimeout(() => {
				clearInterval(timerId)
				this.$emit('close')
				
			}, this.duration)
		},
	
	}
</script>

<style scoped>
	.fireworks {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.congrats {
		font-size: 48px;
		font-weight: bold;
		color: white;
		text-shadow: 2px 2px #FF1461;
		margin-right: 16px;
		padding-top: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;
	}
</style>