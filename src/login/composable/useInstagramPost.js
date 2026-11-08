// src/login/composable/useInstagramPost.js
import { ref, watch } from 'vue';

export function useInstagramPost() {
  const formato = ref('feed');
  const descricao = ref('');
  const imagemSrc = ref(null);
  const logoSrc = ref(null);
  const comLogo = ref(true);
  const comTexto = ref(true); // Nova opção para exibir ou ocultar o texto
  const estiloOverlay = ref('degrade');

  const fontSize = ref(24);
  const fontFamily = ref('Arial');

  const textPos = ref({ x: 20, y: 120 });
  const logoPos = ref({ x: 20, y: 220 });

  watch(formato, (novoFormato) => {
    if (novoFormato === 'feed') {
      textPos.value = { x: 20, y: 80 };
      logoPos.value = { x: 20, y: 180 };
    } else {
      textPos.value = { x: 20, y: 150 };
      logoPos.value = { x: 20, y: 280 };
    }
  });

  let activeDrag = null;
  let startX = 0;
  let startY = 0;

  const carregarImagem = (event) => {
    const ficheiro = event.target.files[0];
    if (ficheiro) imagemSrc.value = URL.createObjectURL(ficheiro);
  };

  const carregarLogo = (event) => {
    const ficheiro = event.target.files[0];
    if (ficheiro) logoSrc.value = URL.createObjectURL(ficheiro);
  };

  const startDragText = (e) => {
    activeDrag = 'text';
    initDrag(e);
  };

  const startDragLogo = (e) => {
    activeDrag = 'logo';
    initDrag(e);
  };

  const initDrag = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);
  };

  const onDrag = (e) => {
    if (!activeDrag) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    startX = clientX;
    startY = clientY;

    if (activeDrag === 'text') {
      textPos.value.x += dx;
      textPos.value.y += dy;
    } else if (activeDrag === 'logo') {
      logoPos.value.x += dx;
      logoPos.value.y += dy;
    }
  };

  const stopDrag = () => {
    activeDrag = null;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', stopDrag);
  };

  const baixarCriativo = () => {
    if (!imagemSrc.value) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1080;
    canvas.height = formato.value === 'feed' ? 1080 : 1920;

    const previewElement = document.getElementById('preview-area');
    if (!previewElement) return;

    const scale = canvas.width / previewElement.clientWidth;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imagemSrc.value;

    img.onload = () => {
      // 1. Desenha a imagem de fundo
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Aplica o Estilo de Fundo escolhido
      if (estiloOverlay.value === 'completo') {
        ctx.fillStyle = 'rgba(11, 37, 69, 0.35)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (estiloOverlay.value === 'degrade') {
        const gradient = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(11, 37, 69, 0)');
        gradient.addColorStop(1, 'rgba(11, 37, 69, 0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 3. Renderiza o texto APENAS se a opção 'comTexto' estiver ativa
      if (comTexto.value) {
        const actualFontSize = fontSize.value * scale;
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${actualFontSize}px ${fontFamily.value}`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        const linhas = (descricao.value || 'Seu texto aqui...').split('\n');
        const realTextX = textPos.value.x * scale;
        const realTextY = textPos.value.y * scale;
        const lineHeight = actualFontSize * 1.25;

        linhas.forEach((linha, index) => {
          ctx.fillText(linha, realTextX, realTextY + (index * lineHeight));
        });
      }

      // 4. Renderiza a Logo se ativa
      const finalizarCanvas = () => {
        const link = document.createElement('a');
        link.download = `mover-post-${formato.value}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };

      if (comLogo.value) {
        const realLogoX = logoPos.value.x * scale;
        const realLogoY = logoPos.value.y * scale;
        
        const logoWidth = 120 * scale;
        const logoHeight = 45 * scale;

        if (logoSrc.value) {
          const logoImg = new Image();
          logoImg.crossOrigin = 'anonymous';
          logoImg.src = logoSrc.value;
          logoImg.onload = () => {
            ctx.drawImage(logoImg, realLogoX, realLogoY, logoWidth, logoHeight);
            finalizarCanvas();
          };
          logoImg.onerror = () => finalizarCanvas();
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(realLogoX, realLogoY, logoWidth, logoHeight);
          ctx.fillStyle = '#0b2545';
          ctx.font = `bold ${20 * scale}px ${fontFamily.value}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('MOVER', realLogoX + (logoWidth / 2), realLogoY + (logoHeight / 2));
          finalizarCanvas();
        }
      } else {
        finalizarCanvas();
      }
    };
  };

  return {
    formato,
    descricao,
    imagemSrc,
    logoSrc,
    comLogo,
    comTexto,
    estiloOverlay,
    fontSize,
    fontFamily,
    textPos,
    logoPos,
    carregarImagem,
    carregarLogo,
    startDragText,
    startDragLogo,
    baixarCriativo
  };
}