/* ==========================================================================
   JAVASCRIPT PORTFOLIO CONTROLLER - JUAN MENEZES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMouseGlowEffect();
    initLanguageSwitcher();
    initClipboardCopy();
});

/**
 * Creates a premium spotlight cursor tracking effect on bento cards.
 * Translates mouse position relative to each card into custom CSS variables.
 */
function initMouseGlowEffect() {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

/**
 * Handles toggling site text between Portuguese (pt) and English (en).
 * Remembers user selection via localStorage.
 */
function initLanguageSwitcher() {
    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');
    
    // Check for saved preference, default to Portuguese (pt-BR)
    const savedLang = localStorage.getItem('juan-portfolio-lang') || 'pt';
    setLanguage(savedLang);
    
    btnPt.addEventListener('click', () => {
        setLanguage('pt');
    });
    
    btnEn.addEventListener('click', () => {
        setLanguage('en');
    });
    
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        
        // Update button states
        if (lang === 'pt') {
            btnPt.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnPt.classList.remove('active');
        }
        
        // Find all elements with translations
        const translatableElements = document.querySelectorAll('[data-pt][data-en]');
        
        translatableElements.forEach(el => {
            // Smooth transition: fade out, swap text, fade in
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.15s ease';
            
            setTimeout(() => {
                const translation = el.getAttribute(`data-${lang}`);
                
                // If it is an input or placeholder we handle differently, else textContent
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
                
                el.style.opacity = '1';
            }, 150);
        });
        
        // Save preference
        localStorage.setItem('juan-portfolio-lang', lang);
    }
}

/**
 * Enables copying email address or details to user clipboard.
 * Shows a beautiful hovering toast for feedback.
 */
function initClipboardCopy() {
    const copyTriggers = document.querySelectorAll('.copy-trigger');
    
    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const copyText = trigger.getAttribute('data-clipboard');
            const toast = trigger.querySelector('.copy-feedback-toast');
            
            if (copyText) {
                navigator.clipboard.writeText(copyText).then(() => {
                    // Show custom floating notification
                    if (toast) {
                        toast.classList.add('show');
                        
                        // Clear after 2 seconds
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    });
}
