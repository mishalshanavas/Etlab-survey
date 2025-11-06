https://github.com/user-attachments/assets/83383059-63f5-463b-a2e8-51f847ec0596

# ETLAB Survey F**r

Forget clicking your way through 47 identical "feedback" questions — this script does the heavy lifting while you just exist.
Clean, minimal, no unnecessary shit.

## Why This Exists
ETLAB feedback feels like a side quest nobody asked for. This script turns that 10-minute slog into a **10-second speedrun**.

## How To Use

1. Open the ETLAB feedback page
2. Press `F12` → Console tab
3. Paste the script below
4. If your browser cries, type `allow pasting`
5. Choose the mode:
   * **Fixed Value** → consistent answers
   * **Random Fill** → absolute chaos
6. Submit → close laptop → go outside for once


## The Script

```javascript
(function() {
    'use strict';
    
    const CONFIG = {
        skipFirstOption: true,
        showProgress: true,
        validateElements: true
    };
    
    function getValidSelects() {
        const selects = document.querySelectorAll("select");
        return Array.from(selects).filter(select => 
            select.options.length > 1 && 
            !select.disabled && 
            select.style.display !== 'none'
        );
    }
    
    function getRadioGroups() {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        const groups = {};
        
        radioButtons.forEach(radio => {
            if (!radio.disabled && radio.style.display !== 'none') {
                const name = radio.name;
                if (!groups[name]) {
                    groups[name] = [];
                }
                groups[name].push(radio);
            }
        });
        
        return Object.entries(groups).filter(([name, radios]) => radios.length > 1);
    }
    
    function isValidIndex(index, length) {
        const minIndex = CONFIG.skipFirstOption ? 1 : 0;
        return index >= minIndex && index < length;
    }
    
    function setSelectValue(select, index) {
        try {
            select.selectedIndex = index;
            ['change', 'input', 'blur'].forEach(eventType => {
                select.dispatchEvent(new Event(eventType, { bubbles: true }));
            });
            return true;
        } catch (error) {
            console.warn('Failed to set select value:', error);
            return false;
        }
    }
    
    function setRadioValue(radioGroup, index) {
        try {
            radioGroup.forEach(radio => radio.checked = false);
            
            if (index < radioGroup.length) {
                radioGroup[index].checked = true;
                ['change', 'input', 'click'].forEach(eventType => {
                    radioGroup[index].dispatchEvent(new Event(eventType, { bubbles: true }));
                });
            }
            
            return true;
        } catch (error) {
            console.warn('Failed to set radio value:', error);
            return false;
        }
    }
    
    function showProgress(current, total, type) {
        if (CONFIG.showProgress && total > 5) {
            console.log(`Progress: ${current}/${total} ${type} filled`);
        }
    }
    
    const validSelects = getValidSelects();
    const radioGroups = getRadioGroups();
    const totalElements = validSelects.length + radioGroups.length;
    
    if (totalElements === 0) {
        alert("No form elements found.");
        return;
    }
    
    const elementTypes = [];
    if (validSelects.length > 0) elementTypes.push(`${validSelects.length} dropdown(s)`);
    if (radioGroups.length > 0) elementTypes.push(`${radioGroups.length} radio group(s)`);
    
    console.log(`Found ${totalElements} elements: ${elementTypes.join(', ')}`);
    
    const useSpecificOption = confirm(
        `Found ${totalElements} elements.\n\nChoose specific option? (Cancel = Random fill)`
    );
    
    let successCount = 0;
    
    if (useSpecificOption) {
        let maxOptions = 0;
        if (validSelects.length > 0) {
            maxOptions = Math.max(maxOptions, ...validSelects.map(s => s.options.length));
        }
        if (radioGroups.length > 0) {
            maxOptions = Math.max(maxOptions, ...radioGroups.map(([name, radios]) => radios.length));
        }
        
        const minIndex = CONFIG.skipFirstOption ? 1 : 0;
        const userInput = prompt(`Which option to select for ALL elements?\nEnter number (${minIndex + 1}-${maxOptions}) or leave empty for default (2):`);
        
        let selectedIndex;
        if (userInput === null || userInput.trim() === '') {
            selectedIndex = 1;
        } else {
            selectedIndex = parseInt(userInput, 10) - 1;
            
            if (isNaN(selectedIndex) || selectedIndex < 0) {
                alert("Invalid input.");
                return;
            }
        }
        
        validSelects.forEach((select, i) => {
            if (isValidIndex(selectedIndex, select.options.length)) {
                if (setSelectValue(select, selectedIndex)) {
                    successCount++;
                }
            }
            showProgress(i + 1, validSelects.length, "dropdowns");
        });
        
        radioGroups.forEach(([name, radios], i) => {
            if (isValidIndex(selectedIndex, radios.length)) {
                if (setRadioValue(radios, selectedIndex)) {
                    successCount++;
                }
            }
            showProgress(i + 1, radioGroups.length, "radio groups");
        });
        
        alert(`Completed: ${successCount}/${totalElements} elements set to option ${selectedIndex + 1}.`);
        
    } else {
        validSelects.forEach((select, i) => {
            const minIndex = CONFIG.skipFirstOption ? 1 : 0;
            const maxIndex = select.options.length - 1;
            
            if (maxIndex >= minIndex) {
                const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
                if (setSelectValue(select, randomIndex)) {
                    successCount++;
                }
            }
            showProgress(i + 1, validSelects.length, "dropdowns");
        });
        
        radioGroups.forEach(([name, radios], i) => {
            const minIndex = CONFIG.skipFirstOption ? 1 : 0;
            const maxIndex = radios.length - 1;
            
            if (maxIndex >= minIndex) {
                const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
                if (setRadioValue(radios, randomIndex)) {
                    successCount++;
                }
            }
            showProgress(i + 1, radioGroups.length, "radio groups");
        });
        
        alert(`Completed: ${successCount}/${totalElements} elements filled randomly.`);
    }
    
    console.log(`Operation completed: ${successCount} successful, ${totalElements - successCount} failed`);
})();
```




## Disclaimer

Use your brain. If your professor communicates exclusively via interpretive dance and you rated them "Outstanding", that's between you and your conscience.

No responsibility taken for academic jump scares.


Stay efficient.
Stay unserious.
Done.
