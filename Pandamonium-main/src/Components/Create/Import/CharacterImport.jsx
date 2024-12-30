export function CharacterImport() {
    const onload = () => {
        document.getElementById('importButton').addEventListener('click', () => {
            const fileInput = document.getElementById('fileInput');
            const urlInput = document.getElementById('urlInput');
            const file = fileInput.files[0];
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const characterData = JSON.parse(e.target.result);
                        populateFields(characterData);
                    } catch (error) {
                        alert('Error parsing character file. Please ensure it is valid JSON format.');
                    }
                };
                reader.readAsText(file);
            } else if (urlInput.value.trim()) {
                fetch(urlInput.value.trim())
                    .then(response => response.json())
                    .then(characterData => {
                        populateFields(characterData);
                    })
                    .catch(error => {
                        alert('Error fetching or parsing URL data. Please ensure the URL is valid and returns JSON.');
                    });
            } else {
                alert('Please select a file or enter a URL to import');
            }
        });
    };

    const populateFields = (characterData) => {
        document.getElementById('name').value = characterData.char_name || characterData.name || '';
        document.getElementById('description').value = characterData.description || '';
        document.getElementById('persona').value = (characterData.char_persona || '') + ' ' + (characterData.personality || '');
        document.getElementById('firstMessage').value = characterData.char_greeting || characterData.first_mes || '';
        document.getElementById('modelInstructions').value = characterData.example_dialogue || characterData.mes_example || '';
        document.getElementById('system').value = characterData.world_scenario || characterData.scenario || '';
    };

    document.addEventListener('DOMContentLoaded', onload);
}