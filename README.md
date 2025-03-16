

https://github.com/user-attachments/assets/43172036-f3e0-46d2-840f-779c4996d7c6
# ETLAB Dropdown Auto-Fill

A simple JavaScript script to automatically fill all dropdowns in ETLAB's student feedback form.

## Features
- Choose a specific option for all dropdowns.
- Fill all dropdowns randomly.

## Usage
1. Open the ETLAB feedback page.
2. Open the browser console (`F12` → Console).
3. Copy and paste the following script into the console: (`allow pasting` if necessary)
   ```javascript
   (function() {
       let choice = confirm("Do you want to select a specific option for all dropdowns?\n\nOK = Yes (choose an option)\nCancel = Random selection");

       if (choice) {
           let index = parseInt(prompt("Enter the option number to select (starting from 1):"), 10);
           if (!isNaN(index)) {
               document.querySelectorAll("select").forEach(select => {
                   if (index < select.options.length) {
                       select.selectedIndex = index;
                       select.dispatchEvent(new Event("change"));
                   }
               });
               alert(`All dropdowns set to option ${index}.`);
           } else {
               alert("Invalid input. Please enter a valid number.");
           }
       } else {
           document.querySelectorAll("select").forEach(select => {
               let randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
               select.selectedIndex = randomIndex;
               select.dispatchEvent(new Event("change"));
           });
           alert("All dropdowns have been randomly filled.");
       }
   })();

4. Follow the on-screen prompts.
5. Submit the form.
