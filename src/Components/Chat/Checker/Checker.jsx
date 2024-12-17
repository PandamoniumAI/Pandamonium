export default function Checker() {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    const updatePageTitle = (title) => {
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            pageTitleElement.textContent = title;
        }
    };

    if (characterId) {
        fetch(`https://server-hhcx.onrender.com/characterdata/id?id=${characterId}`)
            .then(response => response.json())
            .then(result => {
                const decodedData = result.data ? atob(result.data) : null;
                if (decodedData) {
                    const characterData = JSON.parse(decodedData);
                    updatePageTitle(characterData.name);
                } else {
                    updatePageTitle('Character Chat');
                }
            })
            .catch(() => {
                updatePageTitle('Character Chat');
            });
    } else {
        updatePageTitle('Character Chat');
    }
}