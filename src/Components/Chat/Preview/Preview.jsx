export function Preview() {
    const showPreview = (text) => {
        const preview = document.getElementById('previewMessage');
        preview.style.display = text.trim() === '' ? 'none' : 'block';
        preview.style.borderRadius = '5px';
        preview.textContent = text;
    };

    const hidePreview = () => {
        document.getElementById('previewMessage').style.display = 'none';
    };

    return { showPreview, hidePreview };
}

export const { showPreview, hidePreview } = Preview();