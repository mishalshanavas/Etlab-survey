

https://github.com/user-attachments/assets/43172036-f3e0-46d2-840f-779c4996d7c6
# ETLAB Survey Speed Run Script

bruh tired of clicking through endless ETLAB feedback forms? this script hits different fr fr

literally nobody has time to manually select "strongly agree" on 47 different questions about whether the professor's powerpoint font was readable

## What this bad boy does
- picks the same option for literally everything (default is option 2 cuz that's usually the sweet spot)
- OR goes full chaos mode and randomizes everything 
- works on dropdowns AND those annoying radio buttons
- basically turns a 10-minute survey into a 10-second speedrun

## How to use (it's giving main character energy)
1. navigate to that ETLAB feedback page (ugh why do they make us do this)
2. crack open that developer console  (`F12` then click Console)
3. paste this absolute unit of a script (might need to type "allow pasting" first because browsers are paranoid like that)
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
4. watch the magic happen (it'll ask if you want specific options or just yolo it)
5. hit submit and touch grass

## Pro tips for maximum efficiency
- default option 2 is usually the "yeah it was fine" answer 
- random mode is perfect when you literally cannot be bothered
- works on any form with dropdowns and radio buttons 

no cap this will save you more time than you know what to do with. your future self will thank you when you're not getting held hostage by a 47-question survey just because you wanted to check if you passed that exam you definitely bombed

## Legal disclaimer or whatever
use responsibly bestie. don't blame me if your professor asks why you rated their teaching style as "excellent" when they exclusively communicate through interpretive dance
