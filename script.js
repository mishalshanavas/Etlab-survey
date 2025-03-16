(function() {
    let choice = prompt(" to select a specific option or '2' for random selection:");

    if (choice === "1") {
        let index = parseInt(prompt("Enter the option index to select (starting from 1):"), 10);
        if (!isNaN(index)) {
            document.querySelectorAll("select").forEach(select => {
                if (index < select.options.length) {
                    select.selectedIndex = index;
                    select.dispatchEvent(new Event("change"));
                }
            });
        } else {
            alert("Invalid input. Please enter a number.");
        }
    } else if (choice === "2") {
        document.querySelectorAll("select").forEach(select => {
            let randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
            select.selectedIndex = randomIndex;
            select.dispatchEvent(new Event("change"));
        });
    } else {
        alert("Invalid choice. Please enter '1' or '2'.");
    }
})();
