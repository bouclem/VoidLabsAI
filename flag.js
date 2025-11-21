// flag.js - Générateur de drapeaux français en CSS/JS

function createFrenchFlag(size = 'medium') {
    const sizes = {
        small: { width: 20, height: 14 },
        medium: { width: 30, height: 20 },
        large: { width: 40, height: 28 }
    };
    
    const dimensions = sizes[size] || sizes.medium;
    
    const flag = document.createElement('span');
    flag.className = `flag flag-fr flag-${size}`;
    flag.style.cssText = `
        display: inline-block;
        width: ${dimensions.width}px;
        height: ${dimensions.height}px;
        background: linear-gradient(to right, 
            #0055A4 0%, 
            #0055A4 33.33%, 
            #FFFFFF 33.33%, 
            #FFFFFF 66.66%, 
            #EF4135 66.66%, 
            #EF4135 100%);
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        vertical-align: middle;
        margin: 0 4px;
    `;
    
    return flag;
}

// Remplacer automatiquement tous les emojis 🇫🇷 par des drapeaux CSS
function replaceFlagEmojis() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToReplace = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes('🇫🇷')) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(textNode => {
        const parent = textNode.parentNode;
        const parts = textNode.nodeValue.split('🇫🇷');
        
        const fragment = document.createDocumentFragment();
        parts.forEach((part, index) => {
            fragment.appendChild(document.createTextNode(part));
            if (index < parts.length - 1) {
                fragment.appendChild(createFrenchFlag('medium'));
            }
        });
        
        parent.replaceChild(fragment, textNode);
    });
}

// Fonction pour ajouter un drapeau à un élément spécifique
function addFrenchFlag(element, size = 'medium') {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (element) {
        element.appendChild(createFrenchFlag(size));
    }
}

// Initialiser au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceFlagEmojis);
} else {
    replaceFlagEmojis();
}

// Exporter les fonctions pour utilisation externe
window.FrenchFlag = {
    create: createFrenchFlag,
    replace: replaceFlagEmojis,
    addTo: addFrenchFlag
};
