export default function debug(id, content) {
    if(!document.getElementById('debug')) {
        return;
    }
    let existingDiv = document.getElementById(id);
    if (!existingDiv) {
        const debugDiv = document.getElementById('debug');
        const newDiv = document.createElement('div');
        newDiv.id = id;
        debugDiv.appendChild(newDiv);
        existingDiv = newDiv;
    }
    existingDiv.innerHTML = id + ": " + content;
}