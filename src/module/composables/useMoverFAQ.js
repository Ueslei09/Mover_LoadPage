// src/modules/mover/composables/useMoverFAQ.js
import { ref, onMounted } from 'vue';
import { moverFAQService } from '../services/moverFAQService';

export function useMoverFAQ() {
  const faqData = ref({ title: '', subtitle: '', faqs: [] });
  const activeIndex = ref(null);

  onMounted(() => {
    faqData.value = moverFAQService.getFAQData();
  });

  const toggleFAQ = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return {
    faqData,
    activeIndex,
    toggleFAQ,
    scrollToTop
  };
}