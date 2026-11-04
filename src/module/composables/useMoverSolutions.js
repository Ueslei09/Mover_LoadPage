// src/modules/mover/composables/useMoverSolutions.js
import { ref, computed } from 'vue'
import { moverSolutionsService } from '../services/moverSolutionsService'

export function useMoverSolutions() {
  const solutionsData = ref(moverSolutionsService.getData())
  const activeTab = ref(0)

  // Seleciona a aba e altera o conteúdo ativo à direita
  const selectTab = (index) => {
    activeTab.value = index
  }

  // Solução/Slide atualmente selecionado
  const currentSolution = computed(() => {
    return solutionsData.value.tabs[activeTab.value]
  })

  return {
    solutionsData,
    activeTab,
    selectTab,
    currentSolution
  }
}