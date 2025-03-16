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
