document.addEventListener("DOMContentLoaded", () => {
  const cardEnvelope = document.getElementById("cardEnvelope")
  const cardContent = document.getElementById("cardContent")
  const closeBtn = document.getElementById("closeBtn")
  const audioPlayer = document.getElementById("audioPlayer")
  const lyricsContainer = document.getElementById("lyrics")
  const lyricLines = document.querySelectorAll(".lyric-line")

  // Abrir carta
  cardEnvelope.addEventListener("click", () => {
    cardEnvelope.style.display = "none"
    cardContent.style.display = "block"

    // Pequeño delay para la animación
    setTimeout(() => {
      cardContent.style.animation = "cardOpen 1s ease-out"
    }, 100)
  })

  // Cerrar carta
  closeBtn.addEventListener("click", () => {
    cardContent.style.display = "none"
    cardEnvelope.style.display = "flex"

    // Pausar música al cerrar
    audioPlayer.pause()
    audioPlayer.currentTime = 0

    // Resetear letras
    lyricLines.forEach((line) => {
      line.classList.remove("active")
    })
  })

  // Sincronización de letras
  audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime

    lyricLines.forEach((line) => {
      const lineTime = Number.parseFloat(line.getAttribute("data-time"))
      const nextLine = line.nextElementSibling
      const nextLineTime = nextLine ? Number.parseFloat(nextLine.getAttribute("data-time")) : Number.POSITIVE_INFINITY

      // Activar línea actual
      if (currentTime >= lineTime && currentTime < nextLineTime) {
        // Remover clase active de todas las líneas
        lyricLines.forEach((l) => l.classList.remove("active"))

        // Agregar clase active a la línea actual
        line.classList.add("active")

        // Scroll automático para mantener la línea visible
        line.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    })
  })

  // Click en línea de letra para saltar a ese momento
  lyricLines.forEach((line) => {
    line.addEventListener("click", function () {
      const time = Number.parseFloat(this.getAttribute("data-time"))
      audioPlayer.currentTime = time

      if (audioPlayer.paused) {
        audioPlayer.play()
      }
    })
  })

  // Efectos adicionales cuando se reproduce la música
  audioPlayer.addEventListener("play", () => {
    document.querySelector(".album-art").style.animationPlayState = "running"
  })

  audioPlayer.addEventListener("pause", () => {
    document.querySelector(".album-art").style.animationPlayState = "paused"
  })

  // Resetear letras cuando termina la canción
  audioPlayer.addEventListener("ended", () => {
    lyricLines.forEach((line) => {
      line.classList.remove("active")
    })
    lyricsContainer.scrollTop = 0
  })

  // Agregar efectos de partículas de flores de colores
  function createFlowerParticle() {
    const flowers = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🌿", "🍀", "🌾", "💐", "🏵️", "🌵"]
    const flower = document.createElement("div")

    // Seleccionar una flor aleatoria
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)]
    flower.innerHTML = randomFlower

    // Posición y estilo aleatorios
    flower.style.position = "fixed"
    flower.style.left = Math.random() * 100 + "vw"
    flower.style.top = "100vh"
    flower.style.fontSize = Math.random() * 25 + 15 + "px"
    flower.style.pointerEvents = "none"
    flower.style.zIndex = "1000"

    // Añadir un filtro de color aleatorio para más variedad
    const hue = Math.random() * 360
    flower.style.filter = `hue-rotate(${hue}deg) brightness(1.2) saturate(1.3)`

    // Animación personalizada para cada flor
    const animationDuration = Math.random() * 2 + 4 // Entre 4 y 6 segundos
    const rotationDirection = Math.random() > 0.5 ? 1 : -1
    const horizontalDrift = (Math.random() - 0.5) * 200 // Deriva horizontal

    flower.style.animation = `floatUpFlower ${animationDuration}s ease-out forwards`
    flower.style.setProperty("--horizontal-drift", horizontalDrift + "px")
    flower.style.setProperty("--rotation-direction", rotationDirection)

    document.body.appendChild(flower)

    setTimeout(() => {
      flower.remove()
    }, animationDuration * 1000)
  }

  // CSS para las animaciones de flores flotantes
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatUpFlower {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
        opacity: 0.9;
      }
      20% {
        opacity: 1;
        transform: translateY(-20vh) translateX(calc(var(--horizontal-drift) * 0.2)) rotate(calc(var(--rotation-direction) * 72deg)) scale(1);
      }
      50% {
        transform: translateY(-50vh) translateX(calc(var(--horizontal-drift) * 0.6)) rotate(calc(var(--rotation-direction) * 180deg)) scale(1.1);
      }
      80% {
        opacity: 0.8;
        transform: translateY(-80vh) translateX(calc(var(--horizontal-drift) * 0.9)) rotate(calc(var(--rotation-direction) * 288deg)) scale(0.9);
      }
      100% {
        transform: translateY(-100vh) translateX(var(--horizontal-drift)) rotate(calc(var(--rotation-direction) * 360deg)) scale(0.6);
        opacity: 0;
      }
    }

    /* Animación adicional para flores que aparecen ocasionalmente */
    @keyframes sparkleFlower {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.7;
        filter: brightness(1) saturate(1);
      }
      50% {
        transform: scale(1.3) rotate(180deg);
        opacity: 1;
        filter: brightness(1.5) saturate(1.8);
      }
    }

    /* Efecto especial para flores que brillan */
    .flower-sparkle {
      animation: sparkleFlower 2s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)

  // Función para crear flores especiales que brillan ocasionalmente
  function createSparkleFlower() {
    const specialFlowers = ["🌟", "✨", "💫", "⭐"]
    const flower = document.createElement("div")

    const randomFlower = specialFlowers[Math.floor(Math.random() * specialFlowers.length)]
    flower.innerHTML = randomFlower
    flower.className = "flower-sparkle"

    flower.style.position = "fixed"
    flower.style.left = Math.random() * 80 + 10 + "vw" // Evitar los bordes
    flower.style.top = Math.random() * 80 + 10 + "vh"
    flower.style.fontSize = Math.random() * 15 + 20 + "px"
    flower.style.pointerEvents = "none"
    flower.style.zIndex = "999"

    document.body.appendChild(flower)

    setTimeout(() => {
      flower.remove()
    }, 6000)
  }

  // Crear flores flotantes cuando se reproduce la música
  let flowerInterval
  let sparkleInterval

  audioPlayer.addEventListener("play", () => {
    // Flores flotantes regulares cada 1.5 segundos
    flowerInterval = setInterval(createFlowerParticle, 1500)

    // Flores brillantes especiales cada 8 segundos
    sparkleInterval = setInterval(createSparkleFlower, 8000)
  })

  audioPlayer.addEventListener("pause", () => {
    clearInterval(flowerInterval)
    clearInterval(sparkleInterval)
  })

  audioPlayer.addEventListener("ended", () => {
    clearInterval(flowerInterval)
    clearInterval(sparkleInterval)
  })
})
